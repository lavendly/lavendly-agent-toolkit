# CLAUDE.md: Lavendly Agent Toolkit

## What this is

A Claude Code, Cursor and Codex plugin: the Lavendly MCP connection plus
seventeen agent skills that teach an AI coding agent how to make good films with
the Lavendly MCP (https://mcp.lavendly.ai/mcp). The MCP is the tool catalog.
A skill is the operating manual: call sequence, decision rules, stop
conditions, taste.

```
lavendly-director      15 to 90 s, hero lock, camera, light, sound, the cut, repair
lavendly-storyteller   one shot, 5 to 12 s, voice + one music bed + captions
lavendly-multi-clip    2 to 6 shots, anchors pasted verbatim, one score
lavendly-cost-aware    priority high, wins every spend decision
lavendly-review        quality loop after generation, before render
lavendly-publish       posting and scheduling, only after an explicit yes
lavendly-models        model choice, prompt dialect per model family, credits
lavendly-characters    identity across shots and videos: sheets, references, chaining
lavendly-ads           product and brand ads, UGC-style, before and after, promos
lavendly-cinematic     short film, trailers, genres, dialogue, story structures
lavendly-music-video   the song as the spine, beat maths, one track
lavendly-animation     one locked animation style, creatures, kids fables, mascots
lavendly-motion-design CGI product, abstract, loops, ASMR, idents, metaphors
lavendly-explainer     explainers, how-tos, documentary, science, news within policy
lavendly-social        short-form formats, hooks, platform specs, clips from footage
lavendly-places        real estate, travel, food, fashion, sports, events, brand films
lavendly-series        series bible, episode formats, recurring cast, daily runs
```

Genre skills supply the field knowledge; lavendly-director stays the process
owner (intent card, sequence plan, ledger, three-level checks) and routes to
them. The research behind them is in the founder's vault
(Video-Skills-Research-2026-10-16).

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
  package.json                   @lavendly/agent-toolkit, bin -> bin/install.js
  bin/install.js                 zero-dependency installer
  scripts/validate.mjs           structural checks (CI runs this)
  .github/workflows/validate-skills.yml
  .claude-plugin/marketplace.json, plugin.json   Claude Code plugin + marketplace
  .cursor-plugin/plugin.json     Cursor plugin
  .codex-plugin/plugin.json      Codex plugin
  .agents/plugins/marketplace.json   Codex repo marketplace
  .mcp.json                      the Lavendly MCP server (Claude Code, Codex)
  mcp.json                       the same server, portable format (Cursor)
  evals/README.md, scenarios.md  dev-only
  templates/SKILL.md              the skeleton every new skill starts from
  skills/lavendly-<name>/SKILL.md      one folder per skill
  skills/lavendly-<name>/references/   mcp-calls.md, prompt-anchors.md, troubleshooting.md
  plugin.json                    portable Agent Plugins manifest ($schema, name)
  gemini-extension.json          Gemini CLI extension (the MCP; skills from skills/)
```

## Style rules (violations fail review)

- No em dashes and no en dashes anywhere: not in prose, code comments, JSON or
  YAML. No ` -- ` used as a dash in prose. CLI flags such as `--json` inside
  backticks are fine. `scripts/validate.mjs` scans every tracked text file.
- No marketing tone. No exclamation marks, no emojis, no hype adjectives.
  Plain, concise, specific. Tables are welcome.
- Examples are examples: label them, vary them across skills, and never reuse
  one character or setting as a default. State the rule or slot first, then
  the labelled example. A file that needs one running example introduces it as
  a worked example the user's own film replaces. `scripts/validate.mjs` fails
  when one example name appears in two skill folders.
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

Each `skills/lavendly-<name>/` folder installs on its own. No `../` references. Every
file in `references/` is linked from that skill's `SKILL.md`, and every link
in the folder resolves inside the folder. If two skills need the same table
(the banned words, the camera phrases), keep two copies. Drift between copies
is acceptable as long as each skill is internally consistent.

## Version sync

`VERSION` is the source of truth. It must equal:

- `version:` in every `skills/lavendly-*/SKILL.md` frontmatter
- `plugins[0].version` in `.claude-plugin/marketplace.json`
- `version` in `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`,
  `.codex-plugin/plugin.json`, `gemini-extension.json`
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
- `attach_track` synthesizes the voiceover from `text` and the music from
  `mood` plus `duration`, or attaches a hosted `url`. Skills try synthesis
  first and fall back to an Asset Library upload by `url` on a `url required`
  answer. Keep that note in every skill that attaches audio, once per skill,
  under a heading named Compatibility.
- Platform facts the skills rely on were read from the app's code on
  2026-10-16 (film-wide audio wiring, volume scales, frame urls, one-scene
  renders, reference caps, voices, limits). Re-check them when the server
  changes; the notes live in the founder's vault
  (Video-Skills-Research-2026-10-16/05-platform-answers.md).

## Adding a skill

1. Copy `templates/SKILL.md` to `skills/lavendly-<name>/SKILL.md` and fill the
   slots. Frontmatter: `name` (equal to the
   folder), `version` (equal to `VERSION`), `priority`, a `description` that
   contains the lines `Use when:`, `Chain:` and `NOT for:`, and
   `argument-hint`.
2. Write the body: one-sentence purpose, Before anything else (it keeps the
   examples line), Sequence, Decision rules, Compatibility (if it attaches
   audio), When to stop, UX rules, Reference docs. The validator checks the
   shared sections and the examples line.
3. Add `references/mcp-calls.md` with the exact call shapes the skill uses.
   Add `references/troubleshooting.md` and `references/prompt-anchors.md`
   where they help.
4. Add the skill to the README skills table (invoke `/lavendly:<folder>`)
   and quick reference, `INSTALL.md`, and the `files` list in
   `package.json`. Every host loads every folder in `skills/` and
   `bin/install.js` discovers folders, so neither needs an entry.
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
