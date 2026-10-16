---
name: lavendly-cinematic
version: 0.2.0
priority: normal
description: |
  Genre craft for narrative video on the Lavendly MCP: short film and drama, trailers, horror and thriller, sci-fi, action, romance, noir and mystery, comedy sketches, dialogue scenes, period pieces. Chooses the arc and beat count by length, coverage, performance, lens, light, grade, sound and model, and writes prompts in each model's dialect.
  Use when: "a short film about", "a trailer for my story", "a horror short", "two people arguing", "make it feel like a movie", "a 1920s scene", "a sketch".
  Chain: runs the lavendly-director process; lavendly-cost-aware wins spend; lavendly-series for episodes; lavendly-music-video when a song leads.
  NOT for: ads, music videos, explainers, one film over 90 s, real people or franchise characters, lip sync to a recording.
argument-hint: "[story or logline] [genre] [length 6..90 s] [aspect] [cast and their look] [dialogue language or 'no dialogue']"
---

# Lavendly Cinematic

A story told in shots that a model can make. The genre decides the arc, the
coverage, the lens, the light, the sound and the model; the director's
process (intent card, sequence plan, ledger, three levels of checks) carries
it into Lavendly. This skill supplies the genre decisions and the prompts;
it never replaces the director's checks.

## Before anything else

- Load lavendly-director when installed and follow its process; the steps
  below name only what this genre adds. Without it, the Sequence below is
  complete on its own.
- `get_status` and `get_ledger` once per session. Never claim or deny a
  capability, a model or a voice from memory; `get_schema` when in doubt.
- Read the brief for: genre, length, aspect, the story (who wants what,
  what stands in the way, how it ends), the cast and its exact count,
  dialogue (lines, language), rating (what may be shown), references the
  user has, and the ending. Ask one question only when the answer changes
  the film; otherwise decide and state the assumption in one line.
- Pick the recipe from the table in Reference docs. A mixed brief (a horror
  comedy) takes the structure of the genre that owns the ending and the
  look of the other.

## Sequence

| Step | Call | What this genre adds |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, credits, voice route |
| 2 | write | Intent card (director) plus: recipe, arc from [references/story-structures.md](references/story-structures.md), beat count, cast list with locked descriptions and counts, every dialogue line with its word count, rating guard |
| 3 | write | Concept gate: retell the film in three sentences (it opens on, then, it ends with); a muted viewer can say who wants what and how it ended. No retelling, no film |
| 4 | write | Shot list from the recipe: size, angle, lens feel, move, action, the one emotion of the beat, cut length, model length. Dialogue gets coverage ([references/dialogue-scenes.md](references/dialogue-scenes.md)) |
| 5 | write | Per shot a still-frame prompt (under 500 characters) and a motion prompt in the model's dialect ([references/prompt-anchors.md](references/prompt-anchors.md)); performance words from [references/acting.md](references/acting.md) |
| 6 | show | Logline, shot list, cast descriptions, sound plan, model and rough cost; wait for "go" |
| 7 | `import_asset` | Character references, a location or style plate the user supplied |
| 8 | `create_workflow` | `shots` with the motion prompts and model lengths, one `aspect`, one `videoModel`, `project_name` when named, `idempotency_key` |
| 9 | `get_workflow`, `update_workflow` | Still prompts onto the image nodes; references wired within the model's cap, each with its role sentence ([references/mcp-calls.md](references/mcp-calls.md)) |
| 10 | `set_clip_native_audio` | `native` on dialogue and sound-led shots, `mix` under narration, `off` where only the score plays |
| 11 | `attach_track`, `update_workflow` | One score for the film; narration only when the card says the story has a narrator; then `update_workflow` edges from both to every clip so they run film-wide, confirmed with `get_workflow_audio` (`scope` only once `get_schema` lists it) ([references/mcp-calls.md](references/mcp-calls.md)) |
| 12 | `estimate_cost` | One line: shots, model, clip and opening image credits, total, balance after; wait for yes |
| 13 | `generate_scene` | Scene 1, check it, then the hardest performance shot, then the rest in order |
| 14 | `get_generation_status`, `get_scene_frame` | Silent polling; frame per scene; ledger from the landed frame; chain frames for continuous action |
| 15 | `quality_check` | Per scene and per cut; plus the performance check (acting scale 4 or more on hero shots) |
| 16 | `edit_clip`, `split_clip`, `move_clip` | Trims for timing (reaction holds, comedy pauses), the same colour edit on every clip, fades for time passing |
| 17 | `create_render`, `get_render` | Free |
| 18 | `quality_check`, `get_workflow_audio` | Whole film against the card; deliver link, length, what the viewer sees |

## Decision rules

### Length decides the story

| Length | Shots | Beats | Narration words max | Dialogue lines max | Shape |
|---|---|---|---|---|---|
| 6 s | 1 to 2 | 2 (situation, turn) | 12 | 1 short | One image with a turn |
| 15 s | 3 to 4 | 3 to 4 | 30 | 2 | Situation, want, turn, held reaction |
| 30 s | 6 to 8 | 6 to 8 | 65 | 4 to 5 | Three acts in miniature |
| 60 s | 10 to 14 | 10 to 12 | 130 | 8 to 10 | Three acts, one escalation more |
| 90 s | 15 to 20 | 15 to 17 | 190 | 12 to 14 | Three acts, a midpoint turn |

- Over 90 s: propose two films or an episode pair (lavendly-series). Over
  30 s: show the asked length and a 30 s cut with both costs.
- Every film has one want, one obstacle, one turn. A beat that adds no
  information, action or feeling is cut before it is paid for.
- Every setup the viewer sees gets a payoff on screen, and every payoff has
  a setup. Mark the pairs in the shot list.

### Coverage and the cut

- Coverage serves the beat: a wide to place us, singles for lines, a
  reaction for the feeling, an insert for the object that matters.
- One speaker per clip, the speaker's face in frame. Keep the 180 degree
  line: each person keeps their side of frame for the whole scene, written
  in every prompt. Eyelines meet.
- Change shot size between neighbours; every third shot an insert or a
  reaction of 3 to 4 s.
- Hold the turn: the shot after the reveal is the longest in the film.
  Comedy holds the reaction 1 to 2 s; horror holds the empty frame.

### Performance

- One emotion per beat, played as physical behaviour (the jaw sets, she
  swallows, he looks at the door and back), never an adjective. The tighter
  the shot, the smaller the movement. Full rules and the bad-acting fixes in
  [references/acting.md](references/acting.md).
- Native dialogue: 3 to 8 s clip, medium close-up or closer, one speaking
  face, locked or slow camera, about 1.2 words per second for clean sync,
  never over 2. Longer speech is two clips or a voice-over.
- No lip sync to a recording the user supplies: Lavendly has no route for it.
  A supplied voice plays as narration over a listener, a back, or a wide.

### Camera, light and look

- The still camera with a moving subject is the most reliable shot; a move
  must earn its place (genre tables in each recipe). One move per shot.
  Adjacent shots never repeat a move; the payoff is static.
- One motivated light source per scene, pasted word for word into every
  still prompt of the scene. Light and palette per genre are in the recipes
  and [references/prompt-anchors.md](references/prompt-anchors.md).
- Generate in colour. A black-and-white or graded look is the same
  `edit_clip` colour edit on every clip, applied after generation.
- Aspect 16:9 for film, 9:16 for vertical drama. Never 21:9: the export
  takes the first clip's aspect and falls back to the 9:16 frame for it.
  For a scope feel, keep the action in the central band of a 16:9 frame.

### Sound

- Decide per shot: native (dialogue, footsteps, rain), narration, score,
  silence. Ambience under every shot of a place; the score enters late and
  quietly; silence before the turn. A late entry is `update_track`
  `startTime` on the film-wide score (seconds on the film clock), with the
  score's `duration` equal to the film minus the entry; never the mood text.
- One score for the film, one brief with an arc. Trailers cut picture to the
  score; dramas lay the score under the picture.
- Narration about 2.3 words per second of the shots it covers; it is part of
  the story (noir, a letter read aloud), never an explanation of it.

### Models

| Need | First choice | Value | Draft |
|---|---|---|---|
| English dialogue, lip sync | Veo 3.1 (47 per 4 s) | Veo 3.1 Fast (14 per 4 s) | Seedance 2.0 Mini (9 per 5 s) |
| Non-English dialogue | Kling v3 Pro (20 per 5 s) | Kling v3 Standard (15) | Seedance 2.0 Mini |
| Two characters plus a place, references | Seedance 2.0 (4 refs, 44 per 5 s) | Seedance 2.0 Fast (11) | Seedance 2.0 Mini |
| Fast human action | Kling v3 Pro | Seedance 2.0 Fast | Grok Imagine (9) |
| Designed worlds, stylised sci-fi | FLUX 3 Video (34 per 5 s) | Wan 2.7 (12, 4 refs) | Seedance 2.0 Mini |
| One long take, 15 to 30 s | Wan 3.0 (24 per 5 s) | Seedance 2.5 (27, 720p) | Wan 3.0 at a shorter length |
| Score-only shots, no references | Hailuo 3 Max (10, silent) | Veo 3.1 Lite (10, no refs) | Veo 3.1 Lite |

- The top-level `videoModel` sets every shot. A film may use a different
  model per scene: set `data.videoModel` on that clip with `update_workflow`
  and confirm it in `estimate_cost` `per_scene`. Durations from the model's exact list (Veo 4,
  6, 8). On Veo generate 4 s or 8 s (6 s costs the same as 8 s). On models
  priced per 5 s block, generate 5 s or 10 s and trim.
- References: 4 on Seedance and Wan 2.6 and 2.7, 2 on the rest, none on Veo
  3.1 Lite. A Veo clip with references wired is generated at 8 s.
- Opening images are made from text alone: the locked description lives in
  the still prompt. For strict identity (two-hander close-ups), use one of
  the three routes in [references/dialogue-scenes.md](references/dialogue-scenes.md).

### Policy guards

- No real people: no actor, politician or public figure by name or
  likeness, no "a man who looks like". No studio, director, franchise or
  character names in prompts; describe the traits (lens, light, era, palette).
- Horror and action imply violence: no gore, no harm to children or animals
  shown, nothing a filter would refuse. Romance between adults only.
- Fiction stays fiction: no staged footage of a real event, real news
  anchors or real places presented as documentary.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration` on servers that carry the synthesis update. Try that
form first. If the server answers `url required`, ask the user to make the
voice or the score in the Lavendly app (Asset Library), then attach the
hosted file by `url`. `get_scene_frame` takes a frame option (first, mid,
last) where `get_schema` lists it; without it, a continuing shot is anchored
by describing the earlier shot's end state in the next motion prompt.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The brief names a real person, a franchise character or a studio look by
  name: offer the traits instead; do not generate the name.
- The brief needs lip sync to the user's own recording, or a monologue over
  8 s in one clip: say what Lavendly can do instead before spending.
- The same failure twice on one shot (identity, wrong speaker, mush in the
  dark): change the direction (simpler action, another size, another
  model) and ask before more spend.
- `needs_browser`, or `stalled` on two polls: report; never start a second
  job for the same scene.
- Media pasted into the chat: ask for an Asset Library upload or a public
  URL, then `import_asset`.

## UX rules

1. Show the story before the shots: logline, three-sentence retell, then
   the shot list on one screen.
2. Names and links in chat, never ids or JSON. Models by display name.
3. Half a sentence of reason per important choice ("static on the reveal so
   her face does the work").
4. Silent polling; one line per phase; a frame link per scene.
5. Never present a shot with the wrong speaker, a clone or a drifted face as
   done. Say "applied, not yet checked" until the check ran.
6. The user's language in chat; English in prompts and tool arguments;
   dialogue in the language the user asked for.

## Reference docs

Recipes (one per sub-genre; each has structures by length, hook and payoff,
camera, light, sound, model picks with credits, prompt pairs, failures and
policy):

- [references/narrative-drama.md](references/narrative-drama.md): narrative short film and drama.
- [references/trailers-teasers.md](references/trailers-teasers.md): trailers, teasers, bumpers.
- [references/horror-thriller.md](references/horror-thriller.md): horror, thriller, found footage.
- [references/sci-fi.md](references/sci-fi.md): science fiction.
- [references/action.md](references/action.md): chases, fights implied, stunts.
- [references/romance.md](references/romance.md): romance and intimate drama.
- [references/noir-mystery.md](references/noir-mystery.md): noir, detective, mystery.
- [references/comedy-sketch.md](references/comedy-sketch.md): sketches, deadpan, physical comedy.
- [references/dialogue-scenes.md](references/dialogue-scenes.md): coverage, eyelines, the line, lip sync limits, labelled dialogue per model, identity routes.
- [references/period-pieces.md](references/period-pieces.md): eras, wardrobe, anachronism control.

Craft and platform:

- [references/story-structures.md](references/story-structures.md): arc menus with beat counts and word budgets, setup and payoff, cold open, twist.
- [references/acting.md](references/acting.md): performance direction for AI video, behaviour words, bad-acting symptoms and fixes.
- [references/prompt-anchors.md](references/prompt-anchors.md): the two prompts, model dialects, lenses, film looks, grades, light, banned words.
- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes for a dialogue scene, references, chaining, grade, trims.
- [references/troubleshooting.md](references/troubleshooting.md): errors and genre failures with fixes.
