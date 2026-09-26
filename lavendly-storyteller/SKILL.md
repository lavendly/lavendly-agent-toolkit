---
name: lavendly-storyteller
version: 0.1.0
priority: normal
description: |
  Produce a finished narrated short (5 to 12 seconds, one shot) from a one-line idea with the Lavendly MCP: probe status and credits, create one workflow, attach one voiceover and one music bed, estimate and get approval, generate, check quality, render for free, deliver the link.
  Use when: "make me a short video of", "a 5 second clip of", "narrate this", "quick reel", "turn this sentence into a video", or any brief with one moment and no more than one shot.
  Chain: hand off to lavendly-multi-clip when the brief has two or more beats or asks for more than 12 seconds; lavendly-review owns the quality loop after generation; lavendly-publish owns posting; lavendly-cost-aware, when loaded, wins every spend decision.
  NOT for: multi-shot sequences (lavendly-multi-clip), publishing or scheduling (lavendly-publish), editing an existing canvas node by node, or any brief that depends on media pasted into the chat (the user uploads it to the Asset Library first).
argument-hint: "[one-line idea] [duration 5..12] [voice] [language]"
---

# Lavendly Storyteller

Turn one line into a finished narrated short: one shot, one voice, one music
bed, captions, a free render, a link. About twelve tool calls on a good day.

## Before anything else

- Call `get_status` at session start. It reports which providers are ready and
  how voice is configured. Never claim or deny a capability from memory.
- Call `get_ledger` and keep the available credits in mind. Every later spend
  is measured against that number.
- Never invent a tool name or a model id. If the user names one you do not
  see, say so and call `get_schema`.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status` | Providers, voice config, capability flags |
| 2 | `get_ledger` | Available credits and pending reservations |
| 3 | write | The script (see Narration) and the shot prompt (see Prompt) |
| 4 | `create_workflow` | `name`, `shots: [{prompt, duration}]`, `project_name` when the user named one, `idempotency_key` |
| 5 | read the record | The clip id is the id of the scene's video node (type videoGenerator); call `get_workflow` if unsure |
| 6 | `attach_track` voiceover | `kind: "voiceover"`, `text`, `voice`, `idempotency_key` |
| 7 | `attach_track` music | `kind: "music"`, `mood` and `duration`, `ducking: true`, volume 0.35 to 0.4, `idempotency_key` |
| 8 | `update_track` | Captions on the voiceover track: `subtitleStyle` (see Audio) |
| 9 | `set_clip_native_audio` | `{mode: "off"}` unless the shot has on-screen dialogue |
| 10 | `estimate_cost` | Announce in one line, get approval, refuse when `sufficient` is false |
| 11 | `generate_scene` | `workflow_id` only (it is the one scene), `idempotency_key` |
| 12 | `get_generation_status` | Poll silently, report phase changes only |
| 13 | `quality_check` | `node_id` of the clip, `expect_audio: true`; on failure follow lavendly-review: one re-roll with `reroll_hint` appended |
| 14 | `get_scene_frame` | Give the user the thumbnail link before rendering |
| 15 | `create_render` | Free; `idempotency_key`; poll `get_render` until done or failed |
| 16 | deliver | The video link, duration, voice, one sentence on what it shows |

Exact JSON for every call: [references/mcp-calls.md](references/mcp-calls.md).

## Decision rules

### Duration

- Default 5 s. Honour 5 to 12 s. Above 12 s: propose a split into shots and
  switch to lavendly-multi-clip. Never stretch one shot past 12 s.

### Narration

- Budget about 2.3 words per second of clip: 5 s carries 10 to 12 words, 8 s
  carries 17 to 19, 10 s carries 20 to 24, 12 s carries 26 to 28.
- Present tense, concrete nouns, one image per sentence. Never "in this
  video", "imagine", "once upon a time", "in a world where", "welcome to".
- Default voice `alloy`. Choices: alloy, echo, fable, onyx, nova, shimmer.
  Change it only when the user asks or the register clearly needs it, and say
  which voice you used.

### Prompt

- One shot, one camera move in plain cinematography language, one subject,
  one light source. State constraints positively ("locked-off camera", not
  "no shaky camera").
- No banned words. The list and the replacements live in
  [references/prompt-anchors.md](references/prompt-anchors.md).
- Music and voice never go in the shot prompt. Ambient sound only, if any.

### Audio

- One music bed, `ducking: true`, volume 0.35 to 0.4, instrumental. Describe
  the arc in one prompt: opening, build, release.
- Native audio `off` for a narrated shot. Use `mix` at about 0.6 only when a
  character speaks on screen and the user wants that dialogue heard.
- Captions on by default: `subtitleStyle: "pop"` for vertical and social
  formats, `minimal` for 16:9, `off` when the user declines captions.

### Cost

- Announce before every paid call in one line: what, model or scene count,
  credits. Generation is paid. Render is free and never re-charges.
- When the estimate exceeds 30 percent of available credits, ask before
  generating. When `sufficient` is false, stop and say what is missing.
- Retry a render at most twice, always with the same `idempotency_key`.
  Never mint a new key to retry anything.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from `mood`
plus `duration` on servers that carry the synthesis update. Try that form
first. If the server answers `url required`, synthesis is not available there
yet: ask the user to generate the voice or music in the Lavendly app (Asset
Library), then attach the hosted file by `url` and continue. One sentence, no
second apology.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The brief needs more than one shot or more than 12 s: hand off, do not
  force it.
- `get_generation_status` reports `needs_browser`: tell the user to open the
  canvas and stop polling.
- `stalled` is true on two consecutive polls: report it, re-check once, and
  never start a second job for the same scene.
- The same failure twice in a row: the prompt or the parameters must change
  before any further spend. Ask.
- The user pasted media into the chat: it never reaches you. Ask them to
  upload it at https://lavendly.ai/AssetLibrary or give a public URL, then
  bring it in with `import_asset`.

## UX rules

1. No raw ids or JSON in chat. Names and links only.
2. Polling is silent. Report a phase change in one line, never every poll.
3. Reply in the user's language. Tool arguments stay in English.
4. One question at a time, and only when a missing choice changes the result.
   Otherwise take the default and say so.
5. Never present a clip that failed `quality_check` as done.
6. Publishing needs an explicit yes and belongs to lavendly-publish.

## Taste

- Register: quiet, specific, present tense. The picture carries; the voice
  adds what the eye cannot see.
- One idea per short. Cut adjectives before cutting nouns.
- End on an image, not on a moral.

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): call shapes and responses.
- [references/prompt-anchors.md](references/prompt-anchors.md): camera phrases,
  light and material vocabulary, banned words, narration budget.
- [references/troubleshooting.md](references/troubleshooting.md): error strings
  and what to do about each.
