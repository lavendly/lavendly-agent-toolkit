# Models and credits: social

Numbers read from the platform as of 2026-10-16. `estimate_cost` is the
live quote and wins over this table. 1 credit = $0.10.

## 1. Pricing on the MCP path

- Clip credits = 5 s blocks, rounded up, x the model's block price at its
  default resolution. 4 s and 5 s are one block; 6 to 10 s two. On Veo,
  6 s costs the same as 8 s.
- Opening image: about 2 credits per scene whose image node has a prompt
  and no url. An imported photo or a chained frame on the node costs
  nothing.
- Voice: about 1 credit per 1,100 characters, at least 1 per synthesis.
- Music: 3 credits per 30 s (15 s = 2, 30 s = 3, 60 s = 6).
- Imported footage placed as a ready clip: no generation credits.
- Render: free. A re-roll pays the clip again.
- Free and Starter export at 720p, Creator and up at 1080p: on 720p plans a
  720p model looks the same in the final file as a 1080p one.

## 2. Models for social

| Model (display) | id | Lengths (s) | Shapes | References | Sound | Credits per clip |
|---|---|---|---|---|---|---|
| Veo 3.1 Fast | google/veo-3.1-fast | 4, 6, 8 | 16:9, 9:16 | 2 | yes, speech | 4 s 14; 8 s 28 |
| Veo 3.1 | google/veo-3.1 | 4, 6, 8 | 16:9, 9:16 | 2 | yes, speech | 4 s 47; 8 s 94 |
| Veo 3.1 Lite (Auto) | google/veo-3.1-lite | 4, 6, 8 | 16:9, 9:16 | 0 | yes | 4 s 10; 8 s 20 |
| Seedance 2.0 Mini | bytedance/seedance-2.0-mini | 4 to 15 | 1:1, 3:4, 9:16, 4:3, 16:9, 21:9, 9:21 | 4 | yes | 5 s 9; 10 s 18; 15 s 27 (720p) |
| Seedance 2.0 Fast | bytedance/seedance-2.0-fast | 4 to 15 | 7 shapes | 4 | yes | 5 s 11; 10 s 22 (720p) |
| Seedance 2.0 | bytedance/seedance-2.0 | 4 to 15 | 7 shapes | 4 | yes | 5 s 44 (1080p) |
| Wan 2.7 | alibaba/wan-2.7 | 2 to 10 | 16:9, 9:16, 1:1, 4:3, 3:4 | 4 | yes | 5 s 12; 10 s 24 (1080p) |
| Kling v3 Pro | kwaivgi/kling-v3.0-pro | 3 to 15 | 16:9, 9:16, 1:1 | 2 | yes, speech in five languages | 5 s 20; 10 s 40 (720p) |
| Kling v3 Standard | kwaivgi/kling-v3.0-std | 3 to 15 | 16:9, 9:16, 1:1 | 2 | yes | 5 s 15 (720p) |
| HeyGen Video 1 | heygen/heygen-video-1 | 5 to 15 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | silent | 5 s 7; 10 s 14; 15 s 21 (768p) |
| Hailuo 3 Max | minimax/hailuo-3-max | 5 to 15 | 6 shapes incl. 9:16 | 2 | silent | 5 s 10 (768p) |
| Grok Imagine | x-ai/grok-imagine-video | 1 to 15 | 7 shapes incl. 2:3 | 2 | unknown, plan as silent | 5 s 9 (720p) |
| Runway Gen-4.5 | runway/gen-4.5 | 2 to 10 | 16:9, 9:16 | 2 | silent | 5 s 14 (720p) |

Hailuo 2.3 makes only 16:9; Hailuo 3 renders only at 2k; leave both out of
vertical social plans.

## 3. Picks by need

| Need | Pick | Why |
|---|---|---|
| Native phone look, sound, 9:16 | Veo 3.1 Fast | Handheld realism and in-clip sound; speaks a quoted line |
| Many cuts on a small budget | Seedance 2.0 Mini | 9 per clip with sound; on 720p plans it loses nothing |
| A recurring creator character or product | Seedance 2.0 Fast, Seedance 2.0 Mini or Wan 2.7 | 4 references: face close-up, outfit, product, place |
| A presenter while the voice is attached | HeyGen Video 1 | People-centric, cheapest block, silent by design |
| A short line spoken on camera | Veo 3.1 Fast (English), Kling v3 Pro (Chinese, English, Japanese, Korean, Spanish) | Native speech with lip movement |
| Body movement, dance-like action, sport | Kling v3 Pro | Holds human motion best |
| Square for LinkedIn or X | Wan 2.7, Seedance, Kling, HeyGen | Veo makes no 1:1 |
| Draft the structure | Veo 3.1 Lite | 10 per clip; never wire references to it |

## 4. Builds

Assumes one opening image per clip, one voiceover, one bed.

| Build | 15 s | 30 s | 60 s |
|---|---|---|---|
| Veo 3.1 Fast, 5 cuts per 15 s (4 s clips trimmed) | 70 + 10 + 3 = 83 | 140 + 20 + 4 = 164 | 280 + 40 + 7 = 327 |
| Seedance 2.0 Mini, 4 s clips | 45 + 10 + 3 = 58 | 90 + 20 + 4 = 114 | 180 + 40 + 7 = 227 |
| Seedance 2.0 Fast, 4 s clips | 68 | 134 | 267 |
| Wan 2.7, 4 s clips | 73 | 144 | 287 |
| HeyGen Video 1, 5 s clips | 35 + 10 + 3 = 48 | 70 + 20 + 4 = 94 | 140 + 40 + 7 = 187 |
| Kling v3 Pro, 4 s clips | 113 | 224 | 447 |
| Veo 3.1 Lite, 4 s clips | 63 | 124 | 247 |
| Jump-cut talking head, Veo 3.1 Fast 8 s takes split into windows, native speech | 2 takes: 56 + 4 + 2 = 62 | 4 takes: 112 + 8 + 3 = 123 | 8 takes: 224 + 16 + 6 = 246 |
| Clips from imported footage | 0 clip credits; voice or bed only if added | 0 | 0 |

## 5. Saving credits without losing the cut

- One continuous 8 s take with two or three usable moments split with
  `split_clip` gives two or three cuts for one clip's price.
- A speed change (`edit_clip` speed) on part of a clip is a free interrupt.
- A loop (a copy of the clip node, or a reversed copy of the same clip)
  repeats a paid clip for free. `edit_clip` loop is ignored by the export.
- The hook clip gets the best model; the middle can drop to the value model
  of the same family only if the look stays the same; check one frame.
