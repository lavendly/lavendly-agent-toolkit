---
name: lavendly-models
version: 0.2.0
priority: normal
description: |
  Pick the video model and the image model for a Lavendly brief and write each shot in that model's dialect: routing by need (references, sound, dialogue, aspect, length, look, budget), exact specs and credits for the 26 generators, the 5 s block maths, and the MCP path quirks.
  Use when: "which model", "cheapest that works", "it has to talk", "keep my product reference", "one 20 s take", "write this for Veo", or before setting videoModel.
  Chain: lavendly-director owns the process; lavendly-characters owns identity; lavendly-cost-aware wins every spend approval and cap.
  NOT for: the story, shot list or sound plan (director, genre skills), review (lavendly-review), posting (lavendly-publish).
argument-hint: "[brief or shot list] [budget in credits] [aspect] [sound: native, narration, none] [references: count]"
---

# Lavendly Models

The model decides what a shot can be before a word is written: how long it
runs, which shapes it makes, whether it speaks, how many reference images it
reads, and what a clip costs. Each family also reads prompts its own way.
This skill picks the model and the image model for a brief, does the credit
maths, writes the prompt in the family's dialect, and says plainly what the
Lavendly MCP path cannot do.

## Before anything else

- `get_status` once per session: provider readiness and capability flags.
  It lists no video or image models: the model facts are the tables below,
  and `estimate_cost` `per_scene` shows the model each scene will use. The
  server checks no id: an unknown one is quoted at a flat 14 per block and
  sent to the provider as is.
- `get_schema` when an argument is in doubt. Never invent a model id. The
  ids below are the allowlist as of pricing version 2026-10-13c.
- MCP agents drive the server path (`generate_scene`, `create_render`). It
  behaves differently from the app's canvas; every rule here is for the
  server path unless it says canvas.
- Process (intent card, shot list, checks) belongs to lavendly-director.
  This skill answers "which model, at what cost, in which words".

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Readiness, balance |
| 2 | write | The needs line: references, sound, dialogue, aspect, shot lengths, look, budget |
| 3 | write | Route with the table below: one video model for the workflow, one image approach for opening frames |
| 4 | write | Durations from the model's exact list; block maths; the film's credits before any call |
| 5 | write | Prompts in the family dialect ([references](#reference-docs)) |
| 6 | `create_workflow` | Top-level `videoModel` and `aspect`; every shot with an explicit `duration` |
| 7 | `update_workflow` | Each image node's `prompt` set to its still-frame prompt; references wired within the cap |
| 8 | `estimate_cost` | Check `per_scene` model and credits match your maths; announce; wait for yes |
| 9 | `generate_scene` | Scene by scene with `max_credits`; first scene on the hardest shot |
| 10 | `quality_check` | `expect_audio` true on clips that must carry sound; open the frame |

Exact call shapes: [references/mcp-calls.md](references/mcp-calls.md).

## The catalogue on the MCP path

Credits per 5 s block at the default resolution, the only price the MCP
path quotes. Refs = reference images Lavendly sends (cap); the MCP path
sends at most 3 per clip whatever the cap.

| Model (id) | Seconds | Aspects | Refs | Sound | Cr/5 s |
|---|---|---|---|---|---|
| Veo 3.1 (google/veo-3.1) | 4, 6, 8 | 16:9, 9:16 | 2 | yes | 47 |
| Veo 3.1 Fast (google/veo-3.1-fast) | 4, 6, 8 | 16:9, 9:16 | 2 | yes | 14 |
| Veo 3.1 Lite, Auto (google/veo-3.1-lite) | 4, 6, 8 | 16:9, 9:16 | 0 | yes | 10 |
| Seedance 2.0 (bytedance/seedance-2.0) | 4 to 15 | 7 incl. 1:1, 3:4, 4:3, 21:9 | 4 | yes | 44 |
| Seedance 2.0 Fast (bytedance/seedance-2.0-fast) | 4 to 15 | same 7 | 4 | yes | 11 |
| Seedance 2.0 Mini (bytedance/seedance-2.0-mini) | 4 to 15 | same 7 | 4 | yes | 9 |
| Seedance 2.5 (bytedance/seedance-2.5) | 4 to 30 | 6, no 9:21 | 4 | yes | 27 |
| Seedance 1.5 Pro (bytedance/seedance-1-5-pro) | 4 to 12 | 7 | 4 | yes | 14 |
| Kling v3 Standard (kwaivgi/kling-v3.0-std) | 3 to 15 | 16:9, 9:16, 1:1 | 2 | yes | 15 |
| Kling v3 Pro (kwaivgi/kling-v3.0-pro) | 3 to 15 | 16:9, 9:16, 1:1 | 2 | yes | 20 |
| Kling Video O1 (kwaivgi/kling-video-o1) | 5, 10 | 16:9, 9:16, 1:1 | 2 | yes | 14 |
| Hailuo 2.3 (minimax/hailuo-2.3) | 6, 10 | 16:9 only | 2 | no | 10 |
| Hailuo 3 (minimax/hailuo-3) | 5 to 15 | 6 incl. 21:9, 3:4 | 2 | yes | 18 |
| Hailuo 3 Max (minimax/hailuo-3-max) | 5 to 15 | 6 incl. 21:9, 3:4 | 2 | no | 10 |
| Grok Imagine (x-ai/grok-imagine-video) | 1 to 15 | 7 incl. 3:2, 2:3 | 2 | unknown | 9 |
| Grok Imagine 1.5 (x-ai/grok-imagine-video-1.5) | 1 to 15 | same 7 | 2 | treat as no | 30 |
| Grok Imagine 1.5 Lite (x-ai/grok-imagine-video-1.5-lite) | 1 to 15 | same 7 | 2 | no | 17 |
| Wan 2.6 (alibaba/wan-2.6) | 5, 10 | 16:9, 9:16 | 4 | yes | 18 |
| Wan 2.7 (alibaba/wan-2.7) | 2 to 10 | 5 incl. 1:1, 3:4 | 4 | yes | 12 |
| Wan 3.0 (alibaba/wan-3.0) | 2 to 30 | 5 incl. 1:1, 3:4 | 2 | yes | 24 |
| Wan 3.0 Prime (alibaba/wan-3.0-prime) | 2 to 30 | 5 incl. 1:1, 3:4 | 2 | yes | 33 |
| HappyHorse 1.0 (alibaba/happyhorse-1.0) | 3 to 15 | 7 incl. 21:9, 9:21 | 2 | unknown | 20 |
| HappyHorse 1.1 (alibaba/happyhorse-1.1) | 3 to 15 | same 7 | 2 | unknown | 15 |
| FLUX 3 Video (black-forest-labs/flux-3-video) | 5 to 20 | 6 incl. 21:9, 3:4 | 2 | yes | 34 |
| Runway Gen-4.5 (runway/gen-4.5) | 2 to 10 | 16:9, 9:16 | 2 | no | 14 |
| HeyGen Video 1 (heygen/heygen-video-1) | 5 to 15 | 6 incl. 21:9, 3:4 | 2 | no | 7 |

Full specs, resolutions and every price column live in the family files.
Sora, Luma, LTX and Pixverse are not on Lavendly; never route to them.

## Decision rules

### The MCP path, said plainly

1. `create_workflow` sets one model for every shot: only the top-level
   `videoModel` and `aspect` apply; a per-shot `videoModel` is ignored. To
   put one scene on a second model, change that clip node's
   `data.videoModel` with `update_workflow`, then confirm it in
   `estimate_cost` `per_scene`.
2. Durations are sent as written, never snapped. Write a value from the
   model's exact list on every shot (a shot without `duration` defaults to
   5, which Veo and Hailuo 2.3 do not make).
3. Every clip is quoted at the model's default resolution. No resolution
   switch, no 4k, no sound switch. Only `options` seed, aspect ratio and
   negative prompt pass through `generate_scene`, and whether each provider
   honours the last two is unverified.
4. Only a first frame is sent. Last-frame conditioning, video-to-video links
   and link modes are not reachable. A planned end state lives in words.
5. Auto is Veo 3.1 Lite, which takes no references. The server may still
   send some (a Film Bible with images, or 2 or more wired images); the
   provider refuses, the scene is retried, then skipped uncharged, and
   `create_render` still ends `done` without it. When any reference
   matters, name a reference-capable model; never leave Auto on a
   referenced scene, and count the scenes in every render.
6. Grok Imagine 1.5 Lite is the app's cheap draft model only on the canvas.
   On the MCP path it is quoted at 1080p, 17 per block, more than Veo 3.1
   Lite. Draft on Seedance 2.0 Mini (9, sound) or Veo 3.1 Lite (10, no
   references) instead.
7. Opening images are made text-only on the server, from the image node's
   prompt cut to 500 characters. References never reach them.
8. The export takes the first clip's aspect; 21:9, 9:21, 3:2 and 2:3 fall
   back to the 9:16 frame size. Keep every clip of a film on one of 9:16,
   16:9, 1:1, 3:4 or 4:3.

### Routing by need

| Need | Best | Value | Avoid |
|---|---|---|---|
| Spoken line on camera, English | Veo 3.1, Veo 3.1 Fast | Kling v3 Standard | Hailuo 2.3, Hailuo 3 Max, Runway, HeyGen, Grok, HappyHorse |
| Spoken line, Chinese, Japanese, Korean, Spanish | Kling v3 Pro | Kling v3 Standard | Veo (English only evaluated) |
| Lip sync that must hold | Veo 3.1 in 4 to 8 s clips | Kling v3 Pro | any silent model; narration over a face |
| Hero reference (character or product) | Seedance 2.0 | Seedance 2.0 Mini, Wan 2.7 | Veo 3.1 Lite, Auto |
| Three references (face, outfit, product) | Seedance 2.0 | Seedance 2.0 Mini | every 2-reference model |
| Approved still, motion only | Kling v3 Pro | Runway Gen-4.5 | text-heavy prompts |
| Exact camera choreography | Hailuo 3 | Hailuo 3 Max | stacked moves on any model |
| One take of 16 to 30 s | Wan 3.0 Prime, Seedance 2.5 | Wan 3.0; cheaper with one cut: two 15 s Seedance 2.0 Mini clips, the second opened on the first's last frame (`/api` before the `get_scene_frame` path), 54 credits plus one opening image | chains past 2 to 3 hops (they drift; one hop is fine) |
| Inserts of 2 to 3 s | Wan 2.7, Kling v3 Standard | Wan 2.7 | Veo (4 s minimum) |
| Stylised, art-directed, animation | FLUX 3 Video | Wan 2.7, Seedance 2.0 Mini | |
| Native ambience and effects, cheap | Seedance 2.0 Mini | Veo 3.1 Lite | silent models |
| Square 1:1 | Seedance, Kling, Wan 2.7 | Seedance 2.0 Mini | Veo, Wan 2.6, Runway, Hailuo 2.3 |
| Portrait feed 3:4 | Seedance, Hailuo 3, Wan 2.7 | Seedance 2.0 Mini | Kling, Veo, Runway |
| Presenter visuals with narration over | HeyGen Video 1 | HeyGen Video 1 | claiming it lip-syncs |
| Lowest price per block | HeyGen Video 1 (7, silent) | Seedance 2.0 Mini (9, sound) | Grok 1.5 Lite on MCP |

"Best" is the strongest fit for that need on Lavendly's catalogue, not a
measured ranking. When two needs conflict (dialogue and three references),
split the film: dialogue scenes on one model, product scenes on another.

### Durations and the 5 s block

- Clip credits = ceil(seconds / 5) x block credits. 6 s costs the same as
  10 s; 11 s the same as 15 s. On range models write 5, 10, 15, 20, 25, 30.
- Veo makes 4, 6, 8 only: 4 s is one block, 6 s and 8 s are two. Generate
  8 and trim, never 6. With references wired on Veo 3.1 or Fast, use 8:
  Google runs reference clips at 8 s.
- Hailuo 2.3: 6 s and 10 s cost the same (20). Generate 10 and trim.
- A 6 s film costs two blocks on every model; ask whether 5 s will do on
  range models (one block, half the price).
- Every scene adds its opening image (`opening_image_credits`, 2 on Auto).
  A chained scene whose image node already has a url adds nothing.
- The quote is a hold; the charge settles to the provider's cost, never
  above the quote. A billed clip that fails to deliver is still charged.
- Tables for 6, 15, 30 and 60 s per model:
  [references/cost-tables.md](references/cost-tables.md).

### Aspect

- Pick the film's aspect first, then only models that make it. Hailuo 2.3
  is 16:9 only; the server snaps a 9:16 node to 16:9 and the film turns
  letterboxed.
- 4:5 is an export size, but no model makes it: generate 3:4 (or 1:1).
- Image-to-video output follows the opening image's shape on Grok; the
  server sets the image to the node's aspect, so keep them equal.

### Sound

- Sound models make dialogue, effects and ambience inside the clip. The MCP
  path sends no sound switch: the provider default applies. When the score
  comes later, write the in-shot sounds you want as a short list, then
  "no music".
- Silent models (Hailuo 2.3, Hailuo 3 Max, Runway, HeyGen, Grok 1.5 and
  1.5 Lite) need narration or score from `attach_track`; set their
  `native_audio` to off. Treat Grok Imagine and HappyHorse as silent until
  a clip proves otherwise (`quality_check` with `expect_audio` true).
- No model on Lavendly lip-syncs to a voice you attach. A face that speaks
  needs a sound model and the line written in the prompt.

### References

- Wire at most the model's cap, and at most 3 on the MCP path. Never on Veo
  3.1 Lite. Each reference gets one job in a sentence of the motion prompt;
  identity work belongs to lavendly-characters.
- The scene's own image edge stays first on every clip: the first image
  with a url is the first frame, the rest are references.

### Image model for opening frames and sheets

- Opening images on the MCP path: 2 credits each on Auto (Nano Banana
  3.1), as `opening_image_credits` shows; text only, 500 characters,
  subject first. Image-to-image (up to 3 connected images) exists only on
  the canvas.
- Prices and when to ask for another image model:
  [references/image-models.md](references/image-models.md).

### Writing in the dialect

- Never write the model name, the duration, the aspect or the resolution
  in prompt text. Veo's timestamp brackets are the one timing syntax a
  model asks for.
- One action and one camera move per clip, constraints stated positively,
  no banned words (cinematic, stunning, epic, breathtaking, masterpiece,
  8k, 4k as praise, ultra realistic, hyperrealistic, award-winning,
  dynamic, gorgeous, beautiful, vibrant, insane, mind-blowing).
- The motion prompt describes the change from the opening image plus one
  lock sentence; the still-frame prompt carries the full description.
- Translate other platforms' syntax into prose: no "@Image1" tags, no
  preset names; "Reference 1 is the bottle's shape and finish only".

### Announcing the choice

One line before the estimate, then the `estimate_cost` line. Example:

```text
Kling v3 Pro for the two talking scenes (labelled speakers, native sound), Seedance 2.0 Mini for the two product shots (three references): 4 clips of 5 s, 66 credits with opening images. Veo 3.1 Fast would be 64 in 4 s clips but takes two references. Go ahead?
```

Display names in chat, never ids. Say the reason in half a sentence and the
nearest alternative with its price when it is cheaper or stronger.

## When to stop

- The brief needs something no model on Lavendly does (lip sync to a
  supplied voice, last-frame control, 4k from the MCP, rendered titles):
  say so and offer the closest real path.
- The only model that fits lacks the film's aspect: ask before reframing.
- `estimate_cost` names a different model or price than your maths: stop,
  re-read the workflow, fix the node, re-estimate.
- The first clip on a new model fails twice on the same shot: change the
  model or the shot, not the wording a third time.

## UX rules

1. Model display names in chat; ids only in tool arguments.
2. One line of reason per choice; never a model lecture.
3. Every price in credits, from the table or the estimate, never guessed.
4. Say "unverified" where this skill says so (provider sound defaults,
   negative prompts, Grok resolution) instead of promising.
5. The user's language in chat, English in prompts and arguments.

## Reference docs

- [references/veo.md](references/veo.md): Veo 3.1, Fast, Lite; five-part prompts, quoted dialogue, `SFX:` and `Ambient noise:` lines, timestamp blocks, subtitles caution.
- [references/seedance.md](references/seedance.md): Seedance 2.0, Fast, Mini, 2.5, 1.5 Pro; short subject-first prompts, reference roles, production note for long takes.
- [references/kling.md](references/kling.md): Kling v3 Standard, Pro, Video O1; labelled dialogue, plain camera verbs.
- [references/hailuo.md](references/hailuo.md): Hailuo 2.3, 3, 3 Max; bracket camera commands, the optimiser note.
- [references/wan.md](references/wan.md): Wan 2.6, 2.7, 3.0, 3.0 Prime; formulas and aesthetic vocabulary.
- [references/grok.md](references/grok.md): Grok Imagine, 1.5, 1.5 Lite; still first, then motion; price trap.
- [references/happyhorse.md](references/happyhorse.md): HappyHorse 1.0 and 1.1.
- [references/flux.md](references/flux.md): FLUX 3 Video, stylised and art-directed shots.
- [references/runway.md](references/runway.md): Runway Gen-4.5, motion-only positive prompts.
- [references/heygen.md](references/heygen.md): HeyGen Video 1 for presenters, and its limits.
- [references/image-models.md](references/image-models.md): Nano Banana 3.1, Gemini 3 Pro Image, Gemini 2.5 Flash Image, GPT-5 Image, GPT-5 Image mini; opening frames.
- [references/cost-tables.md](references/cost-tables.md): credits for 6, 15, 30 and 60 s plans per model, rounding traps.
- [references/mcp-calls.md](references/mcp-calls.md): `create_workflow` with `videoModel` and `aspect`, `estimate_cost`, `generate_scene` with `max_credits`, model changes per scene.
- [references/troubleshooting.md](references/troubleshooting.md): refusals, wrong shapes, silent clips, burned subtitles.
