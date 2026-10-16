---
name: lavendly-review
version: 0.2.0
priority: normal
description: |
  The quality loop between generation and delivery on the Lavendly MCP, judged against the intent: quality_check every scene, check every cut between neighbours from their boundary frames, check the audio setup, rank findings by severity, repair with the smallest fix (edit, audio, transition, then one re-roll), re-check what the repair touched, show a contact sheet, check the rendered video whole. Never call a failing clip or an unchecked fix done.
  Use when: "check the quality", "does this look right", "review the scenes before rendering", "why does she look different in shot two", "the clips do not fit together", after any generate_scene call, and before any create_render or publish call.
  Chain: runs after lavendly-storyteller or lavendly-multi-clip have generated scenes; lavendly-publish only accepts a film that passed this loop; lavendly-cost-aware decides whether a paid re-roll may happen.
  NOT for: writing the original prompts (domain skills), redesigning the video, or approving it on the user's behalf.
argument-hint: "[workflow name] [strict|fast]"
---

# Lavendly Review

Generation is paid and imperfect. Render is free and permanent-looking. This
skill sits between the two: check every scene, every cut and the whole
video against what the video is for, fix the smallest thing that works,
show the human what they are about to render, and never call a failing
clip done. A clip can pass on its own and still break the video next to its
neighbour; this skill catches that too.

## Before anything else

- The film exists and at least one scene is generated. Confirm with
  `get_generation_status` (phase `done` or scenes landed) before checking.
- `get_status` was called this session. Never claim or deny a capability
  from memory; the vision rubric may be unavailable on some servers.
- Know the intent: the intent card from the plan that made the video, or
  the type and continuity mode inferred from the brief and stated in one
  line. Every check is judged against it
  ([references/sequence-checks.md](references/sequence-checks.md)).

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
| 10 | `get_scene_frame` per cut | Last frame of each scene and first frame of the next; compare against each other and the intent (cut checks) |
| 11 | `get_workflow_audio` | Ducking, one score, voice overlaps, narration length (audio checks) |
| 12 | findings | Rank by severity; apply free fixes (edit, audio, transition); re-roll only per steps 4 to 8; re-check the scene and both its cuts |
| 13 | contact sheet | One table: beat, duration, score, status, open findings, link. Wait for the user's look |
| 14 | `create_render` | Only when no Critical or High finding is open, or the user accepted one knowingly; free; `idempotency_key`; poll `get_render` |
| 15 | `quality_check` on the film | No `node_id`, `expect_audio: true`; then the whole-video checks; report the score, open findings and the link |

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

### Cuts, audio and the whole video

- The server checks each scene against its own prompt only. The cut checks
  and the whole-video checks are yours: open the frames, compare, judge
  against the intent and the continuity mode. The lists are in
  [references/sequence-checks.md](references/sequence-checks.md).
- Strict continuity checks every hand-off; flexible checks identity, light
  and readable place inside a scene; discontinuous checks motifs and
  rhythm. Do not flag a deliberate choice as an error; do flag a choice the
  viewer cannot follow.
- Audio: only what the audio summary shows can be verified. Perceived
  loudness is not measured by any tool; when a join sounds doubtful, say so
  and ask the user to listen.

### Findings

- One row per finding: where (scene beat or cut), the issue, why it matters
  for this video, the fix, the fix type (edit, audio, transition, re-roll),
  confidence (high when a tool reported it or both frames show it, medium
  on one mid frame, low without a frame).
- Severity: Critical (fails its purpose, essential information missing,
  technical failure), High (damages comprehension or quality), Medium
  (noticeably weaker), Low (polish). Show Low only when nothing ranks above.
- Smallest fix first: trim, split, reorder or speed with `edit_clip`,
  `split_clip`, `move_clip`; audio with `update_track` and
  `set_clip_native_audio`; a dip to black with fades; a re-roll last.
- After any fix, re-check the scene, both of its cuts, and after the next
  render the whole video. Until then it is "applied, not yet checked".

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
Scene            Duration  Score  Status            Open findings              Frame
1 Market         5 s       8.4    passed                                       <link>
2 Bridge         5 s       6.1    passed (re-roll)  Medium: same size as 1     <link>
3 Station        6 s       4.9    FAILED twice      High: her coat changes     <link>
```

A film with a FAILED row or an open Critical or High finding is not
rendered unless the user says, in so many words, that they accept it.
Record that in the delivery line.

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

- [references/sequence-checks.md](references/sequence-checks.md): intent and continuity modes, cut checks, whole-video checks, audio checks, severity, findings, repair order.
- [references/mcp-calls.md](references/mcp-calls.md): check, re-roll, frame, render and final-check shapes.
- [references/prompt-anchors.md](references/prompt-anchors.md): failure classes, re-roll prompt wording, banned words that must not enter a re-roll.
- [references/troubleshooting.md](references/troubleshooting.md): error strings and what to do.
