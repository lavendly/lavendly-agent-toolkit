---
name: lavendly-places
version: 0.2.0
priority: normal
description: |
  Make films of places and lifestyle on the Lavendly MCP: real estate, interiors, travel, hotels and restaurants, recipes, lookbooks, sports, events, brand films, renovations. Real places open on the user's own photos; AI moves the camera and the light, never the facts.
  Use when: "a listing video for this house", "a reel for our hotel", "a travel video", "a lookbook", "an event teaser", "a brand film", "our kitchen job before and after".
  Chain: lavendly-director runs the process; lavendly-models and lavendly-characters for dialects; lavendly-cost-aware wins spend; lavendly-review checks; lavendly-publish posts.
  NOT for: product ads (lavendly-ads), stories (lavendly-cinematic), AI crowds shown as a real event, features added to a real listing.
argument-hint: "[place or subject] [photo urls] [real or concept] [placement] [length 6..60]"
---

# Lavendly Places

A film of a place sells a feeling of being there, and it is only worth
anything if the place is what the viewer will find. This skill holds the
field knowledge for real estate, interiors, travel, hospitality, food,
lookbooks, sport, events, brand films and renovations, and the platform
facts that decide what Lavendly can do with them: how the user's real
photos become first frames, which model holds a room steady, how slow the
camera must move, what sound says "here", and what may never be invented.
The lavendly-director skill owns the shared process (intent card, sequence
plan, ledger, three-level checks); this skill makes the place decisions.

## Before anything else

- `get_status` and `get_ledger` once per session. Never claim or deny a
  capability or a model from memory; `get_schema` when unsure.
- Run the director's process. Load lavendly-models and lavendly-characters
  when installed; when they are not, the tables here are enough.
- Read the brief for: the place or subject, whether it is real (a listing,
  a named hotel, a real destination, a company, a past event) or a concept
  (an unbuilt design, a mood film, a fictional café), the photos and
  footage the user has, placement, length, aspect, the feeling, the call to
  action. The usual question: "Can you share photos of the place? I will
  animate them rather than invent it."

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities and credits |
| 2 | write | Pick the recipe (table below); decide real or concept |
| 3 | write | Director intent card plus the place card: the place, real or concept, the one feeling, must-show features, the order of rooms or moments, time of day, the call to action |
| 4 | write | Concept gate: the film retold in three sentences; a muted viewer knows where it is, what it offers, what to do |
| 5 | write | Sequence plan from the recipe; a ledger row per place (geometry, light direction, time of day); a still and a motion prompt per shot ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 6 | show | Place card, shot list with which photo opens which scene, sound plan, model, cost range; wait for "go" |
| 7 | `import_asset` | Every photo that opens a scene (images up to 25 MB) |
| 8 | `create_workflow` | `shots` in order, top-level `aspect` and `videoModel`, `idempotency_key` |
| 9 | `get_workflow`, `update_workflow` | Photo scenes: the image node's `data.url` is the photo; concept scenes: the still prompt on the image node ([references/mcp-calls.md](references/mcp-calls.md)) |
| 10 | `set_clip_native_audio` | Every clip: `mix` under narration, `native` where the place's sound is the point, `off` for a music edit |
| 11 | `attach_track`, `update_workflow` | One narration track, one score with `ducking: true`, captions when sound may be off; `scope` film where `get_schema` lists it, else edges from both to every clip, so they run film-wide ([references/mcp-calls.md](references/mcp-calls.md)) |
| 12 | `estimate_cost` | Announce: shots, model, clips, opening images (none on photo scenes), total, balance after; wait for yes |
| 13 | `generate_scene` | Scene by scene with `max_credits`; open each frame before paying for the next |
| 14 | `quality_check`, `get_scene_frame` | Each scene against its photo: walls, windows, doors, furniture, view, signage; each cut; then the film |
| 15 | `edit_clip`, `move_clip` | Trims to the steady window, holds, dips for a change of time |
| 16 | `create_render`, `get_render` | Free; `quality_check` on the film; the muted-viewer test |
| 17 | deliver | Link, length, what the user adds in the app (address card, logo, labels such as "virtually staged" or "concept") |

## Decision rules

### Which recipe

| The brief says | Recipe |
|---|---|
| house, flat, building, facade, development, architecture portfolio | [references/real-estate-exteriors.md](references/real-estate-exteriors.md) |
| rooms, walkthrough, home tour, office space, staging | [references/interiors-walkthroughs.md](references/interiors-walkthroughs.md) |
| city, coast, island, trip, destination, tourism board | [references/travel-destinations.md](references/travel-destinations.md) |
| hotel, resort, restaurant, café, bar, spa | [references/hospitality.md](references/hospitality.md) |
| recipe, cooking steps, a dish being made | [references/food-recipes.md](references/food-recipes.md) |
| lookbook, collection, several outfits | [references/fashion-lookbook.md](references/fashion-lookbook.md) |
| sport, training, athlete, race, action | [references/sports-action.md](references/sports-action.md) |
| conference, festival, launch night, wedding, recap, teaser | [references/events-recaps.md](references/events-recaps.md) |
| company, mission, culture, recruiting, about us | [references/corporate-brand.md](references/corporate-brand.md) |
| renovation, remodel, makeover, a contractor's job | [references/renovation-before-after.md](references/renovation-before-after.md) |

A product shown in a place (a sofa in a hotel suite) is an ad: take the
format from lavendly-ads and the light and camera from here.

### Real or concept

- A real place (a listing, a named hotel or restaurant, a real destination
  sold as itself, a company's office, a past event) opens every scene that
  shows it on the user's own photo. AI moves the camera, the light and
  small natural things (curtains, water, steam, leaves). It never adds,
  removes or improves a feature: no extra window, no bigger room, no better
  view, no pool that is not there.
- A concept (an unbuilt design, a mood film for a kind of place, a fictional
  café, a teaser before an event) is text-made, and the user labels it
  ("concept", "artist's impression", "illustration") wherever it is shown.
- Without photos for a real place: say the film would show an invented
  place, and either wait for photos or make a clearly labelled mood film
  with no claim to be that place.

### Photos as first frames

- Each photo becomes one scene's first frame: `data.url` on that scene's
  image node. It costs no opening image and the clip opens exactly on it.
- The photo's shape should match the film: landscape photos for 16:9,
  vertical photos for 9:16. A mismatched photo is reframed by the model in
  ways you cannot control; ask for the right crop or pick the matching
  aspect.
- One photo, one scene, one room. Never ask a clip to walk from one photo's
  room into a room the model has not seen: it will invent it. A move into
  the next room is a cut to that room's photo.
- References matter little on photo scenes; the first frame carries the
  place. So Veo 3.1 Lite (no references, first frame accepted) is a fair
  draft and value choice for photo-led films.

### Camera on places

- Slow and steady: gimbal glides at walking pace, slow push-ins, slow
  pedestal rises, slow drone advances, short pans. One move per shot,
  neighbours from different move families.
- Verticals straight: "vertical lines straight, two-point perspective".
  Lens feel 16 to 24mm for rooms, 24 to 35mm for exteriors, 50 to 85mm for
  details, 100mm macro for materials and food.
- Short clips: 4 to 5 s per move. A long glide through a space is where
  rooms re-arrange and doors multiply.
- People in places: small, soft, turned away, or one named person doing
  one thing; always the exact count. No crowds near the lens.

### Which model

| Need | Pick | Why |
|---|---|---|
| Top quality, photo-led or concept, 16:9 or 9:16 | Veo 3.1 (47 per 4 s) | steadiest geometry and light, native ambience |
| Default for most place films | Veo 3.1 Fast (14 per 4 s) | 1080p, sound, holds a photo first frame |
| Photo-led on a budget, any feed shape | Wan 2.7 (12 per 5 s) | 1080p, sound, 16:9, 9:16, 1:1, 4:3, 3:4 |
| Long single takes (10 to 30 s) | Wan 3.0 (24 per 5 s) or Seedance 2.5 (27 per 5 s) | the only models past 20 s |
| People moving (sport, dance, lookbook walks) | Kling v3 Pro (20 per 5 s) or Seedance 2.0 (44 per 5 s) | body motion; Seedance for 4 references |
| Draft | Veo 3.1 Lite (10 per 4 s) | photo first frames work; no references |

- One model per film through `shots`. Durations from the model's list:
  Veo 4, 6 or 8; Wan 2.7 2 to 10; Wan 3.0 2 to 30; Kling v3 3 to 15;
  Hailuo 2.3 6 or 10 (16:9 only, silent). Blocks of 5 s round up.
- The export takes the first clip's aspect; 21:9 and 3:2 export at the 9:16
  size. Free and Starter export 720p, Creator and up 1080p.

### Light and time

- One time of day per place, written once as a light line and pasted in
  every prompt of that place ("bright overcast daylight, every lamp on").
  A move from day to dusk is its own time-passage shot, never a cut.
- Photo scenes keep the photo's light; never ask a daylight photo to turn
  into a twilight exterior. For a twilight shot, ask for a twilight photo.

### Sound

- Ambience says where we are: room tone, birds, waves, a café's murmur, a
  stadium. Keep it continuous within one place.
- Narration ceiling `floor(seconds x 2.5)` words, written to about 2.3 per
  second. One score for the film with an arc; ducking under the voice.

### No on-screen text

- No address, price, room name, signage or menu in any prompt. Those are
  spoken and captioned, or added by the user in the app. Signs in frame
  stay blank or turned away; real photos keep their real signs only in
  their first frames.

### Cost

- Each recipe lists typical 15 s and 30 s costs per model. Photo scenes
  have no opening image charge. Announce before every paid call; render is
  free; generate scene by scene; at most one re-roll per scene with the fix
  named; over 30 percent of the balance, ask first; `sufficient` false,
  stop.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration` on servers that carry the synthesis update. Try that
form first. If the server answers `url required`, ask the user to make the
voice or music in the Lavendly app (Asset Library), then attach the hosted
file by `url` and continue.

## When to stop

- `sufficient` is false, or the user declines the estimate.
- The user wants a real listing, venue or destination improved (a bigger
  room, a view, a pool, a crowd that was not there), or AI footage presented
  as a real event: say why in one line and offer the honest version.
- A real place with no photos: wait for photos, or agree a labelled mood
  film.
- The same failure twice on one scene (a room re-arranges, a landmark
  melts): change the direction (shorter move, a cut, another photo) before
  more spend.
- `needs_browser`, or `stalled` on two polls: report and stop polling.
- Media pasted in the chat: ask for an Asset Library upload or a public URL.

## UX rules

1. Names and links in chat, never raw ids or JSON. Models by display name.
2. Show the place card and the shot list (with the photo for each scene)
   on one screen before anything is created.
3. Explain a choice in half a sentence ("one room per clip, so the walls
   stay where they are").
4. Silent polling; one line per phase; a frame link per scene.
5. The user's language in chat; English in prompts and tool arguments.
6. Never call a scene faithful to a place you have not compared with its
   photo; say what was compared.
7. At delivery, list what the user adds in the app: address or price card,
   logo, and any label ("virtually staged", "concept", "illustration").

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): photo import, photos as first frames, concept stills, audio, trims, holds.
- [references/prompt-anchors.md](references/prompt-anchors.md): the place block, still and motion templates per model family, lock sentences, camera and light for spaces, materials, banned words.
- [references/troubleshooting.md](references/troubleshooting.md): place failures and errors with fixes.
- Recipes: [references/real-estate-exteriors.md](references/real-estate-exteriors.md), [references/interiors-walkthroughs.md](references/interiors-walkthroughs.md), [references/travel-destinations.md](references/travel-destinations.md), [references/hospitality.md](references/hospitality.md), [references/food-recipes.md](references/food-recipes.md), [references/fashion-lookbook.md](references/fashion-lookbook.md), [references/sports-action.md](references/sports-action.md), [references/events-recaps.md](references/events-recaps.md), [references/corporate-brand.md](references/corporate-brand.md), [references/renovation-before-after.md](references/renovation-before-after.md).
