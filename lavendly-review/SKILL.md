---
name: lavendly-review
version: 0.2.0
priority: normal
description: |
  The quality loop between generation and render on the Lavendly MCP: quality_check every scene, read the failures, re-roll a failing scene once with the server's reroll_hint appended to its prompt, show the human a frame of each scene, summarize the film as a contact sheet, check the rendered film once more. Never present a failing clip as done.
  Use when: "check the quality", "does this look right", "review the scenes before rendering", "why does she look different in shot two", after any generate_scene call, and before any create_render or publish call.
  Chain: runs after lavendly-storyteller or lavendly-multi-clip have generated scenes; lavendly-publish only accepts a film that passed this loop; lavendly-cost-aware decides whether a paid re-roll may happen.
  NOT for: writing the original prompts (domain skills), fixing the mix (use update_track directly), or approving the film on the user's behalf.
argument-hint: "[workflow name] [strict|fast]"
---

# Lavendly Review

Generation is paid and imperfect. Render is free and permanent-looking. This
skill sits between the two: check every scene, fix at most one thing per
scene, show the human what they are about to render, and never call a
failing clip done.

## Before anything else

- The film exists and at least one scene is generated. Confirm with
  `get_generation_status` (phase `done` or scenes landed) before checking.
- `get_status` was called this session. Never claim or deny a capability
  from memory; the vision rubric may be unavailable on some servers.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_workflow` | Collect the scene nodes (type videoGenerator) in order, with their prompts |
| 2 | `quality_check` per scene | `node_id`; `expect_audio: true` only where the clip should carry sound; `skip_vlm: true` only in fast mode |
| 3 | read | `pass`, `score` 0 to 10, `failures`, `reroll_hint` |
| 4 | announce | For a failing scene: "Scene <beat> failed: <failures>. One re-roll costs <credits>. Go ahead?" (lavendly-cost-aware rules apply) |
| 5 | `update_workflow` | Append `reroll_hint` to that scene's video node prompt (and its image node prompt when the failure is in the still); write the full `nodes` array back |
| 6 | `generate_scene` | `node_id` of that scene only, its own `idempotency_key` |
| 7 | `get_generation_status` | Poll silently until the scene lands |
| 8 | `quality_check` again | Same scene. Passed: continue. Failed again: stop re-rolling; ask |
| 9 | `get_scene_frame` per scene | One thumbnail link per scene |
| 10 | contact sheet | One table: beat, duration, score, status, link. Wait for the user's look |
| 11 | `create_render` | Only when every scene passed or the user accepted a flagged one knowingly; free; `idempotency_key`; poll `get_render` |
| 12 | `quality_check` on the film | No `node_id`, `expect_audio: true`; report the score with the link |

Exact JSON: [references/mcp-calls.md](references/mcp-calls.md).

## Decision rules

### What to check

- Every generated scene, once, before render. Skipping a scene because it
  "looked fine in the thumbnail" is not a check.
- `expect_audio: true` on a clip whose native audio is `native` or `mix`, or
  on the final film when a voiceover or music track is attached. False on a
  narrated clip with native audio off; the tracks are mixed at render time.
- `skip_vlm: true` only when the user asked for a fast structural pass or the
  server has no vision provider. Say which mode ran.

### Reading a failure

| Failure names | It usually means | The re-roll fixes it when |
|---|---|---|
| identity drift, different face, wardrobe change | anchors missing or contradicted | the exact anchor text is restored and the hint is appended |
| melting hands, waxy skin, extra limbs | model artifact | the hint adds a constraint; a second failure means step up a model |
| wrong duration, missing stream | structural | the scene is regenerated as is; a second failure is a platform issue to report |
| palette shift, wrong time of day | palette anchor missing or a new light source in the action | the action line is corrected |
| identity or style mismatch to the reference | the reference image is not the conditioning | check the image node and the edge, then re-roll |

Full table with re-roll prompt wording:
[references/prompt-anchors.md](references/prompt-anchors.md).

### Re-roll discipline

- One re-roll per scene, alone, by `node_id`. Never regenerate the film for
  one bad shot.
- Append `reroll_hint` verbatim after the existing prompt. Do not rewrite the
  anchors. Do not add banned words to "make it better".
- A re-roll is paid generation: announce credits first; lavendly-cost-aware
  wins if loaded.
- Second failure on the same scene: stop. Show the frame, quote the failures
  in plain words, ask how to change the beat or whether to accept it.
- Two identical failures mean the prompt or parameters must change. A third
  identical attempt is not allowed.

### Contact sheet

Before the render, one table for the whole film:

```text
Scene            Duration  Score  Status            Frame
1 Market         5 s       8.4    passed            <link>
2 Bridge         5 s       6.1    passed (re-roll)  <link>
3 Station        6 s       4.9    FAILED twice      <link>
```

A film with a FAILED row is not rendered unless the user says, in so many
words, that they accept that scene. Record that in the delivery line.

### Free and paid

- `quality_check` and `get_scene_frame` are review calls; they are not clip
  generation. `skip_vlm` avoids the vision model call when speed matters.
- `create_render` is free and reuses every generated clip.
- `generate_scene` for a re-roll is paid.

## When to stop

- A scene fails twice.
- `needs_browser`: tell the user to open the canvas, stop polling.
- `stalled` twice on a re-roll: report, do not restart.
- The user has not looked at the contact sheet and asked to publish anyway:
  show the sheet first, then hand to lavendly-publish.
- `insufficient_credits` on a re-roll: report, offer to render with the
  scene flagged or to stop.

## UX rules

1. No raw ids or JSON in chat. Name scenes by their beat.
2. Quote `failures` in plain words, one line per scene. Do not paste the
   rubric.
3. Polling is silent. One line per phase change.
4. Reply in the user's language. Tool arguments stay in English.
5. Never present a failing clip as done, in the contact sheet or in the
   delivery line.
6. One question at a time: "re-roll scene 3 for 12 credits?" not a menu.

## Taste

- A score of 7 or above with `pass: true` needs no comment. Do not
  editorialize about good scenes.
- When a scene is borderline (pass, score under 6), say so in one line and
  let the user decide; do not spend on it unasked.
- The thumbnail is for the human. Describe what they will see in five words,
  then the link.

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): check, re-roll, frame, render and final-check shapes.
- [references/prompt-anchors.md](references/prompt-anchors.md): failure classes, re-roll prompt wording, banned words that must not enter a re-roll.
- [references/troubleshooting.md](references/troubleshooting.md): error strings and what to do.
