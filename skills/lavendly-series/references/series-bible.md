# The series bible

The bible is the show's memory and its law. Write it before the pilot, show
it to the user, and paste its blocks word for word into every episode. It
builds on the director's series-continuity table (cast, places, objects,
format, story so far) and adds the parts that keep a show stable over many
episodes: identity layers, character sheets, the forbidden list, the sound
identity, versioning and where the bible lives on the platform.

Worked example in this file: "Bisi's Rooftop", an invented slice-of-life
kids comedy. The user's own show replaces it in every field.

## 1. Show identity

| Field | Example |
|---|---|
| Title | Bisi's Rooftop |
| Logline | Auntie Bisi, a retired schoolteacher, and Tunde, her ten-year-old grandnephew, keep a rooftop vegetable garden growing in Lagos, one small problem an episode |
| Genre and tone | Slice-of-life kids comedy, warm, a little silly |
| Audience | Ages 5 to 10 and their families |
| Platform, aspect | YouTube and Shorts, 16:9 main cut |
| Length and cadence | 60 s, weekly (Fridays) |
| Model | One video model for the season (by display name) |
| Continuity mode | Strict inside a scene; flexible between scenes |

## 2. Recurring cast

One block per character, in three layers. Only the identity layer is
permanent.

```text
AUNTIE BISI (identity): a Nigerian woman in her sixties, round face, short grey natural hair, round tortoiseshell glasses, laugh lines, a small mole on her left cheek.
AUNTIE BISI (wardrobe, default): a green and gold Ankara print dress, flat brown sandals.
AUNTIE BISI (state, this episode): <set per episode from the last frame: soil on her hands, glasses pushed up on her head>
Moves: walks slowly and deliberately, hands on her hips when she is thinking.
Voice: the narration voice; one short line per episode at most.
Signature: pushes her glasses up with one finger before every idea.
References: head close-up <hosted url>; turnaround sheet <hosted url>.
TUNDE (identity): a ten-year-old boy, slim, close-cropped black hair, a wide grin, a small scar through his right eyebrow.
TUNDE (wardrobe, default): a plain yellow football shirt with no writing, blue shorts, white canvas trainers.
TUNDE (state, this episode): <from the last frame: muddy knees, the cracked green watering can in his hand>
Moves: runs everywhere, always one step ahead of her. Voice: no lines; reacts with small sounds.
```

Rules:

- Identity: five to eight observable anchors and one asymmetric detail (the
  eyebrow scar, a mole on one side, an earring on one ear) that the model can
  hold.
- Wardrobe: the default outfit, plus named alternates ("winter: a red wool
  hat"), each used only when the episode says so.
- State: the condition carried between episodes (a plaster on one knee,
  a cracked watering can), written from the last frame.
- Movement and voice belong to the character: how they move, how they
  sound (a narration voice id, or a delivery label for native dialogue kept
  identical in every clip).

## 3. Character sheets: the construction laws

References are what hold a face across episodes. Make them once, before the
pilot, and never regenerate them.

- Two images per character: a head close-up (the single source of truth for
  the face) and a turnaround sheet (front, three-quarter, side, back) for
  the body and the outfit. Crop the heads out of full-body panels; three
  small faces get averaged into a stranger.
- Plain light grey background, even soft light, neutral expression; a row of
  clearly different expressions only on a separate sheet.
- Creatures and mascots: a mouth-open and a mouth-closed close-up, so
  speaking or yawning does not invent teeth.
- Two characters of very different size (a mouse and a bear): one
  size-reference image with both side by side; "if unsure, the smaller one
  stays smaller".
- Photoreal people: keep facial asymmetry; real skin texture and age.
- A flawed sheet is fixed with an edit (the app's image-to-image), never
  rebuilt from scratch: a rebuild is a new face.

Where sheets come from on Lavendly:

| Route | How | Cost |
|---|---|---|
| The user uploads | Their own art or photos (their consent for a real person): in the Asset Library, `list_assets`; a public URL, `import_asset` | none |
| Made in the app | The user makes the sheet with an image model in the Lavendly app (references accepted there); find it with `list_assets` | 1 to 5 credits per image |
| A casting scene | One-scene workflow whose image node prompt is the sheet prompt, on the cheapest model without references; generate it, keep the opening image's url from `get_workflow`, ignore the clip | about 2 for the image plus the clip (10 on Veo 3.1 Lite at 4 s) |

Opening images made on the server never see a reference image: a sheet made
there is drawn from words alone. Approve it by eye before episode 1.

## 4. Recurring places

```text
THE ROOFTOP (place): the flat concrete roof of a three-storey apartment block in Lagos, a low white parapet wall, raised beds made from old tyres and wooden crates, a blue tarpaulin shade on bamboo poles.
Inside the crates: only dark soil, tomato plants, peppers and green leaves, nothing else.
Light (sunrise, default): warm low sun from the left through a light haze, long shadows to the right.
Light (sunset): orange sky behind the parapet, a warm bulb glowing in the stairwell doorway.
Geography: the stairwell door is on the left; the water tank on its metal stand is in the right corner; the city skyline sits behind the parapet.
Reference: <hosted url of the location plate>
```

Name what is inside every hollow, box, doorway and table, or say "only
light, nothing else": an unnamed space grows an object nobody asked for.

## 5. Recurring objects

```text
THE WATERING CAN (object): a green plastic watering can with a long spout and a round rose on the end.
Count: exactly one on the roof; Tunde carries it in every episode.
State: <from the last frame: since E02 cracked down its left side and mended with silver tape; full or empty; where it was left>
```

## 6. Style and the forbidden list

```text
STYLE LINE: Flat 2D animation, soft painted textures, rounded shapes, warm and bright.
PALETTE: leaf green, tomato red, sun yellow, sky blue, warm concrete grey.
FORBIDDEN: no neon, no pure-black shadows (deep blue-grey instead), no teal-and-orange grade, no text anywhere (blank signs and plain shirts), no extra people on the roof, no brand logos.
```

The forbidden list is the most useful line in a long-running bible: every
failure an episode shows becomes one more entry, stated as what to do
instead.

## 7. Sound identity

| Element | Example |
|---|---|
| Narration voice | One voice id from `get_status`, or a hosted voice file; same every episode |
| Narration pace | 1.8 to 2.1 words per second for kids; 2.3 otherwise |
| Score | One brief or one hosted score reused: "Talking drum, shaker and a bright fingerpicked guitar, about 100 BPM, a four-note guitar motif at the start and the end" |
| Sign-off sound | The four-note motif and a soft drum tap on the last image |
| Native sound | Street noise far below, birds on the parapet, water hissing on soil; `mix` under narration |

## 8. Format

The skeleton of slots every episode follows, with what is locked per slot
and what is free per episode. Formats by show type are in
[episode-formats.md](episode-formats.md).

## 9. Story so far

One line per published episode: what changed, and the end state of every
recurring character and object.

```text
E01 The First Seedlings: Tunde arrives for the holidays; Auntie Bisi gives him one crate of tomato seedlings. End: Tunde on the roof with the green watering can, the seedlings watered.
E02 The Cracked Can: Tunde drops the watering can and it cracks down the side; Auntie Bisi mends it with silver tape. End: the can taped, leaking a thin drip; Tunde still in charge of it.
E03 The Dry Week: <after delivery>
```

## 10. Versions

- The bible carries a version and a date. A change (a new shirt colour, a new
  neighbour) makes a new version; earlier episodes keep theirs.
- Show the user what changed since the last version before the next episode.

## 11. Where the bible lives

The MCP cannot read or write the app's Film Bible, apart from each
episode's scene plan (`set_scene_plan`, `get_scene_plan`: per clip the
heading, who is present and the hand-off). Three places hold the bible and
what you can rely on:

| Place | How | Reliability |
|---|---|---|
| The conversation | Shown to the user, pasted into prompts | Lost when the session ends |
| The project's description | Set once with `create_project` (no update tool); keep the short bible there: title, logline, cast lines, style line | Durable; cannot change after creation |
| Each episode's description | `update_workflow` `description` after delivery: the episode's story-so-far line and end states | Durable and updatable; read back with `get_workflow` to confirm it was stored whole |

The full bible with prompts and references is rebuilt each session from the
project description, the latest episode's description, and that episode's
nodes (reference urls and prompts) read with `get_workflow`.
