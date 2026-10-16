# Prompt anchors: cinematic

The two prompts every shot needs, the sentences that hold a film together,
each model's dialect, and the genre vocabulary for lenses, film looks,
grades and light. Every phrase here is concrete: a lens, a source, a
material, a motion. None of the banned words appear in any prompt.

## 1. The still-frame prompt (the opening image)

The server makes each scene's opening image from this text alone, with no
reference image, and cuts it at 500 characters. Keep it under 450, subject
first, as a photograph of the first moment of the shot. No action, no camera
move, never the payoff.

```text
<style line>. <shot size, angle, lens feel, depth of field>. <locked character description, verbatim>. <pose, expression, where they are in frame>. <place with two or three named props>. <light line, verbatim for the scene>. Palette: <three to five colours>. <texture: film stock or grain>. No text, no on-screen graphics.
```

When the prompt runs long, cut the palette or the texture, never the
character or the light.

## 2. The motion prompt (the clip)

The clip animates its own opening image. Describe what changes, when, and
how it ends; do not describe the picture again.

```text
<style line>, one continuous take. <camera: the one move, its speed, where it stops, or "locked-off camera">. <0 to N s: action as physical behaviour>. <N to M s: the rest, from the result of the first>. <dialogue line in the model's syntax, if any>. <end state, held>. <lock sentence>. <count line>. Sound: <diegetic sources>. Clean frame: no text, no subtitles, no on-screen graphics.
```

Lock sentence (always one):

```text
Her face, her green cardigan, the kitchen and the lamp light stay exactly as in the opening frame.
```

Count line (always one, names everyone allowed in frame):

```text
Exactly one woman in frame, nobody else, no reflection of her.
Exactly two people in frame: Mia on the left, Tom on the right; nobody else enters.
```

When a character enters during the shot, add their locked description at
the point they enter. When the light changes during the shot, describe the
change ("the headlights sweep across the ceiling from left to right").

## 3. The locked character description

Five to eight observable anchors, one asymmetric detail, permanent identity
separate from the wardrobe of this film and the state of this scene.

```text
Mia: a woman in her late thirties, warm light-brown skin, oval face, thick straight black eyebrows, shoulder-length black curly hair with a centre part, a small gold hoop in her left ear only.
Wardrobe (this film): a faded green wool cardigan over a white t-shirt.
State (this scene): eyes red from crying, hair pinned up.
```

Paste the identity and wardrobe lines verbatim into every still prompt she
appears in; the state line changes only when the story changes it. A word
changed is a different person.

## 4. Model dialects

Never write the model name, the duration or the aspect in a prompt. Timings
of actions inside the clip ("0 to 2 s") are fine. A film uses one model:
the prompt pairs in the recipes are written for the model in their heading,
so rewrite a pair in the film's own dialect before using it.

| Family | Order that works | Dialogue | Sound | Image-to-video note |
|---|---|---|---|---|
| Veo 3.1, Fast, Lite | Camera, subject, action, context, style | `The woman on the left says: "We have to leave now." (no subtitles)` | `SFX: a door clicks shut.` `Ambient noise: rain on the window.` | Prompt the motion; the opening image holds the look. Bracketed time ranges work for up to four cuts in 8 s |
| Kling v3 | Scene, characters, action, camera, audio, style | `[Character A: Mia, low tired voice]: "I sold the house."` then `After a pause, [Character B: Tom, flat voice]: "When."` | `Sound: ...` in plain words | "Treat the image as an anchor": say how the scene evolves from it. Plain directional verbs |
| Seedance 2.0, 2.5, 1.5 | Subject first, 30 to 100 words; for 2.5 a production note (format, starting state, timeline, camera, continuity, audio, ending state) | Speaker described by position and clothing, line in straight quotes, what they do before and after | `Audio: room tone, a kettle ticking. No music.` | Motion starts at once: write "already in motion from the first frame". References by role in prose, never tags |
| Hailuo 3, 3 Max, 2.3 | Prose with bracket camera commands after the action they move with | Hailuo 3 only, plain quoted line | Hailuo 3 only; 3 Max and 2.3 are silent | `[Push in]`, `[Pan left]`, `[Static shot]`; up to three in one bracket; one per beat |
| Wan 2.7, 3.0 | Subject, scene, motion, then literal aesthetic words (light source, light type, time, shot size, lens, composition, colour tone) | Quoted line after the action | Plain `Sound:` line | Image-to-video formula: motion description plus camera movement |
| Runway Gen-4.5 | Motion only, simple; "the subject", "the woman" | None (silent) | None | Positive phrasing only: "the camera remains still" |
| Grok Imagine | A still description first, then the motion | Quoted line | Unknown on Lavendly; treat as silent | First frame only |
| FLUX 3 Video | Camera, subject, action, context, style (Veo order) | Quoted line | `Sound: ...` | Art-directed looks; keep one style line |
| HappyHorse 1.1 | Veo order | Quoted line | Unknown; treat as silent | First frame only |

## 5. Style lines by genre

One line, first in both prompts, identical across the film.

| Genre | Still | Motion |
|---|---|---|
| Drama | Narrative short film still, 35mm film look, fine grain | Narrative short film, 35mm film look, one continuous take |
| Trailer | Feature film trailer frame, anamorphic lens look | Feature film trailer shot, anamorphic lens look |
| Horror | Horror film still, 16mm grain, low-key light | Horror film shot, 16mm grain |
| Found footage | Consumer camcorder frame, night, flashlight only | Handheld consumer camcorder footage |
| Sci-fi | Science fiction film still, large-format camera look | Science fiction film shot, large-format camera look |
| Action | Action film still, telephoto lens look, crisp motion | Action film shot, crisp motion with a fast shutter |
| Romance | Romantic drama still, soft 35mm film look | Romantic drama, soft 35mm film look |
| Noir | Noir mystery still, hard light, deep shadows | Noir mystery shot, hard light, deep shadows |
| Comedy | Comedy sketch frame, flat even light | Comedy sketch, flat even light, locked-off camera |
| Period | Period drama still, <decade> colour film look | Period drama, <decade> colour film look |

## 6. Lenses: the word and what it does

Models read focal lengths as looks. Pair each with its visible consequence.

| Write | Visible result | Genre use |
|---|---|---|
| 24mm wide lens, the room stretching away behind her | Exaggerated depth, close faces distort | Horror hallways, comedy, action in tight spaces |
| 35mm lens, the room around them readable | Natural, environmental | Drama scenes, walk-and-talk, found footage |
| 50mm lens, natural perspective | Honest, neutral | Dialogue, period interiors |
| 85mm portrait lens, background a soft blur | Compression, intimacy | Close-ups, romance, reactions |
| 135mm telephoto, the street compressed behind him | Stacked background, isolation, heat haze | Action, surveillance, thriller |
| anamorphic lens look, oval bokeh, a thin horizontal flare from the headlights | Wide scale, feature-film feel | Trailers, sci-fi, action |
| very shallow depth of field, only the eyes sharp | Isolation | Close-ups, romance, horror reaction |
| deep focus, foreground and background both sharp | Geography, tension of the background | Horror (the figure in the back), noir rooms |
| rack focus from the ring in the foreground to her face | Attention moved with a reason | Reveals; only when the shot has nothing else to do |
| split diopter look, the phone in front and his face behind both sharp | Two planes at once | Thriller, mystery |

## 7. Film looks and textures

| Write | Reads as |
|---|---|
| 35mm film, fine grain, soft highlight roll-off | Contemporary drama |
| 16mm film, visible grain, slightly soft | Indie, 1970s, horror, memory |
| Super 8 home movie, light leaks, gate weave | Childhood memory, flashback |
| consumer camcorder, night mode noise, slight colour bleed | Found footage, 1990s home video |
| tungsten-balanced night film, halation around the street lamps | Night interiors, neon, noir in colour |
| large-format camera, very fine detail, deep detail in the distance | Sci-fi scale, landscapes |
| 1950s three-strip colour film look, saturated primaries | Period melodrama |
| early 1980s colour film, slightly grainy, warm cast | 1980s period |

Any textured look (grain, halation, leaks) is a choice for this film; name it
only when the card asks for it.

## 8. Grades in plain words, and the edit that finishes them

The colour cast comes from the light words in the prompt; `edit_clip`
colour only unifies contrast and saturation across clips. Scales: brightness
is an offset (0 neutral, keep within -0.2 to 0.2); contrast and saturation
are multipliers (1 neutral, 0 saturation is black and white, 0 contrast is
flat grey); hue is degrees (0 neutral). Apply the same values to every clip.
Hue rotates every colour and is left at 0. A one-scene film applies the
colour edit too.

| Look | In the prompt | Edit on every clip |
|---|---|---|
| Restrained drama | soft window key, practical lamps, muted earth palette | contrast 1.05 |
| Cold thriller | cool blue-grey palette, crushed blacks, desaturated skin | saturation 0.7, contrast 1.15 |
| Warm memory | warm amber light, lifted blacks, soft highlight bloom | brightness 0.05, contrast 0.9 |
| Bleach bypass (war, grit) | desaturated colours, high contrast, silvery highlights | saturation 0.55, contrast 1.25 |
| Black-and-white noir | hard single source, deep shadows, high-contrast lighting in colour | saturation 0, contrast 1.2 |
| Neon noir | deep blacks, magenta and cyan practicals, wet streets | contrast 1.1 |
| Horror | desaturated green-grey, deep blacks, one practical | saturation 0.65, brightness -0.05 |
| Comedy | bright, even, natural colours | none |

Generate in colour even for black and white: monochrome opening images come
back grey and flat from video models. Check one rendered frame to confirm the
edit applied before delivering.

## 9. Light by genre

One source per scene, as a light line pasted into every still prompt of
the scene: source, direction, softness, colour.

| Genre | Light line example |
|---|---|
| Drama, intimate | Warm pendant lamp directly above the table, soft, the window behind her deep blue |
| Drama, daylight | Soft north-facing window light from camera left, the right side of her face in gentle shadow |
| Thriller | One hard desk lamp from camera right, the rest of the room in deep shadow |
| Horror | Cold moonlight through the far window, the hallway in deep shadow |
| Horror, practical | Lit only by a handheld flashlight beam, everything outside the beam black |
| Sci-fi | Cold white overhead strip lights, a red warning lamp pulsing on the far wall |
| Action, night | Sodium-orange street lamps overhead, wet asphalt reflecting them |
| Action, day | Hard low evening sun behind him, rim light on his shoulders, dust in the air |
| Romance | Low golden sun behind them, warm rim on their hair, long shadows |
| Noir | Hard light through window blinds from camera left, stripes of shadow across the wall |
| Comedy | Flat high-key overhead fluorescent light, few shadows |
| Period, pre-electric | Candlelight from the table, warm and flickering, the corners dark |

## 10. Movement words by intent

| Intent | Write | Avoid |
|---|---|---|
| Let the actor work | locked-off camera on a tripod | any move on a dialogue line |
| Realisation | slow dolly push-in from medium to close-up over the whole shot | a push on every shot |
| Isolation, ending | slow pull-back revealing the empty platform | |
| Dread | very slow push-in toward the open door, the door never reached | handheld wobble on a static scare |
| Pursuit | camera tracks alongside him at running pace, parallax on the parked cars | whip pans inside one generated clip |
| Scale | crane up from the figure until she is small against the storm | a drone move in a room |
| Comedy beat | locked-off wide; a snap zoom only on the punchline shot | a move during the setup |
| Unease | Dutch angle, horizon tilted 15 degrees, camera still | tilt on more than one shot |

## 11. Banned words

| Banned | Write instead |
|---|---|
| cinematic, filmic | the lens and the move: "85mm, slow push-in, shallow focus" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic | the thing: "a dust wall rising behind her, the sun a white disc" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k, ultra realistic, hyperrealistic, photorealistic, highly detailed | the texture: "pores visible, wool fibres, wet asphalt" |
| dynamic, energetic, dramatic | the motion: "he bolts, the camera follows a beat late" |
| vibe, mood, aesthetic, vibrant | the light and the palette: "one sodium lamp, orange and black" |
| insane, mind-blowing | delete |

Constraints stated positively: "locked-off camera", "an empty street with
parked bicycles only", "clean frame with no on-screen graphics".
