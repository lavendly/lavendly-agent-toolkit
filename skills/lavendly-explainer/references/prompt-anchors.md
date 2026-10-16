# Prompt anchors: explainer

The two prompts every shot needs, the lines that make them work for
explainers, the dialect of each model family, and the words to avoid.

## 1. The two prompts

On the MCP path every scene animates its own opening image, and the
opening image is made from text alone. So the still-frame prompt carries
the full description; the motion prompt describes only the change.

### Still-frame prompt (opening image, image model, 500 characters at most)

```text
<style line>. <subject with its locked description>, <where it sits and what surrounds it>. <shot size, angle, lens feel, depth of field>. <light: source, direction, softness, colour>. <materials and surfaces that must read>. <blank surfaces and room for a title, if any>. Clean frame, no text.
```

Rules: subject in the first 15 words (the cap cuts the tail); a stable
start state, never the payoff; no action, no camera move; every surface
that could carry writing is named blank.

### Motion prompt (the clip)

```text
<style line>, one continuous take. <shot size and lens feel, one line>. 0 to N s: <what moves first>. N to M s: <what changes next, ending in a state>. Camera: <the one move, its speed, where it stops> | Camera: locked-off, no movement. End state: <one line>. <lock sentence>. <exact count>. <Sound line>. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

Rules: describe the change, not the picture; one action, one camera move;
every moving thing has a destination; the lock sentence names what stays
exactly as in the opening frame; counts stated ("exactly one cup, nobody
else in frame"); "No music." on every clip under narration.

## 2. Lines to reuse

| Purpose | Line |
|---|---|
| Lock | "The <subject>, the <surface> and the light stay exactly as in the opening frame." |
| Count | "Exactly one <subject> in frame, nobody else." / "Only the two hands enter; no face, no other person." |
| Clean frame | "Clean frame: no text, no subtitles, no on-screen graphics." |
| Blank surfaces | "a blank white label", "an unlabelled glass jar", "a closed notebook with a plain cover", "a monitor seen from behind", "a sheet of paper with soft grey lines too blurred to read", "an unlabelled relief map in one colour" |
| Title room | "the left third of the frame is plain dark wall with nothing on it" |
| No music in clip | "No music." (Veo adds its own bed otherwise) |
| Containers | "the jar is empty, only light inside" / "the box holds only the folded cloth" |
| Depth order | "the drop falls in front of the leaf, closer to the camera" |
| Destination | "the marble rolls into the far left corner and stops" |
| Settling | "it slows, settles and holds still for the last second" |
| Already moving | "already in motion from the first frame" (Seedance front-loads motion) |
| Reference role | "Reference 1 is the <object>'s shape, colour and texture only; ignore its background and lighting." |

## 3. Style lines (one per film, first in both prompts)

| Look | Style line | Use for |
|---|---|---|
| Observational documentary | "Nature documentary, observational, natural light" | Nature, places, people at work |
| Macro lab | "Macro science documentary, clean studio light" | Science mechanisms, materials, cells by analogy |
| Clean tabletop | "Clean studio tabletop film, soft even light" | How-to, product of a process, training |
| Paper diorama | "Handmade paper diorama, layered cut paper with soft shadows" | News, history, abstract systems, sensitive topics |
| Clay miniature | "Clay miniature set, matte plasticine surfaces, soft key light" | Kids education, playful science |
| Illustrated still life | "Painterly still life, oil paint texture, single window light" | History, ideas, essays |
| Period reconstruction | "Period reconstruction, natural and candle light, muted colour" | History scenes with anonymous figures (labelled reconstruction) |
| Corporate realism | "Workplace documentary, natural window light, handheld steady" | Training, culture |

Keep the line identical in every prompt. Grain, bloom, flare and haze only
when the brief asks for that look, then in every shot.

## 4. Dialects by model family

Never write the model name, the duration or the aspect in a prompt.

**Veo 3.1 (Fast, Lite).** Order: shot and camera, subject, action, context,
style and ambience. Sound with labels: `SFX: a soft paper rustle`,
`Ambient noise: light wind, distant birds`. Quoted dialogue only when a
character speaks, followed by "(no subtitles)". State exclusions as
presence ("an empty street with parked bicycles only"). Timestamps in two
second steps work for at most four beats in 8 s.

**Wan (2.6, 2.7, 3.0).** Image to video: motion description plus camera
movement only; the image holds subject and scene. Wan reads literal
category words well: "side light, soft, low contrast, medium close-up,
long-focus lens, warm colour tone". Add them when the look washes out.

**Seedance (1.5 Pro, 2.0, Mini, 2.5).** 30 to 100 words, subject first.
For timed beats use the production note:

```text
STARTING STATE: <what is where>. TIMELINE: [0-2s] <first action>. [2-5s] <next action from the result of the first>. CAMERA: <framing, path, where it stops>. AUDIO: <ambience, contact sounds; no music>. ENDING STATE: <final composition and hold>.
```

Most of Seedance's motion lands in the first two seconds: ask for the
action "already in motion from the first frame".

**Kling v3.** Scene, subject, action, camera, audio, in plain sentences;
plain directional verbs (push in, pan left, tilt up); one move per shot.

**Hailuo (2.3, 3 Max).** Prose plus one bracket camera command placed right
after the action it serves: `The water level rises in the glass [Static shot]`,
`[Push in]`, `[Truck left]`, `[Tilt up]`, `[Pull out]`. At most three
commands inside one bracket; one is safer. Silent: no sound line needed.

**HeyGen Video 1, Runway Gen-4.5.** Silent. Motion first and simple;
Runway: "the subject", "the hand" rather than the full description.

## 5. Explainer words that work

- Documentary realism: "long telephoto lens, background compressed",
  "static tripod", "slow pan following", "natural overcast light",
  "dappled light through leaves", "heat shimmer".
- Science and macro: "100mm macro look, focus plane millimetres deep",
  "raking side light showing every ridge", "backlit so the liquid glows",
  "a clean white sweep background".
- Tabletop and how-to: "top-down, camera pointing straight down", "bright
  even soft light, no hard shadows on the work area", "both hands visible,
  the contact point centred".
- Illustration: "layered cut paper, each layer casting a soft shadow",
  "matte clay with visible thumbprints", "flat colour planes".

## 6. Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the move and the lens: "slow push-in, shallow focus, 35mm look" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic | the thing itself: "frost crystals spreading across the glass" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k, ultra realistic, hyperrealistic, highly detailed, photorealistic | delete; name the texture: "wet bark, matte stone" |
| dynamic, energetic, dramatic, insane, mind-blowing | the motion: "the wave folds over fast, the camera holds" |
| vibe, aesthetic, vibrant | the light and colour: "one warm source, cool shadow, muted greens" |

State constraints positively: "locked-off camera", "empty table except the
jar", "single figure in frame".
