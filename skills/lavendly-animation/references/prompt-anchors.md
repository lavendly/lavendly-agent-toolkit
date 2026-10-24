# Prompt anchors: animation

The two prompts every animated shot needs, the style line, the hero block,
the lock and count sentences, reference roles, model dialects, the words to
avoid, studio-free style language and the narration budget.

## 1. The still-frame prompt (the opening image)

On the MCP path every scene's opening image is drawn from this text alone,
with no reference images. It is cut at 500 characters, so keep it under 500
and put the words that must survive first: the style line, then the hero.
If it does not fit, cut background words, never the style line or the hero.

```text
<style line>. <hero block>. <pose and placement: the start state of the shot>. <setting with 2 to 3 props; anything hollow or open says what is inside>. <camera: size, angle, lens feel>. <light line>. Palette: <3 to 5 named colours>. <room for a title, if any>. No text, no letters.
```

- A stable frame: no action verbs that only make sense in motion, no camera
  move, never the payoff (the clip animates from this start).
- No aspect ratio and no model name in the text; the server sends the shape.
- Exactly the same style line, palette and light line in every still of a
  scene, word for word.

## 2. The motion prompt (the clip)

The clip animates its own opening image, so describe the change, not the
picture.

```text
<style line>, one continuous take. <motion feel: stepped on twos, or smooth>. 0 to N s: <the action and what moves>. N to M s: <the rest>. Camera: <one move with speed and where it stops, or locked-off>. End state: <the final pose and position>. <lock sentence>. <count line>. <reference role sentences, only when references are wired>. Sound: <what is heard inside the shot>. Clean frame: no text, no on-screen graphics.
```

- Name the hero by its short name. Repeat the full hero block only when the
  hero enters during the shot.
- One action per clip, at most 1 to 2 action beats per 5 s.
- Ask for motion already under way from the first frame when the shot
  continues an action ("already mid-stride from the first frame").
- Say where every moving thing ends ("into the basket", not "toward it").

### Lock sentences

Examples:

```text
The hippo, the river bank and the dusk light stay exactly as in the opening frame.
The paper texture and the line work stay fixed; only the characters move.
The clay keeps its fingerprints and the set does not move.
```

### Count lines

Examples:

```text
Exactly one Nilo in frame, nobody else, no copy of him.
Exactly two characters in frame, Nilo on the left and the kingfisher on the right, nobody else.
The one low sun is the only light on the river.
```

### Reference role sentences

One job per wired image, with what to ignore. Order of priority when slots
are short: the hero's face or head, then the hero's full body or the
object, then the style plate, then the location. Examples:

```text
Reference 1 is Nilo's head and face only: skin colours, ear shape, eye shape; ignore its background and pose.
Reference 2 is the style plate: match its palette, paper grain and line weight only, not its content.
```

Never wire references into a Veo 3.1 Lite (Auto) scene: it takes none.

## 3. The hero block

1 to 2 sentences, observable only, written once, pasted verbatim into every
still-frame prompt. For an animated character:

```text
<Name>: <species or object>, <body shape and proportion>, <colour of each main area>, <eyes: shape, colour, catchlight>, <one garment or accessory>, <one asymmetric mark>.
```

Example:

```text
Nilo: a young round grey-lavender river hippo, short legs, a wide pink muzzle, small round ears, small dark eyes with one white catchlight each, a yellow knotted neckerchief, a pale pink patch over the left eye only.
```

Never paraphrase it per shot; a changed word is a different character.

## 4. Style lines (studio-free)

One line, first in both prompts, identical across the film. Full looks and
their light rules are in [style-bible.md](style-bible.md).

| Style | Style line |
|---|---|
| 3D feature look | Stylised 3D animation, rounded appealing shapes, soft subsurface skin and fur, warm bounce light |
| Anime | 2D cel-shaded animation, clean line art with a heavier outer contour, two-tone hard shadows, hand-painted backgrounds |
| 2D cartoon | 2D cartoon animation, thick even black outlines, flat colour fills, simple painted backgrounds |
| Claymation | Plasticine stop-motion animation, visible fingerprints and tool marks, miniature handmade set |
| Felt | Needle-felted stop-motion animation, visible wool fibres and stitching, miniature fabric set |
| Paper cutout | Cut-paper stop-motion animation, layered card with visible thickness, torn white fibre edges, small shadows between layers |
| Collage | Paper collage animation, halftone cut-out photos, kraft paper and newsprint, tape and torn edges |
| Watercolour | Watercolour storybook animation, wet-edged washes, visible cold-press paper grain, soft pencil underdrawing |
| Gouache | Gouache storybook animation, matte opaque paint with soft brush edges on textured paper |

## 5. Turning a studio, artist or franchise name into words

Never write a studio, director, artist, franchise or character name in a
prompt. Several models refuse or penalise them, and the film must not borrow
a protected look. When the user names one, describe the traits instead and
say so in half a sentence ("I describe the look rather than naming the
studio").

| The user asks for | Write |
|---|---|
| A big 3D family-feature look | rounded appealing shapes, large expressive eyes, soft subsurface skin, detailed fabric and fur, warm key with cool fill, shallow depth of field |
| A hand-drawn fantasy feature look | hand-painted watercolour backgrounds, clean thin line art, soft natural daylight, towering cumulus clouds, pastoral greens and blues |
| A plasticine comedy studio look | plasticine claymation, wide mouths with visible teeth, glossy bead eyes, thumbprints on every surface, cosy miniature interiors |
| A gothic puppet stop-motion look | stop-motion puppets with fabric costumes and glass-bead eyes, slim elongated limbs, cold desaturated palette, small hard spotlights |
| A comic-book 3D look | 3D animation with printed halftone dots, slightly offset colour registration, inked line accents, stepped motion on twos |
| A 1930s rubber-hose cartoon | black and white 2D cartoon, rubber-hose limbs, white gloves, bouncing looped motion, light film scratches |
| A named character | a new character of your own: different species or object, silhouette, colours and outfit; never the protected design |

## 6. Model dialects

Never write the model name, the duration or the aspect in the prompt.

| Family | How to write the motion prompt |
|---|---|
| Veo | Shot, subject, action, context, style, in that order. Dialogue in quotes after the speaker and delivery, followed by "(no subtitles)". Sounds on labelled lines: "SFX: a soft boing." and "Ambient noise: crickets." Say "No music." when the score is added in the edit. Up to four timed beats of at least 2 s in one 8 s clip. |
| Seedance | 30 to 100 words, the subject first, strong precise verbs ("hops", "tiptoes", "flops"). Motion lands in the first two seconds, so say the action is under way from the first frame. Reference roles in plain sentences ("Reference 1 controls only the hero's face and colours; do not copy its background"). No @-tags. |
| Kling | Scene, characters, action, camera, audio, style. Plain directional verbs (push in, pan left, tilt up). Treat the opening image as the anchor and say how it evolves. Two characters get stable labels and no pronouns. |
| Wan | Subject, scene, motion, then aesthetic words, then the style word. Literal category words land well here: "claymation", "felt style", "2D anime", "watercolour", "puppet animation", "3D cartoon", "rim light", "low contrast". For a clip from its own opening image: motion plus camera only. |
| Hailuo | Prose, with a bracket camera command right after the action it belongs to: "[Static shot]", "[Push in]", "[Pan left]", at most three in one bracket. Hailuo rewrites prompts by default and Lavendly cannot switch that off: keep the prose plain and short. |
| Runway | Motion only, simple, the subject in general terms ("the hippo"). Positive phrasing only; it does not read negatives. Silent: sound comes from the edit. |
| Grok | The first sentence reads like a still (subject, setting, light, framing), then the motion. Treat as silent. |
| FLUX 3, HappyHorse | No published prompt guide: use the Veo order in plain prose. |

## 7. Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the move and the lens feel: "slow push-in, shallow focus, virtual 50mm" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic | the thing itself: "low sun on wet grey skin" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k, ultra realistic, hyperrealistic, photorealistic, highly detailed | delete; name the material: "matte plasticine, wool fibres" |
| dynamic, energetic, dramatic, insane, mind-blowing | the motion: "the hare bolts left, ears flat" |
| vibrant (as filler), vibe, aesthetic | the colours and the light: "saturated tomato red, soft daylight" |
| "<studio>-style", "in the style of <artist>", any franchise or character name | the traits (section 5) |

Constraints are stated positively: "locked-off camera", "the set stays
still", "clean frame with no on-screen graphics".

## 8. Narration budget

Write to the rate of the audience. The server's ceiling is 2.5 words per
second of the scene; a line longer than its picture freezes the last frame.

| Scene | Children (2.0 w/s) | Standard (2.3 w/s) | Ceiling (2.5 w/s) |
|---|---|---|---|
| 4 s | 8 | 9 | 10 |
| 5 s | 10 | 11 | 12 |
| 6 s | 12 | 13 | 15 |
| 8 s | 16 | 18 | 20 |
| 10 s | 20 | 23 | 25 |

Dialogue spoken inside a generated clip: about 2 words per second at most,
one speaker per clip, one line, the speaker's face in frame.

## 9. The clean-frame line

Every motion prompt ends with it, every still with "No text, no letters."

```text
Clean frame: no text, no on-screen graphics.
```

Signs, books, labels and screens in an animated world stay blank or turn
away from camera; models draw letters as gibberish.
