# Recipe: global escalation montage

One event, then the whole world reacting to it: a broadcast interrupted,
newsrooms talking over each other, a debate that turns heated, squares
filling, capitals meeting at night, one last image. The viewer must feel
that everyone is reacting to the same thing. This is not a news recap. It is
a trailer cut from invented coverage, built in Lavendly one clip per shot on
the grid of one score, with every word drawn in post.

Golden rule: show the world reacting, not the event happening.

## 1. Purpose, audience, ending

- Purpose: make one event feel world-sized through the reactions to it:
  media, politics, the street, other countries. On Lavendly: the cold open
  of a series, a pitch for a thriller, the aftermath film of a company's
  own story told as fiction.
- Audience: people who know the grammar of breaking news and decide in two
  seconds whether this is real enough to keep watching.
- The ending: everything cuts at once, one bar of silence, then the
  quietest wide of the film held 2 s with empty space for a title card. The
  last shot creates anticipation; it never resolves the event.

## 2. The five stages

Every montage follows five stages in this order. On Lavendly each stage is
one sequence (`create_sequence`), named as in the table, holding one named
scene per shot in film order. The lengths are starting points; once the
score is measured they become bar counts (section 6).

| Stage | Sequence name | Length | Cut length | Picture | Sound |
|---|---|---|---|---|---|
| 1 | The trigger | 3 to 5 s | 2 to 4 s | A broadcast interrupted, an anchor touching an earpiece, phones lighting up with an alert, a room going quiet | A hard interruption, an alert tone, a short silence, the first anchor line |
| 2 | Media frenzy | 5 to 10 s | 1 to 2 s | Several channels on the same story, reporters live from different places, people watching screens in public, split screens drawn in post | A second broadcast, then a third, radio, presenters cutting across each other, the score entering |
| 3 | Public debate | 5 to 10 s | 0.7 to 1.5 s | A heated studio debate, a press conference, a journalist pressing an official, an organiser speaking, street interviews, phone screens scrolling | Contradicting voices, overlapping lines, one hard question |
| 4 | Mass reaction | 8 to 15 s | 0.7 to 1 s | Crowds filling squares, police lines, emergency vehicles, celebration in one city and panic in another, several countries at once | Chanting, sirens, a helicopter, radio traffic, the score rising |
| 5 | Global escalation | 5 to 10 s | 0.3 to 1 s | Capitals, an emergency meeting, the biggest crowd, market screens, an airport stalled, a wall of broadcasts, one last image | Reports piling up, percussion, rising bass, a dead stop, the last card |

The five stages run 26 to 50 s. A longer film repeats stages 2 to 4 with a
new consequence each round, never the same beat twice.

## 3. What Lavendly cannot do, and what to do instead

| Montage convention | On Lavendly |
|---|---|
| The whole montage in one generation | Never. One clip per shot, one named scene per shot in film order, one sequence per stage. A 30 shot montage is 30 scenes |
| Chyrons, tickers, headlines, maps, phone screens, title cards | Models misspell. Generate the picture clean and draw the text in post as flat graphics over the clip. In every prompt the screens in frame show a plain blue or white field |
| A real network, a real anchor, a real leader | Invented names only: a network, a city, a minister. Fiction stays fiction |
| A photoreal face in the opening frame | Some video models refuse it. Keep opening frames face-free (a back, a silhouette, a screen, a square from above) and give talking anchors and debate guests a video model that accepts faces |
| Dozens of 1 s shots, each paid in full | Generate at the model's shortest length and trim to the grid with `edit_clip`; `split_clip` gives two cuts from one clip |
| A newsroom that looks different in every shot | One place per thread, described word for word, with fixed references wired to every shot of the thread |
| Sound stacked in an editor | Film tracks: one score, one voiceover for every spoken line, the clips' own sound as the third layer |

## 4. Structures by length

Example grid: a score at 120 BPM in 4/4 has a 500 ms beat and a 2 s bar.
Measure the real score first (section 6) and recompute the bars.

### 30 s: the short form, 15 bars

| Stage | Bars | Shots | Cut | What the viewer sees |
|---|---|---|---|---|
| The trigger | 1 to 2 | 2 | 2 s | The interruption, the alert on a phone |
| Media frenzy | 3 to 5 | 4 | 1.5 s | Two channels, a square watching a screen, a radio car |
| Public debate | 6 to 8 | 5 | 1 to 1.5 s | The table, the podium, the question, the street, a scrolling phone |
| Mass reaction | 9 to 12 | 8 | 1 s | Two squares, sirens, a helicopter, a second country |
| Global escalation | 13 to 15 | 7, then the last image | 0.5 s, then 2 s | Capitals, market screens, the wall of broadcasts, silence, the last wide |

About 27 shots. Generate 4 s clips and trim; every clip serves one cut,
some two.

### 60 s: the full montage, 30 bars

| Stage | Bars | Shots | Cut |
|---|---|---|---|
| The trigger | 1 to 2 | 2 | 2 to 4 s |
| Media frenzy | 3 to 8 | 8 | 1 to 2 s |
| Public debate | 9 to 15 | 10 | 0.7 to 1.5 s |
| Mass reaction | 16 to 25 | 16 | 0.7 to 1 s |
| Global escalation | 26 to 30 | 10, then the last image | 0.3 to 1 s, then 2 s |

About 46 shots. Stage 4 is where the film earns its length: several
countries, each with its own square and its own light.

### Longer

Over 60 s, add one round of stages 2 to 4 per extra 30 s, each round with
a new consequence (a border closes, a market halts, a second city joins).
Check the film length cap with `get_status` before planning. Over 90 s,
propose two films that share the trigger, or build the long cut shot by
shot through the MCP with the user's go.

## 5. Visual language

Mix the sources so the montage reads as a collection of perspectives, not a
run of polished shots. Each shot names its source in the style line, and no
two neighbours share a source.

| Source | Style line |
|---|---|
| Studio camera | "broadcast studio camera, locked-off, 50mm, even key light, a plain blue field on the wall screen" |
| Live reporter | "handheld news camera, slight sway, a reporter in a medium shot, the street behind out of focus" |
| Phone footage | "upright phone video, handheld, exposure pumping, a crowd at arm's length" |
| Surveillance | "high fixed camera, wide lens, slight barrel distortion, flat grey light" |
| Aerial | "slow aerial over a city square at dusk, the crowd a dark mass" |
| Press room | "press room, a podium, camera flashes popping, 85mm from the back of the room" |
| Street interview | "35mm at eye level, one person answering off lens, traffic behind" |
| Headlines, screens | Drawn in post over a clean plate: a desk with a newspaper face down, a dark phone, a wall screen as a plain field |

## 6. Editing rules: cut on the grid

- Score first. Attach one score for the whole film before any cut is
  planned (section 8). Measure its BPM and count bars from the first
  downbeat; a generated score may not follow the BPM in the brief, so
  measure, never assume. Ask the user to confirm the downbeats in the app's
  player when the sync must be exact.
- Cuts land on beats. Stage changes land on phrase lines (every 4 or 8
  bars). The drop to silence lands on a bar line.
- Cut lengths halve stage by stage: 2 to 4 s, 1 to 2 s, 0.7 to 1.5 s, 0.7
  to 1 s, 0.3 to 1 s. Guidelines, not law: a line that needs 3 s gets 3 s.
- Pre-cut the shots: `edit_clip` with `start_ms` and `end_ms` to a whole
  number of beats, so clip starts fall on beats as the clips play back to
  back. `split_clip` for two cuts from one clip; `move_clip` when a shot
  lands better elsewhere on the grid.
- Transitions: hard cuts. J-cuts and L-cuts come from the voiceover track
  (a line starts under the previous shot). A broadcast interruption is a
  hard cut with the alert tone on it. Match cuts between two cities (a hand
  raising a phone in each). Split screens and a single flash of static are
  post graphics, at most one of each.
- No dissolves, wipes or glitch runs. The footage has to feel urgent and
  believable.

## 7. Text in post

- Never ask the picture for words: no chyron, ticker, headline, logo, map
  label, phone interface or title card in a prompt. Models misspell, and a
  misspelt ticker breaks the whole film.
- Every prompt ends with "Clean frame, no text, no on-screen graphics". A
  screen in frame is "a plain blue field" or "a white glow"; a newspaper
  lies face down; a phone shows a dark glass.
- Keep a graphics list: for each shot, the text, where it sits (lower third,
  ticker, full card, map), and when it appears on the film clock. Draw them
  flat in post over the exported clip or the finished film.
- Stage names as title cards only when the brief asks for them. The last
  card sits in the silence.

## 8. Sound: five layers on three tracks

Audio carries half the film. The five layers live on Lavendly like this:

| Layer | Where it lives |
|---|---|
| 1 Score | One music track for the whole film, `attach_track` with `"scope": "film"`, one brief with the arc: a low pulse under stages 1 and 2, rising from stage 3, percussion in stage 4, the peak in stage 5, a dead stop one bar before the end |
| 2 Broadcast voices | One voiceover track, `"scope": "film"`, carrying every anchor, reporter, official and guest line in film order, each line at its time on the film clock; music ducking on so the score drops under speech |
| 3 Environment | The clips' own sound: `native` on crowd, siren, helicopter and traffic shots; `mix` under a line; `off` on shots the score alone should carry |
| 4 Communications | Radio and announcement lines on the voiceover track, marked as radio in the voice direction, short and clipped |
| 5 Impacts | Alert tones, interruptions and hits asked of the clip's own sound on the shots that carry them ("SFX: an alert tone at 0 s"), `native` on those clips |

- Progression: one recognisable voice; a second broadcast; voices layered;
  environment in; the score up; controlled chaos; everything cut at once
  before the last image.
- Never every layer at the same level. The voiceover leads, the score ducks
  under it, the clips sit under both. Make deliberate moments of focus: one
  hard question in near silence, one siren alone.
- Build the voiceover as one file for the whole film: the lines with silence
  between them, timed to the shot list, attached once with film scope. When
  the voice is synthesized from text instead, the lines run back to back and
  the shots are timed to them.
- Film-scope audio ends a hair before the film: set each film track's
  `duration` a fraction under the film length so the export never carries a
  tail past the last frame.
- Confirm with `get_workflow_audio` that both film tracks reach every clip.
- The dialogue script: each line with speaker role, voice, the words (4 to
  12), the stage, and its start time on the film clock. One voice at a
  time; a line may overlap the previous picture (the J-cut), never another
  line. One anchor voice per network, a different voice per guest, kept in
  a voice table in the plan.

## 9. Continuity: one event, one place per thread

- The event stays the same: the same what, where and when in every line and
  every prompt. Write it as one sentence and paste it into the plan.
- One place per thread: the newsroom, the square, the debate table, the
  press room, the second city. Each place has a full description (walls,
  desk, the screen as a plain field, light) pasted word for word into every
  prompt of its thread, plus what is not there. Fixed references: a plate
  for each place wired to every shot of its thread, and a grabbed frame
  (`get_scene_frame`) of the first landed shot for the later ones.
- Vary angles and perspectives; never the same crowd or newsroom shot
  twice. Every consequence has a cause the viewer saw: a line, an earlier
  shot, a headline drawn in post.
- Anchors and guests are recurring cast with locked descriptions
  (lavendly-characters). Crowds are masses; no face in a crowd reads.
- One coherent timeline: if the story spans a day, light moves from day to
  night across the film and every sky agrees.

## 10. Workflow on Lavendly

1. Name the triggering event in one sentence, fictional, with invented
   names for the city, the network and the officials.
2. Write the timeline of consequences across the five stages: what happens
   next, where, who speaks.
3. Shot list of 15 to 30 shots (more for 60 s): number, stage, source,
   place, action, cut length, model length, bar position.
4. Attach the score, measure its BPM and bars, put every cut on the grid
   (section 6).
5. Dialogue script with voices (section 8). Graphics list (section 7).
6. `create_workflow` with `shots` in film order, one scene per shot, one
   `aspect`, `project_name`, `idempotency_key`. One sequence per stage with
   `create_sequence` and the stage name. `set_scene_plan` with each scene's
   heading and who is present.
7. References wired per thread with `update_workflow`; face-free opening
   frames; a face-accepting model on the talking shots via the clip's
   `videoModel`.
8. `estimate_cost`; wait for yes. `generate_scene` scene 1 and check it,
   then the anchor shots, then the rest in order.
9. `set_clip_native_audio` per layer; `attach_track` the voiceover;
   `get_workflow_audio` to confirm both tracks reach every clip.
10. Pre-cut to the grid: `edit_clip`, `split_clip`, `move_clip`.
11. `quality_check` per scene and per cut, then the whole film.
    `create_render`. Open the Studio and check the timeline against the
    canvas: one scene per shot, five sequences, one film track per layer,
    the silence and the last image in place. Review for escalation with
    the checklist in section 15.

## 11. Model picks

By role, never by name; the current ids come from `get_status` and the
prompt dialects from lavendly-models.

| Need | Pick |
|---|---|
| Talking anchors, debate guests, officials | A video model that accepts a face in the opening frame and holds one speaking face |
| A recurring place across many shots | A model with reference slots, the place plate on every shot of the thread |
| Silent crowd, city, aerial and surveillance shots | The value model at its shortest length; the score and the voiceover carry the sound |
| The trigger shot | The best model the budget allows: it is held longest and sets the film |

Generate at the shortest length the model offers and trim. A montage spends
on count, not on length.

## 12. Prompt pairs

Worked example, replaced by the user's brief: the lights of one coastal
city, Port Callan, go out for ninety seconds and come back with every screen
showing the same unsigned message. The network is Vesper News; its anchor is
Teodora Lindqvist, locked as "a woman in her fifties, grey bob, navy jacket,
small silver earrings".

### Pair 1: the trigger (a video model that accepts faces)

Still frame:

```text
Broadcast studio camera, locked-off, 50mm, eye level. Teodora Lindqvist: a woman in her fifties, grey bob, navy jacket, small silver earrings, seated at a curved white desk. A plain blue field on the wall screen behind her. Even key light from the front, a cool rim from the left. Palette: navy, white, studio blue. Clean frame, no text, no on-screen graphics.
```

Motion:

```text
Broadcast studio camera, locked-off. 0 to 1 s: she reads from the desk. 1 to 2 s: her hand goes to her earpiece; she looks down, then straight into the lens. "We are getting reports from Port Callan." Exactly one person in frame, nobody else. SFX: an alert tone at 1 s. Clean frame, no text, no on-screen graphics.
```

### Pair 2: media frenzy, face-free (any model)

Still frame:

```text
High fixed camera over Corran Square at dusk, wide lens, slight barrel distortion. Forty people stand still in loose groups, all turned toward one large wall screen showing a plain white field. Wet paving, one tram stopped at the kerb. Flat grey light from an overcast sky. Palette: slate, white, sodium orange. Clean frame, no text, no on-screen graphics.
```

Motion:

```text
High fixed camera, locked-off. The crowd does not move; two people raise phones. The wall screen stays a plain white field. Nobody near the lens, no face readable. Ambient noise: a tram bell, distant traffic. Clean frame, no text, no on-screen graphics.
```

### Pair 3: mass reaction, face-free (the value model)

Still frame:

```text
Handheld news camera, slight sway, 35mm, night. A dense crowd fills Corran Square seen from the rear, backs and raised phones, a line of police vans with blue lights at the far end. Smoke from one flare drifts left. Palette: blue, black, flare orange. Clean frame, no text, no on-screen graphics.
```

Motion:

```text
Handheld, slight sway, a slow push forward through the backs of the crowd. Blue lights sweep across the smoke. The crowd stays a mass, no face turns to camera. SFX: chanting, one siren rising. Clean frame, no text, no on-screen graphics.
```

## 13. Creative direction

Combine documentary texture, political thriller atmosphere, breaking-news
urgency, international crisis coverage and trailer pacing. Avoid: news
footage nobody could place, the same crowd twice, an explosion without a
cause in the story, text in the picture, television graphics that look
wrong, more than one glitch, a score that buries the lines.

## 14. Failure modes and fixes

| Failure | Fix |
|---|---|
| The model writes a ticker or a headline | The clean-frame line in every prompt, screens as plain fields; text in post |
| The opening frame is refused for a face | A face-free opening frame; the talking shot on a model that accepts faces |
| The newsroom changes between shots | The place plate as a reference on every shot of the thread, the description verbatim, a grabbed frame for later shots |
| The cut drifts off the beat | Measure the real score, recut from the first downbeat; cuts on beats, stage changes on bar lines |
| The montage reads as one long shot | Cut lengths halve by stage; never two shots from one source in a row |
| Lines pile on each other | One voice at a time on the voiceover track; a J-cut overlaps picture, never speech |
| The score buries the lines | Ducking on; the voiceover leads; clips at `mix` under a line |
| The ending lands flat | One bar of silence, then the quietest wide held 2 s with space for the title |
| A real network or leader slips in | Invented names only; reshape before any spend |
| An audio tail after the last frame | Film-scope tracks a hair shorter than the film |

## 15. Final checklist

Before delivering, verify: the viewer understands the triggering event; the
story escalates instead of repeating; several media perspectives appear;
political and public reactions feel distinct; places and events vary;
every line is intelligible; the sound builds; the cuts get shorter stage by
stage; the last shot creates anticipation; with the sound off the film still
reads as a trailer.

## 16. Expected output

1. The concept: the event in one sentence and its consequence per stage.
2. The shot list with bar positions, source, place, cut length and model
   length.
3. Per-shot prompts, still frame and motion, place descriptions verbatim.
4. The dialogue script: every line with role, voice, words and film-clock
   time.
5. The graphics list: text, position and time, for post.
6. The track plan: score brief, voiceover file, per-clip native setting,
   ducking.
7. The assembly: scenes in film order, five sequences, the tracks wired to
   every clip (`get_workflow_audio`).
8. The render and the Studio check: timeline matches canvas, and the
   escalation reads with the sound off.

## 17. Policy guards

- Fiction only: an invented event, invented networks, cities and officials.
  Never a real event restaged as news, a real anchor, a real network's look
  or logo, a real politician by name or likeness.
- Crowds and police lines are shown without harm: no gore, no weapons aimed
  at people, nothing a filter would refuse.
- Labelled as fiction when posted (lavendly-publish writes the disclosure).

Show the world reacting, not the event happening.
