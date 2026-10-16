# Locked descriptions

One block per recurring subject, written once, approved with the sheet,
pasted verbatim into every still-frame prompt. Observable words only: what
a camera sees, never what a character feels or has been through.

## Rules

- 5 to 8 anchors: shape or build, age or size, colour, material, hair or
  surface, wardrobe or finish, one asymmetric mark.
- One asymmetric mark, stated with its side: "a gold hoop in the left ear
  only", "a chip on the lid's front right corner". Side is screen-agnostic:
  the character's left, the object's front.
- 200 to 250 characters, so it leads the 500-character opening image
  prompt with room for the shot.
- A name first ("Mia:", "The Lumen lamp:"), the same name in every motion
  prompt, never a pronoun to open a sentence.
- No synonyms across prompts: "mustard" is never "yellow" later.
- No banned words (cinematic, stunning, beautiful, vibrant and the rest);
  name the material instead.
- Colour by name; add a second word when a colour is ambiguous ("bottle
  green", "rust orange").

## Three layers

| Layer | Changes | Where it lives |
|---|---|---|
| Permanent identity | Never | The locked description |
| Arc wardrobe | Only at a scene heading the plan names | A wardrobe line after the locked description, one per heading |
| Scene state | Only on screen, then carried | The ledger row; the still-frame prompt of the next shot |

Example for one character across a film:

```text
Locked: Mia: a woman in her early thirties, warm light-brown skin, oval face, thick straight black eyebrows, shoulder-length black curly hair with a centre part, a small gold hoop in her left ear only.
Wardrobe, scenes 1 to 3: mustard corduroy jacket over a white t-shirt, dark green canvas backpack.
Wardrobe, scenes 4 to 6: the same, jacket off, white t-shirt only.
State after scene 2: hair wet from rain, backpack on her right shoulder only.
```

## Templates

### Person

```text
<Name>: a <man, woman, person> in <age range>, <skin tone>, <face shape>, <one feature: brows, nose, jaw>, <hair: length, texture, colour, parting>, <wardrobe: colour, material, garment>, <one asymmetric mark with its side>.
```

```text
Tomas: a man in his late fifties, pale weathered skin, square jaw, a grey-blond stubble beard, short silver hair combed back, round steel glasses, a navy wool peacoat over a cream fisherman sweater, a small scar through his right eyebrow.
```

### Creature or animal

```text
<Name>: a <size> <species or invented creature>, <body colour and pattern>, <eyes>, <ears, horns, tail>, <texture: fur, scales, felt, clay>, <how it stands or moves>, <one asymmetric mark>.
```

```text
Pip: a small red fox with a cream chest, round black bead eyes, a thick brush tail with a white tip, soft clay texture, moving on all four paws, the tip of his left ear white.
```

Animals move like that animal: "on all four paws, a fox's bounding trot,
never upright". An invented creature gets its gait written once and kept.

### Mascot

```text
<Name>: a <style, for example flat 2D cel or soft 3D clay> mascot shaped like <base shape>, <body colour by name>, <face: eyes and mouth>, <limbs>, <one accessory>, <outline or shading rule>, <one asymmetric mark>.
```

```text
Bolt: a soft 3D clay mascot shaped like a rounded lightning bolt, sunflower yellow body, two black oval eyes and a small open smile, short stubby arms and legs, a navy sweatband on his right wrist only, matte surface, no outline.
```

A mascot that belongs to a brand is the user's own; never imitate another
company's character or style.

### Product

```text
The <name>: a <rigid or soft> <object> with <shape and proportion>, <material and finish>, <colour>, <size cue>, <parts: cap, handle, button>, <label side and state>, <one mark>.
```

```text
The Lumen lamp: a table lamp with a matte stone-grey mushroom dome, a slim brass stem and a round brass base, about forty centimetres tall, a brass toggle switch on the base's front, the front of the base plain.
```

Labels and logos: say where the label is and keep it blank, soft or
turned away in the shot. The words come from the user's edit, never from
the model.

### Vehicle

```text
The <name>: a <body type> <era or style>, <paint colour and finish>, <wheels and trim>, <one feature: grille, lights, roof>, <number plate state>, <one mark>.
```

```text
The van: a boxy 1970s camper van, two-tone paint in sage green below and cream above, chrome bumpers and hubcaps, round headlamps, a white canvas pop-top roof, a dent above the left rear wheel, number plates blank.
```

Wheels turn in the direction of travel; the car is the same car in every
shot; badges and plates stay blank.

## When the picture and the words disagree

The approved sheet wins. Rewrite the locked description to match it, show
the change, and use the new words from then on. Contradictions between a
reference and its words are the commonest cause of drift.
