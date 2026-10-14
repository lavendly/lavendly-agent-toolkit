# Prompt anchors: director

The two prompts every shot needs, the hero block, the words to avoid, the
slop list and the narration budget. Taken from the prompts that made the
Quick Start films; what is here has been generated and checked.

## The hero block

1 to 2 sentences, observable only, written once, pasted verbatim into both
prompts of every shot, followed by "from the reference".

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

Change over time. One action, one camera move, the end state stated.

```text
<style phrase, one line>, one continuous take. <hero block> from the reference. <starting state, matching the still frame>. <0 to N s: the action, with what moves and what stays still>. <N to M s: the rest of the action>. <the one camera move, its speed and where it ends>. <light, repeated from the still frame>. <end state>. Sound: <what is heard inside the shot>. Clean frame: no text, no on-screen graphics, no timestamps.
```

Example, the same scene:

```text
Premium product film, one continuous take. The lamp: a table lamp with a matte stone-grey mushroom dome, a slim brass stem and a round brass base, warm light under the dome, from the reference. The lamp is off on a dark oak side table, one soft cool window light from the left. 0 to 2 s: nothing moves but dust in the window light. 2 to 3 s: a hand enters from the right and presses the brass switch at the base once. 3 to 6 s: warm light blooms under the dome and spreads across the oak, the hand withdraws, the camera pushes in slowly until the dome fills the frame. The lamp stays exactly the same object throughout. Sound: a soft brass click, room tone. Clean frame: no text, no on-screen graphics, no timestamps.
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

One line per clip. The model speaks it; the words also feed the captions.

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
- "Cinematic short film, 35mm look" (the word is allowed here because the
  phrase names a format, not a quality; never add it as praise elsewhere)
- "Nature documentary, clean and observational"
- "Clean educational animation in the flat illustrated style of the reference"
- "Photoreal vertical video, clean frame"
- "Macro documentary of a craft process"
