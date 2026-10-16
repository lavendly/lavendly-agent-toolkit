# The series bible

The bible is the show's memory and its law. Write it before the pilot, show
it to the user, and paste its blocks word for word into every episode. It
builds on the director's series-continuity table (cast, places, objects,
format, story so far) and adds the parts that keep a show stable over many
episodes: identity layers, character sheets, the forbidden list, the sound
identity, versioning and where the bible lives on the platform.

## 1. Show identity

| Field | Example |
|---|---|
| Title | Pip of Whisperpine |
| Logline | A small fox cub keeps the forest's lanterns lit, one problem a night |
| Genre and tone | Kids fable, gentle, warm, a little funny |
| Audience | Ages 3 to 8 and their parents |
| Platform, aspect | YouTube and Shorts, 16:9 main cut |
| Length and cadence | 60 s, weekly (Fridays) |
| Model | One video model for the season (by display name) |
| Continuity mode | Strict inside a scene; flexible between scenes |

## 2. Recurring cast

One block per character, in three layers. Only the identity layer is
permanent.

```text
PIP (identity): a small round red fox cub with oversized ears, a cream chest and cream tail tip, amber eyes, a tiny notch in the left ear.
PIP (wardrobe, default): a blue knitted scarf wrapped twice.
PIP (state, this episode): <set per episode from the last frame: wet fur, a lantern in his mouth>
Moves: on all four paws, a fox's bounding trot; never upright.
Voice: no lines; reacts with small sounds. Narrator speaks for him.
Signature: tilts his head left before every idea.
References: head close-up <hosted url>; turnaround sheet <hosted url>.
```

Rules:

- Identity: five to eight observable anchors and one asymmetric detail (the
  ear notch, a mole on one side, an earring on one ear) that the model can
  hold.
- Wardrobe: the default outfit, plus named alternates ("winter: a red wool
  hat"), each used only when the episode says so.
- State: the condition carried between episodes (a bandaged paw, a new
  scarf), written from the last frame.
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
- Two characters of very different size (a fox and a bear): one
  size-reference image with both side by side; "if unsure, the smaller one
  stays smaller".
- Photoreal people: keep facial asymmetry; real skin texture and age.
- A flawed sheet is fixed with an edit (the app's image-to-image), never
  rebuilt from scratch: a rebuild is a new face.

Where sheets come from on Lavendly:

| Route | How | Cost |
|---|---|---|
| The user uploads | Their own art or photos (their consent for a real person), via the Asset Library; `import_asset` | none |
| Made in the app | The user makes the sheet with an image model in the Lavendly app (references accepted there) and shares the hosted link | 1 to 5 credits per image |
| A casting scene | One-scene workflow whose image node prompt is the sheet prompt, on the cheapest model without references; generate it, keep the opening image's url from `get_workflow`, ignore the clip | about 2 for the image plus the clip (10 on Veo 3.1 Lite at 4 s) |

Opening images made on the server never see a reference image: a sheet made
there is drawn from words alone. Approve it by eye before episode 1.

## 4. Recurring places

```text
THE HOLLOW (place): the base of an old oak at the edge of a pine forest, a round hollow in the trunk at fox height, moss on the roots, a flat stone in front.
Inside the hollow: only a small pile of dry leaves and Pip's three paper lanterns, nothing else.
Light (dusk, default): warm low sun from the left through the pines, long shadows to the right.
Light (night): one paper lantern glowing in the hollow, cold moonlight from above.
Geography: the stream is to the right of the oak; the path enters from the left.
Reference: <hosted url of the location plate>
```

Name what is inside every hollow, box, doorway and table, or say "only
light, nothing else": an unnamed space grows an object nobody asked for.

## 5. Recurring objects

```text
THE LANTERN (object): a small round paper lantern, cream paper, a thin bamboo handle, a single candle inside.
Count: Pip owns exactly three; one is lit per episode.
State: <from the last frame: torn, wet, lent to Moss>
```

## 6. Style and the forbidden list

```text
STYLE LINE: Storybook gouache illustration style, soft paper texture, warm and gentle.
PALETTE: rust red, cream, lavender, warm yellow, pine green.
FORBIDDEN: no neon, no pure-black shadows (deep indigo instead), no teal-and-orange grade, no text anywhere, no other foxes, no humans, no modern objects.
```

The forbidden list is the most useful line in a long-running bible: every
failure an episode shows becomes one more entry, stated as what to do
instead.

## 7. Sound identity

| Element | Example |
|---|---|
| Narration voice | One voice id from `get_status`, or a hosted voice file; same every episode |
| Narration pace | 1.8 to 2.1 words per second for kids; 2.3 otherwise |
| Score | One brief or one hosted score reused: "Gentle ukulele and glockenspiel, about 80 BPM, a four-note motif at the start and the end" |
| Sign-off sound | The four-note motif and a soft chime on the last image |
| Native sound | Forest ambience, crickets at night, the lantern's soft hiss; `mix` under narration |

## 8. Format

The skeleton of slots every episode follows, with what is locked per slot
and what is free per episode. Formats by show type are in
[episode-formats.md](episode-formats.md).

## 9. Story so far

One line per published episode: what changed, and the end state of every
recurring character and object.

```text
E01 The First Lantern: Pip lights the oak's lantern alone. End: Pip in the hollow, one lantern lit, scarf on.
E02 The Wet Wick: rain soaks the wick; Moss the owl lends a dry match. End: Moss is Pip's friend, perched on the oak; one lantern lit.
E03 The Long Night: <after delivery>
```

## 10. Versions

- The bible carries a version and a date. A change (a new scarf colour, a new
  friend) makes a new version; earlier episodes keep theirs.
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
