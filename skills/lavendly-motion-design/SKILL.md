---
name: lavendly-motion-design
version: 0.2.0
priority: normal
description: |
  Direct motion-design pieces on the Lavendly MCP: CGI product shots, abstract and surreal films, seamless loops, satisfying and ASMR clips, title moods, logo-free idents, 3D and macro worlds, data metaphors; plain about what generated video cannot do (type, logos, charts) and the honest alternative.
  Use when: "a 3D render of my product", "a loop for my site", "an oddly satisfying clip", "a channel intro", "a brand ident", "show this number visually".
  Chain: lavendly-director owns the process; lavendly-animation for character stories; lavendly-cost-aware wins every spend; lavendly-review, lavendly-publish after.
  NOT for: kinetic typography, animating an exact logo or chart, UI demos, alpha exports.
argument-hint: "[brief] [kind: product | abstract | loop | asmr | title | ident | world | metaphor] [length 4..60 s] [aspect] [packshot url]"
---

# Lavendly Motion Design

Motion design on generated video is light, material and motion with no
type: a product turning on a cyc with caustics on the floor, a loop with no
seam, a macro pour whose sound is the point, an ident that says the brand
without drawing the logo. This skill gives the agent the motion designer's
and the 3D artist's field knowledge (easing, rhythm, camera choreography,
light rigs, physically based materials, loop construction) and is exact
about what Lavendly's models and edits can do and what they cannot.

## Before anything else

- `get_status` and `get_ledger` once per session; `get_schema` when unsure
  of an argument. Never invent a tool, an argument or a model id.
- When lavendly-director is installed, run its process (intent card,
  sequence plan, ledger, checks); this skill adds the motion-design
  decisions. The sequence below is complete without it.
- Read the brief for: the kind of piece, the hero object, the assets the
  user has (packshots, renders, brand colours, a sonic logo), length,
  aspect, where it plays (feed, site, screen), sound.
- If the brief needs readable type, an exact logo, a precise chart, UI
  screens, alpha or a full 360 spin, say the limit in one line before
  planning and offer the alternative
  ([references/limits-and-alternatives.md](references/limits-and-alternatives.md)).
- Every name, product, place and story in this skill and its references is an
  example. The user's brief replaces it; never carry one into their film.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, credits |
| 2 | write | The limits line if any; the recipe; the look line, object block, light rig, palette, motion personality |
| 3 | write | Intent card and three-sentence retell; the ending the recipe asks for (pack shot, clean field, arrival, completion, seamless seam) |
| 4 | write | Shot list from the recipe for the length: size, angle, lens feel, one move with its amount, action, easing, cut length, generated length, beat grid |
| 5 | write | Per shot a still prompt (under 500 characters, empty areas described as surfaces) and a motion prompt in the model's dialect ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 6 | show | Shot list, look, sound plan, model, rough credits; wait for "go" |
| 7 | `list_assets`, `import_asset` | Packshots, plates, the user's sonic logo: already in Lavendly, `list_assets` (show the name when more than one fits); a public URL, `import_asset` |
| 8 | `create_workflow` | `shots` with motion prompts and exact durations, `aspect`, `videoModel`, `idempotency_key` |
| 9 | `get_workflow`, `update_workflow` | Still prompts or packshot urls on image nodes; references within the cap ([references/mcp-calls.md](references/mcp-calls.md)) |
| 10 | `set_clip_native_audio`, `attach_track`, `get_workflow_audio` | Per-clip mode; one score or motif; narration where the recipe uses it; each track with `"scope": "film"`, confirmed with `get_workflow_audio` to reach every clip (only if not, `update_workflow` edges to the missing clips) ([references/mcp-calls.md](references/mcp-calls.md)) |
| 11 | `estimate_cost` | Announce clips, opening images, total, balance after; wait for a yes |
| 12 | `generate_scene`, `get_generation_status` | Scene 1 alone first, silent polling |
| 13 | `get_scene_frame`, `quality_check` | First and last frames: product drift, empty areas still empty, loop seam; then each later scene |
| 14 | `edit_clip`, `split_clip`, `move_clip` | Trims on the bar grid, holds, the ping-pong loop, fades |
| 15 | `create_render`, `get_render`, `quality_check` | Free render; whole-piece check; deliver |

## Decision rules

### Choose the recipe

| The brief says | Recipe |
|---|---|
| product hero, launch, turntable, exploded view | [references/recipe-product-render.md](references/recipe-product-render.md) |
| art film, mood, dreamlike, impossible images | [references/recipe-abstract-surreal.md](references/recipe-abstract-surreal.md) |
| loop, background, website hero, gallery screen | [references/recipe-loops.md](references/recipe-loops.md) |
| oddly satisfying, ASMR, texture, pour | [references/recipe-satisfying-asmr.md](references/recipe-satisfying-asmr.md) |
| opener, intro, credits, title sequence | [references/recipe-title-moods.md](references/recipe-title-moods.md) |
| ident, bumper, sting, end slate | [references/recipe-brand-idents.md](references/recipe-brand-idents.md) |
| world, fly-through, macro world, diorama | [references/recipe-environments-macro.md](references/recipe-environments-macro.md) |
| a number, a benefit, a process to explain | [references/recipe-visual-metaphors.md](references/recipe-visual-metaphors.md) |

### What the model never draws

- No titles, labels, numbers, charts, UI or logos in any prompt. Empty
  areas are written as plain surfaces ("the right half is an empty charcoal
  field with nothing in it"); never the words "title", "logo" or "text" as
  content.
- Words reach the screen two ways only: narration with captions burned from
  the voice track, or the user's own type added in the app's editor where
  it offers one, or in their own editor after export.
- The user's logo is never sent to a model; idents end on a clean field
  where the user places it.

### The object and the product

- The identity comes from the user's real packshot, set as the scene's
  opening image url; the model adds light and motion. Without one, an
  object block (shape, material, colour, size cue, one detail) pasted
  verbatim into every still.
- Orbits of 45 to 90 degrees per clip; a turntable quarter turn; a half turn
  as two quarter orbits chained once; "every side" as four angle cuts on the
  beat. Never promise a 360 in one clip.
- Exploded views and assemblies: 3 to 5 parts, even gaps, the order stated.
  Counts of five or fewer, or a mass with no count.
- Labels small or turned away; reflections bounded ("a faint reflection in
  the water, nothing else"); the count line in every motion prompt.
- Each wired reference gets one job in a sentence; the product first, then
  a second angle, then the plate. None on Veo 3.1 Lite (Auto).

### Two prompts per shot

- Still: look line, object block, placement, background (cyc, gradient,
  infinite black, water floor), layout of empty space, size, angle, lens
  feel, light rig, palette, "No text, no letters, no logo". Under 500
  characters. The start of the move, never the payoff.
- Motion: the change only: timed beats, one camera move with amount, speed
  and stop, easing in words, the end state, the lock sentence, the count,
  reference roles, the sound, the clean-frame line. Camera motion and object
  motion are separate: say which moves.
- No banned words (cinematic, stunning, epic, dynamic, 8k, sleek and the
  rest); no renderer or artist names; materials and light instead.

### Motion, rhythm, light

- Easing carries the personality: ease-in-out and long moves for premium,
  overshoot and settle for playful, linear for mechanical and loops.
  Stagger sets of five or fewer; hold 0.6 to 1.5 s before a payoff and 2 s
  or more on a final field ([references/motion-principles.md](references/motion-principles.md)).
- Cut on phrases: at 120 BPM two bars are 4 s; trim plates to the bar grid
  with `edit_clip`. Timing inside a generated clip is approximate.
- Avoid "snap", "slam" and "quick zoom" inside a shot; cut to the closer
  shot. A tight close-up is its own clip.
- One light rig per piece, named as sources and what surfaces reflect; one
  background; one palette.

### Loops

- Lavendly sends a first frame only; no last-frame pin exists. Say so, then
  build the loop by method: ping-pong (exact seam, for motion that reverses
  well), cyclic geometry (approximate, checked on first and last frames),
  occlusion seam, or a dip to black ([references/recipe-loops.md](references/recipe-loops.md)).
- Frame 1 is the cover. Loops are silent by default.
- A film of one clip node applies trim, fade, reverse, colour and captions
  too (any of them sends it through the full stitch); with none it ships the
  raw clip. Ping-pong needs a second node by construction (a copy of the
  clip costs nothing).

### Model and length

- Defaults ([references/models-and-credits.md](references/models-and-credits.md)):
  Veo 3.1 Fast for products, surreal, ASMR, titles, idents and metaphors;
  Wan 2.7 for loops; Wan 3.0 for long environment takes. Full-frame hero
  work gets a 1080p model. Picks are not measured on Lavendly yet: scene 1
  is the test.
- Durations from the model's exact list; on Veo make 8 s and trim to 6 or
  7. One model and one aspect per piece; the film takes the first clip's
  aspect (16:9, 9:16, 1:1, 4:3 or 3:4).

### Sound

- Designed sounds come from the clip itself: name each one on Veo ("SFX: a
  soft magnetic click") and keep that clip `native`; Lavendly has no
  separate effects track.
- One music track per piece: a score for films, a 3 to 5 note motif for
  idents, none for ASMR and most loops. Brief with instruments, tempo and
  where it lands. "No music." in Veo prompts when the score comes from the
  edit.
- Mix: `native` for SFX and ASMR, `mix` at 0.3 to 0.5 under narration or a
  motif, `off` for silent models, music edits and reversed loop segments.

### Cost

- Announce before every paid call: what, model by display name, credits,
  balance after. Render and edits are free. Scene 1 first. One re-roll per
  scene with the fix named; over 30 percent of the balance, ask first;
  `sufficient` false, stop.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration` on servers that carry the synthesis update. Try that
form first. If the server answers `url required`, ask the user to make the
voice or music in the Lavendly app (Asset Library) and find it with
`list_assets`, or import their own file with `import_asset`, then attach
the hosted file by `url` and continue.
`get_scene_frame` takes a frame option (first, mid, last) on current
servers; where `get_schema` does not show it, the loop seam and product
drift checks rest on the mid frame (say the confidence is lower) and
chained orbits are replaced by angle cuts.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The brief depends on rendered type, an exact logo, a precise chart, alpha
  or UI and the user declines every alternative: say plainly it cannot be
  made here.
- The ping-pong segments come back shorter than the window: stop that path,
  report it, offer the cyclic or occlusion loop.
- The same failure twice on one scene: change the move, the object or the
  model before more spend, and ask.
- `needs_browser`, or `stalled` on two consecutive polls: report and stop
  polling; never start a second job for the same scene.
- More than 60 s: propose a 30 s cut or two pieces.

## UX rules

1. Names and links in chat, never raw ids or JSON.
2. Say a limit once, in one line, with the alternative; no lecture.
3. Show the shot list, the look and the sound plan on one screen before
   creating anything.
4. Explain a choice in half a sentence ("a 45-degree orbit so the cap keeps
   its shape").
5. Silent polling; one line per phase change; a frame link per scene.
6. The user's language in chat; English in prompts and tool arguments.
7. Models by display name ("Veo 3.1 Fast"), never the id.
8. Never say a seam is invisible, a product matches its packshot or an area
   is clean before opening the frames.

## Reference docs

- [references/limits-and-alternatives.md](references/limits-and-alternatives.md): what generated video cannot do here and the honest alternative for each.
- [references/motion-principles.md](references/motion-principles.md): easing, anticipation, stagger, rhythm, camera choreography for CG, light rigs, materials, physics.
- [references/models-and-credits.md](references/models-and-credits.md): pricing, the generator table with resolutions, picks by sub-genre.
- [references/prompt-anchors.md](references/prompt-anchors.md): still and motion templates, object block, look lines, layout language, dialects, banned words, narration budget.
- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes, packshots as opening frames, references, beat trims, the ping-pong loop.
- [references/troubleshooting.md](references/troubleshooting.md): error strings and motion-design failures.
- [references/recipe-product-render.md](references/recipe-product-render.md): CGI product hero shots, orbits, exploded views.
- [references/recipe-abstract-surreal.md](references/recipe-abstract-surreal.md): abstract and surreal art films.
- [references/recipe-loops.md](references/recipe-loops.md): seamless loops by method.
- [references/recipe-satisfying-asmr.md](references/recipe-satisfying-asmr.md): satisfying and ASMR clips.
- [references/recipe-title-moods.md](references/recipe-title-moods.md): title-sequence moods without rendered text.
- [references/recipe-brand-idents.md](references/recipe-brand-idents.md): logo-free brand idents.
- [references/recipe-environments-macro.md](references/recipe-environments-macro.md): 3D environments and macro worlds.
- [references/recipe-visual-metaphors.md](references/recipe-visual-metaphors.md): data and product visual metaphors.
