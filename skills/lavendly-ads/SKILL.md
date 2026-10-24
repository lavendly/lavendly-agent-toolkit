---
name: lavendly-ads
version: 0.2.0
priority: normal
description: |
  Make product and brand ads on the Lavendly MCP: the category recipe, one promise in the hook and the call to action, the real packshot as the product's first frame, model and length per placement, sound in budget, honest claims, no rendered text.
  Use when: "an ad for my serum", "a 15 s TikTok ad", "UGC-style ad", "before and after", "a launch teaser", "a promo for my app", "a Black Friday video".
  Chain: lavendly-director runs the process; lavendly-models and lavendly-characters for dialects; lavendly-cost-aware wins spend; lavendly-review checks; lavendly-publish posts.
  NOT for: places, travel or events (lavendly-places), creator talking heads (lavendly-social), stories (lavendly-cinematic), fake reviews or AI results as proof.
argument-hint: "[product and promise] [packshot url] [placement: tiktok, reels, shorts, feed, youtube] [length 6..60] [offer]"
---

# Lavendly Ads

An ad is one promise made in the first three seconds and kept in the last
three, with the product looking exactly like the thing the viewer will
receive. This skill holds the field knowledge for product and brand ads by
category and the platform facts that decide what Lavendly can deliver:
which model, which length, how the real product reaches the frame, what the
sound does, and what must stay off the screen. The lavendly-director skill
owns the shared process (intent card, sequence plan, ledger, three-level
checks); this skill makes the ad decisions on top of it.

## Before anything else

- `get_status` and `get_ledger` once per session. Never claim or deny a
  capability or a model from memory; `get_schema` when unsure.
- Run the director's process. Load lavendly-models and lavendly-characters
  when installed; when they are not, the tables in this skill are enough.
- Read the brief for: product and category, the one promise, audience,
  placement (TikTok, Reels, Shorts, Meta feed, YouTube, a site), length,
  offer and its terms, the assets the user has (packshot, lifestyle photos,
  real customer reviews with permission, a logo file), and any claim that
  needs proof. Ask one question only when the answer changes the ad; the
  usual one is "Do you have a product photo I can use?"
- Every name, product, place and story in this skill and its references is an
  example. The user's brief replaces it; never carry one into their film.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities and credits |
| 2 | write | Pick the recipe (table below) and read it |
| 3 | write | Director intent card plus the ad card: promise, hook, proof, call to action, placement, length, aspect, variant plan ([references/ad-grammar.md](references/ad-grammar.md)) |
| 4 | write | Concept gate: the ad retold in three sentences; a muted viewer gets what it is, what it does, what to do next |
| 5 | write | Sequence plan from the recipe's structure for the length; the product row in the ledger; a still and a motion prompt per shot in the model's dialect ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 6 | show | Ad card, shot list, product description, sound plan, model, the estimate range from the recipe; wait for "go" |
| 7 | `list_assets`, `import_asset` | The packshot and any lifestyle photo the user owns: already in Lavendly, `list_assets` (show the name when more than one fits); a public URL, `import_asset` |
| 8 | `create_workflow` | `shots` in order, top-level `aspect` and `videoModel`, `idempotency_key` |
| 9 | `get_workflow`, `update_workflow` | Still-frame prompts on the image nodes; the packshot as the first frame of product-exact scenes; the packshot as a reference on the others, within the model's cap ([references/mcp-calls.md](references/mcp-calls.md)) |
| 10 | `set_clip_native_audio` | Every clip: `native` for the product sound or a spoken line, `mix` under narration, `off` for a music edit |
| 11 | `attach_track`, `get_workflow_audio` | One narration track, one score with `ducking: true`, captions on for sound-off placements; both with `"scope": "film"`, confirmed with `get_workflow_audio` to reach every clip (only if not, `update_workflow` edges to the missing clips) ([references/mcp-calls.md](references/mcp-calls.md)) |
| 12 | `estimate_cost` | Announce: shots, model, clips, opening images, total, balance after; wait for yes |
| 13 | `generate_scene` | Scene by scene with `max_credits`; open each frame before paying for the next |
| 14 | `quality_check`, `get_scene_frame` | Each scene, each cut, then the product check: shape, finish, label, count |
| 15 | `edit_clip`, `move_clip` | Trims to the strongest window, the held end frame, dips |
| 16 | `create_render`, `get_render` | Free; then `quality_check` on the film and the muted-viewer test |
| 17 | deliver | Link, length, what the user adds in the app (logo, price card, disclosure label), the variant offer |

## Decision rules

### Which recipe

| The brief says | Recipe |
|---|---|
| serum, cream, makeup, haircare, fragrance | [references/beauty-skincare.md](references/beauty-skincare.md) |
| headphones, phone, speaker, charger, camera, wearable | [references/tech-gadgets.md](references/tech-gadgets.md) |
| drink, coffee, snack, packaged food, a menu item | [references/food-drink.md](references/food-drink.md) |
| clothing, shoes, bags, eyewear | [references/fashion-apparel.md](references/fashion-apparel.md) |
| car, bike, scooter, accessory for vehicles | [references/automotive.md](references/automotive.md) |
| ring, necklace, watch, small precious object | [references/jewellery-watches.md](references/jewellery-watches.md) |
| lamp, chair, bedding, kitchenware, decor | [references/home-furniture.md](references/home-furniture.md) |
| gym gear, supplement, wellness app, activewear | [references/health-fitness.md](references/health-fitness.md) |
| "UGC", "like a real customer", "selfie review", unboxing | [references/ugc-style.md](references/ugc-style.md) |
| "before and after", a cleaning or organising result | [references/before-after.md](references/before-after.md) |
| "coming soon", "launch", "teaser", a reveal date | [references/launch-teaser.md](references/launch-teaser.md) |
| an app, a SaaS tool, software | [references/app-saas.md](references/app-saas.md) |
| a sale, a code, a holiday, a seasonal drop | [references/offer-seasonal.md](references/offer-seasonal.md) |

Two recipes can stack: a UGC-style ad for a serum takes the format from
UGC and the light and product rules from beauty.

### Product fidelity

- The product is the hero and the only thing that must never change. Never
  let a model invent it from words. Bring in a real packshot or accurate
  render (`list_assets` if it is in Lavendly, else `import_asset`) before any spend; without one, say the product will be
  an approximation and offer to wait for a photo.
- Opening images are made from text alone on the MCP path. So any scene
  where the product is large, centred or labelled opens on a real image:
  set the hosted packshot (or the user's own lifestyle photo) as that
  scene's first frame. A text-made opening is fine only where the product
  is small, partial, out of focus, or not yet in frame.
- Wire the packshot as a reference into the other clips with a role
  sentence ("Reference 1 is the bottle's shape, glass, cap and label layout
  only; ignore its background and light"). Caps: 4 on Seedance and Wan 2.6
  and 2.7 (the MCP path sends at most 3 besides the first frame), 2 on the
  others, 0 on Veo 3.1 Lite. A first frame still works on Veo 3.1 Lite.
- Motion around a real product stays small: a push-in, a light sweep, a
  turn of 30 to 90 degrees, never a full orbit. One lock sentence in every
  motion prompt: "the bottle's shape, cap and label stay exactly as in the
  opening frame".
- Write the product's locked description once (shape, material, finish,
  colour, size cue, one mark), verbatim in every still prompt. Never write
  the brand name or label words in a prompt; models try to letter them.

### Which model

| Need | Pick | Why |
|---|---|---|
| Top quality, product or skin, 16:9 or 9:16 | Veo 3.1 (47 per 4 s) | Highest quality, native sound, 2 references |
| The default for most ads | Veo 3.1 Fast (14 per 4 s) | 1080p, sound, 2 references, what the Quick Starts use |
| Several references (product, face, set) or 1:1, 3:4 | Seedance 2.0 (44 per 5 s) or Seedance 1.5 Pro (14 per 5 s) | 4 references, sound, seven shapes |
| People moving, sport, dance | Kling v3 Pro (20 per 5 s) | Body motion; 720p, 16:9, 9:16, 1:1 |
| Cheap draft of layout and timing | Veo 3.1 Lite (10 per 4 s) or Seedance 2.0 Mini (9 per 5 s) | Lite takes no references; Mini takes 4 |

- The top-level `videoModel` sets every shot. A film may use a different
  model per scene: set `data.videoModel` on that clip with `update_workflow`
  and confirm it in `estimate_cost` `per_scene`.
- Durations come from the model's exact list: Veo 4, 6 or 8 only; Seedance
  2.0 and 2.0 Fast and Mini 4 to 15; Kling v3 3 to 15; Wan 2.7 2 to 10.
  Blocks of 5 s round up, so a 6 s clip costs the same as 10 s on block
  models and as 8 s on Veo. Generate 4 s on Veo and 5 s elsewhere, then
  trim to the cut.
- The app's Draft model (Grok Imagine 1.5 Lite) is quoted at 17 per 5 s on
  the MCP path, more than Veo 3.1 Lite. Do not use it to save credits.

### Length, aspect and placement

| Placement | Aspect | Length | Sound |
|---|---|---|---|
| TikTok in-feed | 9:16 | 9 to 15 s direct response, 21 to 34 s story | on, captions `tiktok` |
| Reels, Shorts | 9:16 | 15 to 30 s | on, captions `reels` or `youtube` |
| Meta feed | 1:1 or 3:4 (no model makes 4:5) | 6 to 15 s | designed for sound off, captions `caption` |
| YouTube bumper and pre-roll | 16:9 | 6 s bumper, 15 or 30 s | on, brand spoken in the first 5 s |
| Site hero, product page | 16:9 or 1:1 | 6 to 15 s loop | often silent |

- The export takes the first clip's aspect; 21:9, 9:21, 3:2 and 2:3 export
  at the 9:16 size. Veo makes only 16:9 and 9:16.
- Over 30 s, show the plan for the asked length and a 30 s cut with both
  costs; build the one the user picks.

### Hook, proof, call to action

- Hook in 0 to 3 s, proof before 25 s, the call to action held at least
  2 s. The hook and the call to action make the same promise; write both
  before any shot. Hook templates and timings by length are in
  [references/ad-grammar.md](references/ad-grammar.md).
- The product or its effect is visible in frame 1, with motion in it. Never
  a logo first, never a slow fade from black.
- Proof is something the viewer sees happen (the drop spreading, the
  cable clicking in), never a number the model invents.

### Claims and people

- No AI person is ever presented as a real customer. UGC-style ads with AI
  people demonstrate and describe; they do not claim personal results. Add
  the disclosure line from [references/ugc-style.md](references/ugc-style.md).
- No AI "results" as proof for beauty, health, cleaning or fitness claims.
  Show the product and its use; leave results to real evidence.
- Offers, prices, dates and numbers only as the user gave them.
- No real people, celebrities, other brands, logos or studio names in any
  prompt or reference.

### No on-screen text

- The MCP renders no titles, and models garble text. Labels face away or
  stay as they are in the real packshot frame; screens stay dark or out of
  frame; signs stay blank.
- The offer, the price and the call to action are spoken and captioned
  (numbers spelled out in speech). The last shot leaves clean negative
  space for the logo and offer card the user adds in the app; tell them.

### Sound

- Decide before generation: the product's own sound (click, pour, zip) is
  often the hook; narration carries the promise and the call to action; one
  score for the film. Mix modes and word budgets are in each recipe.
- Narration ceiling is `floor(seconds x 2.5)` words; write to about 2.3 per
  second so the line breathes. 15 s holds about 30 to 34 words.

### Variants

- One variable per variant (the hook, the first line, the music, the call
  to action), never two. Voice, music, captions, order and trims cost no
  clip: render, change, render again. A new hook shot costs one clip.
  Method in [references/ad-grammar.md](references/ad-grammar.md).

### Cost

- Typical 15 s and 30 s costs per model are in each recipe. Announce
  before every paid call; render is free; generate scene by scene; at most
  one re-roll per scene with the fix named; over 30 percent of the balance,
  ask first; `sufficient` false, stop.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration` on servers that carry the synthesis update. Try that
form first. If the server answers `url required`, ask the user to make the
voice or music in the Lavendly app (Asset Library), then find it with
`list_assets` and attach its `url` and continue.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The user asks for AI people as real customers, AI results as proof, a
  competitor's ad cloned, a celebrity or another brand's logo: say why in
  one line and offer the honest version.
- No packshot and the user needs the exact product: wait for the photo.
- The same failure twice on one scene (label melts, product changes shape):
  change the direction (packshot frame, smaller move) before more spend.
- `needs_browser`, or `stalled` on two polls: report and stop polling.
- Media pasted in the chat: ask for an Asset Library upload, then
  `list_assets`; or a public URL, then `import_asset`.

## UX rules

1. Names and links in chat, never raw ids or JSON. Models by display name.
2. Show the ad card and shot list on one screen before anything is created.
3. Explain a choice in half a sentence ("the pour is the hook because the
   sound sells the cold").
4. Silent polling; one line per phase; a frame link per scene.
5. The user's language in chat; English in prompts and tool arguments.
6. Never call a drifting product "matching". Say what was checked.
7. At delivery, list what the user adds in the app: logo, offer card,
   disclosure label for UGC-style ads.

## Reference docs

- [references/ad-grammar.md](references/ad-grammar.md): promise, hook to call to action, timings, hook templates, the five UGC formats, static ad to video, variants, platform specs and safe zones.
- [references/mcp-calls.md](references/mcp-calls.md): packshot import, first frame and reference wiring, audio, trims, end hold, variant renders.
- [references/prompt-anchors.md](references/prompt-anchors.md): product block, still and motion templates per model family, banned words, materials, macro and product light vocabulary.
- [references/troubleshooting.md](references/troubleshooting.md): ad failures and errors with fixes.
- Recipes: [references/beauty-skincare.md](references/beauty-skincare.md), [references/tech-gadgets.md](references/tech-gadgets.md), [references/food-drink.md](references/food-drink.md), [references/fashion-apparel.md](references/fashion-apparel.md), [references/automotive.md](references/automotive.md), [references/jewellery-watches.md](references/jewellery-watches.md), [references/home-furniture.md](references/home-furniture.md), [references/health-fitness.md](references/health-fitness.md), [references/ugc-style.md](references/ugc-style.md), [references/before-after.md](references/before-after.md), [references/launch-teaser.md](references/launch-teaser.md), [references/app-saas.md](references/app-saas.md), [references/offer-seasonal.md](references/offer-seasonal.md).
