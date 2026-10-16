# Changelog

All notable changes to this repository are recorded here. The format follows
Keep a Changelog; versions follow Semantic Versioning. One repo-wide version
covers every skill and manifest (see `VERSION`).

## Unreleased

Added:

- Eleven skills, from a three-part research round (the published video
  skills, Lavendly's platform read from code, and genre craft with each
  model's own prompting guidance):
  - craft: `lavendly-models` (model choice, each family's prompt dialect,
    exact lengths, aspects, reference caps, sound, credits) and
    `lavendly-characters` (identity across shots and videos: sheets,
    reference roles, exact counts, chaining limits, voice, acting);
  - genres: `lavendly-ads`, `lavendly-cinematic`, `lavendly-music-video`,
    `lavendly-animation`, `lavendly-motion-design`, `lavendly-explainer`,
    `lavendly-social`, `lavendly-places`, `lavendly-series`, each with one
    recipe per sub-genre (structures for 6 to 60 s, shot lists, camera,
    light and sound, model picks with credits, prompt pairs, failure modes,
    policy guards).
- Eval scenarios 24 to 56 for the new skills.

Changed:

- Every skill corrected against the platform as it runs: a score or
  narration covers the film only when wired to every clip; levels set at
  attach time, `update_track` volume as a percent; chained frame urls
  prefixed with `/api`; real voice names; `split_clip`
  relative to the clip; clips play back to back; references never on Veo
  3.1 Lite; import and listing limits; the idempotency window is 24 hours.
- `lavendly-director`: motion prompts describe the change plus a lock
  sentence and exact counts; each reference gets one job; routes to the
  genre skills.

- Antigravity: skills through `npx skills add ... --agent antigravity` or
  `install --host antigravity`, and its MCP config line. The installer
  takes `--host claude|codex|cursor|gemini|antigravity|antigravity-cli|amp`, writes to that
  agent's skills folder and prints its MCP setup line.
- `.github/workflows/publish.yml`: publishes `@lavendly/agent-toolkit` to
  npm on a `v<VERSION>` release with the `NPM_API_KEY` secret; a manual run
  is a dry run unless told otherwise.
- Skills moved to `skills/lavendly-<name>/`, the default location of the
  Agent Plugins standard, Cursor, Gemini CLI, Codex and Claude Code.
- A portable Agent Plugins manifest (`plugin.json`) and a Gemini CLI
  extension (`gemini-extension.json`). INSTALL.md covers Claude Code, Codex,
  Gemini CLI, Cursor, Agent Plugins hosts, and Amp, VS Code, Windsurf and
  OpenCode (skills plus one MCP line each).
- The repository is a plugin for Claude Code, Cursor and Codex: installing it
  connects the Lavendly MCP (`.mcp.json`, and `mcp.json` for Cursor; sign in
  on first use, no key to paste) and loads the six skills. A Codex repo
  marketplace (`.agents/plugins/marketplace.json`).
- Renamed to the Lavendly Agent Toolkit: repository
  `lavendly/lavendly-agent-toolkit`, npm package `@lavendly/agent-toolkit`
  (the old `@lavendly/skills` name on npm is the app repo's earlier
  three-skill package).

Fixed:

- `.claude-plugin/marketplace.json` listed skills in a shape Claude Code
  rejects (`plugins.0.skills: Invalid input`); the plugin manifests now load
  the skill folders from the root. Skills are invoked as
  `/lavendly:lavendly-<name>`.
- The Cursor and Codex manifests described five skills; they now list six.
- Four platform features are live and the skills use them: the cut check
  (`quality_check` with `previous_node_id`, `same_scene`, `present`; findings
  with why and fix) in the director's and review's level B checks; the
  stored scene plan (`set_scene_plan` after `create_workflow`,
  `get_scene_plan` in a later session) in the director and series
  sequences; measured loudness (every export normalized to -14 LUFS, true
  peak -1.5 dBTP, reported by `get_render` and the film's `quality_check`);
  rendered dissolves (every clip placed with `move_clip`, the later one
  overlapping the earlier, matching fades with `edit_clip`). Statements that
  dissolves are not rendered or loudness is not measured are removed; wipes
  are still not rendered.
- `attach_track` `scope` film is live and is the default for a film-wide
  score or narration: attach with `"scope": "film"`, confirm with
  `get_workflow_audio`, and add `update_workflow` edges only for a clip the
  attach missed (an older server, a clip split later).
- One-scene films: a single clip goes through the full stitch when it has a
  captioned voiceover (word timings and a `subtitleStyle` other than off) or
  any picture edit other than volume and mute, so captions burn and trims,
  fades, crop, speed and colour apply. A single clip with neither ships as
  the raw clip. The storyteller's one-shot narrated short burns captions
  again.

- `lavendly-director`: the intent card and continuity modes (strict,
  flexible, discontinuous) with priorities by video type, so ads, demos,
  tutorials, explainers, documentaries, music videos, social clips and
  animation are judged on their own terms (`references/video-types.md`).
  The sequence plan with what each shot takes from the previous one and
  hands to the next, dependencies, and the continuity ledger updated from
  landed frames (`references/sequence-plan.md`).
- `lavendly-review`: cut checks from the boundary frames of neighbouring
  scenes, audio setup checks from the audio summary, whole-video checks
  after render, all conditioned on the intent (`references/sequence-checks.md`).
- Findings with severity (Critical, High, Medium, Low), why it matters,
  fix type and confidence; repair smallest first (edit, audio, transition,
  then one re-roll); re-check the scene, its cuts and the whole video before
  calling anything fixed.
- Cast continuity: inside one scene (same place, same stretch of time) a
  person who appears is introduced and a person who leaves exits or is
  explained; a new scene starts fresh. In the plan, the ledger, the cut
  checks and the whole-video checks of both skills.
- Scene headings (place and time) in the plan: shots with one heading are
  one scene; a time jump in the same place gets its own heading.
- Two people talking: fixed sides of the frame, meeting eyelines, mirrored
  reverse shots, the speaker is the face in frame.
- `lavendly-director/references/series-continuity.md`: the series bible,
  recurring references reused across episodes, state carried between
  episodes, format beats, checks per episode.
- Fixes from a paper eval round (23 scenarios, 18 pass, 5 partial, 0 fail):
  director plans shots by length (4, 6, 8 s under headings) and offers a
  30 s version with the cost above 30 s; one locked light line per scene;
  a repeated camera move goes on the one shot it serves; the estimate line
  names opening image credits and says synthesis is charged when attached;
  `max_credits` defined per call; never claim a match with an unopened
  reference; model display names in chat; "Cinematic" removed from the
  style phrases. Review trims a same-size cut onto a line end or a motion
  before any re-roll, findings carry severity, and a re-render after a fix
  uses a new key. Storyteller checks a narrated clip with `expect_audio`
  false and waits at the frame before rendering. Cost-aware lists the
  current `create_workflow` schema and the synthesis charge. Series episodes
  find their project with `list_projects`.
- Rubric fixes: scenarios 3, 13 and 17 match the skills; the setup-only
  scenarios carry a user request.
- Nine eval scenarios (15 to 23): planted errors, deliberate choices that
  must not be flagged, an audio setup error, and an adversarial
  "regenerate everything".

Changed:

- `lavendly-director` quality control is organised in three levels (asset,
  cut, whole video) instead of by category; the hook and payoff rule now
  depends on the video type.
- `lavendly-review` no longer stops at per-scene checks and may apply free
  audio fixes with `update_track`.

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
