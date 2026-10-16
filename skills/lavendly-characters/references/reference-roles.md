# Reference roles

A reference image with no job is read for everything in it: the face, but
also the grey background, the flat light, the pose. One sentence per
reference tells the model what to take and what to leave.

## The pattern

```text
Reference <n> is <whose> <what> only; ignore its <what not to copy>.
```

Write the sentences in the motion prompt, in wiring order, right after the
first line of the prompt. Number the references from 1 in the order their
edges reach the clip after the scene's own image (the first image with a
url is the first frame; the next ones are references 1, 2, 3).

## Sentences by job

| Job | Sentence |
|---|---|
| Face | Reference 1 is Mia's face and hair only; ignore its grey background, flat light and pose. |
| Outfit, full figure | Reference 2 is Mia's jacket, backpack and boots only; take her face from reference 1; ignore its background and pose. |
| Second character | Reference 2 is Tom's face, hair and coat only; he stands on the right; ignore its background. |
| Creature | Reference 1 is Pip's face, ear markings and fur colour only; ignore its background and pose. |
| Mascot | Reference 1 is Bolt's shape, colour and face only; ignore its background. |
| Product shape | Reference 1 is the bottle's shape, glass, cap and proportions only; ignore its background, light and any lettering. |
| Product, another angle | Reference 2 is the bottle seen from the side, for its depth only. |
| Vehicle | Reference 1 is the van's body shape, paint and trim only; ignore its background and the road. |
| Size | Reference 2 is the size of Pip next to Bramble only. |
| Style plate | Reference 3 is the palette, grain and contrast only, not its content. |
| Location | Reference 3 is the kitchen's layout, window and light only; nobody from it appears. |

## Slot priority

When the model takes fewer references than you have, fill in this order:

1. The face of the hero (or the product's shape).
2. The outfit, or the second character's face.
3. A style plate.
4. The place.

Camera moves, physics, story and timing never go in a reference; they go in
words.

## Caps

| Model | Lavendly cap | Sent on the MCP path |
|---|---|---|
| Seedance (all five) | 4 | 3 |
| Wan 2.6, Wan 2.7 | 4 | 3 |
| Wan 3.0, Wan 3.0 Prime | 2 | 2 |
| Veo 3.1, Veo 3.1 Fast | 2 | 2 (and use 8 s clips with references) |
| Kling, Hailuo, Grok, HappyHorse, FLUX 3, Runway, HeyGen | 2 | 2 |
| Veo 3.1 Lite (Auto) | 0 | 0: never wire one; the provider refuses |

Wire no more than the "sent" column. Extra edges are dropped or refused,
and you lose control of which survives.

## What fills the slots, by situation

| Situation | 2 slots | 3 slots |
|---|---|---|
| One person | face, outfit | face, outfit, style plate |
| Two people talking | face of A, face of B | face of A, face of B, the place |
| A person and a product | the person's face, the product | face, product, outfit |
| A product alone | front packshot, side packshot | front, side, the set or style plate |
| A creature and a smaller creature | face of the hero, size frame | hero face, second face, size frame |

## Rules

- One image, one job. Never one image as both the first frame and a loose
  style reference: if the packshot is the first frame, it is not also
  reference 1 in that scene.
- Text that contradicts a reference (it says blonde, the face is dark
  haired) causes drift. The words follow the approved picture.
- A reference with lettering on it invites lettering: say "ignore any
  lettering" and keep the label turned away in the shot.
- If the user's project has a Film Bible set up in the app, the server
  appends its own reference images and writes its own numbered list and
  identity lock. Do not add a second list; keep the locked words in the
  still-frame prompt.
- References reach the clip only. The opening image on the MCP path is made
  from the still-frame prompt's words alone.
