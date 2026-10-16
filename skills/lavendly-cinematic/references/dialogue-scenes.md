# Recipe: dialogue scenes

Two or three people talking: the scene type every genre needs and the one
generated video gets wrong most often (wrong speaker, drifting faces,
crossed eyelines, burned-in subtitles, lines too long to sync). This recipe
is the coverage, the geometry and the per-model syntax that avoid it.

## 1. Purpose and ending

- Purpose: a relationship changes in front of us. Someone wants something
  from the other person, and by the end one of them has it, has lost it, or
  knows something new.
- Audience: anyone; the scene is the core of drama, romance, noir, comedy.
- The ending delivers the change, usually on a face that does not speak: the
  listener's reaction is the payoff shot.

## 2. Geometry first

Draw the scene before writing a prompt:

- Who sits or stands where, written as screen sides: "Mia on the left,
  facing right; Tom on the right, facing left." Paste this sentence into
  every still and motion prompt of the scene.
- The line runs between their eyes. The camera stays on one side of it for
  the whole scene. Crossing needs a visible move or a neutral shot (straight
  down the line, or a wide from a new side shown in its own shot).
- Eyelines: each looks toward the other's side of the frame at the other's
  eye height. In Mia's single she looks screen right, slightly off the lens;
  in Tom's single he looks screen left.
- Mirrored reverses: the two singles share size, lens, height and distance.
  If Mia sits in the left third, Tom sits in the right third.

## 3. Coverage on Lavendly

| Shot | Size, lens | Use | Lines in it |
|---|---|---|---|
| Master two-shot | Wide or medium wide, 35mm, eye level | Geography, entrances, the silence before | None, or one short line |
| Over the shoulder on Mia | Medium close-up, 50mm, from behind Tom's right shoulder | Lines where the relationship matters | Mia's line; Tom is a soft shoulder and the back of his head in the right foreground |
| Over the shoulder on Tom | Mirror of the above | | Tom's line |
| Single on Mia | Medium close-up or close-up, 85mm | The turn, the confession | Mia's line |
| Single on Tom | Mirror | | Tom's line |
| Reaction | Close-up, 85mm | The payoff; the listener | None |
| Insert | Macro or close, 100mm | The object of the scene (the ring, the letter) | None |

Rules:

- One clip, one speaker. Never ask one clip for two speakers on Veo; Kling
  v3 can hold a short exchange in one clip (section 6), Seedance can with
  care, the rest cannot.
- The speaker's face is in frame for every line. A line heard over a
  listener is written as narration-style off-screen speech and the listener's
  clip has no lip movement asked for.
- Cut to the listener before the line ends when the reaction matters more
  than the line; the speaker's clip is trimmed with `edit_clip` and the
  listener's clip carries the tail of the sound only if it was generated
  with that sound (otherwise keep the cut after the line).
- Over-the-shoulder shots put two people in frame. Count them: "Exactly two
  people in frame: Mia facing camera, the back of Tom's head and his right
  shoulder out of focus in the right foreground."

## 4. Structures by length

Model lengths are Veo lengths (4 or 8 s). On Kling or Seedance generate 5 s
for up to 5 s, 10 s for up to 10 s.

### 6 s: one line and its answer in a face

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | MCU, eye level, 85mm | locked-off | Mia looks up from the mug and says five words | 4 s | 4 s |
| 2 | CU, eye level, 85mm | locked-off | Tom's reaction: he stops, looks down | 2 s | 4 s |

### 15 s: the exchange

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Medium wide two-shot, 35mm | locked-off | They sit across the table; she turns the mug | 3 s | 4 s |
| 2 | OTS on Mia, 50mm | locked-off | She says her line (5 words) | 4 s | 4 s |
| 3 | OTS on Tom, 50mm | locked-off | He answers (3 words) | 3 s | 4 s |
| 4 | CU Mia, 85mm | very slow push-in | No line; she takes in the answer | 5 s | 8 s |

### 30 s: a turn

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Wide master, 35mm | locked-off | Kitchen at night, both seated, silence | 4 s | 4 s |
| 2 | Insert, 100mm | locked-off | The house keys on the table between them | 3 s | 4 s |
| 3 | MCU Mia, 85mm | locked-off | Line 1 (5 words) | 4 s | 4 s |
| 4 | MCU Tom, 85mm | locked-off | Line 2 (4 words), looks at the keys | 4 s | 4 s |
| 5 | MCU Mia | locked-off | Line 3 (6 words), the turn | 5 s | 8 s |
| 6 | CU Tom | slow push-in | Reaction, no line | 4 s | 4 s |
| 7 | Wide master | locked-off | He slides the keys back to her; held | 6 s | 8 s |

### 60 s: two turns

Shots 1 to 7 above, then: 8 OTS on Tom, line 4 (5 words), 4 s; 9 OTS on
Mia, line 5 (4 words), 4 s; 10 insert on her hand closing over the keys,
3 s; 11 two-shot, she stands, 5 s; 12 single Tom, he does not look up, 4 s;
13 wide from the doorway (a new side, shown as its own shot), she leaves
frame, 6 s. Twelve to thirteen shots, eight to ten lines.

### 90 s: a scene with a midpoint

The 60 s scene plus a midpoint where the power shifts at about 45 s: a
change of position (one stands, one moves to the window) shown in a wide
before any single from the new position. After the move, rewrite the screen
sides in every prompt. Fifteen to eighteen shots, twelve to fourteen lines.

## 5. Hook and payoff

- Hook: open on a face mid-thought or an object that holds the conflict (the
  keys, the ring), not on hellos. The first line is the middle of the
  argument.
- Payoff: the listener's face after the last line, static, held 3 s; or the
  object moving from one side of the table to the other.

## 6. Labelled dialogue per model

| Model | Syntax | Notes |
|---|---|---|
| Veo 3.1, Fast | `Mia, the woman on the left in the green cardigan, says quietly: "I sold the house." (no subtitles)` | English is the only evaluated language. Describe the speaker by position and clothing; one speaker per clip; "(no subtitles)" right after the line stops burned-in captions |
| Kling v3 Pro, Standard | `[Character A: Mia, woman on the left, quiet hoarse voice]: "I sold the house."` then `After a pause, [Character B: Tom, man on the right, flat voice]: "When."` | Five languages (Chinese, English, Japanese, Korean, Spanish). Stable labels, no pronouns, action before the line, a timing word between lines. Up to two short lines per clip |
| Seedance 2.0, 2.5 | `The woman on the left in the green cardigan says, quietly: "I sold the house." The man on the right stays silent and looks at the table.` | Say who stays silent. Prone to lip-sync drift and eyeline errors: keep lines short and the listener named |
| Wan 2.7, 3.0 | `She looks up and says: "I sold the house."` | Test one clip first; keep to one short line |
| Hailuo 3 | `The woman says: "I sold the house."` | Hailuo 3 only; 3 Max and 2.3 are silent |
| FLUX 3 Video | Veo syntax | Sound on |
| Runway, Hailuo 3 Max, HeyGen, Grok, HappyHorse | No native dialogue on Lavendly | Use for silent coverage (wides, inserts, reactions) only |

Delivery labels stay identical for a character in every clip ("quiet hoarse
voice") so the generated voices stay close. Timbre still varies between
generations; level-match with `set_clip_native_audio` volume (0 to 2) per
clip after listening in the render.

## 7. Identity across singles: three routes

Opening images are made from text alone on the MCP path, so two close-ups of
Mia can show two slightly different women. Pick the route by how strict the
scene is.

| Route | How | Cost | Strength |
|---|---|---|---|
| Text lock | The locked description verbatim in every still prompt; the character's reference wired to each clip she is in (within the cap) | Opening images about 2 credits each | Good for wides and medium shots; close-ups may drift |
| Chain | For a continuing shot from the same angle, not trimmed at its end: `get_scene_frame` frame last on the earlier scene, `/api` plus that path on the next scene's image node | No image cost | Strong for one or two hops; drifts after 2 to 3 hops; never for a new angle |
| App stills | The user makes each close-up's opening still in the Lavendly app from the character reference (image-to-image takes references there), shares the hosted link; set it as the image node `data.url` with `update_workflow` | Image credits in the app | Strongest; use for the turn and the payoff close-ups |

Never zoom into a landed wide shot for a close-up: past about 1.5 times the
picture turns to mush. A close-up is its own clip.

## 8. Camera, light and colour

- Camera: locked-off for every line. A slow push-in only on the turn, only on
  a listener or a silence. No orbit around a table: it crosses the line.
- Light: one scene source, the same in every shot (the pendant lamp above
  the table). The singles take their key from that source's side: if the
  lamp is above and slightly left, both faces are lit from above-left.
- Colour: one palette line for the scene; a warm interior against a cool
  window is the classic two-colour contrast that also separates the faces
  from the background.

## 9. Sound

- Native audio `native` on every clip that speaks; `native` on reactions too,
  so the room tone carries across cuts.
- The same ambience line in every prompt of the scene ("Ambient noise: a
  refrigerator hum, a clock ticking") so the cuts do not jump.
- Score: none under the lines, or one low bed that enters after the last
  line (volume 0.2 to 0.3, `ducking` on has no effect without a voiceover).
- Leave 0.3 to 0.5 s of air before and after each line; trim to it.
- Captions: the platform burns captions only from a voiceover track's word
  timings, so native dialogue is not captioned from the MCP. Say so; a
  sound-off version must read on picture alone, or the user adds captions in
  the app.

## 10. Model picks and cost

| Tier | Model | Why | 15 s (4 clips) | 30 s (7 clips) |
|---|---|---|---|---|
| Best, English | Veo 3.1 | Best lip sync and delivery, 2 refs, 8 s with references | 3 x 47 + 94 = 235 plus 8 for opening images | 5 x 47 + 2 x 94 = 423 plus 14 |
| Value, English | Veo 3.1 Fast | Same grammar, a third of the price | 3 x 14 + 28 = 70 plus 8 | 5 x 14 + 2 x 28 = 126 plus 14 |
| Other languages | Kling v3 Pro | Labelled speakers in five languages, faces held from the still | 4 x 20 = 80 plus 8 | 6 x 20 + 40 = 160 plus 14 |
| Two refs plus a location | Seedance 2.0 Fast | 4 references (Mia, Tom, the kitchen, a style plate) | 4 x 11 = 44 plus 8 | 6 x 11 + 22 = 88 plus 14 |
| Draft | Seedance 2.0 Mini | Cheapest with sound and 4 references | 4 x 9 = 36 plus 8 | 6 x 9 + 18 = 72 plus 14 |

Opening images about 2 credits each; the estimate gives the exact figure. On
Veo, a clip with references wired is generated at 8 s (the provider asks for
8 s with reference images), which doubles the 4 s price: wire references to
the singles only when identity matters more than the money.

## 11. Prompt pairs

### Pair 1: the confession (Veo 3.1 Fast, MCU single)

Still frame:

```text
Narrative short film still, 35mm film look, fine grain. Medium close-up at eye level, 85mm lens, shallow depth of field. Mia: a woman in her late thirties, warm light-brown skin, shoulder-length black curly hair, small gold hoop in her left ear only, faded green cardigan. She sits at a small kitchen table at night, both hands around a mug, eyes on the mug. Warm pendant lamp above the table, soft; window behind her deep blue. Palette: amber, olive, navy.
```

Motion:

```text
Narrative short film, 35mm film look, one continuous take. Locked-off camera. 0 to 2 s: Mia keeps her eyes on the mug and turns it a quarter turn. 2 to 5 s: she lifts her eyes to someone off screen right and says quietly: "I sold the house." (no subtitles) 5 to 8 s: her jaw tightens and she holds the look without blinking. Her face, her cardigan, the kitchen and the lamp light stay exactly as in the opening frame. Exactly one person in frame, nobody else. Ambient noise: refrigerator hum, a clock ticking. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 2: the answer (Veo 3.1 Fast, mirrored single)

Still frame:

```text
Narrative short film still, 35mm film look, fine grain. Medium close-up at eye level, 85mm lens, shallow depth of field. Tom: a man in his early forties, pale skin, short grey-brown hair, a two-day beard, a thin scar through his left eyebrow, a navy work shirt. He sits in the right third of frame facing screen left. Warm pendant lamp above, soft; dark hallway behind him. Palette: amber, olive, navy.
```

Motion:

```text
Narrative short film, 35mm film look, one continuous take. Locked-off camera. 0 to 2 s: Tom is already looking at the keys on the table below frame; he does not look up. 2 to 4 s: he says, flat and low: "When." (no subtitles) 4 to 8 s: he looks up slowly toward screen left, at her eye height, and swallows once. His face, his shirt, the table and the lamp light stay exactly as in the opening frame. Exactly one person in frame, nobody else. Ambient noise: refrigerator hum, a clock ticking. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 3: the exchange in one clip (Kling v3 Pro, Spanish)

Still frame:

```text
Narrative short film still, 35mm film look. Medium two-shot in profile at table height, 50mm lens. On the left, Lucia: a woman in her sixties, silver hair in a low bun, black cardigan. On the right, Andres: a man in his thirties, curly black hair, grey hoodie. They sit across a small café table, two coffee cups between them. Soft daylight from the café window behind the table. Palette: cream, black, grey, warm brown.
```

Motion:

```text
Scene: a small café, daytime, the same table. Characters: Lucia on the left facing right, Andres on the right facing left. Action: Lucia sets her cup down, then [Character A: Lucia, calm low voice]: "Ya lo sabía." After a pause, [Character B: Andres, quiet surprised voice]: "¿Desde cuándo?" Lucia only smiles. Camera: static, profile two-shot. Audio: café murmur, a cup set on a saucer. Their faces, clothes and the table stay exactly as in the opening frame. Exactly two people in frame, nobody else. Clean frame: no text, no subtitles.
```

Second family notes: on Seedance, write the same exchange as a production
note with a TIMELINE of two blocks, each naming the speaker by side and
clothing, and say "the other person stays silent" in each block.

## 12. Failure modes and fixes

| Failure | Fix |
|---|---|
| The wrong person speaks | One speaker per clip; the speaker named by side and clothing; the listener written as silent; single shots for lines |
| Lips drift off the words | Shorter line (1.2 words per second), medium close-up, locked camera, no head turn during the line |
| Burned-in subtitles | "(no subtitles)" after each Veo line; the clean-frame line at the end |
| Eyelines miss each other | Write the look direction and height in both singles; mirrored sizes |
| The line is crossed | Same screen-side sentence in every prompt; never an orbit; a neutral shot before any new side |
| Mia's face differs between singles | App stills for the hero close-ups; the identity line verbatim; references wired |
| A third person appears in the background | The count line names everyone; the background described as empty ("the hallway behind him is empty and dark") |
| Voices change timbre between clips | Identical delivery labels; level-match with native audio volume; keep long speech off screen |
| Over-acting on the line | Behaviour words, "holds the look", a smaller size for a smaller gesture ([acting.md](acting.md)) |

## 13. Policy guards

- Fictional people only; no voice or face of a real person, no "sounds like"
  a known actor.
- Dialogue in a language the model handles (section 6); state the language
  in the plan.
- No minors in romantic, violent or frightening exchanges.
