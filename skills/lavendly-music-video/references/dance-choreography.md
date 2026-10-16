# Recipe: dance and choreography

## 1. Purpose, audience, ending

- Purpose: bodies moving to the song: a solo dancer, a duo, a small crew,
  a signature move people copy.
- Audience: dance and trend audiences on vertical feeds, fans, a premiere.
- The ending: the signature move at its biggest, then a held final pose on
  the last hit.

## 2. What generated dance can do

- One move per clip, 3 to 5 s, written with body parts, directions and a
  rate: "steps right, then left, about one step every half second, arms
  swinging low". A clip asked for a routine of eight moves melts.
- Full body in frame, medium-wide or wide: feet on the floor and hands
  visible. Cropped limbs invite extra ones.
- Spins at most one full turn; no flips, no floor work with tangled limbs,
  no lifts between partners (bodies merge).
- The model cannot hear the song. Sync is made in the edit: cut on the
  downbeat, and fit the move's length to the bar with `edit_clip` speed
  (0.8 to 1.25 reads natural).
- Groups: count the dancers and place them ("three dancers in a line: left,
  centre, right, the same black tracksuits"); identical costumes help the
  model keep the count. Up to three dancers is reliable; more becomes a
  crowd.
- No video references: Lavendly sends images only, so choreography is
  written, never copied from a clip.

## 3. Structures by length

At 120 BPM (1 bar = 2 s; one count = 0.5 s). Model lengths for Kling v3 Pro
(5 s; 10 s for a 4-bar take).

### 6 s: the signature move (3 bars)

| Slot | Bars | Size, angle, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 | Wide, low, 24mm | locked-off | The dancer still, head down; on the downbeat the head snaps up | 5 s |
| 2 | 2 to 3 | Medium-wide, 35mm | locked-off | The signature move: a hip swing and a sharp double arm cross, held | 5 s, speed to fit 4 s |

### 15 s: a combination (128 BPM, 8 bars)

| Slot | Bars | Size, angle, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 2 | Wide, 24mm | locked-off | Steps in from the left into the light | 5 s |
| 2 | 3 to 4 | Medium-wide, 35mm | slow push-in | The groove: shoulders and knees on the beat | 5 s |
| 3 | 5 | Insert, ground level, 24mm | locked-off | Sneakers sliding on the concrete | 5 s |
| 4 | 6 | Medium-wide, 35mm | locked-off | One full spin, arms out | 5 s |
| 5 | 7 to 8 | Wide, low angle, 24mm | locked-off | The signature move, then the final pose held | 5 s |

### 30 s: verse groove, chorus routine (16 bars at 128 BPM)

| Section | Bars | Shots | Notes |
|---|---|---|---|
| Verse | 1 to 8 | 4 shots of 2 bars: the groove, details (feet, hands, face), one travel across the floor | Same space, warm practical light |
| Chorus | 9 to 16 | 6 slots: the routine in 4 one-bar moves, a held 2-bar signature, the pose | Hard backlight, haze; one burst of feet and hands |

About 9 clips.

### 60 s: solo to crew (120 BPM, 30 bars)

Intro (4 bars): the solo dancer still. Verse (8 bars): the solo groove, 4
shots. Pre (4 bars): two more dancers step in from left and right
(introduced on screen). Chorus (8 bars): the trio in a line, the routine in
one-bar cuts, a burst, the signature. Outro (6 bars): back to the solo
dancer, the final pose. About 14 clips.

### 90 s: a full routine (120 BPM, 45 bars)

Two choruses with the same routine (the second wider, in more haze), a
bridge as one long slow-motion hold of a single move, a final chorus with
the signature move from three angles cut on the bar. About 20 clips.

## 4. Hook and payoff

- Hook: the signature move or the snap of the head in the first second, on
  the first downbeat.
- Payoff: the signature move at its biggest on the final chorus, then the
  held pose on the last hit, static camera.

## 5. Camera, light, colour

- Camera: locked-off wides for full routines (the body is the movement),
  a slow push-in on the groove, ground-level inserts on feet, a low angle
  for the signature; one move per shot.
- Light: hard backlight in haze for silhouettes; coloured side lights; a
  single overhead spot on concrete; daylight in an empty car park.
- Colour: costumes in one colour against a contrasting space; the chorus
  colour returns.

Exact phrases that work:

- "full body in frame, feet on the floor, hands visible"
- "steps right, then left, about one step every half second"
- "one full spin, arms out, ending facing the camera"
- "three dancers in a line: left, centre, right, the same black tracksuits"
- "both feet stay on the floor; no jumps"

## 6. Fitting moves to the grid

1. Generate the move at its natural pace.
2. Open the frames (`get_scene_frame` first, mid, last) to see where the
   move starts and ends; trim the warm-up and the tail.
3. If the move takes 4.4 s and the slot is 2 bars at 128 BPM (3.75 s), set
   speed 4.4 / 3.75 = 1.17.
4. Cut on the hit: the strongest accent of the move (the arm cross, the
   stomp) on the downbeat. Without sight of every frame, place the end of
   the move on the bar line and ask the user to confirm.

## 7. Sound plan

- The song once, volume 1, `ducking` false; every clip `off`
  ([one-track-rule.md](one-track-rule.md)). Footstep sounds from the clips
  would never match the record.

## 8. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Kling v3 Pro | The strongest human and dance motion; holds the costume from a still |
| Value | Seedance 2.0 Fast | 4 references (the dancer, the costume, the space), 11 per 5 s |
| Silent value | Hailuo 3 Max | 10 per 5 s; bracket camera commands |
| Draft | Grok Imagine | 9 per 5 s |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (5 x 5 s) | 30 s (9 x 5 s) |
|---|---|---|
| Kling v3 Pro | 5 x 20 = 100, plus 10 | 9 x 20 = 180, plus 18 |
| Seedance 2.0 Fast | 5 x 11 = 55, plus 10 | 9 x 11 = 99, plus 18 |
| Hailuo 3 Max | 5 x 10 = 50, plus 10 | 9 x 10 = 90, plus 18 |

## 9. Prompt pairs

### Pair 1: the groove (Kling v3 Pro)

Still frame:

```text
Music video frame, empty concrete warehouse, one hard overhead spotlight. Medium-wide shot, eye level, 35mm lens, full body in frame. Rae: a dancer in her twenties, long box braids tied high, a loose white t-shirt, black cargo trousers, white high-top sneakers. She stands in the pool of light, knees soft, arms loose. Concrete floor, dark walls. Palette: white, black, concrete grey. No text, no letters, no logos.
```

Motion:

```text
Scene: an empty concrete warehouse, one overhead spotlight. Character: Rae, full body in frame, feet on the floor, hands visible. Action: already moving from the first frame, she grooves in place: shoulders drop and rise, knees bounce, about one bounce every half second; at 3 s she crosses both arms sharply in front of her chest and holds. Camera: static, eye level. Audio: silent, no music generated. Rae, her clothes and the warehouse stay exactly as in the opening frame. Exactly one person in frame, nobody else. Clean frame: no text, no logos on clothes.
```

### Pair 2: the trio (Seedance 2.0 Fast, with a costume reference)

Still frame:

```text
Music video frame, empty rooftop car park at dusk, one row of sodium lamps. Wide shot, low angle, 24mm lens. Three dancers in a line, left, centre and right, two metres apart, in identical black tracksuits and white sneakers, facing the camera, still, arms at their sides. Wet concrete, orange lamp light from behind, a deep blue sky. Palette: black, sodium orange, deep blue. No text, no letters, no logos.
```

Motion:

```text
Reference 1 is the tracksuit and sneakers only; ignore its background and pose. Already moving from the first frame, the three dancers step right together, then left, one step every half second, arms swinging low, staying in their line two metres apart; at 4 s all three stop and point at the camera at the same moment. Static camera, low angle. Exactly three people in frame, nobody else. The car park and the lamps stay as in the opening frame. Silent, no music generated. Clean frame: no text, no logos.
```

Second family notes: on Hailuo 3 Max write the move then the camera
command ("the dancer spins once, arms out [Static shot]"); keep one move per
clip.

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| Limbs morph, extra arms | One move per clip, full body in frame, slower rate, medium-wide |
| Feet slide on the floor | "both feet stay planted between steps"; ground-level insert to cover |
| A fourth dancer appears or one disappears | The exact count and positions; identical costumes |
| The move does not hit the beat | Trim to the accent; speed to fit; cut on the bar line |
| Spins turn into blur | One turn at most; a slower rate |
| Logos on sneakers and clothes | "plain", "no logos on clothes" |

## 11. Policy guards

- No copied choreography of a named artist or trend owner presented as
  theirs; original moves only.
- Non-sexual staging; no minors in suggestive dance.
- No brand marks on costumes.
