# Seedance family (ByteDance)

Seedance 2.0, 2.0 Fast, 2.0 Mini, 2.5 and 1.5 Pro. The only family that
reads up to four reference images on Lavendly, with native sound on every
model, seven shapes and range durations. Seedance 2.0 Mini is the cheapest
model with sound.

## Lavendly specs

| Model | id | Seconds | Resolutions (default bold) | Aspects | Credits per 5 s block | Clip at default |
|---|---|---|---|---|---|---|
| Seedance 2.0 | bytedance/seedance-2.0 | 4 to 15 | 480p 8, 720p 18, **1080p 44**, 4k 91 | 1:1, 3:4, 9:16, 4:3, 16:9, 21:9, 9:21 | 44 | 5 s 44, 10 s 88, 15 s 132 |
| Seedance 2.0 Fast | bytedance/seedance-2.0-fast | 4 to 15 | 480p 5, **720p 11** | same 7 | 11 | 5 s 11, 10 s 22, 15 s 33 |
| Seedance 2.0 Mini | bytedance/seedance-2.0-mini | 4 to 15 | 480p 4, **720p 9** | same 7 | 9 | 5 s 9, 10 s 18, 15 s 27 |
| Seedance 2.5 | bytedance/seedance-2.5 | 4 to 30 | 480p 12, **720p 27** | 16:9, 4:3, 1:1, 3:4, 9:16, 21:9 | 27 | 5 s 27, 10 s 54, 30 s 162 |
| Seedance 1.5 Pro | bytedance/seedance-1-5-pro | 4 to 12 | 480p 3, 720p 7, **1080p 14** | 1:1, 3:4, 9:16, 9:21, 4:3, 16:9, 21:9 | 14 | 5 s 14, 10 s 28 |

All: first frame and last frame on the provider side, references 4, native
sound.

## What the MCP path changes

- Lavendly's cap is 4 references, but the server path sends at most 3 per
  clip. Wire 3 on the MCP path; the fourth works only on the canvas.
- Every clip is quoted at the default resolution: Seedance 2.0 at 1080p is
  44 per block, the dearest block after Veo 3.1. Seedance 2.0 Mini at 9 is
  the value pick when references matter.
- 4k on Seedance 2.0 is canvas only.
- Seedance 2.0 Fast is what the canvas Auto uses for two or more
  references; on the MCP path Auto is Veo 3.1 Lite, so name Seedance
  yourself.
- Durations are whole seconds inside the range; 4 s is the minimum. Write
  5, 10, 15 (or 20, 25, 30 on 2.5) so no block is wasted.
- When a Film Bible exists, the server appends this family's negatives:
  unnatural eye-line, lip-sync drift, skin smoothing too aggressive.
- 21:9 and 9:21 clips export inside the 9:16 frame size; keep films on
  9:16, 16:9, 1:1, 3:4 or 4:3.

## The dialect

- Short and clear: 30 to 100 words, the main subject first.
- Order: Subject, Action, Composition, Style, then the camera.
- Strong specific verbs carry the motion: struts, trudges, stalks; soars,
  plummets, hovers.
- Most of the motion lands in the first two seconds and the camera drifts
  later. Write the action "already in motion from the first frame" and say
  where the camera stops.
- Reference roles in prose, one job each, with what not to copy:
  "Reference 1 is the bottle's shape, glass and cap only; ignore its
  background and lighting." Never write "@Image1".
- Change one element per re-roll (light, move or style), never three.
- A cut inside the clip ("lens switch to a close-up") is possible on 1.5
  Pro and 2.0; it makes the clip two shots, so plan the check and the next
  scene from the last one.

### The production note (long takes on 2.5, 10 to 30 s)

Labelled lines in this order, as prose under each label:

```text
FORMAT: one continuous take, natural speed.
REFERENCE ROLES: Reference 1 is ... only; ignore ...
STARTING STATE: who is where, what each holds, the camera position.
TIMELINE:
0 to 4 s: the first action.
4 to 9 s: the next action, starting from the result of the first.
9 to 15 s: the last action and how it settles.
CAMERA: framing, path, the event that starts the move, where it stops.
CONTINUITY: identity, counts, wardrobe, which hand holds what.
AUDIO: contact sounds, room tone, dialogue in quotes, or no music.
ENDING STATE: the exact final composition and how long it holds.
CONSTRAINTS: no second copy of the subject, no text, no logo.
```

Write cause before reaction (the tray touches the cup; the cup tips), say
how each action settles, and leave no unused time after the last action.

## Example 1: skincare ad, Seedance 2.0 Mini, 9:16, 10 s, three references

References wired, in order after the opening image: the bottle packshot,
the model's face close-up, the bathroom plate.

Still-frame prompt:

```text
Vertical beauty film still. A frosted glass dropper bottle with a matte white cap stands on a pale travertine shelf, front label area turned away from camera. Behind it, out of focus, a woman in her thirties with short black hair and a white towel robe faces a mirror. Camera at shelf height, the bottle in the lower third. Soft daylight from a frosted window on the right, warm. Sage green tiles behind. No text, no logo, no on-screen graphics.
```

Motion prompt:

```text
Reference 1 is the bottle's shape, frosted glass and white cap only; ignore its background. Reference 2 is the woman's face and hair only; ignore its light and pose. Reference 3 is the bathroom's tiles and light only. Already in motion from the first frame: the woman reaches past the bottle, lifts it, and turns toward camera holding it at chin height. Locked-off camera; focus shifts from the shelf to her face as she turns. Exactly one bottle and one woman, nobody else. Audio: glass on stone, soft room tone, no music.
```

## Example 2: craft long take, Seedance 2.5, 16:9, 20 s

Still-frame prompt:

```text
Documentary still, macro look. A potter's hands, dry grey clay on the knuckles, rest on a centred lump of wet terracotta clay on a turning wheel. Camera at wheel height, slightly above, hands and clay filling the middle of the frame. One warm work lamp from the upper left, hard, glossy highlights on the wet clay. Dark workshop behind, a shelf of unfired cups out of focus. No text, no on-screen graphics.
```

Motion prompt:

```text
FORMAT: one continuous take, natural speed.
STARTING STATE: two hands rest on a wet lump of terracotta on a turning wheel; camera at wheel height.
TIMELINE:
0 to 6 s: the thumbs press into the centre and open the clay; water beads run down.
6 to 14 s: the fingers draw the wall up into a cylinder that rises to hand height.
14 to 20 s: the hands lift away; the cylinder keeps turning, wet and even, and slows.
CAMERA: locked-off for 14 s, then a slow pull back that stops when the whole cylinder is in frame.
CONTINUITY: exactly two hands, one cylinder; the wheel turns the same direction throughout.
AUDIO: the wheel's hum, wet clay squeaking under the fingers, no music.
ENDING STATE: the finished cylinder centred, still turning slowly, held for the last 2 s.
CONSTRAINTS: no second pot, no text, no logo.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| A reference used for the wrong job (the product's background copied) | One job per reference, the exclusion named |
| Motion all in the first seconds, then a drifting camera | "Already in motion from the first frame", the stopping point of the camera stated, a shorter clip |
| The product widens or grows details | Rigid material words ("rigid frosted glass, fixed cap, unchanging form"), smaller moves, a real packshot as the first frame |
| Muddled multi-shot | One lens switch per 2 to 3 s; the subject words identical across shots |
| Drift on a re-roll | Change one element only |

## When to pick

- Seedance 2.0 Mini: reference-led ads and character scenes on a budget,
  with sound.
- Seedance 2.0: the same at 1080p when the film is sold on detail.
- Seedance 2.5: one continuous take up to 30 s at 720p.
- Seedance 1.5 Pro: 1080p at 14 per block when 12 s is enough.
- Seedance 2.0 Fast: between Mini and 2.0 at 720p, 11 per block.
