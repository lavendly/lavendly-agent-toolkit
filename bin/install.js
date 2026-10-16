#!/usr/bin/env node
'use strict';
// @lavendly/agent-toolkit installer. Node 18 or newer, no dependencies.
//
//   lavendly-agent-toolkit install [skill...]     copy skill folders into ~/.claude/skills/
//   lavendly-agent-toolkit install --host <name>  copy into that agent's skills folder
//   lavendly-agent-toolkit install --dir <path>   copy into another directory
//   lavendly-agent-toolkit --list                 list the skills in this package
//
// Skills are named by folder (lavendly-storyteller) or by short name
// (storyteller). With no names, every skill is installed. An existing copy of
// the same skill is replaced, so re-running is the update path.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const PKG_ROOT = path.resolve(__dirname, '..');
const SKILLS_ROOT = path.join(PKG_ROOT, 'skills');
const DEFAULT_TARGET = path.join(os.homedir(), '.claude', 'skills');
const PREFIX = 'lavendly-';
const MCP_URL = 'https://mcp.lavendly.ai/mcp';

// Where each agent reads user-level skills, and how it adds the Lavendly MCP.
// Hosts with plugins (Claude Code, Codex, Gemini CLI, Cursor) can also
// install the whole toolkit in one step; see INSTALL.md.
const HOSTS = {
  claude: { dir: ['.claude', 'skills'], mcp: `claude mcp add --transport http lavendly ${MCP_URL}` },
  codex: { dir: ['.codex', 'skills'], mcp: `codex mcp add lavendly --url ${MCP_URL}` },
  cursor: { dir: ['.cursor', 'skills'], mcp: `~/.cursor/mcp.json: { "mcpServers": { "lavendly": { "url": "${MCP_URL}" } } }` },
  gemini: { dir: ['.gemini', 'skills'], mcp: `gemini mcp add --scope user --transport http lavendly ${MCP_URL}` },
  antigravity: { dir: ['.gemini', 'config', 'skills'], mcp: `Antigravity > Manage MCP Servers > View raw config: { "mcpServers": { "lavendly": { "serverUrl": "${MCP_URL}" } } }` },
  amp: { dir: ['.config', 'agents', 'skills'], mcp: `amp mcp add lavendly ${MCP_URL}` },
};

function readVersion() {
  try {
    return fs.readFileSync(path.join(PKG_ROOT, 'VERSION'), 'utf8').trim();
  } catch (_) {
    return 'unknown';
  }
}

function listSkills() {
  return fs
    .readdirSync(SKILLS_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith(PREFIX))
    .filter((d) => fs.existsSync(path.join(SKILLS_ROOT, d.name, 'SKILL.md')))
    .map((d) => d.name)
    .sort();
}

// First sentence of the frontmatter description, for --list.
function summary(skillDir) {
  try {
    const text = fs.readFileSync(path.join(SKILLS_ROOT, skillDir, 'SKILL.md'), 'utf8');
    const end = text.indexOf('\n---\n', 4);
    const fm = end === -1 ? '' : text.slice(4, end);
    const lines = fm.split('\n');
    const at = lines.findIndex((l) => /^description:/.test(l));
    if (at === -1) return '';
    const inline = lines[at].replace(/^description:\s*/, '').replace(/^[|>]-?$/, '').trim();
    const first = inline || (lines[at + 1] || '').trim();
    const sentence = first.split(/(?<=\.)\s/)[0] || first;
    return sentence.length > 110 ? sentence.slice(0, 107).trimEnd() + '...' : sentence;
  } catch (_) {
    return '';
  }
}

function usage() {
  const v = readVersion();
  console.log(`@lavendly/agent-toolkit ${v}

Usage:
  lavendly-agent-toolkit install [skill...] [--host <name> | --dir <path>]
  lavendly-agent-toolkit --list
  lavendly-agent-toolkit --help

Examples:
  npx -y @lavendly/agent-toolkit install
  npx -y @lavendly/agent-toolkit install storyteller cost-aware
  npx -y @lavendly/agent-toolkit install --host antigravity
  npx -y @lavendly/agent-toolkit install --dir ./.agents/skills

Hosts: ${Object.keys(HOSTS).join(', ')}
Default target: ${DEFAULT_TARGET}
Skill names accept the short form (storyteller) or the folder (lavendly-storyteller).`);
}

function normalize(name) {
  const bare = name.trim().replace(/\/+$/, '');
  return bare.startsWith(PREFIX) ? bare : PREFIX + bare;
}

function displayPath(p) {
  const home = os.homedir();
  return p.startsWith(home) ? '~' + p.slice(home.length) : p;
}

function main(argv) {
  const args = argv.slice(2);
  const available = listSkills();

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    usage();
    return 0;
  }
  if (args.includes('--version') || args.includes('-v')) {
    console.log(readVersion());
    return 0;
  }
  if (args.includes('--list') || args[0] === 'list') {
    console.log(`Skills in @lavendly/agent-toolkit ${readVersion()}:`);
    for (const s of available) {
      const line = summary(s);
      console.log(`  ${s}${line ? '  ' + line : ''}`);
    }
    return 0;
  }

  let target = DEFAULT_TARGET;
  let host = 'claude';
  const names = [];
  let command = null;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--dir') {
      const next = args[i + 1];
      if (!next) {
        console.error('error: --dir needs a path');
        return 1;
      }
      target = path.resolve(next);
      i += 1;
    } else if (a.startsWith('--dir=')) {
      target = path.resolve(a.slice('--dir='.length));
    } else if (a === '--host' || a.startsWith('--host=')) {
      const value = a === '--host' ? args[(i += 1)] : a.slice('--host='.length);
      if (!HOSTS[value]) {
        console.error(`error: unknown host "${value || ''}"; one of ${Object.keys(HOSTS).join(', ')}`);
        return 1;
      }
      host = value;
      target = path.join(os.homedir(), ...HOSTS[value].dir);
    } else if (a.startsWith('-')) {
      console.error(`error: unknown flag ${a}`);
      usage();
      return 1;
    } else if (command === null) {
      command = a;
    } else {
      names.push(a);
    }
  }

  if (command !== 'install') {
    console.error(`error: unknown command "${command || ''}"`);
    usage();
    return 1;
  }

  const wanted = names.length ? names.map(normalize) : available;
  const unknown = wanted.filter((w) => !available.includes(w));
  if (unknown.length) {
    console.error(`error: unknown skill${unknown.length === 1 ? '' : 's'}: ${unknown.join(', ')}`);
    console.error(`available: ${available.map((s) => s.slice(PREFIX.length)).join(', ')}`);
    return 1;
  }

  fs.mkdirSync(target, { recursive: true });
  let installed = 0;
  let updated = 0;
  for (const skill of wanted) {
    const src = path.join(SKILLS_ROOT, skill);
    const dest = path.join(target, skill);
    const existed = fs.existsSync(dest);
    if (existed) fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(src, dest, { recursive: true });
    if (existed) updated += 1;
    else installed += 1;
    console.log(`${existed ? 'updated  ' : 'installed'} ${skill}  ->  ${displayPath(dest)}`);
  }
  console.log(`\n${installed} installed, ${updated} updated, in ${displayPath(target)}`);
  console.log(`\nNext, connect the Lavendly MCP (sign in when the agent asks):\n  ${HOSTS[host].mcp}`);
  console.log('Then ask your agent to call get_status. Other hosts: https://docs.lavendly.ai/mcp/overview');
  return 0;
}

process.exitCode = main(process.argv);
