# Recipe: seamless loops

A loop plays forever with no visible seam: the last frame flows into the
first. Social players, website heroes and gallery screens repeat the file,
so the seam is the whole craft.

## 1. The platform fact that decides the method

Lavendly sends a model the first frame only. No last-frame pin exists on
the MCP or in the app, so "make the last frame equal the first" cannot be
forced at generation. Say this to the user in one line, then pick one of the
honest methods below.

| Method | Seam | Works for | Fails for |
|---|---|---|---|
| A. Ping-pong (forward, then the same clip reversed) | exact at both joins, by construction | anything that reads naturally backwards: floating, bobbing, swaying, drifting light, slow camera push and pull, rotation that may reverse | gravity (pours, falls), smoke and steam, fire, footsteps, speech |
| B. Cyclic motion by design | as close as the model gets; checked by eye | geometry that repeats: a six-armed sculpture turning one sixth of a turn, a row of identical tiles sliding one tile, a tunnel of identical rings, a pendulum's full swing | anything the model must land to the exact degree; check every time |
| C. Occlusion seam | invisible when both ends are a near-uniform frame | the clip starts inside a uniform field (white cloud, darkness, a colour) and ends pushing into one | subjects that cannot fill the frame |
| D. Dip | through black, clean but visible | a slow mood loop where a breath is fine | a loop meant to be invisible |

A film with one clip node applies trim, fade, reverse and colour edits too:
any picture edit other than volume and mute sends it through the full
stitch, and with none it ships the raw clip. Method A always has two or
more nodes by construction; methods B, C and D work on one node. A copy of
the clip (same `data.video_url`) costs no generation credits. `edit_clip`
`loop` is accepted but ignored by the export.

## 2. Method A, step by step (the default)

1. Generate one clip whose motion eases at both ends ("moves slowly, easing
   in at the start and out at the end"): the turnaround then feels like a
   pendulum, not a jerk.
2. `split_clip` the clip into as many segments as the loop needs (see the
   lengths below); each segment becomes its own timeline clip.
3. `edit_clip` each segment back to the same full window with `trim`, and
   set `reverse` true on every second segment.
4. `move_clip` each segment so they sit end to end: forward, reversed,
   forward, reversed. An even number of segments closes the loop.
5. `set_clip_native_audio` `off` on every segment: reversed sound is wrong.
6. `get_workflow`: each segment's duration must equal the window. If a
   segment comes back shorter, the server cut the media at the split and
   the trim cannot reach the full clip: say so and use method B or C. This
   path is built from documented edits but has not been verified end to end
   on the platform; check the render once before promising it.

## 3. Structure by length

Built on Wan 2.7 (any whole length 2 to 10 s, 1:1 available, 1080p).

### Ping-pong lengths (method A)

| Loop | Generate | Segments | Trim window | Order | Credits (Wan 2.7) |
|---|---|---|---|---|---|
| 6 s | one 3 s clip | 2 | 0 to 3000 ms | F, R | 12 |
| 15 s | one 8 s clip | 2 | 0 to 7500 ms | F, R | 24 |
| 30 s | one 8 s clip | 4 | 0 to 7500 ms | F, R, F, R | 24 |
| 60 s | one 10 s clip | 6 | 0 to 10000 ms | F, R, F, R, F, R | 24 |

One opening image per source clip on top. A 30 or 60 s ping-pong repeats
the same motion; for a long loop that must keep changing, use a long
single take (method B on Wan 3.0, up to 30 s) instead.

### The shot behind each loop

| Length | Size | Angle | Lens feel | Move | Action |
|---|---|---|---|---|---|
| 6 s | Medium | Eye level | 50mm, shallow focus | locked-off | pastel spheres bob gently up and down |
| 15 s | Wide | Slightly high | 35mm | slow push-in of a few centimetres | a field of spheres drifts and turns slowly |
| 30 s | Medium close-up | Eye level | 85mm | locked-off | seaweed ribbons sway in clear water, light caustics moving |
| 60 s | Extreme wide | Eye level | 35mm, deep focus | locked-off | clouds drift past a floating island, its waterfall replaced by drifting mist |

### Cyclic lengths (method B)

| Loop | Generate | Subject | Credits (Wan 2.7) |
|---|---|---|---|
| 4 s | one 4 s clip | six identical arms turn exactly one sixth of a turn at constant speed | 12 |
| 6 s | one 6 s clip | the camera glides forward through a tunnel of identical arches, exactly one arch spacing | 24 |
| 10 s | one 10 s clip | identical tiles slide left by exactly one tile width | 24 |

Open the first and last frames side by side with `get_scene_frame`. Close
enough: ship. Visibly off: fall back to method A on the same clip.

### Occlusion seam (method C)

The still is a near-uniform frame ("the whole frame is filled with soft
white cloud"); the motion pulls back out of it, passes the subject, and
ends pushing into the same kind of field ("the camera glides into a bank of
white cloud until it fills the frame"). Open the first and last frames: if
the last is not filled, the seam will show; use method A on the same clip.

### Dip (method D)

`fade_in_ms` and `fade_out_ms` of 300 to 600 on the clip (on the first
and the last node when the loop uses copies). The loop breathes through
black. Honest, simple, visible.

## 4. Hook and payoff

- Frame 1 is the cover: platforms show the first frame as the preview, so
  the loop starts on its most complete composition.
- There is no ending; the payoff is the moment the viewer notices it never
  ends. Keep motion constant and gentle; a loop has no climax.

## 5. Camera, light, colour

- Locked-off or one slow, short move that reverses well (push and pull).
  A model told to hold still may still push in: write "locked-off camera on
  a tripod, the frame does not move" and check.
- Constant light: no light change across the clip, or the seam shows.
- Clean grounds and few elements (one to five, or a mass with no count).
- Exact phrases: "moves slowly, easing in at the start and out at the end",
  "turns at a constant speed from the first frame to the last", "exactly one
  sixth of a turn", "the light stays constant".

## 6. Sound

- Most loops are silent: social feeds autoplay muted and any sound makes the
  seam audible. Method A clips are `off`.
- A music bed does not loop seamlessly (a generated score has its own
  ending). If the user wants sound, attach a soft drone with `mood` and the
  loop's `duration`, and say the audio seam may be heard on repeat.
- Method B clips can keep native ambience (`native` at 0.6) when it is
  constant (water, wind).

## 7. Model picks and credits

| Pick | Model | 15 s loop | 30 s loop | Why |
|---|---|---|---|---|
| Best quality | Seedance 2.0 | 88 (8 s source) | 88 | 1080p, 1:1, 4 refs |
| Recommended and value | Wan 2.7 | 24 | 24 | any whole length 2 to 10 s, 1:1, 1080p, 4 refs |
| Draft | Seedance 2.0 Mini | 18 | 18 | 720p, 9 per block |
| Long changing loop | Wan 3.0 | 72 (one 15 s take) | 144 (one 30 s take) | single takes to 30 s |

## 8. Prompt pairs (Wan dialect)

Pair 1: floating spheres (method A, the 6 s loop)

Still-frame prompt:

```text
Soft matte clay render, rounded bevels, gentle ambient occlusion, pastel studio light. Five matte pastel spheres in peach, mint, lilac, butter and sky blue float at different heights above a soft pink floor, each casting a soft round shadow, nothing else in the frame. Medium shot, eye level, 50mm, shallow focus. One large soft light from above left. Palette: peach, mint, lilac, butter, blush pink. No text, no letters, no logo.
```

Motion prompt:

```text
The five spheres bob slowly up and down, each a little out of step with the next, moving slowly, easing in at the start and out at the end; their shadows grow and shrink beneath them. Locked-off camera on a tripod, the frame does not move. The light stays constant. Exactly five spheres. Soft matte clay render, low contrast. Clean frame: no text, no on-screen graphics.
```

Pair 2: the turning sculpture (method B, the 4 s loop)

Still-frame prompt:

```text
Clean CGI product render, physically based materials, soft studio lighting. A brass kinetic sculpture of six identical thin arms radiating from a central hub, each arm ending in a small polished brass sphere, mounted on a slim black stand, seen from the front, centred, on a smooth charcoal gradient background. Medium shot, eye level, 85mm. One soft key from the left, a thin rim light. Palette: brass, charcoal, black. No text, no letters, no logo.
```

Motion prompt:

```text
The six-armed sculpture turns clockwise at a constant speed from the first frame to the last, exactly one sixth of a turn in total, so each arm ends where the next arm began. Locked-off camera on a tripod, the frame does not move. The light stays constant; reflections slide across the brass spheres. Exactly six arms. Clean CGI render, linear motion. Sound: a faint mechanical tick. Clean frame: no text, no on-screen graphics.
```

Second family (Runway, motion only, silent): pair 1 as "The spheres bob
slowly up and down, each out of step with the next; the camera remains
still; the light stays constant."

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The ping-pong turnaround jerks | ask for easing at both ends; trim a few frames off each end of the window |
| Reversed half shows wrong physics | choose motion that reverses well; no pours, smoke or falling |
| Method B lands short or long of the cycle | it is approximate; fall back to method A on the same clip |
| The camera creeps in, breaking the seam | "locked-off camera on a tripod, the frame does not move"; check first and last frames |
| Light pulses across the clip | "the light stays constant"; one source |
| Elements multiply over the clip | a count line, five or fewer |
| Split segments come back short | the server cut the media at the split; use method B or C, and report it |

## 10. Policy guards

- No flashing or strobing faster than three times per second; loops repeat
  it forever.
- No logos or brand marks drawn by the model; the user adds them.
