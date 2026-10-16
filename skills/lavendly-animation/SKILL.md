---
name: lavendly-animation
version: 0.2.0
priority: normal
description: |
  Direct animated films on the Lavendly MCP: lock one style (3D feature look, anime, 2D cartoon, clay and felt, paper cutout, watercolour), keep a character or creature the same in every shot, write studio-free prompts, pace kids' fables and bedtime stories safely, build reusable mascots.
  Use when: "make it animated", "a cartoon about", "claymation ad", "an anime scene", "a bedtime story", "a mascot for my shop", "storybook style".
  Chain: lavendly-director owns the process; lavendly-motion-design for CGI, loops, abstract; lavendly-cost-aware wins every spend; lavendly-review, lavendly-publish after.
  NOT for: a studio's characters or named look, rendered titles or speech bubbles, live action, lip sync to an uploaded song.
argument-hint: "[story or brief] [style: 3d | anime | cartoon | clay | felt | paper | watercolour] [length 6..60 s] [aspect] [hero sheet url or 'design one']"
---

# Lavendly Animation

An animated film holds together when one style, one character design and
one motion feel run through every shot. Generated video drifts on all
three: watercolour turns glossy, a fox stands up on two legs, stop-motion
turns smooth. This skill gives the agent the field knowledge of animated
filmmaking (style, shape, material, light, acting, timing, creatures,
children's pacing) and the exact way each decision reaches Lavendly's models.

## Before anything else

- `get_status` and `get_ledger` once per session; `get_schema` when unsure
  of an argument. Never invent a tool, an argument or a model id.
- When lavendly-director is installed, run its process (intent card,
  sequence plan, ledger, three-level checks). This skill adds the animation
  decisions; the sequence below is complete if the director is absent.
- Read the brief for: style, story, audience and age, length, aspect, the
  hero (character, creature, mascot, object), assets the user has, sound
  (wordless, narration, a character line), platform. Ask one question only
  when a missing answer changes the film; otherwise decide and say the
  assumption in one line.
- A studio, artist, franchise or character named in the brief is translated
  into craft words before anything else; say so in half a sentence
  ([references/prompt-anchors.md](references/prompt-anchors.md) section 5).

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, credits |
| 2 | write | The style: pick the recipe, fill the style bible (style line, palette, line, material, light rule, motion feel, camera grammar, forbidden list, plate) ([references/style-bible.md](references/style-bible.md)) |
| 3 | write | Intent card and a three-sentence retell (it opens on, then, it ends with); the ending the recipe asks for |
| 4 | write | The hero: sheet plan and hero block; creature anatomy and gait ([references/creatures.md](references/creatures.md)) |
| 5 | write | Shot list from the recipe's structure for the asked length: size, angle, lens feel, move, action, cut length, generated length |
| 6 | write | Per shot a still-frame prompt (under 500 characters) and a motion prompt in the model's dialect ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 7 | show | Style bible, hero block, shot list, sound plan, model and rough credits; wait for "go" |
| 8 | `import_asset` | Hero sheet, style plate, any stills the user supplies |
| 9 | `create_workflow` | `shots` with motion prompts and exact durations, `aspect`, `videoModel`, `idempotency_key` |
| 10 | `get_workflow` | Image node and clip node per scene |
| 11 | `update_workflow` | Still prompts on image nodes; hero and plate wired into every clip within the cap; user stills as image urls ([references/mcp-calls.md](references/mcp-calls.md)) |
| 12 | `set_clip_native_audio` | Per clip: `native`, `mix` or `off` |
| 13 | `attach_track`, `update_workflow` | One narration voice, one score with `ducking: true`, captions style; then `scope` film where `get_schema` lists it, else edges from both to every clip so they run film-wide ([references/mcp-calls.md](references/mcp-calls.md)) |
| 14 | `estimate_cost` | Announce clips, opening images, total, balance after; wait for a yes |
| 15 | `generate_scene`, `get_generation_status` | Scene 1 alone first, silent polling |
| 16 | `get_scene_frame`, `quality_check` | Scene 1 first and mid frames against the plate and the sheet; then each later scene, one at a time |
| 17 | `edit_clip`, `split_clip`, `move_clip` | Trim to the cut lengths, holds, fades |
| 18 | `create_render`, `get_render`, `quality_check` | Free render; whole-film check; deliver |

## Decision rules

### Choose the style, then never change it

| The brief says | Recipe |
|---|---|
| warm family characters, a gag with a heart, "like a 3D movie" | [references/recipe-3d-feature-look.md](references/recipe-3d-feature-look.md) |
| skies, school rooftops, teen drama, an action burst | [references/recipe-anime.md](references/recipe-anime.md) |
| a gag, a sketch, a bumper, retro cartoon | [references/recipe-cartoon-2d.md](references/recipe-cartoon-2d.md) |
| handmade, quirky, plasticine, felt, puppets | [references/recipe-stop-motion.md](references/recipe-stop-motion.md) |
| editorial explainer, cut paper, collage, fable on a budget | [references/recipe-paper-cutout.md](references/recipe-paper-cutout.md) |
| picture book, gentle, memorial, seasonal card | [references/recipe-watercolour-storybook.md](references/recipe-watercolour-storybook.md) |
| children, a lesson, bedtime | [references/recipe-kids-fables.md](references/recipe-kids-fables.md) plus one look recipe |
| a character the brand will reuse | [references/recipe-mascots.md](references/recipe-mascots.md) |

- One style, one model, one aspect per film. Model families draw a style
  differently; a mid-film model change reads as a style change.
- When the user cannot choose, offer a paid style test: scene 1 on a draft
  model once per candidate, frames side by side, the user picks by eye.

### Lock the style

- The style line is first in both prompts, word for word in every shot, with
  the same palette words and light line in every still of a scene.
- On the MCP path opening images are drawn from words alone; references
  reach only the clips. Wire the style plate into every clip within the
  model's cap, with its role sentence ("match its palette and line weight
  only, not its content").
- When the look must hold exactly (a series, a mascot, a client's look), use
  stills the user supplies or makes in the app, set as each scene's image
  url, instead of server-drawn opening images.
- Open scene 1's first and mid frames against the plate before paying for
  scene 2. A drifted scene 1 is fixed first; every later scene inherits it.

### The hero

- Sheet laws: plain grey background, the head close-up as the single source
  of the face, mouth open and closed for creatures, an expression row, a
  size frame when sizes differ a lot; fix a sheet by editing it, never by
  rebuilding it.
- The hero block (observable only, one asymmetric mark) is pasted verbatim
  into every still. The motion prompt names the hero by its short name and
  locks it in one sentence; the full block rides only when the hero enters
  during the shot.
- References by priority: the head close-up, then the full body or the
  product, then the style plate, then the location. Each gets one job in a
  sentence. Never wire references into a Veo 3.1 Lite (Auto) scene.
- Every motion prompt states the count: "Exactly one Pip in frame, nobody
  else, no copy of him." No two scenes start from the same frame.
- A four-legged hero moves on all four legs with its gait named, unless the
  brief makes it walk upright; then it is upright in every shot. Mouth closed
  by default; both eyes look the same way ([references/creatures.md](references/creatures.md)).
- Two characters: sides fixed for the scene, one acts while the other
  reacts, both named in every prompt with the count.

### Two prompts per shot

- Still: style line, hero block, start pose and placement, a setting with 2
  to 3 props (anything hollow or open says what is inside), size, angle,
  lens feel, light line, palette, "No text, no letters". Under 500
  characters. Never the payoff, never the aspect or the model name.
- Motion: the change only. Style line, motion feel, timed beats ("0 to 2
  s"), one camera move or locked-off, the end state, the lock sentence, the
  count, reference roles when wired, the sound, the clean-frame line. One
  action per clip; say where every moving thing ends.
- Write in the model's dialect (Veo: quoted lines with "(no subtitles)",
  `SFX:` and `Ambient noise:` lines, "No music." when the score comes from
  the edit; Seedance: 30 to 100 words, subject first, motion from frame 1;
  Kling: scene, characters, action, camera, audio, style; Wan: literal style
  words such as "claymation" or "2D anime").
- No banned words (cinematic, stunning, epic, dynamic, 8k and the rest);
  concrete shape, material and light words instead.

### Motion feel and acting

- Each style has its motion line ([references/style-bible.md](references/style-bible.md)
  section 4): smooth and eased for 3D, on twos for anime, snappy holds for
  cartoons, 12 frames per second with no motion blur for stop-motion,
  stepped slides for paper, slow holds for watercolour. The export runs at
  30 fps with no step control, so the stepped feel must be generated.
- One emotion per beat, shown by the body; holds after reactions; gags as
  setup, anticipation, action, held reaction
  ([references/acting-and-timing.md](references/acting-and-timing.md)).
- On-screen speech: one short line per clip (about 2 words per second), a
  medium close-up, one speaking face, locked camera. Each clip invents its
  own voice, so a character who speaks in several scenes speaks through one
  voiceover track instead.

### Model and length

- Default picks ([references/models-and-credits.md](references/models-and-credits.md)):
  3D look, 2D cartoon, kids fables on Veo 3.1 Fast; anime, stop-motion,
  watercolour on Wan 2.7; paper cutout on Kling v3 Standard; mascots on
  Kling v3 Pro. Seedance 2.0 Mini is the draft with 4 references and sound.
  Picks are not measured on Lavendly yet: scene 1 is the test.
- Durations from the model's exact list (the server does not correct
  them). On Veo make 8 s and trim when the cut wants 6 or 7 (same price); on
  block-priced models 5 s and 10 s are the efficient lengths.
- The film takes the first clip's aspect; use 16:9, 9:16, 1:1, 4:3 or 3:4.

### Sound

- Decide before generation: wordless with Foley, narration, or a character
  line. Foley-led clips stay `native`; narrated clips `mix` at 0.3 to 0.5;
  silent models and music edits `off`.
- Narration at 2.3 words per second (2.0 for children; the server ceiling
  is 2.5, and a longer line freezes the last frame). One voice per film.
- One score for the film: instruments, tempo, an arc (opens on, builds,
  drops before the payoff, lands), `ducking: true`, 0.2 to 0.35 under
  voice or natural sound, up to 1 for a music edit.

### Children and safety

- Films for children follow [references/recipe-kids-fables.md](references/recipe-kids-fables.md)
  section 9: nothing frightening, nothing a child could copy and get hurt
  by, no flashing faster than three per second, no selling to children, no
  real children's likeness. Every frame is opened before delivery.

### What animation cannot do here

- No rendered titles, speech bubbles, sound words or readable signs: keep
  them blank or out of frame, leave room for a title the user adds in the
  app, and carry words as narration with captions.
- No lip sync to an uploaded voice or song; no frame-rate control; no
  last-frame pin (chain by hand from `get_scene_frame` last, at most 2 to 3
  hops); the Film Bible cannot be written from the MCP.
- Hard cuts and dips to black (`fade_out_ms`, `fade_in_ms`) only; a page
  turn or a dissolve is shown inside a shot (a wash spreading, a piece
  sliding in), and export dissolves only where `get_schema` lists them.

### Cost

- Announce before every paid call: what, model by display name, credits,
  balance after. Render is free. Scene by scene so a drifting style is
  caught after one scene. One re-roll per scene with the fix named; over 30
  percent of the balance, ask first; `sufficient` false, stop.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration` on servers that carry the synthesis update. Try that
form first. If the server answers `url required`, ask the user to make the
voice or music in the Lavendly app (Asset Library), then attach the hosted
file by `url` and continue. `get_scene_frame` takes a frame option (first,
mid, last) on current servers; where `get_schema` does not show it, the
mid frame is returned, the style check rests on it (say the confidence is
lower), and a continuing shot describes the earlier shot's end state in its
prompt instead of chaining.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The brief asks for a protected character or a studio's named look and
  will not accept the translated description: decline that part plainly.
- A kids' film frame shows something frightening after one re-roll: stop
  and ask before more spend.
- The same failure twice on one scene: change the direction (style, shot,
  model) before any further spend, and ask.
- `needs_browser`, or `stalled` on two consecutive polls: report and stop
  polling; never start a second job for the same scene.
- More than 60 s: propose a 30 s cut or two films; never stretch one.

## UX rules

1. Names and links in chat, never raw ids or JSON.
2. Show the style bible, the hero block and the shot list on one screen
   before creating anything.
3. Explain a choice in half a sentence ("stepped motion so the clay reads
   as handmade"), never a lecture.
4. Silent polling; one line per phase change; a frame link per scene.
5. The user's language in chat; English in prompts and tool arguments.
6. Models by display name ("Wan 2.7"), never the id.
7. Never say a frame matches the plate or the sheet before opening it.
8. Never present a drifting or frightening scene as done.

## Reference docs

- [references/style-bible.md](references/style-bible.md): the bible fields, the plate, how style reaches each layer, light and motion by style, drift fixes.
- [references/creatures.md](references/creatures.md): creature sheets, foot types, gaits, other bodies, tails and ears, mouths, eyes, failures.
- [references/acting-and-timing.md](references/acting-and-timing.md): animation principles as prompt words, emotion, holds, comic timing, ones and twos, dialogue limits.
- [references/models-and-credits.md](references/models-and-credits.md): pricing, the generator table, picks by style.
- [references/prompt-anchors.md](references/prompt-anchors.md): still and motion templates, lock, count and role sentences, style lines, studio-free translations, dialects, banned words, narration budget.
- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes, reference wiring, user stills, chaining, trims.
- [references/troubleshooting.md](references/troubleshooting.md): error strings and animation failures.
- [references/recipe-3d-feature-look.md](references/recipe-3d-feature-look.md): 3D feature look.
- [references/recipe-anime.md](references/recipe-anime.md): anime.
- [references/recipe-cartoon-2d.md](references/recipe-cartoon-2d.md): 2D cartoon, modern and rubber-hose.
- [references/recipe-stop-motion.md](references/recipe-stop-motion.md): claymation, felt, puppets.
- [references/recipe-paper-cutout.md](references/recipe-paper-cutout.md): cut paper and collage.
- [references/recipe-watercolour-storybook.md](references/recipe-watercolour-storybook.md): watercolour, gouache, ink, pencil.
- [references/recipe-kids-fables.md](references/recipe-kids-fables.md): fables, bedtime stories, children's safety.
- [references/recipe-mascots.md](references/recipe-mascots.md): mascots and brand characters.
