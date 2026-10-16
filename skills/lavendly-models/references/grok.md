# Grok Imagine family (xAI)

Grok Imagine, Grok Imagine 1.5 and Grok Imagine 1.5 Lite. Any length from 1
to 15 s and seven shapes including 3:2 and 2:3. First frame only. On the MCP
path the cheap draft model is not cheap: read the price trap below.

## Lavendly specs

| Model | id | Seconds | Resolutions (default bold) | Aspects | Refs | Sound | Credits per 5 s | Clip at default |
|---|---|---|---|---|---|---|---|---|
| Grok Imagine | x-ai/grok-imagine-video | 1 to 15 | 480p 6, **720p 9** | 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3 | 2 | unknown | 9 | 5 s 9, 10 s 18, 15 s 27 |
| Grok Imagine 1.5 | x-ai/grok-imagine-video-1.5 | 1 to 15 | 480p 10, 720p 17, **1080p 30** | same 7 | 2 | app copy: no sound | 30 | 5 s 30, 10 s 60, 15 s 90 |
| Grok Imagine 1.5 Lite (canvas Draft) | x-ai/grok-imagine-video-1.5-lite | 1 to 15 | 480p 3, 720p 4, **1080p 17** | same 7 | 2 | app copy: picture only | 17 | 5 s 17, 10 s 34, 15 s 51 |

Image-input fees are folded into each block price.

## What the MCP path changes

- The price trap: Grok Imagine 1.5 Lite is the app's Draft model because it
  costs 3 or 4 per block at 480p or 720p on the canvas. The MCP path sends
  no resolution, so it is quoted at its default 1080p: 17 per block, more
  than Veo 3.1 Lite (10). The charge settles to the real cost, never above
  the quote, but the hold is 17. Do not pick it to save credits on the MCP
  path; use Seedance 2.0 Mini (9) or Veo 3.1 Lite (10).
- Draft mode itself (the Studio toggle) cannot be set through the MCP.
- Unverified: xAI's own API renders 480p when no resolution is given. If a
  Grok clip from the MCP path looks soft, that is the likely cause; check
  the frame before using it full screen.
- Sound: Lavendly marks Grok Imagine unknown and the 1.5 models silent.
  Treat all three as silent: narration and score from `attach_track`,
  native audio off, unless `quality_check` with `expect_audio` true proves a
  clip carries sound.
- 1 s and 2 s clips still cost one full block.
- 3:2 and 2:3 export inside the 9:16 frame size; keep films on 9:16, 16:9,
  1:1, 3:4 or 4:3.
- Image-to-video output takes the opening image's shape. The server makes
  the opening image in the node's aspect, so they agree; a supplied image of
  another shape changes the clip's shape.

## The dialect

xAI publishes no prompt structure, only that 1.5 makes a first frame from
the prompt and then animates it. On Lavendly the opening image already
exists, so write the motion prompt like this:

- First sentence: a one-line restatement of the frame (subject, place,
  light), so the model holds it.
- Then the motion: one action with timing, one camera move, the end state.
- Then the lock sentence and the count.
- Keep it under about 60 words; drafts are for blocking, not detail.

## Example 1: meme-style draft, Grok Imagine, 9:16, 5 s

Still-frame prompt:

```text
Vertical photo, flat midday light. A grey tabby cat sits upright on a kitchen counter beside a full glass of water, staring at the glass. Camera at counter height, close, the cat on the left half, the glass on the right. White tiles behind, a bowl of lemons out of focus. No text, no on-screen graphics.
```

Motion prompt:

```text
A grey tabby cat on a kitchen counter next to a glass of water. Still staring at the glass, the cat slowly pushes it with one front paw until it tips off the edge in the last second. Locked-off camera. The cat and the counter stay exactly as in the opening frame. Exactly one cat, one glass.
```

## Example 2: product blocking draft, Grok Imagine, 1:1, 4 s

Still-frame prompt:

```text
Product photo on a seamless sand-coloured backdrop. A pair of white canvas sneakers with gum soles, side by side, toes toward the lower left. Camera at shoe height, three-quarter view. One large soft light from the upper right, a soft shadow to the lower left. No text, no logo, no on-screen graphics.
```

Motion prompt:

```text
White canvas sneakers on a sand backdrop. The camera orbits a quarter turn to the left and stops on the side view of the left shoe. The light stays fixed. The shoes stay exactly the same shape and colour. Exactly two shoes.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| Soft, low-detail clip | Probably rendered at the provider default; use it as a draft only, or move the scene to another family |
| Quote higher than expected on 1.5 Lite | The MCP path prices 1080p; switch model |
| The clip has a different shape | A supplied first frame of another shape; crop it to the film's aspect first, in the app |
| No sound where you wanted it | Expected; attach narration or score |

## When to pick

- Grok Imagine (9 per block): cheap drafts, memes, 3:2 or 2:3 stills for
  a non-film use, clips of odd lengths such as 7 s.
- Grok Imagine 1.5: only when the user asks for it; 30 per block on the MCP
  path.
- Grok Imagine 1.5 Lite: not on the MCP path for cost reasons.
