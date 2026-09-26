# CLAUDE.md: Lavendly Skills

## What this is

Five agent skills that teach an AI coding agent how to make good films with
the Lavendly MCP (https://mcp.lavendly.ai/mcp). The MCP is the tool catalog.
A skill is the operating manual: call sequence, decision rules, stop
conditions, taste.

```
lavendly-storyteller   one shot, 5 to 12 s, voice + one music bed + captions
lavendly-multi-clip    2 to 6 shots, anchors pasted verbatim, one score
lavendly-cost-aware    priority high, wins every spend decision
lavendly-review        quality loop after generation, before render
lavendly-publish       posting and scheduling, only after an explicit yes
```

## Repository structure

```
skills/
  README.md                      public description, install, skills table
  INSTALL.md                     human install, four options
  INSTALL_FOR_AGENTS.md          agent runbook: install, connect MCP, verify
  CONTRIBUTING.md                PR checklist, branches, commits, validation
  COOKBOOK.md                    three end-to-end recipes
  CHANGELOG.md                   one entry per release
  CLAUDE.md                      this file
  VERSION                        the single repo-wide version
  LICENSE                        MIT
  package.json                   @lavendly/skills, bin -> bin/install.js
  bin/install.js                 zero-dependency installer
  scripts/validate.mjs           structural checks (CI runs this)
  .github/workflows/validate-skills.yml
  .claude-plugin/marketplace.json, plugin.json
  .cursor-plugin/plugin.json
  .codex-plugin/plugin.json
  evals/README.md, scenarios.md  dev-only
  lavendly-<name>/SKILL.md       one folder per skill
  lavendly-<name>/references/    mcp-calls.md, prompt-anchors.md, troubleshooting.md
```

## Style rules (violations fail review)

- No em dashes and no en dashes anywhere: not in prose, code comments, JSON or
  YAML. No ` -- ` used as a dash in prose. CLI flags such as `--json` inside
  backticks are fine. `scripts/validate.mjs` scans every tracked text file.
- No marketing tone. No exclamation marks, no emojis, no hype adjectives.
  Plain, concise, specific. Tables are welcome.
- Prompts the agent writes must avoid the banned words listed in each skill's
  `references/prompt-anchors.md` (cinematic, stunning, 8k and the rest).
  Replace them with concrete camera, light and material language.
- Constraints are stated positively ("locked-off camera", not "no shaky
  camera").
- Skills speak to the agent in the imperative and to the user in the user's
  language.

## The 300-line rule

Every `SKILL.md` stays under 300 lines. It is loaded on every turn the skill
triggers, so each line costs tokens and latency.

The test: if removing a section would not change what the agent does next,
it belongs in `references/`. If it would, it stays.

Stays in `SKILL.md`: frontmatter, the numbered sequence, decision rules, stop
conditions, UX rules that apply on every turn, one Compatibility note, short
pointers to references.

Moves to `references/`: exact JSON call shapes, anchor templates and camera
phrase lists, error strings and fixes, anything the agent reads once after
choosing a path.

## Self-contained skills

Each `lavendly-<name>/` folder installs on its own. No `../` references. Every
file in `references/` is linked from that skill's `SKILL.md`, and every link
in the folder resolves inside the folder. If two skills need the same table
(the banned words, the camera phrases), keep two copies. Drift between copies
is acceptable as long as each skill is internally consistent.

## Version sync

`VERSION` is the source of truth. It must equal:

- `version:` in every `lavendly-*/SKILL.md` frontmatter
- `plugins[0].version` in `.claude-plugin/marketplace.json`
- `version` in `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`,
  `.codex-plugin/plugin.json`
- `version` in `package.json`

Bump all of them in one commit on a `release/` branch. `scripts/validate.mjs`
fails on any drift.

## MCP truth

- Tool names and argument names in the skills must match the live catalog.
  Never invent a tool, an argument or a model id. When in doubt the agent
  calls `get_schema` or `get_status`; when in doubt the author reads the
  server's MCP tool definitions and the docs at
  https://docs.lavendly.ai/mcp/tools-reference.
- The validator checks every backticked snake_case token inside the skill
  folders against the tool list and a short field allowlist. Adding a new
  field to a skill means adding it to the allowlist in `scripts/validate.mjs`,
  with a comment saying where it comes from.
- `attach_track` requires a hosted `url` today. A platform change lets it
  synthesize from `text` (voiceover) or `mood` plus `duration` (music). Skills
  try the synthesis form first and fall back on the `url required` error.
  Keep that note in every skill that attaches audio, once per skill, under a
  heading named Compatibility.

## Adding a skill

1. Create `lavendly-<name>/SKILL.md` with frontmatter `name` (equal to the
   folder), `version` (equal to `VERSION`), `priority`, a `description` that
   contains the lines `Use when:`, `Chain:` and `NOT for:`, and
   `argument-hint`.
2. Write the body: one-sentence purpose, Sequence, Decision rules,
   Compatibility (if it attaches audio), When to stop, UX rules, Reference
   docs.
3. Add `references/mcp-calls.md` with the exact call shapes the skill uses.
   Add `references/troubleshooting.md` and `references/prompt-anchors.md`
   where they help.
4. Register the skill in `.claude-plugin/marketplace.json` (`skills` array,
   invoke `/lavendly:<name>`), the README skills table and quick reference,
   `INSTALL.md`, and `bin/install.js` needs nothing (it discovers folders).
5. Add at least one scenario to `evals/scenarios.md`, including one
   adversarial brief the skill must refuse or reshape.
6. Run `node scripts/validate.mjs` until it prints no failures.

## Eval discipline

Evals are manual for now: `evals/scenarios.md` holds the requests, expected
behaviour and a pass / partial / fail rubric. Run a round in a fresh agent
session after any change to a Sequence or a Decision rule. When three rounds
agree, record the choice below. Until then every default (voice, music volume,
subtitle style, thresholds) is conventional, not empirical.

> **Key decisions (do not revisit without data)**
>
> Empty. Each entry must be a defended choice: "X over Y because: result R on
> metric M across N runs, date D." Adding an entry here means the next
> contributor cannot revert it without showing other numbers.

## Related

- Lavendly MCP: https://docs.lavendly.ai/mcp/overview
- Agent Skills specification: https://agentskills.io/specification.md
