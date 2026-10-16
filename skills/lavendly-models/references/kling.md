# Kling family (Kuaishou)

Kling v3 Standard, Kling v3 Pro and Kling Video O1. Native sound with
labelled speakers in five languages, strong human motion, and it holds a
face, clothes and a product from an approved still. 720p only, three shapes.

## Lavendly specs

| Model | id | Seconds | Resolution | Aspects | Refs | Sound | Credits per 5 s | Clip at default |
|---|---|---|---|---|---|---|---|---|
| Kling v3 Standard | kwaivgi/kling-v3.0-std | 3 to 15 | 720p only | 16:9, 9:16, 1:1 | 2 | yes | 15 | 5 s 15, 10 s 30, 15 s 45 |
| Kling v3 Pro | kwaivgi/kling-v3.0-pro | 3 to 15 | 720p only | 16:9, 9:16, 1:1 | 2 | yes | 20 | 5 s 20, 10 s 40, 15 s 60 |
| Kling Video O1 | kwaivgi/kling-video-o1 | 5, 10 | 720p only | 16:9, 9:16, 1:1 | 2 | yes | 14 | 5 s 14, 10 s 28 |

First frame and last frame on the provider side; Lavendly sends the first
frame only.

## What the MCP path changes

- 720p is the only resolution, so the quote is the real price. Export on
  Creator and up is 1080p: the clip is scaled up in the stitch.
- Kling v3 takes 3 s, which still costs one block; 3 s inserts are full
  price for less picture. Write 5, 10 or 15 when the cut allows.
- Kling Video O1 makes 5 or 10 only; anything else is refused.
- No 3:4 or 4:3. A portrait feed film goes to Seedance or Wan 2.7.
- Quirk: the server's model negatives match the prefix "kling/", so the
  kwaivgi ids get the generic negatives even with a Film Bible. Your
  positive words are all Kling gets.
- Kling's own multi-shot (up to six shots in one output) and voice binding
  to elements are provider features Lavendly does not expose. Write one
  shot per clip.

## The dialect

Kling's headline is "think in shots, not clips". Order for v3:
**Scene, Characters, Action, Camera, Audio, Style.** Plain readable
sentences.

- Camera as plain directional verbs: push in, pull back, pan left, tilt up,
  tracking shot, orbit, static wide, handheld with subtle drift. Fancy
  jargon is ignored; one move per shot.
- Shot sizes as Kling defines them: extreme close-up (minute details),
  medium close-up (upper torso, dialogue), full body (subject with
  environment), establishing wide (location).
- Visible motion, with pace words: "smoke drifting upward, flames bending in
  the wind, a runner leaning forward"; slow, steady, quick.
- Replace vague words with what is seen: "magic" becomes "swirling blue
  particles with a soft glow".
- Image-to-video: treat the opening image as an anchor; describe how the
  scene evolves from it, never the picture again.

### Labelled dialogue

1. A stable label per speaker with name and voice, no pronouns:
   `[Character A: Mom, fast urgent voice]`.
2. Action first, then the line.
3. A tone label per character, the same words in every clip.
4. Linking words for timing: "Immediately,", "After a pause,".

```text
[Character A: Mom, fast urgent voice]: "Shoes on, now."
Immediately, [Character B: Daughter, crying voice]: "I can't find my sweater."
```

Languages Kling documents for native speech: Chinese, English, Japanese,
Korean, Spanish. Two short lines in one clip at most; one speaker per clip
holds lip sync best. Keep the clip at 2 words per second or fewer.

## Example 1: two-person exchange, Kling v3 Pro, 16:9, 5 s

Still-frame prompt:

```text
Narrative short film still, 35mm look. A small kitchen at 7 in the morning. On the left, a woman in her forties, dark bob, grey cardigan, holds a pair of red children's shoes, facing right. On the right, a girl of about eight, blond pigtails, yellow pyjamas, sits on the floor by a coat rack, facing left. Medium wide shot at adult chest height. Cool daylight from a window behind the woman. No text, no on-screen graphics.
```

Motion prompt:

```text
Kitchen, early morning. Exactly two people in frame: the mother on the left, the daughter on the right, nobody else. The mother holds the shoes out toward the girl. [Character A: Mom, fast urgent voice]: "Shoes on, now." Immediately, the girl throws up her hands. [Character B: Daughter, crying voice]: "I can't find my sweater." Static camera, medium wide. The kitchen and the window light stay exactly as in the opening frame. Audio: the fridge hum, a clock ticking, no music.
```

## Example 2: product hero from an approved still, Kling v3 Standard, 1:1, 5 s

Opening image: the user's packshot, set as the image node url (no prompt
needed). Reference 1: the same product's three-quarter packshot.

Motion prompt:

```text
Studio tabletop. The steel wristwatch from the opening image, black dial, brushed steel case, lies on a slab of dark slate. Reference 1 is the watch's case and strap only; ignore its background. The camera orbits slowly a quarter turn to the right and stops on the three-quarter view; a narrow highlight slides along the case edge. The watch's shape, dial and strap stay exactly the same. Exactly one watch. Audio: a faint tick, quiet room tone, no music.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| Morphing limbs in fast action | Slow the action, shorter clip, describe the motion path ("explicit motion reduces artefacts") |
| The character changes between scenes | The same label and locked words in every prompt; the hero reference wired |
| The camera ignores the instruction | Plain directional verbs, one move |
| The wrong voice speaks a line | Name, line and delivery adjacent; one speaker per clip |
| Lettering garbled | Keep labels blank or turned away; text belongs to the user's edit |

## When to pick

- Kling v3 Pro: dialogue and acting scenes, non-English speech, human
  motion and dance, product shots held from a real packshot.
- Kling v3 Standard: the same at 15 per block.
- Kling Video O1: 5 or 10 s clips at 14 per block when the shapes fit.
