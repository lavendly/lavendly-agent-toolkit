---
name: lavendly-characters
version: 0.2.0
priority: normal
description: |
  Keep a person, creature, mascot, product or vehicle the same in every shot and video on Lavendly: locked description, hero sheet, references with one job each, opening frames per shot, exact counts against clones, frame chaining within the drift limit, wardrobe and prop states, one voice id, product fidelity, acting and lip sync.
  Use when: "the same character in every scene", "my mascot", "keep the bottle exact", "she looks different in shot 3", "two of him appeared", "make her talk", "a recurring cast".
  Chain: lavendly-director runs the process; lavendly-models picks the model and dialect; lavendly-series carries the cast across episodes.
  NOT for: real people without consent, public figures or lookalikes, logos the user does not own.
argument-hint: "[hero: description, photo url or 'design one'] [kind: person, creature, mascot, product, vehicle] [voice id]"
---

# Lavendly Characters

Identity holds on Lavendly in three layers, and each fails in a known way.
The words: the locked description, the only thing the server's text-only
opening images ever see. The pictures: a hero sheet wired as references to
the clips, within each model's cap. The frames: a shot that starts from a
real image or from the previous shot's last frame, exact at first and
drifting after a few hops. This skill uses all three, decides which one
carries each shot, and says plainly where the MCP path cannot hold a face.

## Before anything else

- `get_status`, `get_ledger`; `get_schema` to confirm `get_scene_frame`
  takes the frame option before planning a chain.
- The process (intent card, sequence plan, ledger, checks) is
  lavendly-director's. The model and its dialect are lavendly-models'. This
  skill decides how identity travels.
- Ask once: does a picture of the hero exist (a photo, a packshot, a
  drawing, an earlier episode's sheet)? A real image beats any generated one.
- Real people only with consent: the user, or someone who agreed. Never a
  public figure, a celebrity, a lookalike or a "style of" a real person.
  Never a cloned voice without its owner. Brand marks only the user's own.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, balance |
| 2 | write | The identity card per subject: kind, name, count per scene, locked description, what may change, voice |
| 3 | `list_assets`, `import_asset` | Supplied photos, packshots or sheets to hosted urls: already in Lavendly, `list_assets` (show the name when more than one fits); a public URL, `import_asset` |
| 4 | `create_workflow`, `update_workflow`, `estimate_cost`, `generate_scene` | Only when nothing is supplied: the casting scenes, announced and approved like any spend ([references/character-sheet.md](references/character-sheet.md)) |
| 5 | show | Sheet frames and locked description; wait for approval |
| 6 | `create_workflow` | The film: a reference-capable `videoModel`, `aspect`, exact durations |
| 7 | `get_workflow`, `update_workflow` | Per scene: the first-frame source, the still prompt, reference nodes wired to the clip, role sentences in the motion prompt |
| 8 | `estimate_cost` | Announce in one line; wait for yes |
| 9 | `generate_scene`, `get_scene_frame` | Scene 1 alone; compare it to the sheet before paying for scene 2 |
| 10 | `get_scene_frame`, `update_workflow` | Chain a continuing shot: frame last of N on the image node of N+1; count hops |
| 11 | `attach_track`, `update_workflow` | Voiceover in the character's one voice; voice is charged when attached, say so; a voiceover that spans the film is attached with `"scope": "film"` and confirmed with `get_workflow_audio` to reach every clip (only if not, `update_workflow` edges to the missing clips) ([references/mcp-calls.md](references/mcp-calls.md)) |
| 12 | `quality_check` | Every scene; identity drift gets one named fix ([references/troubleshooting.md](references/troubleshooting.md)) |
| 13 | write | The identity record for the next video: description, sheet urls, voice id, end states |

Call shapes: [references/mcp-calls.md](references/mcp-calls.md).

## Decision rules

### Decide the identity

- Every recurring subject gets a name used in every prompt, never a
  pronoun to open a sentence, and an identity card with three layers:
  permanent identity (never changes), arc wardrobe (changes only at a scene
  heading the plan names), scene state (wet, muddy, lit, open, half full:
  changes only on screen).
- 5 to 8 visual anchors, observable only, plus one asymmetric mark (a gold
  hoop in the left ear only, a scar through the right brow, a chipped
  corner on the lid). Models keep distinctive features; they average away
  generic ones.
- Write the cast per scene with counts. Two subjects of very different size
  get their scale in words ("the mouse reaches the cat's ankle").

### The locked description

- Written once, shown, approved, pasted verbatim into every still-frame
  prompt. A synonym is a new instruction and a new face.
- Keep it to 200 to 250 characters: it leads the 500-character opening
  image prompt and the shot needs the rest.
- The approved picture wins. When sheet and words disagree, change the
  words to match the picture; contradictions cause drift.
- Templates for person, creature, mascot, product and vehicle:
  [references/locked-descriptions.md](references/locked-descriptions.md).

### The hero sheet

- Supplied first: `list_assets` (in Lavendly) or `import_asset`. Second, made in the app (image-to-image
  from the user's photos, the in-app Director's lock subject sheet, a
  trained persona for a consenting person), then imported. Third, the MCP
  casting scenes: a head close-up and a full figure, each with a short
  screen-test clip on the film's model.
- Laws: plain mid-grey background, even soft light, neutral expression;
  the head close-up is the single source of the face (never several faces of
  one character in one reference); full figure front for the outfit;
  creatures add mouth open and mouth closed; two subjects of different size
  add one frame side by side ("if unsure, the smaller one smaller");
  photoreal faces keep their asymmetry and skin texture; products get front,
  three-quarter, side, top and label close-up packshots.
- Fix a flawed sheet by an edit in the app ("change only the collar; keep
  face, pose, framing and background"). On the MCP path a re-roll is a new
  draw and a new person: re-roll only when the face itself is wrong, then
  approve again.
- Construction and prompts:
  [references/character-sheet.md](references/character-sheet.md).

### References: one job each, within the cap

- Wire sheet images to the clip nodes, after the scene's own image edge
  (the first image with a url is the first frame). Count: the model's cap
  and at most 3 on the MCP path. Never on Veo 3.1 Lite or Auto: name a
  reference-capable model.
- Priority when slots are short: the face (or the product), then the
  outfit or the second character, then a style plate, then the place.
- Every wired reference gets a role sentence in the motion prompt, in
  wiring order, with what not to copy: "Reference 1 is Mia's face and hair
  only; ignore its grey background, light and pose."
- References never reach opening images on the MCP path; the still-frame
  prompt carries identity in words. Say this limit when the user expects a
  generated still to match a photo.
- When the user's project has a Film Bible set up in the app, the server
  adds its own reference list and consistency block: write no second list.
- Sentences by kind: [references/reference-roles.md](references/reference-roles.md).

### Where each shot's first frame comes from

| Shot | First frame |
|---|---|
| Hero large in frame, action continues from the previous shot | The previous scene's last frame (chain), within the hop limit |
| Hero large, new angle or new scene, face must match | A still made in the app from the sheet, imported; else a text-only opening image with the locked description plus references on the clip, and check it |
| Product large in frame | A real packshot angle, or an app-made still from it; never a text-only image |
| Hero small, from behind, or absent | A text-only opening image |
| The hero enters during the shot | A text-only opening of the empty set; the locked description in the motion prompt; the reference on the clip |

No two clips start from the same frame: give each scene its own packshot
angle, its own still or its own chained frame.

### Two prompts per shot

- Still-frame prompt: the locked description first, then pose and
  expression, placement, camera, light, background, the exact count, the
  clean-frame line. The start of the shot, never the payoff.
- Motion prompt: what changes (the action with timing, the one camera move,
  the end state), the role sentences, one lock sentence ("Mia, her coat and
  the window light stay exactly as in the opening frame"), the exact count.
  The full description only when the hero enters mid-shot.

### Exact counts against clones

- Clones are the most common identity failure. Every still and motion
  prompt states the count: "Exactly one Mia in frame, nobody else, no copy
  of her." Two characters: "Exactly two people: Mia on the left, Tom on the
  right; nobody else, no second copy of either."
- Mirrors, windows and water are named and bounded ("her reflection in the
  dark window, nothing else"). A point of view shot says "nobody in frame".
- A newcomer gets an introduction shot before acting; nobody vanishes
  inside a scene without an exit.

### Chaining and drift

- Only first frames are sent; chaining is by hand: after scene N lands,
  `get_scene_frame` with frame last, put `/api` plus the returned path on
  scene N+1's image node with `update_workflow`, then generate N+1. Frame
  last is the raw clip's end, before any trim: chain only from an untrimmed
  end. A chained scene skips its
  opening image charge and must wait for N.
- A chain drifts: faces soften and the palette slides after 2 to 3 hops.
  Count hops from the last clean frame. At hop 3, start from a clean
  keyframe: an app-made still from the sheet, or a text-only opening image
  with the locked description and the references on the clip.
- A cut to a new angle resets drift; prefer it to a long chain when the
  story allows.
- Detail and the fix ladder:
  [references/chaining-and-drift.md](references/chaining-and-drift.md).

### Wardrobe, props and states

- The ledger row per subject holds the state after each landed frame:
  wardrobe, wetness, what each hand holds, open or closed, full or empty.
  The next prompt starts from what the frame shows, not what was asked.
- A change happens on screen (she takes the coat off) or across a scene
  heading the plan names. Props keep their count and their hand.

### Products and vehicles

- Start from a real packshot (`list_assets` or `import_asset`); never let a model invent
  the product from text.
- Rigid material words and shape invariance in every motion prompt ("rigid
  frosted glass, fixed white cap; the bottle's shape stays exactly the
  same"). Rotations up to about 90 degrees; small, slow moves.
- Labels, logos, screens and number plates: blank, soft or turned away. The
  model re-letters text as it moves; the user adds exact words in the app.
- Check every frame for added buttons, changed proportions and moving
  labels.

### Voice identity

- One voice id per character for the film and every later episode, passed
  explicitly on `attach_track`. A missing voice, or an OpenAI voice name,
  lands on the default ElevenLabs voice (Rachel). Record the id.
- Native dialogue changes timbre from clip to clip. For a recurring
  speaking character keep the same delivery words in every clip, or carry
  the lines as voiceover over shots where the mouth is not seen.

### Acting and lip sync

- One emotion per beat, shown as a physical behaviour ("she presses her lips
  together and looks at the floor"), never an adjective.
- Lip sync holds in 3 to 8 s clips, medium close-up, one speaking face,
  locked camera, on a sound model, with native audio `native`. Never more
  than 2 words per second of clip; about 16 to 20 English words per 15 s of
  speech when sync must hold. Nothing on Lavendly syncs lips to an
  attached voice.
- Symptoms and fixes:
  [references/acting-and-lip-sync.md](references/acting-and-lip-sync.md).

### Across videos

- Reuse the hosted sheet urls, the locked words and the voice id; never
  regenerate a sheet per episode. Starting states come from the last
  episode's final frame.

## Compatibility

`attach_track` synthesizes a voiceover from `text` on servers that carry the
synthesis update; try that first with the character's `voice`. If the server
answers `url required`, ask the user to make the voice in the Lavendly app
(Asset Library) with the same voice, then find it with `list_assets` and
attach its `url`.

## When to stop

- The user wants a real person they have no consent for, a public figure,
  or a lookalike: decline that part and offer an original character.
- Scene 1's hero does not match the approved sheet: fix scene 1 before any
  other scene is paid for.
- The same identity failure twice on one scene: change the first-frame
  source (an app-made still, a cut instead of a chain), not the wording a
  third time. Ask.
- The hero needs a reference and the only fitting model is Veo 3.1 Lite:
  say so and pick another model.

## UX rules

1. Show the locked description and the sheet frames on one screen before
   anything is paid for; it is the cheap moment to change a face.
2. Never say a frame matches the sheet or a photo you have not opened.
3. Say which layer carries each shot in half a sentence ("chained from
   scene 2 so the face holds").
4. Names, not ids; the user's language in chat, English in prompts.
5. Name the limit plainly when it bites: opening images cannot see a
   reference on the MCP path; no lip sync to an attached voice.

## Reference docs

- [references/character-sheet.md](references/character-sheet.md): sheet laws, sheet and casting prompts, the MCP casting scenes, fixing a sheet.
- [references/locked-descriptions.md](references/locked-descriptions.md): templates and examples for person, creature, mascot, product, vehicle; the three layers.
- [references/reference-roles.md](references/reference-roles.md): role sentences, slot priority, caps per model, wiring order.
- [references/chaining-and-drift.md](references/chaining-and-drift.md): manual chaining, hop counting, the clean keyframe, cuts that reset.
- [references/acting-and-lip-sync.md](references/acting-and-lip-sync.md): beats, physical behaviour, dialogue limits, symptom list and fixes.
- [references/mcp-calls.md](references/mcp-calls.md): `import_asset`, image node prompt and url, reference wiring, `get_scene_frame` with frame last, voiceover.
- [references/troubleshooting.md](references/troubleshooting.md): drift, clones, wrong face, label garbling, voice changes.
