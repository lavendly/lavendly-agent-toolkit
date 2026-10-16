# Models and credits: explainer

Every number here is read from the platform (models, prices and limits as
of 2026-10-16). When `estimate_cost` disagrees, `estimate_cost` wins: it is
the live quote. 1 credit = $0.10.

## 1. How a clip is priced on the MCP path

- Clip credits = blocks x block price. A block is 5 s, rounded up: 4 s and
  5 s are one block, 6 to 10 s are two, 11 to 15 s three.
- On Veo, 4 s is one block and 6 s or 8 s are two: a 6 s Veo clip costs the
  same as 8 s. Generate 4 or 8 and trim.
- The MCP path never sends a resolution: every clip is quoted at the
  model's default resolution (the column below).
- Each scene's opening image is made first when its image node has a prompt
  and no url: about 2 credits (read `opening_image_credits`). A scene whose
  image node already carries a url (an imported photo, a chained frame)
  pays nothing for it.
- Voiceover: per character. About 1 credit per 1,100 characters on
  ElevenLabs v3 (a 60 s script is about 900 characters: 1 credit; 90 s is
  about 1,350: 2). Each synthesis costs at least 1.
- Music: 3 credits per 30 s, rounded up: 15 s = 2, 30 s = 3, 45 s = 5,
  60 s = 6, 90 s = 9.
- Render is free. A re-roll pays the clip again.

## 2. Video models

| Model (display) | id | Lengths (s) | Shapes | References | Sound | Credits per clip at the default resolution |
|---|---|---|---|---|---|---|
| Veo 3.1 Fast | google/veo-3.1-fast | 4, 6, 8 | 16:9, 9:16 | 2 | yes | 4 s 14; 6 or 8 s 28 (1080p) |
| Veo 3.1 | google/veo-3.1 | 4, 6, 8 | 16:9, 9:16 | 2 | yes | 4 s 47; 6 or 8 s 94 (1080p) |
| Veo 3.1 Lite (Auto) | google/veo-3.1-lite | 4, 6, 8 | 16:9, 9:16 | 0 | yes | 4 s 10; 6 or 8 s 20 (1080p) |
| Wan 2.7 | alibaba/wan-2.7 | 2 to 10 | 16:9, 9:16, 1:1, 4:3, 3:4 | 4 | yes | 5 s 12; 10 s 24 (1080p) |
| Wan 2.6 | alibaba/wan-2.6 | 5, 10 | 16:9, 9:16 | 4 | yes | 5 s 18; 10 s 36 (1080p) |
| Wan 3.0 | alibaba/wan-3.0 | 2 to 30 | 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | yes | 5 s 24; 10 s 48; 20 s 96 (1080p) |
| Seedance 1.5 Pro | bytedance/seedance-1-5-pro | 4 to 12 | 1:1, 3:4, 9:16, 9:21, 4:3, 16:9, 21:9 | 4 | yes | 5 s 14; 10 s 28 (1080p) |
| Seedance 2.0 | bytedance/seedance-2.0 | 4 to 15 | 7 shapes | 4 | yes | 5 s 44; 10 s 88 (1080p) |
| Seedance 2.0 Mini | bytedance/seedance-2.0-mini | 4 to 15 | 7 shapes | 4 | yes | 5 s 9; 10 s 18; 15 s 27 (720p) |
| Seedance 2.5 | bytedance/seedance-2.5 | 4 to 30 | 6 shapes | 4 | yes | 5 s 27; 10 s 54 (720p) |
| Kling v3 Pro | kwaivgi/kling-v3.0-pro | 3 to 15 | 16:9, 9:16, 1:1 | 2 | yes | 5 s 20; 10 s 40 (720p) |
| Kling v3 Standard | kwaivgi/kling-v3.0-std | 3 to 15 | 16:9, 9:16, 1:1 | 2 | yes | 5 s 15; 10 s 30 (720p) |
| Hailuo 2.3 | minimax/hailuo-2.3 | 6, 10 | 16:9 only | 2 | silent | 6 s 20; 10 s 20 (1080p) |
| Hailuo 3 Max | minimax/hailuo-3-max | 5 to 15 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | silent | 5 s 10; 10 s 20 (768p) |
| Runway Gen-4.5 | runway/gen-4.5 | 2 to 10 | 16:9, 9:16 | 2 | silent | 5 s 14; 10 s 28 (720p) |
| HeyGen Video 1 | heygen/heygen-video-1 | 5 to 15 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | silent | 5 s 7; 10 s 14; 15 s 21 (768p) |
| FLUX 3 Video | black-forest-labs/flux-3-video | 5 to 20 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | yes | 5 s 34; 10 s 68 (1080p) |
| Grok Imagine | x-ai/grok-imagine-video | 1 to 15 | 7 shapes | 2 | unknown, treat as silent | 5 s 9 (720p) |

Not on the MCP path: Draft mode, resolution choice, last-frame pins,
video-to-video links. Hailuo 3 renders only at 2k and is quoted at 18 per
block; leave it out of explainer plans.

## 3. Which model for which explainer

| Need | Pick | Reason |
|---|---|---|
| Default narrated explainer, 16:9 or 9:16 | Veo 3.1 Fast | Clean light and texture at 1080p, ambience in clip, 4 s and 8 s fit sentence lengths |
| Macro science, nature texture, the finest frame | Veo 3.1 | Best detail; spend it on the hook and payoff shots only, Veo 3.1 Fast for the rest (same family, same look) |
| A recurring object or illustrated style held by reference | Wan 2.7 or Seedance 1.5 Pro | 4 references; Wan 2.7 also makes 1:1 and 4:3 |
| Long held observational shots, 16:9 | Hailuo 2.3 (10 s) or Wan 3.0 (10 to 20 s, with sound) | Few cuts, low cost per second |
| Square for LinkedIn or a course platform | Wan 2.7, Seedance 1.5 Pro, Kling v3 | Veo makes only 16:9 and 9:16 |
| Draft pass to check structure | Veo 3.1 Lite | 10 credits per 4 s; no references |
| A presenter on camera | see lavendly-social, talking-head recipe | Lip sync and HeyGen rules live there |

Mixing models inside one film changes the look between cuts. Keep one
family per film; mixing Veo 3.1 for two hero shots with Veo 3.1 Fast for
the rest is safe.

## 4. Image models (opening images and reference sheets)

| Model | Credits per image |
|---|---|
| Auto (Nano Banana 3.1) | 2 |
| Gemini 3 Pro Image | 3 |
| Gemini 2.5 Flash | 2 |
| GPT-5 Image | 5 |
| GPT-5 Image mini | 1 |

Image prompts are cut at 500 characters: subject first. Opening images on
the MCP path are made from text alone; references wired to the scene do not
reach them.

## 5. Builds by length (explainer defaults)

Assumes an opening image per clip, one voiceover, one score.

| Build | 15 s | 30 s | 60 s | 90 s |
|---|---|---|---|---|
| Veo 3.1 Fast, 4 s clips | 4 clips: 56 + 8 + 1 + 2 = 67 | 8 clips: 112 + 16 + 1 + 3 = 132 | 15 clips: 210 + 30 + 1 + 6 = 247 | 23 clips: 322 + 46 + 2 + 9 = 379 |
| Veo 3.1 Fast, 8 s holds | 2 clips: 56 + 4 + 3 = 63 | 4 clips: 112 + 8 + 4 = 124 | 8 clips: 224 + 16 + 7 = 247 | 12 clips: 336 + 24 + 11 = 371 |
| Veo 3.1, 4 s clips | 199 | 396 | 742 | 1,138 |
| Veo 3.1 Lite, 4 s clips | 51 | 100 | 187 | 287 |
| Wan 2.7, 5 s clips | 3 clips: 45 | 6 clips: 88 | 12 clips: 175 | 18 clips: 263 |
| Seedance 1.5 Pro, 5 s clips | 51 | 100 | 199 | 299 |
| Hailuo 2.3, 10 s holds (16:9) | 10 s + 6 s: 47 | 3 clips: 70 | 6 clips: 139 | 9 clips: 209 |

Mixed plans are normal: most explainers alternate 4 s inserts and 8 s holds
on Veo. Count clips, not seconds.

The recipes' shot tables use Veo lengths (4 and 8 s). On a model priced in
5 s blocks, either merge shots into 5 and 10 s clips (the value columns
above) or keep every shot and pay one block each: four 4 s shots on Wan 2.7
cost 48 for clips, not 36.

## 6. Plan limits that change a plan

| Plan | Export | Credits per month |
|---|---|---|
| Free | 720p | 35 to start, 5 per daily claim |
| Starter | 720p | 200 |
| Creator | 1080p | 450 |
| Studio | 1080p frames (4k plans also get 1080p) | 1,200 |

A 60 s Veo 3.1 Fast explainer (about 250 credits) does not fit a Starter
month; offer 30 s, a value model, or parts.
