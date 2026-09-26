#!/usr/bin/env node
// Structural validator for lavendly/skills. Node 18 or newer, no dependencies.
//
// Checks:
//   1. every lavendly-*/ folder has SKILL.md with frontmatter: name equals the
//      folder, version equals VERSION, description carries "Use when:",
//      "Chain:" and "NOT for:", argument-hint present
//   2. SKILL.md is under 300 lines
//   3. every references/*.md is linked from its SKILL.md; every relative link
//      in the skill folder resolves and stays inside the folder; no ../ paths
//   4. every backticked snake_case token inside a skill folder is a known MCP
//      tool name or an allowlisted field, phase or error code
//   5. no em dash (U+2014) or en dash (U+2013) in any tracked text file, and
//      no " -- " used as a dash in markdown prose
//   6. VERSION matches every manifest, package.json and CHANGELOG
//   7. marketplace.json lists every skill folder, paths exist, invoke names match
//
// Exit code 1 with a list of failures, 0 when clean.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MAX_SKILL_LINES = 300;
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const TEXT_EXT = new Set(['.md', '.json', '.js', '.mjs', '.cjs', '.yml', '.yaml', '.txt', '']);

// Source: the Lavendly MCP tool catalog (server/mcp.mjs, docs/mcp/tools-reference).
const TOOLS = new Set([
  'list_workflows', 'get_workflow', 'create_workflow', 'update_workflow', 'delete_workflow',
  'list_projects', 'create_project',
  'import_asset',
  'estimate_cost', 'generate_scene', 'get_generation_status',
  'get_workflow_audio', 'attach_track', 'update_track', 'detach_track', 'set_clip_native_audio',
  'create_render', 'get_render', 'list_renders', 'list_all_renders',
  'quality_check', 'get_scene_frame',
  'list_channels', 'publish_video', 'schedule_video',
  'get_ledger', 'get_monthly_usage', 'get_status', 'get_schema',
]);

// Field names, response keys, phases and error codes the skills may backtick.
// Each comes from a tool input schema, a documented response, or a server
// error envelope. Add here with the source when a skill needs a new one.
const FIELDS = new Set([
  // tool arguments
  'workflow_id', 'node_id', 'clip_id', 'track_id', 'channel_id', 'job_id',
  'project_id', 'project_name', 'idempotency_key', 'video_url', 'native_audio',
  'expect_audio', 'skip_vlm', 'remove_source_node',
  // estimate_cost, get_generation_status, quality_check, publish responses
  'per_scene', 'already_generated', 'available_credits', 'progress_message',
  'seconds_since_update', 'needs_browser', 'reroll_hint', 'fraction_used',
  'release_url', 'scheduled_post_id',
  // generation phases
  'generating_images', 'generating_clips',
  // server error codes (apiError envelopes)
  'insufficient_credits', 'version_conflict', 'workflow_conflict', 'invalid_args',
  'workflow_not_found', 'clip_not_found', 'track_not_found', 'job_not_found', 'tool_error',
  'http_status',
]);

const failures = [];
const okLines = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => okLines.push(msg);
const rel = (p) => relative(ROOT, p).split(sep).join('/');

function readText(p) {
  return readFileSync(p, 'utf8');
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function isTextFile(p) {
  return TEXT_EXT.has(extname(p));
}

// Minimal frontmatter parser: `key: value` and `key: |` block scalars.
function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) return null;
  const body = text.slice(4, end).split('\n');
  const fm = {};
  let blockKey = null;
  let blockLines = [];
  const flush = () => {
    if (blockKey !== null) {
      fm[blockKey] = blockLines.join('\n').trim();
      blockKey = null;
      blockLines = [];
    }
  };
  for (const line of body) {
    if (blockKey !== null && (line.startsWith('  ') || line.trim() === '')) {
      blockLines.push(line.replace(/^ {2}/, ''));
      continue;
    }
    flush();
    const m = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    if (value === '|' || value === '>' || value === '|-' || value === '>-') {
      blockKey = key;
    } else {
      fm[key] = value.replace(/^["']|["']$/g, '').trim();
    }
  }
  flush();
  return fm;
}

function stripFences(md) {
  return md.replace(/```[\s\S]*?```/g, '\n');
}

function stripInlineCode(md) {
  return md.replace(/`[^`\n]*`/g, '');
}

// ---------------------------------------------------------------------------
// VERSION and manifests
// ---------------------------------------------------------------------------

const versionPath = join(ROOT, 'VERSION');
if (!existsSync(versionPath)) fail('VERSION file missing');
const VERSION = existsSync(versionPath) ? readText(versionPath).trim() : '';
if (VERSION && !/^\d+\.\d+\.\d+$/.test(VERSION)) fail(`VERSION "${VERSION}" is not semver`);
else if (VERSION) ok(`VERSION ${VERSION}`);

function readJson(relPath) {
  const p = join(ROOT, relPath);
  if (!existsSync(p)) {
    fail(`${relPath} missing`);
    return null;
  }
  try {
    return JSON.parse(readText(p));
  } catch (err) {
    fail(`${relPath} is not valid JSON: ${err.message}`);
    return null;
  }
}

const marketplace = readJson('.claude-plugin/marketplace.json');
const manifests = {
  '.claude-plugin/plugin.json': readJson('.claude-plugin/plugin.json'),
  '.cursor-plugin/plugin.json': readJson('.cursor-plugin/plugin.json'),
  '.codex-plugin/plugin.json': readJson('.codex-plugin/plugin.json'),
  'package.json': readJson('package.json'),
};

for (const [name, json] of Object.entries(manifests)) {
  if (!json) continue;
  if (json.version !== VERSION) fail(`${name}: version "${json.version}" != VERSION ${VERSION}`);
  else ok(`${name} version matches`);
}

const marketplacePlugin = marketplace?.plugins?.[0];
if (marketplace && !marketplacePlugin) fail('.claude-plugin/marketplace.json: plugins[0] missing');
if (marketplacePlugin) {
  if (marketplacePlugin.version !== VERSION) {
    fail(`.claude-plugin/marketplace.json: plugins[0].version "${marketplacePlugin.version}" != VERSION ${VERSION}`);
  } else ok('.claude-plugin/marketplace.json version matches');
}

const changelogPath = join(ROOT, 'CHANGELOG.md');
if (existsSync(changelogPath)) {
  if (!readText(changelogPath).includes(`## ${VERSION}`)) fail(`CHANGELOG.md has no "## ${VERSION}" entry`);
  else ok(`CHANGELOG.md has ${VERSION}`);
} else fail('CHANGELOG.md missing');

// ---------------------------------------------------------------------------
// Skill folders
// ---------------------------------------------------------------------------

const skillDirs = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('lavendly-'))
  .map((d) => d.name)
  .sort();

if (skillDirs.length === 0) fail('no lavendly-*/ skill folders found');

const readme = existsSync(join(ROOT, 'README.md')) ? readText(join(ROOT, 'README.md')) : '';
if (!readme) fail('README.md missing');

for (const dirName of skillDirs) {
  const dir = join(ROOT, dirName);
  const skillPath = join(dir, 'SKILL.md');
  if (!existsSync(skillPath)) {
    fail(`${dirName}/SKILL.md missing`);
    continue;
  }
  const skill = readText(skillPath);

  // frontmatter
  const fm = parseFrontmatter(skill);
  if (!fm) {
    fail(`${dirName}/SKILL.md: no YAML frontmatter`);
  } else {
    if (fm.name !== dirName) fail(`${dirName}/SKILL.md: frontmatter name "${fm.name}" != folder "${dirName}"`);
    if (fm.version !== VERSION) fail(`${dirName}/SKILL.md: frontmatter version "${fm.version}" != VERSION ${VERSION}`);
    const desc = fm.description || '';
    if (!desc) fail(`${dirName}/SKILL.md: description missing`);
    for (const marker of ['Use when:', 'Chain:', 'NOT for:']) {
      if (!desc.includes(marker)) fail(`${dirName}/SKILL.md: description lacks "${marker}"`);
    }
    if (desc.length > 1024) fail(`${dirName}/SKILL.md: description is ${desc.length} characters (limit 1024)`);
    if (!fm['argument-hint']) fail(`${dirName}/SKILL.md: argument-hint missing`);
    if (!fm.priority) fail(`${dirName}/SKILL.md: priority missing`);
  }

  // line budget
  const lineCount = skill.split('\n').length;
  if (lineCount >= MAX_SKILL_LINES) fail(`${dirName}/SKILL.md: ${lineCount} lines (must be under ${MAX_SKILL_LINES})`);
  else ok(`${dirName}/SKILL.md ${lineCount} lines`);

  // references linked and resolving
  const refsDir = join(dir, 'references');
  const mentioned = new Set((skill.match(/references\/[A-Za-z0-9_./-]+\.md/g) || []));
  for (const ref of mentioned) {
    if (!existsSync(join(dir, ref))) fail(`${dirName}/SKILL.md: references ${ref} but it does not exist`);
  }
  if (existsSync(refsDir)) {
    for (const f of readdirSync(refsDir).filter((n) => n.endsWith('.md'))) {
      if (!skill.includes(f)) fail(`${dirName}/references/${f}: not linked from SKILL.md (orphan)`);
    }
  }

  // every relative markdown link resolves inside the skill folder; no ../
  const mdFiles = walk(dir).filter((p) => p.endsWith('.md'));
  for (const file of mdFiles) {
    const text = readText(file);
    if (/(^|[^./])\.\.\//m.test(text)) fail(`${rel(file)}: contains a ../ path; skills must be self-contained`);
    const linkRe = /\]\(([^)\s]+)\)/g;
    let m;
    while ((m = linkRe.exec(text)) !== null) {
      const target = m[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const clean = target.split('#')[0];
      if (!clean) continue;
      const resolved = resolve(dirname(file), clean);
      if (!existsSync(resolved)) fail(`${rel(file)}: link "${target}" does not resolve`);
      else if (relative(dir, resolved).startsWith('..')) fail(`${rel(file)}: link "${target}" leaves the skill folder`);
    }

    // backticked snake_case tokens must be known tools or fields
    const prose = stripFences(text);
    const spanRe = /`([^`\n]+)`/g;
    let s;
    while ((s = spanRe.exec(prose)) !== null) {
      const tokens = s[1].match(/\b[a-z]+(?:_[a-z]+)+\b/g) || [];
      for (const tok of tokens) {
        if (!TOOLS.has(tok) && !FIELDS.has(tok)) {
          fail(`${rel(file)}: backticked token "${tok}" is not a known MCP tool or allowlisted field`);
        }
      }
    }
  }

  // README mentions the skill
  if (readme && !readme.includes(dirName)) fail(`README.md does not mention ${dirName}`);

  // package.json files list includes the folder
  const pkg = manifests['package.json'];
  if (pkg && Array.isArray(pkg.files)) {
    const listed = pkg.files.some((f) => f.replace(/\/$/, '') === dirName);
    if (!listed) fail(`package.json files does not include ${dirName}/`);
  }
}

// marketplace lists every skill folder; every listed path exists
if (marketplacePlugin) {
  const entries = Array.isArray(marketplacePlugin.skills) ? marketplacePlugin.skills : [];
  const listedPaths = new Set(entries.map((s) => s.path));
  for (const entry of entries) {
    if (!entry.path || !existsSync(join(ROOT, entry.path, 'SKILL.md'))) {
      fail(`.claude-plugin/marketplace.json: skill path "${entry.path}" has no SKILL.md`);
    }
    if (entry.path !== `lavendly-${entry.name}`) {
      fail(`.claude-plugin/marketplace.json: skill "${entry.name}" path "${entry.path}" should be "lavendly-${entry.name}"`);
    }
    if (entry.invoke !== `/lavendly:${entry.name}`) {
      fail(`.claude-plugin/marketplace.json: skill "${entry.name}" invoke "${entry.invoke}" should be "/lavendly:${entry.name}"`);
    }
  }
  for (const dirName of skillDirs) {
    if (!listedPaths.has(dirName)) fail(`.claude-plugin/marketplace.json: skill folder ${dirName} is not listed`);
  }
  if (entries.length && failures.filter((f) => f.includes('marketplace.json')).length === 0) {
    ok(`.claude-plugin/marketplace.json lists ${entries.length} skills`);
  }
}

// ---------------------------------------------------------------------------
// Dash scan over every tracked text file
// ---------------------------------------------------------------------------

const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);
let dashClean = true;
for (const file of walk(ROOT)) {
  if (!isTextFile(file)) continue;
  const text = readText(file);
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (line.includes(EM)) { fail(`${rel(file)}:${i + 1}: em dash`); dashClean = false; }
    if (line.includes(EN)) { fail(`${rel(file)}:${i + 1}: en dash`); dashClean = false; }
  });
  if (file.endsWith('.md')) {
    // " -- " as a prose dash, outside fenced blocks and inline code
    const prose = stripInlineCode(stripFences(text));
    if (/ -- /.test(prose)) {
      const idx = lines.findIndex((l) => / -- /.test(l));
      fail(`${rel(file)}:${idx + 1}: " -- " used as a dash in prose`);
      dashClean = false;
    }
  }
}
if (dashClean) ok('no em dashes, en dashes or " -- " dashes');

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

for (const line of okLines) console.log(`ok: ${line}`);
if (failures.length) {
  console.error('');
  console.error(`${failures.length} failure${failures.length === 1 ? '' : 's'}:`);
  for (const f of failures) console.error(`FAIL: ${f}`);
  process.exit(1);
}
console.log(`\nall checks passed (${skillDirs.length} skills, version ${VERSION})`);
