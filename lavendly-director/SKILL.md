---
name: lavendly-director
version: 0.2.0
priority: normal
description: |
  Direct a 15 to 90 s film on the Lavendly MCP as a director, cinematographer, lighting designer, sound designer and editor: lock the hero (product or character), design arc and coverage, write a still-frame prompt and a motion prompt per shot in concrete camera and light language, keep identity and light continuous, plan the sound, cut, review, repair only what failed.
  Use when: "a video ad for my lamp", "direct this", "same product in every scene", "a real commercial", "scenes that feel like one film", "it looks like AI", "which angle for scene two", or any brief where look and continuity matter more than speed.
  Chain: lavendly-multi-clip is the fast path for pasted anchors and no hero asset; lavendly-storyteller covers one shot under 12 s; lavendly-review owns the quality loop; lavendly-publish posts; lavendly-cost-aware wins every spend decision.
  NOT for: one-shot clips, posting, films over 90 s (propose two), talking-head interviews, or media pasted into the chat (Asset Library first).
argument-hint: "[brief] [hero asset url or 'generate the hero'] [duration 15..90] [aspect] [voice or 'native sound']"
---

# Lavendly Director

A film is not a stack of attractive clips. It is a hero that stays itself in
every shot, light that stays in one world, a camera that moves for a reason,
sound designed for the whole piece, and a cut that lands a payoff. This skill
gives the agent that judgment and the exact calls that carry it into Lavendly.

## Before anything else

- `get_status` once per session; never claim or deny a capability from memory.
- `get_ledger`; every spend is measured against the available credits.
- Never invent a tool, an argument or a model id. `get_schema` when in doubt.
- Read the brief for: goal, audience, platform, aspect, duration, the hero
  (product or character), the feeling, assets the user already has. Ask one
  question only when a missing answer changes the film. Otherwise decide and
  say what you assumed in one line.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, credits |
| 2 | write | Creative direction: premise, feeling, visual rules, the hero's locked description (see Hero lock) |
| 3 | write | Arc and coverage: 3 to 6 scenes with a purpose each, a hook in scene 1, a payoff at the end, shot sizes that change between neighbours |
| 4 | write | Per shot: a still-frame prompt (the opening) and a motion prompt (the clip), in the structure from [references/prompt-anchors.md](references/prompt-anchors.md) |
| 5 | show | The direction, the shot list and the hero description to the user; wait for "go" |
| 6 | `import_asset` | The hero image and any style plate the user supplied (public URL or Asset Library); returns the hosted url |
| 7 | `create_workflow` | `shots: [{prompt, duration}]` in order, `aspect`, `videoModel`, `project_name` when named, `idempotency_key` |
| 8 | `get_workflow` | Collect, per scene in order: the group, the image node (`img_` prefix) and the clip node (`vid_` prefix) |
| 9 | `update_workflow` | Set each image node's `prompt` to the still-frame prompt; add one reference node for the hero and wire it into every clip and every image node (see [references/mcp-calls.md](references/mcp-calls.md)) |
| 10 | `set_clip_native_audio` | Per clip: `native` for scenes with on-screen sound or dialogue, `mix` under narration, `off` for a music edit |
| 11 | `attach_track` | Narration on the first clip, one voice for the film; one music score on the first clip with `ducking: true`; captions via `subtitleStyle` |
| 12 | `estimate_cost` | Announce total, `opening_image_credits` and balance in one line; get approval; pass the approved number as `max_credits` |
| 13 | `generate_scene` | Scene by scene in order (`node_id`), so each scene can be checked before the next is paid for |
| 14 | `get_generation_status`, `get_scene_frame` | Silent polling; a frame per scene as it lands |
| 15 | `quality_check` | Every scene; on drift or a failed check follow Repair below, at most one re-roll per scene |
| 16 | `edit_clip`, `split_clip`, `move_clip` | The cut: trims to the useful window, fades where a dip to black is wanted, placement |
| 17 | `create_render` | Free; `get_render` until done |
| 18 | `quality_check` | The rendered film once, without `node_id`; then deliver: link, length, what the viewer will see |

## Decision rules

### Hero lock

- The hero is the one thing that must never change: the lamp, the bottle,
  the character. Write its description once, 1 to 2 sentences, observable
  only (shape, material, colour, size cues, one distinguishing mark), and
  paste it verbatim into every still-frame prompt and every motion prompt
  with the words "from the reference".
- A supplied image is the reference. With none, generate one: the first
  scene's opening image becomes the hero sheet once the user approves it
  (step 14 for scene 1 before any other scene is paid for).
- The reference node is wired into every clip and every opening image. On
  models that take two references (Veo), the hero is the first and a style
  plate the second; nothing else.
- When the user changes the hero after generation, every generated scene is
  stale and the change is a paid re-roll. Say that before doing it.

### Arc and coverage

- Scene 1 carries the hook: a striking frame, a question or a detail that
  promises the reveal. The payoff scene delivers it. Between them each scene
  adds information, action or feeling; a scene that adds none is cut.
- One primary action per clip. A clip that needs two actions is two clips.
- Change shot size between neighbours (detail, then wide, then medium); two
  equal sizes in a row read as a slideshow. Pick framing and angle from
  [references/camera-language.md](references/camera-language.md) for a
  reason you can state. Start from the situation recipe in
  [references/scene-recipes.md](references/scene-recipes.md).
- Shot lengths: 4, 6 or 8 s on Veo (the only lengths it makes); generate the
  next length up and trim when the cut wants 5 s.

### Two prompts per shot

- The still-frame prompt describes a stable frame: subject, placement, camera
  position, light source and direction, materials, background, room for a
  title. No action, no camera move. It becomes the scene's opening image, so
  it shows the start of the shot, never the payoff.
- The motion prompt describes change over time: starting state, the action
  with timing ("0 to 2 s", "2 to 5 s"), the one camera move, what stays
  still, the end state, the sound inside the shot. Light and hero description
  repeated verbatim.
- Concrete words only. The banned list and the replacements are in
  [references/prompt-anchors.md](references/prompt-anchors.md). Constraints
  stated positively ("locked-off camera", "clean frame with no on-screen
  graphics").

### Light

- One motivated source per scene, named in both prompts (window, lamp, sun,
  neon, the product's own glow), with its direction and softness. Keep its
  direction across the shots of one scene. Recipes by situation are in
  [references/lighting-recipes.md](references/lighting-recipes.md).
- No grain, bloom, flare, haze or teal-and-orange grade unless the brief
  asks for that look.

### Continuity across scenes

- Same hero description, same light world, same place geometry unless the
  story moves. When a shot continues the previous one, describe the exit
  motion of the earlier shot at the start of the new motion prompt so
  velocity carries over the cut.
- After scene 1 lands, open its frame before paying for scene 2. If the hero
  drifted there, fix scene 1 first; every later scene inherits it.
- The physical checks (hands, contact, shadows, reflections, object state)
  and the slop list are in
  [references/visual-realism.md](references/visual-realism.md).

### Sound

- Decide the sound design before generation: native sound (the clip's own
  audio: footsteps, a switch, dialogue), narration, score, or a mix. Native
  dialogue is written into the motion prompt as quoted lines with the speaker
  and the delivery, and that clip's native audio stays `native`.
- Narration budget 2.3 words per second of the scene it covers; a line that
  does not fit is shortened, never left to run over the picture.
- One score for the film, one brief with an arc (opens on, builds through,
  lands on), `ducking: true` under voice, volume 0.3 to 0.4 under narration
  and up to 1 for a music edit. Rules in
  [references/editing-and-sound.md](references/editing-and-sound.md).

### The cut

- Hard cuts by default. A dip to black is `fade_out_ms` on the outgoing clip
  and `fade_in_ms` on the incoming one. Dissolves and wipes do not exist in
  the render yet; do not promise them.
- Trim to the strongest window with `edit_clip` (`trim` in source ms); split
  with `split_clip` when one clip holds two beats; place with `move_clip`.
- On-screen titles cannot be rendered from the MCP today. Carry the words in
  narration with captions, and leave room in the frame for a title the user
  can add in the app.

### Cost

- Announce before every paid call: what, model, credits, balance. Render is
  free. Generate scene by scene so a drifting hero is caught after one scene,
  not six.
- A re-roll is paid; at most one per scene, with the fix named. Over 30
  percent of the balance, ask first. When `sufficient` is false, stop.

## Repair

When a scene fails `quality_check`, drifts from the hero, or breaks a rule:

1. Name the most damaging visible failure (identity, light, an action that
   never happened, an artefact).
2. Simplify: one action, one camera move, fewer objects, stillness where
   motion added nothing.
3. Strengthen the anchor: the hero description verbatim, the reference wired,
   the opening prompt showing the start state, the end state explicit.
4. Append the server's `reroll_hint` and regenerate that scene only.
5. Still failing: keep the better take, tell the user what is wrong and what
   it would cost to try a different direction. Never add a longer negative
   list; write a clearer positive instruction.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from `mood`
plus `duration` on servers that carry the synthesis update. Try that form
first. If the server answers `url required`, ask the user to generate the
voice or music in the Lavendly app (Asset Library), then attach the hosted
file by `url` and continue. `get_scene_frame` returns a frame from the middle
of the clip on current servers; a last-frame option is arriving and, where
`get_schema` shows it, is the frame to show for a shot that continues.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The brief wants more than 90 s: propose two films, do not stretch one.
- `needs_browser` from `get_generation_status`: say so and stop polling.
- `stalled` on two consecutive polls: report, re-check once, never start a
  second job for the same scene.
- The same failure twice on one scene: the direction must change before any
  further spend. Ask.
- Media pasted into the chat never reaches you: ask for an upload to the
  Asset Library or a public URL, then `import_asset`.

## UX rules

1. Names and links in chat, never raw ids or JSON.
2. Show the direction and the shot list before creating anything; it is the
   cheap moment to redirect. Keep it to one screen: a line per scene, the
   hero description, the sound plan.
3. Explain an important choice in half a sentence ("close on the switch so
   the click is the hook"), never a lecture.
4. Silent polling; one line per phase change; a frame link per scene.
5. The user's language in chat, English in prompts and tool arguments.
6. Never present a failing or drifting scene as done.

## Quality gate before delivery

Every shot has a purpose; the hero is the same object in every frame; light
direction holds within each scene; the action is readable; shot sizes vary
on purpose; sound matches what is seen; the total length matches the target;
nothing in the frame looks like a phone UI, a timestamp, a watermark or stray
text. The full checklist is
[references/quality-control.md](references/quality-control.md).

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes, the hero wiring, trims.
- [references/prompt-anchors.md](references/prompt-anchors.md): the two prompt structures, banned words, slop list, narration budget.
- [references/camera-language.md](references/camera-language.md): shot sizes, angles, composition, movement.
- [references/lighting-recipes.md](references/lighting-recipes.md): sources, quality, recipes by situation, materials.
- [references/scene-recipes.md](references/scene-recipes.md): product, food, car, interior, explainer, dialogue, suspense, travel, craft, before and after.
- [references/visual-realism.md](references/visual-realism.md): physical logic, motion, artefacts, repair.
- [references/editing-and-sound.md](references/editing-and-sound.md): arc, coverage, cuts, rhythm, sound layers, music direction.
- [references/quality-control.md](references/quality-control.md): the review checklist.
- [references/troubleshooting.md](references/troubleshooting.md): error strings and what to do.
