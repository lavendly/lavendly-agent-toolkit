# Recipe: loops

A video whose end flows back into its start, so the platform's autoplay
replays it without a visible seam. Worked examples: a brass pendulum that
completes one swing, a sleeping fox breathing in a ping-pong loop, and a
spoken line loop.

## 1. Purpose, audience, ending

- Purpose: rewatches. A seamless loop is watched two or three times before
  the viewer notices; each pass counts.
- Audience: Shorts, TikTok and Reels viewers; ambient, satisfying and joke
  formats.
- There is no ending: the last frame is frame 0. The cover is frame 0 too,
  so it must be the finished picture.

## 2. What Lavendly can and cannot do

- Last-frame conditioning is not reachable: a clip cannot be told to end on
  a given frame. A loop is built one of four ways:

| Method | How | Best for | Seam risk |
|---|---|---|---|
| A. Cyclic action | One clip, locked camera, a motion that returns to its start (a swing, a wave in and out, a rotation of a symmetric object, a breath); trim to exactly one cycle (a one-clip film applies the trim) | Satisfying, ambient | Medium: check first and last frames |
| B. Ping-pong | The clip, then a copy of it reversed (`edit_clip` reverse) | Motions that read both ways: a push-in then pull-out, a breathing animal, drifting snow, a swaying plant | Low; avoid motions with obvious direction (pouring, falling, walking) |
| C. Story loop | Plan the last shot's end state to equal shot 1's start state (the door closes as it was at the start) and the last line to run into the first | Jokes, POV, storytime | Medium: depends on the match |
| D. Repeat | Copies of the clip node with the same `data.video_url` and trim, one after another (`edit_clip` loop is accepted but ignored by the export) | A runtime longer than one cycle; any loop that is one clip | Same as the cycle |

- One cycle is usually better than repeats: the platform replays it for
  free and every replay counts.
- Music rarely loops cleanly at 5 to 8 s; use native sound that is the same
  at both ends (rain, room tone, a hum) or no sound.

## 3. Checking the seam

1. `get_scene_frame` with frame first and frame last on the clip.
2. Compare: position of the moving thing, light, camera framing.
3. Trim the end (`edit_clip` trim `end_ms`) to the frame that best matches
   frame 0; trim the start to skip the model's warm-up.
4. When the match is close but not exact, a cut on the motion's fastest
   point hides it better than a cut at rest.

## 4. Structures

A film with one clip node applies trim, fades, reverse and captions too:
any of them sends it through the full stitch; with none it ships the raw
clip. Method B holds two clip nodes by construction (the clip and its
reversed copy).

### 6 s (method A, one cycle)

| # | Time | Shot | Lens | Move | Picture | Gen | Sound |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Close-up, side | 85mm | Locked | A brass pendulum swings from the far left to the far right and back to the far left | 4 or 8, trim to one cycle | Native tick |

### 8 to 10 s (method B, ping-pong)

| # | Time | Shot | Lens | Move | Picture | Gen | Edit |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Medium close-up | Telephoto | Slow push-in | A red fox asleep curled in snow, breathing, snowflakes drifting | 4 | Original |
| 2 | 4 to 8 | Same | Same | Reads as slow pull-out | The same clip | copy, no new credits | `edit_clip` reverse on the copy |

### 15 s (method C, a story loop)

| # | Time | Shot | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Medium, a fridge door closed | Locked | The door opens | 4, trim 3 | "...which is why I never" |
| 2 | 3 to 7 | POV into the fridge | Locked | One lonely lemon on a shelf | 4 | "open the fridge hoping for a meal." |
| 3 | 7 to 11 | Close-up | Locked | A hand picks up the lemon, considers it | 4 | "I just check." |
| 4 | 11 to 15 | Medium, same as shot 1 | Locked | The lemon is put back and the door closes, ending exactly as frame 0 | 4 | "Every hour. And every time, I end up thinking about lemons, ..." (runs into the first line) |

The first line is the end of the last sentence. Write both lines together;
the replay completes the sentence.

### 30 s

Loops longer than 15 s lose the effect; build a 30 s video as a story loop
(method C) whose last shot matches the first, or stack two cycles of a
6 s ambient loop with a change of light between them (a time-passage,
which then breaks the seam: avoid).

## 5. Camera, light, colour

- Locked camera for methods A and C; a slow push-in for method B (it
  reverses into a pull-out).
- Light constant: no flicker, no passing cloud, no change across the clip.
  "Even soft light that does not change."
- Backgrounds simple: moving backgrounds (crowds, traffic) break the seam.

## 6. Sound

- Native, the same at the start and the end: "steady soft rain", "a clock
  tick", "a constant room hum". `native` at 1.
- No voice for ambient loops; for story loops, the voice line loop above,
  2.5 words per second, `tiktok` captions.
- Music: none for loops under 10 s; for a 15 s story loop a bed at 0.25
  that ends on a sustained note so the cut back feels like a breath.

## 7. Models and credits

| Pick | Model | Why | 6 s | 15 s |
|---|---|---|---|---|
| Best | Veo 3.1 Fast | Steady locked shots, clean native sound | 4 s clip: 14 + 2 = 16 | 4 clips: 56 + 8 + 3 = 67 |
| Value | Seedance 2.0 Mini | 9 per clip | 9 + 2 = 11 | 36 + 8 + 3 = 47 |
| Ping-pong (8 s) | any; the reversed copy is free | One paid clip | 16 on Veo 3.1 Fast | |

## 8. Prompt pairs (Veo 3.1 Fast)

**Pair 1, the pendulum (method A).**

Still-frame prompt:

```text
Clean studio tabletop film, soft even light. A single polished brass pendulum hangs from a dark walnut bracket, its round bob held at the far left of its arc, against a plain deep green wall. Close-up from the side, 85mm look, shallow depth of field. Even soft light from the front left that does not change. Clean frame, no text.
```

Motion prompt:

```text
Clean studio tabletop film, soft even light, one continuous take. Close-up. 0 to 2 s: the pendulum swings from the far left to the far right of its arc, already in motion from the first frame. 2 to 4 s: it swings back and ends exactly at the far left, at the same height as the opening frame. Camera: locked-off, no movement. End state: the bob at the far left, as in the opening frame. The pendulum, the bracket, the wall and the light stay exactly as in the opening frame. Exactly one pendulum. SFX: one soft tick at each end of the swing. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Pair 2, the sleeping fox (method B).**

Still-frame prompt:

```text
Nature documentary, observational, natural light. A red fox with a thick orange winter coat lies asleep curled in fresh snow, its white-tipped tail over its nose, a few snowflakes resting on its fur. Medium close-up, long telephoto lens, background of soft white snow. Soft overcast light that does not change. Clean frame, no text.
```

Motion prompt:

```text
Nature documentary, observational, natural light, one continuous take. Medium close-up. 0 to 4 s: the fox's flank rises and falls slowly twice as it breathes; a few snowflakes drift down past it and settle. Camera: very slow push-in, stopping on the fox's face. End state: the fox still asleep, a little closer. The fox, the snow and the light stay exactly as in the opening frame. Exactly one fox. Ambient noise: near silence, soft wind. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

Reversed, falling snowflakes rise; keep the flakes few and slow so the
reverse half reads as drifting.

**Second family, Seedance 2.0 Mini.** "ENDING STATE: the bob back at the far
left, exactly as in the starting state" is the line that matters; Seedance
front-loads motion, so check that the second half of the swing is not
rushed.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The pendulum ends mid-swing | Trim `end_ms` to the frame closest to frame 0; re-roll with "ends exactly at the far left" once |
| A jump in light at the seam | "light that does not change"; no window light with clouds |
| The reversed half looks wrong (smoke sinking, water climbing) | Use method A or C for directional motion |
| Camera drift breaks the seam | "locked-off, no movement"; trim |
| The loop is too long to feel like a loop | Under 10 s for ambient loops |

## 10. Policy guards

- Satisfying loops of products follow lavendly-ads for claims.
- No real animal shown in distress for a loop; real behaviour only.
