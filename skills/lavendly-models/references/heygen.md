# HeyGen Video 1

The cheapest block in the catalogue and a model aimed at people on camera.
On Lavendly it is a silent generator: it does not speak, and nothing on
Lavendly makes it lip-sync to a voice you attach. Plan presenter films with
that in mind.

## Lavendly specs

| | HeyGen Video 1 |
|---|---|
| id | heygen/heygen-video-1 |
| Seconds | 5 to 15 |
| Resolutions | 480p 5, **768p 7**, 2k 21 credits per 5 s |
| Aspects | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 |
| First frame / last frame | yes / no |
| References | 2 |
| Sound | no (flag and app copy); the provider catalogue describes synthesized audio |
| Clip at default (MCP) | 5 s 7, 10 s 14, 15 s 21 |

Not on Lavendly: heygen/avatar-iv, the avatar model, is excluded as a
non-generator. There is no avatar route and no lip sync to supplied audio.

## What the MCP path changes

- Quoted at 768p: 7 per block. 2k needs the canvas and the Studio plan.
- Treat it as silent. If a clip arrives with sound (the catalogue claim),
  `quality_check` with `expect_audio` true shows it; never plan on it.
- 21:9 exports inside the 9:16 frame size.

## Presenter films on Lavendly: the honest options

| The user wants | Do |
|---|---|
| A presenter whose lips speak the script | Veo 3.1 or Veo 3.1 Fast (Kling v3 Pro for non-English): the line in the motion prompt, 4 to 8 s clips, medium close-up, one face, locked camera, native audio `native` |
| A presenter on screen while a narrator speaks | HeyGen Video 1 for the visuals (listening, gesturing at a product, walking to a mark, turning to camera with the mouth closed), narration from `attach_track` |
| A long talking-head piece read from a script | Say it plainly: Lavendly makes it as short native-dialogue clips cut together, each line 2 words per second or fewer; one voice id cannot drive the lips |

Never show a face moving its lips under a narration track: it reads as a
bad dub.

## The dialect

No vendor prompting guide was available at authoring time. Write it in the
shared order (shot, subject, action, place, light) and keep the presenter
beat physical, with the mouth closed or the face turned when narration
plays over it. Describe wardrobe that fits the topic (a field jacket for an
outdoor report, a knit sweater at a home desk).

## Example 1: presenter beat under narration, 9:16, 5 s

Still-frame prompt:

```text
Vertical photo, bright home studio. A woman in her thirties, shoulder-length black hair, round tortoiseshell glasses, a rust-coloured knit sweater, stands beside a desk with a closed laptop and a ceramic mug. Medium shot at chest height, she is in the upper middle of the frame, looking toward the laptop. Soft key light from a window on the left, warm, a white wall with a plant behind. No text, no on-screen graphics.
```

Motion prompt:

```text
Medium shot, locked-off. The woman opens the laptop with one hand, glances at the screen, then turns to the camera with a small closed-mouth smile and a nod. The laptop screen faces away from camera. The woman, the desk and the window light stay exactly as in the opening frame. Exactly one person in frame, nobody else.
```

## Example 2: product demo hands, 1:1, 10 s

Still-frame prompt:

```text
Square photo, top-down on a pale wood desk. A pair of hands with short clear nails rests beside a matte black wireless charging pad and a phone lying screen down. Camera directly overhead, the pad in the centre. Soft even light from above, no hard shadows. A small potted succulent in the top corner. No text, no logo, no on-screen graphics.
```

Motion prompt:

```text
Top-down, locked-off. The right hand picks up the phone, keeps it screen down, and sets it on the charging pad; a soft white ring of light glows around the pad's edge. The hand withdraws to the right edge of frame. The desk and the pad stay exactly as in the opening frame. Exactly two hands, one phone, one pad.
```

## When to pick

- Presenter and hands b-roll under narration, at 7 per block.
- Never for a speaking face.
