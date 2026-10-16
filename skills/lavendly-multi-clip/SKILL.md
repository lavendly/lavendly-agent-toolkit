---
name: lavendly-multi-clip
version: 0.2.0
priority: normal
description: |
  Produce a 2 to 6 shot sequence that reads as one film with the Lavendly MCP: write a character anchor and a palette anchor, show them, wait for go, paste them verbatim at the top of every shot prompt, attach one voiceover and one score for the whole film, estimate and get approval, generate, check every scene, render for free.
  Use when: "three shots of", "a sequence where", "the same character in", "scene one, scene two", "a 20 second video about", or any brief with two or more beats or longer than 12 seconds.
  Chain: lavendly-director when the directing matters; lavendly-storyteller covers one beat under 12 s; lavendly-review runs the per-scene quality loop after generation; lavendly-publish posts; lavendly-cost-aware, when loaded, wins every spend decision.
  NOT for: one-shot clips (lavendly-storyteller), films over 30 s unless the user insists (propose two workflows), talking-head dialogue films, or briefs that depend on media pasted into the chat (the user uploads it to the Asset Library first).
argument-hint: "[beats, 2 to 6] [seconds per shot] [voice] [language]"
---

# Lavendly Multi-clip

Several shots, one film. The character keeps her coat, the light stays in one
world, one score runs under everything, and the narration bridges the beats.
The trick is anchor discipline: two short blocks written once and pasted
without a changed word into every shot prompt.

## Before anything else

- `get_status` at session start; never claim or deny a capability from memory.
- `get_ledger`; keep the available credits in mind.
- Never invent a tool name or a model id. Check `get_schema` when in doubt.

## Anchors first

Before you create anything, write two blocks and show them to the user:

- Character anchor, 1 to 2 sentences: age, build, wardrobe colour and
  material, hair, distinguishing marks. One anchor per recurring character.
- Palette anchor, 1 sentence: lighting source, time of day, colour grade.

Then wait for "go". This is the cheap moment to redirect ("older", "less
blue"). Never rewrite an anchor per shot. If the user changes an anchor after
generation, every generated shot is stale and the change is a paid re-roll.
Say that before you do it.

Templates and examples: [references/prompt-anchors.md](references/prompt-anchors.md).

## Per-shot prompt

```text
<character anchor, verbatim>
<palette anchor, verbatim>
<one camera move, plain cinematography language>
<the beat-specific action, last>
```

Vary composition, action and framing between shots. Never vary the anchors.
One camera move per shot, constraints stated positively, no banned words.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Probes |
| 2 | write | Anchors, show them, wait for go |
| 3 | write | One prompt per beat on the template; one narration line per beat |
| 4 | `create_workflow` | `name`, `shots` in beat order (each `prompt`, `duration`), `project_name` when named, `idempotency_key` |
| 5 | read the record | Clip ids are the videoGenerator node ids, in order; `get_workflow` if unsure |
| 6 | `attach_track` voiceover | On the first clip, `text` is the whole script, `voice`, `idempotency_key` |
| 7 | `attach_track` music | On the first clip, one score: `mood` as an arc and `duration` equal to the film, `ducking: true`, volume 0.35 to 0.4, `idempotency_key` |
| 8 | `update_track` | Captions on the voiceover track: `subtitleStyle` |
| 9 | `set_clip_native_audio` | `{mode: "off"}` on every clip; `mix` at about 0.6 only on a clip with on-screen dialogue the user wants heard |
| 10 | `estimate_cost` | Announce in one line (scene count, model, credits, balance), get approval, refuse when `sufficient` is false |
| 11 | `generate_scene` | No `node_id`: every ungenerated scene; `idempotency_key` |
| 12 | `get_generation_status` | Poll silently; one line per phase change; name each scene as it lands |
| 13 | `quality_check` per scene | `node_id`, `expect_audio` only where the clip should carry sound; failing scene: one re-roll with `reroll_hint` appended (lavendly-review) |
| 14 | `get_scene_frame` per scene | Thumbnail links as a contact sheet, before rendering |
| 15 | `create_render` | Free; `idempotency_key`; poll `get_render` |
| 16 | deliver | Link, total duration, shot count, voice, one sentence per beat |

Exact JSON: [references/mcp-calls.md](references/mcp-calls.md).

## Decision rules

### Length and count

- 2 to 6 shots. Each shot 3 to 8 s, default 5. Total under 30 s unless the
  user asks for more; then propose two workflows and say why (attention and
  cost).
- Seven or more beats: group them into at most six shots and show the
  grouping before creating anything.
- A 60 s request: propose 6 shots of 5 s as one film, or two films. Do not
  build 12 shots silently.

### Narration

- Budget about 2.3 words per second per shot: a 5 s shot carries 10 to 12
  words, 10 s carries 20 to 24. Write one line per beat and let the visuals
  carry the rest.
- The lines must bridge: each one hands off to the next image. Present tense,
  concrete, no "in this video", no "imagine".
- Default voice `alloy`; choices alloy, echo, fable, onyx, nova, shimmer.

### Music

- One score for the whole film, attached once on the first clip. Never a
  different track per scene. Describe the arc in one prompt: opening, build,
  release. `ducking: true`, volume 0.35 to 0.4, instrumental.

### Native audio

- Off on every clip. The narrator and the score carry the film.
- A clip where a character speaks on screen and the user wants that heard:
  `mix` at about 0.6 on that clip only.

### Cost

- Announce before every paid call in one line. Generation is paid per clip.
  Render is free and reuses every generated clip.
- Estimate over 30 percent of available credits: ask first. `sufficient`
  false: stop and report. Max 2 render retries with the same key. Never mint
  a new key to retry.
- A failing scene is re-rolled once, alone, by `node_id`. Never regenerate
  the whole film for one bad shot.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the score from `mood`
plus `duration` on servers that carry the synthesis update. Try that form
first. If the server answers `url required`, ask the user to generate the
voice and the music in the Lavendly app (Asset Library) and attach the hosted
files by `url`, still one voiceover and one score on the first clip. Say it
once.

## When to stop

- The user has not said go on the anchors.
- `sufficient` is false, or the estimate is declined.
- `needs_browser`: tell the user to open the canvas, stop polling.
- `stalled` twice: report, re-check once, never duplicate a running job.
- The same scene fails twice: the prompt must change. Show the frame, ask.
- Media pasted into the chat: it never reaches you. Ask for an upload at
  https://lavendly.ai/AssetLibrary or a public URL, then `import_asset`.

## UX rules

1. No raw ids or JSON in chat. Name scenes by their beat ("the bridge").
2. Polling is silent. One line per phase change. Name each scene as it lands.
3. Reply in the user's language. Tool arguments stay in English.
4. One question at a time, only when a missing choice changes the result.
5. Never present a failing scene as done. The contact sheet shows every
   scene's status before the render.
6. Publishing needs an explicit yes and belongs to lavendly-publish.

## Taste

- One world. If the palette anchor says dawn, no shot is at night.
- Escalate framing across the film: wide to medium to close, or the reverse.
  Not the same size six times.
- The last shot resolves the first: return to a place, a face, an object.

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): call shapes for the whole sequence.
- [references/prompt-anchors.md](references/prompt-anchors.md): anchor templates, camera phrases, banned words, narration budget, a worked three-shot example.
- [references/troubleshooting.md](references/troubleshooting.md): error strings and fixes.
