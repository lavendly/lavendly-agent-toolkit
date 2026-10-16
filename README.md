# Lavendly Agent Toolkit

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](./VERSION)
[![Skills](https://img.shields.io/badge/skills-6-7c3aed.svg)](#skills)

A plugin for Claude Code, Cursor and Codex that makes your agent good at
[Lavendly](https://lavendly.ai), the node-based AI video platform. One install
gives the agent two things:

- **The Lavendly MCP**, connected to `https://mcp.lavendly.ai/mcp`. You sign in
  with your Lavendly account the first time a tool is used; no key to paste.
- **Six skills**, short markdown operating manuals the agent reads next to the
  tools: direct a 15 to 90 s video, a narrated short from one line, a
  consistent multi-shot sequence, budget guardrails, the quality loop, and
  publishing. Each is one folder with a `SKILL.md` and a `references/`
  directory, following the
  [Agent Skills specification](https://agentskills.io/specification.md).

The MCP tells the agent what tools exist. The skills tell it how to make a
good video with them, cheaply, on the first try.

## Install

One install gives the skills and the MCP on hosts with plugins:

| Host | Install |
|---|---|
| Claude Code | `/plugin marketplace add lavendly/lavendly-agent-toolkit`, then `/plugin install lavendly@lavendly`, then `/mcp` to sign in |
| Codex | `codex plugin marketplace add lavendly/lavendly-agent-toolkit`, then `codex plugin add lavendly@lavendly` |
| Gemini CLI | `gemini extensions install https://github.com/lavendly/lavendly-agent-toolkit`, then `/mcp auth lavendly` |
| Cursor | **Customize**, add this repository as a plugin, install |
| Any Agent Plugins host | reads `plugin.json`, `skills/` and `mcp.json` from this repository |

Antigravity, Amp, VS Code with Copilot, Windsurf, OpenCode and other agents
take the skills and the MCP separately:

```bash
npx skills add lavendly/lavendly-agent-toolkit
```

then add the remote MCP server `https://mcp.lavendly.ai/mcp` in that host
(one line per host in [INSTALL.md](./INSTALL.md#other-hosts-skills-then-the-mcp)).
Unattended runs use an API key instead of the sign-in, also in INSTALL.md.
Agent-driven install (paste into your agent):
[INSTALL_FOR_AGENTS.md](./INSTALL_FOR_AGENTS.md).

## Skills

| Skill | Invoke | Description |
|---|---|---|
| [`lavendly-director`](./skills/lavendly-director) | `/lavendly:lavendly-director` | Direct a 15 to 90 s video of any format: intent and continuity mode, hero lock (the same product or character in every scene), a sequence plan where each shot hands off to the next, a still-frame prompt and a motion prompt per shot in camera and light language, sound design, the cut, repair of only what failed |
| [`lavendly-storyteller`](./skills/lavendly-storyteller) | `/lavendly:lavendly-storyteller` | A finished narrated short (5 to 12 s, one shot) from a one-line idea: voice, one music bed, captions, free render. |
| [`lavendly-multi-clip`](./skills/lavendly-multi-clip) | `/lavendly:lavendly-multi-clip` | 2 to 6 shots that read as one film: character and palette anchors pasted verbatim into every shot, one score, narration that bridges the beats. |
| [`lavendly-cost-aware`](./skills/lavendly-cost-aware) | `/lavendly:lavendly-cost-aware` | Budget guardrails, priority high. Estimate before any spend, cheapest model that meets the brief, strict retry discipline, one-line reports. Load it for unattended runs. |
| [`lavendly-review`](./skills/lavendly-review) | `/lavendly:lavendly-review` | The quality loop, judged against the video's intent: check every scene, every cut and the whole video, rank findings by severity, repair smallest first, re-check, summarize before the render. |
| [`lavendly-publish`](./skills/lavendly-publish) | `/lavendly:lavendly-publish` | Channels, titles, captions, AI disclosure, scheduling in the user's timezone, and the confirmation that must come before anything posts. |

The skills compose. `cost-aware` sits above the others and wins every spend
decision. `storyteller` and `multi-clip` hand their generated scenes to
`review`, and `review` hands a rendered film to `publish`.

## Quick reference

| What you want | Skill | Note |
|---|---|---|
| A short clip from one sentence | `lavendly-storyteller` | Defaults to 5 s, caps at 12 s, then proposes a split |
| Several moments that must look like one film | `lavendly-multi-clip` | Anchors shown to you before any credit is spent |
| A product ad where the product must stay the same in every scene | `lavendly-director` | Imports the hero image, wires it into every scene, locks its description in every prompt, checks scene 1 before paying for scene 2 |
| \"It looks like AI\", \"direct this properly\", \"which angle for scene two\" | `lavendly-director` | Camera, light and sound chosen for a stated reason; the slop list designed out of the prompts |
| A 60 s video | `lavendly-multi-clip` | The agent proposes splitting; 30 s total unless you insist |
| A cron job or an agent running unattended | `lavendly-cost-aware` plus a domain skill | Refuses when credits are short, asks above 30 percent of balance |
| To know what a clip looks like before rendering | `lavendly-review` | Scene, cut and whole-video checks, smallest fix first, thumbnail links, contact sheet |
| To post to YouTube, TikTok, Instagram or X | `lavendly-publish` | Confirms channel, title and time first; AI disclosure is automatic |
| To use your own photo, footage or song | any | Upload it at https://lavendly.ai/AssetLibrary or give a public URL; chat attachments never reach the agent |
| Voice or music generated by the agent | `lavendly-storyteller`, `lavendly-multi-clip` | Tries synthesis first, falls back to a hosted file from the Asset Library |

## How skills compose with the MCP

The skill is prompt-side: it lives in your agent's skill loader and shapes the
call sequence, the decisions and the taste. The MCP is action-side: it exposes
the Lavendly tools and moves bits. A skill can constrain which tools to call
and how, but it can never add a tool, remove one, or replace `get_status` as
the source of truth for what works right now. Full tool list and install
guides: https://docs.lavendly.ai/mcp/overview

## Connect the MCP by hand

The plugin installs register the MCP for you. Without a plugin, add the
remote server `https://mcp.lavendly.ai/mcp` and sign in when the host asks:

```bash
claude mcp add --transport http lavendly https://mcp.lavendly.ai/mcp
```

Every other host, and the API key form for unattended runs, are in
[INSTALL.md](./INSTALL.md). Verify by asking the agent to call `get_status`:
it reports provider readiness and the voice configuration without spending
credits.

## Repository

| Path | Purpose |
|---|---|
| `skills/lavendly-*/` | One folder per skill: `SKILL.md` plus `references/` |
| `plugin.json`, `mcp.json` | Portable Agent Plugins manifest and MCP config (Cursor and other Agent Plugins hosts) |
| `.claude-plugin/`, `.mcp.json` | Claude Code plugin, marketplace and MCP config |
| `.codex-plugin/`, `.agents/plugins/` | Codex plugin and marketplace (MCP from `.mcp.json`) |
| `.cursor-plugin/` | Cursor plugin |
| `gemini-extension.json` | Gemini CLI extension (MCP; skills from `skills/`) |
| `evals/` | Scenarios and rubric, dev-only |
| `scripts/validate.mjs` | Structural checks, run by CI and before every PR |
| `bin/install.js` | The `@lavendly/agent-toolkit` skills installer |

See [CONTRIBUTING.md](./CONTRIBUTING.md) to add or change a skill and
[COOKBOOK.md](./COOKBOOK.md) for end-to-end recipes.

## License

MIT, see [LICENSE](./LICENSE).
