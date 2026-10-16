# Prompt anchors: director

The two prompts every shot needs, the hero block, the words to avoid, the
slop list and the narration budget. Taken from the prompts that made the
Quick Start films; what is here has been generated and checked.

## The hero block

1 to 2 sentences, observable only, written once, pasted verbatim into every
still-frame prompt, followed by "from the reference". Opening images are made
from text alone, so the still-frame prompt is where the hero is drawn. The
motion prompt names the hero by its short name and locks it; it repeats the
full block only when the hero enters during the shot.

```text
<Name or thing>: <shape>, <material and finish>, <colour>, <size cue>, <one distinguishing mark>.
```

Examples:

```text
The lamp: a table lamp with a matte stone-grey mushroom dome, a slim brass stem and a round brass base, warm light under the dome.
```

```text
Elias: a lighthouse keeper in his seventies, short white beard, weathered face, grey flat cap, navy wool sweater, kind tired eyes.
```

Never paraphrase the block per shot. A word changed is a different object.

## Still-frame prompt (the opening image)

A stable frame, the start of the shot. It becomes the image the clip
animates from, so it must not show the payoff.

```text
<style phrase, one line>. <hero block> from the reference. <where it sits in the frame and what surrounds it>. <camera position: height, angle, distance>. <light: source, direction, softness, colour>. <materials and surface detail that must read>. <background and depth>. <room left for a title, if any>. No text, no on-screen graphics.
```

Example, scene 1 of a lamp film:

```text
Premium product film still. The lamp: a table lamp with a matte stone-grey mushroom dome, a slim brass stem and a round brass base, warm light under the dome, from the reference. The lamp is off, centred on a dark oak side table, the dome filling the upper third of the frame. Camera at table height, three-quarter angle, close enough that the dome's grain reads. One soft window light from the left, cool, with the right side falling into shadow. Matte stone texture on the dome, brushed brass on the stem. Dark room behind, out of focus. No text, no on-screen graphics.
```

## Motion prompt (the clip)

Change over time. The clip animates its own opening image, so describe what
moves, not the picture. One action, one camera move, the end state stated,
one lock sentence, exact counts.

```text
<style phrase, one line>, one continuous take. <0 to N s: the action, with what moves>. <N to M s: the rest of the action>. <the one camera move, its speed and where it ends>. <end state>. <lock sentence: the hero, the set and the light stay exactly as in the opening frame>. <exact count: exactly one <hero>, nobody else in frame>. Sound: <what is heard inside the shot>. Clean frame: no text, no on-screen graphics, no timestamps.
```

When the hero enters during the shot, add the hero block after the style
phrase so the model can draw it. When the light changes during the shot,
describe the change ("the warm lamp light blooms over the cool window
light").

Example, the same scene:

```text
Premium product film, one continuous take. 0 to 2 s: nothing moves but dust in the window light. 2 to 3 s: a hand enters from the right and presses the brass switch at the base once. 3 to 6 s: warm light blooms under the dome and spreads across the oak, the hand withdraws, the camera pushes in slowly until the dome fills the frame. The lamp, the oak table and the room stay exactly as in the opening frame. Exactly one lamp; the hand is the only other thing that enters. Sound: a soft brass click, room tone. Clean frame: no text, no on-screen graphics, no timestamps.
```

Scene 2 continues in the same room: start the motion prompt with the exit
state of scene 1 ("the lamp is already lit, the camera at rest on the dome")
so the cut carries.

## Dialogue in a clip

Write the line in quotes, with the speaker from the hero block and the
delivery, inside the motion prompt, and keep that clip's native audio on:

```text
He unfolds the letter and reads, half to himself, quiet and hoarse: "You said you would come back when the light was fixed." He looks up at the lens.
```

One line per clip. The model speaks it; native dialogue gets no burned
captions (only a synthesized voiceover does).

## Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the move and the lens: "slow push-in, shallow focus, 35mm look" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic | the thing itself: "warm light blooming across dark oak" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k, ultra-realistic, highly detailed, photorealistic | delete; name the texture: "matte stone, brushed brass" |
| dynamic, energetic, dramatic | the motion: "the hand withdraws fast, the camera follows late" |
| vibe, mood, aesthetic | the light and the colour: "one warm source, cool shadow, muted palette" |

State constraints positively: "locked-off camera", "empty street", "single
figure in frame", "clean frame with no on-screen graphics".

## The slop list

These appear uninvited and read as AI at once. Every motion prompt carries
the clean-frame line; the rest are avoided by the positive instruction that
makes them impossible.

| Artefact | Where it comes from | Positive instruction |
|---|---|---|
| Phone UI, battery icon, timestamp, "REC" dot | "phone video", "handheld footage" | "clean frame with no on-screen graphics, no timestamps" |
| Watermark, stray letters, pseudo-logos | any "product", "brand", "poster" | "no text, no logo" and leave labels blank |
| Extra limbs, fused fingers | hands doing two things | one hand, one action, the contact point named |
| Second copy of the hero | "and another" or a mirror | "the one lamp", reflections named and bounded |
| Floating, sliding, morphing objects | several actions per clip | one action, start and end state stated |
| Changing identity | a paraphrased hero block | the block verbatim, the reference wired |
| Grain, bloom, flare, haze, teal-orange | "cinematic" | delete the word; name the one light source |
| Random slow motion | "dramatic", "epic" | the speed stated: "at walking pace" |
| An object nobody asked for (a golden key in a hollow tree) | an unnamed space: a hollow, a doorway, a box, a table, a pair of hands | say what is inside or on it, or "only light, nothing else" |
| A second copy of a small object (two snowflakes, which one is he following?) | "a snowflake drifts away" with no count | "the one snowflake, the only light in the air" |
| The object on the wrong side (the flake in front of the fox when it should be behind) | no depth order stated | "passes behind his head and shrinks away between the trunks" |
| A movement the model finishes its own way (flakes around the tree instead of into it) | "the flakes stream toward the hollow" | "every flake flies straight into the hollow and vanishes; none goes around or behind" |
| An animal running upright on two legs | "he runs after it" | "on all four paws, a fox's bounding gallop, never upright" |
| An ending gesture nobody asked for (the fox checks his wrist) | the last beat left open | the last beat is one named action by the hero: "the flake lands on his nose; he says Hello?" |
| Two of the hero, or a creature nobody introduced (two Pips; a brown animal in a point of view run) | the cast left open; a point of view with no hero named | "Exactly one Pip in frame, nobody else, no copy of him"; a point of view says "no animal or person in frame"; a new character gets its own introduction shot first |
| The hero unrecognisable, the shot darker than its neighbours | a long shot from behind; no light named | turn the face into view once; name the same light as the previous shot |

## Narration budget

About 2.3 words per second of the scene the line covers. A line that does
not fit is shortened; it never runs over the picture.

| Scene | Words |
|---|---|
| 4 s | 8 to 9 |
| 6 s | 13 to 14 |
| 8 s | 17 to 19 |

Present tense, concrete, one image per sentence, each line hands off to the
next frame. Never "in this video", "imagine", "introducing", "welcome to".

## Style phrases that work

One line, placed first in both prompts, kept identical across the film:

- "Premium product film still" / "Premium product film, one continuous take"
- "Narrative short film, 35mm look"
- "Nature documentary, clean and observational"
- "Clean educational animation in the flat illustrated style of the reference"
- "Photoreal vertical video, clean frame"
- "Macro documentary of a craft process"
