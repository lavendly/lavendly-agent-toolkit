# Prompt anchors: multi-clip

The two blocks that hold a film together, and the vocabulary around them.

## Character anchor template

1 to 2 sentences. Age, build, wardrobe colour and material, hair,
distinguishing marks. Written once, pasted byte for byte into every shot.

```text
<Name>, <age range>, <build>, <wardrobe: colour and material, two items>, <hair: colour, length, how worn>, <one mark: scar, glasses, a ring, a bag>.
```

Example (Mara, the worked example used through this file; the user's own
character replaces her):

```text
Mara, late twenties, slight and quick, a rust-red waxed cotton coat over a grey wool sweater, black hair cut at the jaw, a brass compass on a cord around her neck.
```

## Palette anchor template

1 sentence. Lighting source, time of day, colour grade.

```text
<light source and direction>, <time of day>, <grade in two or three words>.
```

Example:

```text
Low dawn sun from the east with long shadows, cool shade and warm highlights, muted teal and copper grade.
```

## Shot prompt template

```text
<character anchor, verbatim>
<palette anchor, verbatim>
<one camera move>
<beat action, last>
```

The anchors never change. Camera and action change every shot.

## Worked example: three shots, 16 s

Shot 1, 6 s, market:

```text
Mara, late twenties, slight and quick, a rust-red waxed cotton coat over a grey wool sweater, black hair cut at the jaw, a brass compass on a cord around her neck.
Low dawn sun from the east with long shadows, cool shade and warm highlights, muted teal and copper grade.
Static wide shot, locked-off camera.
She enters from the left between two market stalls as a vendor lifts a canvas awning.
```

Shot 2, 4 s, bridge:

```text
Mara, late twenties, slight and quick, a rust-red waxed cotton coat over a grey wool sweater, black hair cut at the jaw, a brass compass on a cord around her neck.
Low dawn sun from the east with long shadows, cool shade and warm highlights, muted teal and copper grade.
Handheld tracking following the subject from behind, subtle shake.
She crosses an iron footbridge, unfolds a letter, reads it while walking.
```

Shot 3, 6 s, station:

```text
Mara, late twenties, slight and quick, a rust-red waxed cotton coat over a grey wool sweater, black hair cut at the jaw, a brass compass on a cord around her neck.
Low dawn sun from the east with long shadows, cool shade and warm highlights, muted teal and copper grade.
Slow dolly push from a medium shot to a close-up on her face.
She stops under the station clock, folds the letter into the coat pocket, and looks up at the departures board.
```

Narration (35 words for 16 s, inside the 2.3 words per second budget):

```text
The stalls open before the city does.
On the bridge she reads the letter one more time.
Six o'clock. The board turns over. She does not look back.
```

Music, one score: "sparse felt piano and low strings, opening on a held note
over the market, building through the bridge, release into a single
sustained chord at the station."

## Camera moves, one per shot

| Say this | Not this |
|---|---|
| slow dolly push from medium shot to tight close-up | cinematic zoom |
| locked-off static camera, no movement | no camera shake |
| handheld tracking following the subject, subtle shake | dynamic handheld energy |
| crane shot rising from ground level to overhead | epic drone reveal |
| the camera glides alongside the subject as they move | smooth cinematic tracking |
| slow pan left to right | sweeping pan |
| static wide shot, subject enters frame left | wide cinematic establishing shot |

Framing across a film: change shot size between consecutive shots (wide,
then medium, then close), or reverse it. Two identical sizes in a row read as
a slideshow.

## Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic | the move and the lens: "slow dolly push, shallow focus" |
| stunning, breathtaking, gorgeous, beautiful, amazing | the thing itself: "low sun on wet slate" |
| masterpiece | delete |
| 8k, 4k, ultra-realistic, highly detailed, photorealistic | delete; describe texture: "waxed cotton, brass, worn oak" |
| epic | the scale: "crane rising until the bridge is a line" |
| dynamic, energetic | the motion: "she turns fast, the camera follows late" |

State constraints positively: "locked-off camera", "empty street", "single
figure in frame", never "no shaky camera", "no crowds", "no extra people".

## Narration budget

About 2.3 words per second per shot. Total words equal the film's seconds
times 2.3, spread one line per beat.

| Shot | Words |
|---|---|
| 3 s | 6 to 7 |
| 5 s | 10 to 12 |
| 6 s | 13 to 14 |
| 8 s | 17 to 19 |
| 10 s | 20 to 24 |

Present tense, concrete, each line hands off to the next image. Never "in
this video", "imagine", "once upon a time", "in a world where", "welcome to".

## Seams

When a shot continues from the previous one, describe the exit motion of the
earlier shot at the start of the new action ("the camera is still drifting
left at walking pace") so velocity carries across the cut, not only the
frame.
