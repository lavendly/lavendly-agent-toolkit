# Changelog

All notable changes to this repository are recorded here. The format follows
Keep a Changelog; versions follow Semantic Versioning. One repo-wide version
covers every skill and manifest (see `VERSION`).

## 0.2.0 (2026-10-14)

Added:

- `lavendly-director`: direct a 15 to 90 s film the way a director,
  cinematographer, lighting designer, sound designer and editor would. Hero
  lock (one reference wired into every scene, one description pasted into
  every prompt), arc and coverage, a still-frame prompt and a motion prompt
  per shot, light recipes by situation, scene recipes for fourteen kinds of
  film, the slop list designed out of prompts, three sound mixes, the cuts
  the render can make, scene-by-scene generation with a check before the next
  spend, repair in order. References: camera language, lighting, scene
  recipes, visual realism, editing and sound, quality control, exact MCP
  calls, troubleshooting.
- Validator allowlist: edit and generate fields the director uses.

Changed:

- `lavendly-storyteller` and `lavendly-multi-clip` hand off to
  `lavendly-director` when the look and the continuity matter more than speed.

## 0.1.0 (2026-09-26)

First public release.

Added:

- `lavendly-storyteller`: narrated short (5 to 12 s) from a one-line idea.
- `lavendly-multi-clip`: 2 to 6 shots with character and palette anchors, one score.
- `lavendly-cost-aware`: budget guardrails for attended and unattended runs.
- `lavendly-review`: the quality loop (quality check, one re-roll, contact sheet).
- `lavendly-publish`: channels, titles, captions, scheduling, confirmation wording.
- `references/` per skill: exact MCP call shapes, prompt anchors, troubleshooting.
- Plugin manifests for Claude Code, Cursor and Codex.
- `scripts/validate.mjs` and a GitHub Actions workflow that runs it.
- `bin/install.js`, the `npx -y @lavendly/skills install` entry point.
- `evals/scenarios.md` with 12 scenarios, five of them adversarial.
