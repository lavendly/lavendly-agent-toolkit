# Recipe: mascots and brand characters

A character a brand or a channel owns and reuses: the same silhouette,
colours, proportions, gestures and voice in every video. The design is
locked before the first clip; the videos are short and many.

## 1. Purpose, audience, ending

Social greetings, product introductions, how-to tips with a host, seasonal
posts, app and shop idents. Audience: the brand's customers and followers.
The ending is the mascot's signature gesture next to the product or the
promise, held on a locked-off frame with clean space where the user adds
the logo or a title in the app.

## 2. Designing the mascot (before any clip)

| Decision | Rule |
|---|---|
| Silhouette | readable as a black shape at thumbnail size; one bold outline idea |
| Shapes | at most three main shapes (a droplet body, round eyes, stubby limbs) |
| Colours | two brand colours named in words plus one neutral; hex in the bible for the human |
| Signature feature | one thing nobody else has (a single curl of hair, a highlight on the top left) |
| Material | one, said every time: glossy vinyl toy, soft plush, matte clay, flat 2D |
| Proportion | head to body, eye size, limb length, written once |
| Face | eyes, mouth closed by default, one catchlight per eye |
| No lettering | never a letter, number or logo on the mascot; the brand is in shape and colour |
| Behaviour | how it moves (hops, waddles, floats), its signature gesture, how it reacts |
| Voice | one voice for every video, or a silent mascot with SFX only |

The mascot sheet: front, three-quarter, side, back on plain light grey;
the head close-up as the single source of the face; mouth open and closed;
an expression row (happy, curious, surprised, proud); a size frame next to
the product; one product-hold pose. The sheet comes from the user (Asset
Library, `import_asset`), from the app, or from an approved scene 1 opening
image. Store the hosted url and reuse it in every video; never redraw the
sheet per video.

## 3. Structure by length

Built on Kling v3 Pro (whole lengths 3 to 15 s; up to 5 s is one block).
Example: Bloop, a water-droplet mascot for a refill shop.

### 6 s: the greeting

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Medium wide | Eye level | normal | locked-off | Bloop hops into place, waves, points at the bottle and holds the signature pose | 6 | 6 |

A one-scene film renders on its own path: no burned captions and no
`edit_clip` picture edits (only clip volume and mute). When the greeting
needs captions or a trim, make it two scenes of the same length.

### 15 s: hello, the product, the gesture

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 5 | Medium | Eye level | normal | locked-off | Bloop pops up from below frame and waves | 5 | 5 |
| 2 | 5 to 10 | Medium wide | Eye level | normal | slow push-in | Bloop pushes the bottle in from the right and pats it | 5 | 5 |
| 3 | 10 to 15 | Medium wide | Eye level | normal | locked-off | the signature pose beside the bottle, space on the left for the logo; holds | 5 | 5 |

### 30 s: a tip with a host

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 5 | Medium | Eye level | normal | locked-off | Bloop waves hello | 5 | 5 |
| 2 | 5 to 10 | Insert | High | macro | locked-off | an empty plastic bottle tips over on its own (the problem) | 5 | 5 |
| 3 | 10 to 15 | Medium | Eye level | normal | locked-off | Bloop shakes its head, eyes half-closed | 5 | 5 |
| 4 | 15 to 20 | Medium wide | Eye level | normal | slow truck right | Bloop rolls the refill bottle into frame | 5 | 5 |
| 5 | 20 to 25 | Close-up | Eye level | normal | locked-off | water fills the bottle from a tap; Bloop's eyes sparkle | 5 | 5 |
| 6 | 25 to 30 | Medium wide | Eye level | normal | locked-off | the signature pose with the full bottle, room for the logo; holds | 5 | 5 |

### 60 s: a mini-episode

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 5 | Medium | Eye level | normal | locked-off | Bloop waves hello | 5 | 5 |
| 2 | 5 to 10 | Medium wide | Eye level | normal | slow truck right | Bloop beside a picnic blanket on the backdrop | 5 | 5 |
| 3 | 10 to 15 | Insert | High | macro | locked-off | an empty plastic bottle tips over on the blanket | 5 | 5 |
| 4 | 15 to 20 | Close-up | Eye level | normal | locked-off | Bloop shakes its head, eyes half-closed | 5 | 5 |
| 5 | 20 to 25 | Medium | Eye level | normal | locked-off | try 1: Bloop pushes the bottle upright; it tips again | 5 | 5 |
| 6 | 25 to 30 | Close-up | Eye level | normal | locked-off | Bloop puffs its cheeks | 5 | 5 |
| 7 | 30 to 35 | Medium | Eye level | normal | locked-off | try 2: Bloop taps its chin, then hops once | 5 | 5 |
| 8 | 35 to 40 | Close-up | Eye level | normal | locked-off | its eyes brighten | 5 | 5 |
| 9 | 40 to 45 | Medium wide | Eye level | normal | slow truck right | Bloop rolls the refill bottle into frame | 5 | 5 |
| 10 | 45 to 50 | Close-up | Eye level | normal | locked-off | water fills the bottle from a tap | 5 | 5 |
| 11 | 50 to 55 | Medium | Eye level | normal | locked-off | Bloop pats the full bottle twice | 5 | 5 |
| 12 | 55 to 60 | Medium wide | Eye level | normal | locked-off | the signature pose, the left side empty for the logo; holds | 5 | 5 |

Twelve one-block clips: 240 credits on Kling v3 Pro.

## 4. Hook and payoff

- Hook (0 to 1 s): the mascot already moving, eyes to camera, with its
  signature sound; or the problem object in frame with the mascot entering.
- Payoff: the signature gesture with the product, locked-off, 2 s or more,
  with clean space for the logo the user adds.

## 5. Camera, light, colour

- Camera: eye level with the mascot, mostly locked-off, a slow push-in for
  the product moment; one move per clip.
- Set: a seamless coloured backdrop in a brand colour, or one simple set
  that repeats in every video; few props.
- Light: soft studio key from the front-left, a rim to separate the mascot
  from the backdrop, a glossy highlight on vinyl in the same place every
  time.
- Product: always from the user's real product photo or render; the label
  side turned away or kept small; never ask the model to draw the brand's
  name or logo.
- Exact phrases: "glossy vinyl-toy finish with one soft highlight on the
  top left", "seamless pale yellow backdrop curving into the floor", "eye
  level with the character, locked-off", "the mascot keeps its exact shape
  and colours".

## 6. Sound

- Native: a signature SFX (a bubbly pop, a squeak), soft Foley; clips
  `native` when no voice, `mix` at 0.3 under the voice.
- Voice: one voiceover track per video in the same voice id every time,
  2.3 words per second: 15 s about 30 words, 30 s about 65, 60 s about 130.
- Score brief: "A short bright motif on marimba and plucked bass at about
  112 BPM that becomes the brand's sound: the same four-note figure opens
  and closes every video." Volume 0.3 with `ducking: true`.

## 7. Model picks and credits

| Pick | Model | 15 s (3 x 5) | 30 s (6 x 5) | Why |
|---|---|---|---|---|
| Best quality | Kling v3 Pro | 60 | 120 | held faces and products from an approved still in a dated practitioner test; 1:1, 9:16, 16:9; 720p, so keep the mascot medium or wider |
| Best value | Seedance 1.5 Pro | 42 | 84 | 4 refs (head, body, product, plate) at 14 per block, 1080p |
| Draft | Seedance 2.0 Mini | 27 | 54 | 4 refs and sound at 9 per block |

A brand that posts weekly keeps one model for every video.

## 8. Prompt pairs (Kling dialect)

Pair 1: the greeting (6 s)

Still-frame prompt:

```text
Stylised 3D animation, glossy vinyl-toy finish, soft studio light. Bloop: a round sky-blue mascot shaped like a water droplet, a pointed tip on top, two short stubby arms, two short legs, large oval black eyes with one white catchlight each, a small coral smile, a white highlight on the upper left. Bloop stands beside a plain white bottle with a blank label on a seamless pale yellow backdrop. Medium wide, eye level. Soft key from front-left, rim light. No text, no letters, no logo.
```

Motion prompt:

```text
Scene: a seamless pale yellow studio backdrop. Character: Bloop, the sky-blue droplet mascot. Action: Bloop hops once in place and lands softly, waves its right arm toward the camera, then points at the white bottle and holds the pose with a closed-mouth smile. Camera: locked-off at eye level. Audio: a bubbly pop on the hop, a soft squeak on the wave. Style: smooth eased motion; Bloop keeps its exact shape, colours and glossy finish; the bottle and the backdrop stay exactly as in the opening frame. Exactly one Bloop and one bottle. Clean frame: no text, no on-screen graphics.
```

Pair 2: the product moment (shot 2 of the 15 s cut)

Still-frame prompt:

```text
Stylised 3D animation, glossy vinyl-toy finish, soft studio light. Bloop: a round sky-blue mascot shaped like a water droplet, a pointed tip on top, two short stubby arms, two short legs, large oval black eyes with one white catchlight each, a small coral smile, a white highlight on the upper left. Bloop stands at the left of a seamless pale yellow backdrop, both arms out to the right, nothing else on the floor. Medium wide, eye level. Soft key from front-left, rim light. No text.
```

Motion prompt:

```text
Scene: the same pale yellow backdrop. Character: Bloop. Action: a plain white bottle with a blank label slides in from the right edge along the floor and stops against Bloop's arms; Bloop pats the bottle twice and looks to the camera, eyes bright. Camera: slow push-in, stopping at a medium shot. Audio: a soft slide, two light pats, a happy squeak. Style: smooth eased motion; Bloop keeps its exact shape and colours. Exactly one Bloop and one bottle. Clean frame: no text, no on-screen graphics.
```

With the user's real product: import the packshot, wire it as reference 2
("Reference 2 is the bottle's shape and material only; ignore its
background"), and keep the label turned away.

Second family (Seedance 1.5 Pro), pair 1 in 30 to 100 words: "Bloop the
sky-blue droplet mascot is already mid-hop from the first frame, lands
softly, waves its right arm at the camera, points at the white bottle and
holds the pose. Locked-off at eye level, seamless pale yellow backdrop,
soft key from front-left. Glossy vinyl-toy 3D. Reference 1 controls only
Bloop's shape, colours and face; do not copy its background. Exactly one
Bloop. Sound: a bubbly pop, a squeak. Clean frame: no text, no on-screen
graphics."

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The mascot changes shape or colour between videos | the same hosted sheet as reference 1 in every video; the hero block verbatim |
| Letters or a logo appear on the mascot or the backdrop | "no text, no letters, no logo" in the still; the blank-label bottle |
| Hands grab the product and fuse with it | the product slides or rests beside the mascot; pats instead of grips |
| Product label warps | label turned away or blank; the real product as reference with a role sentence |
| Glossy finish turns matte or plush | the material words in the style line, every shot |
| Different voice each video | one voiceover track with the same voice id; native speech off |
| The mascot looks like a competitor's | change silhouette, colours and the signature feature before any spend |

## 10. Policy guards

- The mascot is a character, never presented as a real person or a real
  customer, and it never gives testimonials or health, beauty or results
  claims as proof.
- No existing mascot, character or logo, and no design close to one.
- The user's own logo is added by the user in the app or their editor,
  never drawn by the model.
