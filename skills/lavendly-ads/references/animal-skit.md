# Recipe: animal skit ad

A funny pet video first and an ad second. Animals act like people (a
bouncer, a dancer, a flirt, a boss) and never speak. One of them has a bad
habit, another catches it, and the user's real product is the fix, sitting
in the same room the whole time. The viewer shares it because it is funny;
they remember it because the product was the punchline.

## 1. The rule: a skit with a product, never a product with a skit

- The film must work with the sound off and the product hidden: a door, a
  party, a crime, a catch, a fix, a satisfied face. If the story needs the
  product explained, it is not a skit yet.
- The product is the user's real object, from their photos, the same
  object in the same spot in every scene it appears in. Its logo stays on
  the product as photographed; never type a brand name on screen, never
  ask a model to letter it.
- Animals act like people through gestures only: sunglasses pushed down,
  a paw to the mouth for a whistle, a pointed paw, crossed arms, a slow
  blink, a sip from a tiny glass. No speech, no subtitles for animals, no
  mouths forming words.
- Works for any animal and any product the animal can plausibly use or
  that sits in the animal's world: a cat and a scratcher, a dog and a bed,
  a parrot and a perch, a hamster and a wheel, or animals running a café
  around a coffee machine.

## 2. Purpose and ending

- Audience: pet brands, pet shops, and any brand whose ad wants a smile
  before a pitch.
- The viewer should laugh at the catch, feel the relief of the fix, and
  leave with the product's look in mind.
- The ending holds on a character's satisfied face or the hero enjoying
  the product, 2 to 3 s, no end card in the picture. The user adds their
  card in the app if they want one.

## 3. The cast and set bible (write it before any frame)

- One hero: species, breed, coat colour and pattern, one mark ("golden
  coat, large dark rosettes, white chin"). Crop a clean reference of the
  hero from the first good frame and wire it into every later frame.
- Two to four side characters, each with one prop that names their job:
  the bouncer (hoodie, round sunglasses), the dancer (hoodie, sunglasses),
  the flirt (party hat, tiny glass), the boss (tie). Each looks the same in
  every shot.
- One set with two rooms at most: outside (a hallway, a door with a flap)
  and inside (the party room). Write the inside room once: walls, couch,
  lights, rug, where the product sits. Paste it into every inside prompt.
- The product row: what it is, material, colour, shape, where it sits
  ("on the rug in front of the couch, logo side facing the camera").

## 4. Structure by length

| Length | Beats |
|---|---|
| 15 s | hook at the door, the bad habit, the catch and point, the hero on the product |
| 30 s | hook, the party, the bad habit, the catch and point, the hero gets it, the product in use, the approver's face |
| 35 to 40 s | the 30 s beats plus a detail shot (dancing feet), a reaction (the flirt) and a close on the product's logo side |

- The beats in order: POV hook at a threshold; the world in full swing;
  the bad habit (the sofa, the shoe, the cable); a character catches it,
  whistles and points at the product; the hero looks, understands, nods;
  the hero on the product, clearly loving it; one reaction from another
  animal; the approver's satisfied face.
- Cut on the music's beat; hold two bars on the door and on the catch.

## 5. The product in the scene

- Never show the product during the bad habit. The catch reveals it.
- After the reveal, the product is in every inside shot where it would be
  visible, in the same place, the logo side to camera where the shot
  allows.
- Product use looks clean and joyful: no crumbs, hair, scraps, damage or
  mess on or near the product, ever. Owners watching think about cleaning,
  and the ad loses them. Write "spotless, nothing falls off" into the
  frame and motion prompts and check every frame for it.
- The logo shot: low and steady, the logo side large in the lower third,
  the hero blissful on top, little camera motion so the letters hold.

## 6. Hook and payoff

- Hook: one caption that starts with "pov:" over the threshold shot ("pov:
  you try to get into the cat club"). Dialogue captions that put words in
  an animal's mouth are not funny; do not use them.
- At most one more short line later, at the fix ("house rules.").
- Payoff: the approver's face. The joke lands on a reaction, not on the
  product.

## 7. Camera, light, colour

- Vertical phone video, handheld at the animals' eye level, as if the
  owner is filming. One move per shot; steady on the product shots.
- Gestures aim at their target: the animal who whistles or points stands
  in profile facing the other animal and points at the product. A
  character looking at the camera while "calling" another reads as wrong.
- Outside warm and dim; inside the room's own light (neon, sunlight, café
  lamps) in every inside shot.

## 8. Sound

- One score. Outside the door it is muffled (heavy low pass), inside it
  opens to full. It stops dead on the whistle; a faint room tone fills the
  pause, never digital silence. It returns when the hero lands on the
  product.
- The whistle is clearly audible, layered on the frame where the paw
  reaches the mouth.
- Mute the clips' own sound by default: generated clips fill with meows
  and chatter. Keep at most one animal sound, the hero's "yes".
- The product's real sound (scratching, pouring, squeaking) under its
  shots, from the user's own footage when they have it.
- Mute or replace with `set_clip_native_audio` and one film score with
  `attach_track`; confirm with `get_workflow_audio`.

## 9. Models on Lavendly

| Need | Pick | Why |
|---|---|---|
| The default | Seedance 2.0 Fast (11 per 5 s) | Holds animals, props and set well from an opening frame, 9:16, sound |
| A hero shot with lots of body motion | Kling v3 Pro | Body motion |
| Draft of timing | Seedance 2.0 Mini | Cheap, 4 references |

- Name the model on every clip (`data.videoModel`). When an automatic pick
  fails every scene with a provider error, a named model is the fix.
- Generate 5 s per scene and trim to the beat; a 4 s clip costs the same.
- A 30 s skit is 8 to 11 scenes at about 11 credits each, plus about 2 per
  opening frame and the frames you redraw. Say the range before starting.

## 10. Opening frames: the whole job

- Every scene opens on a reviewed frame. Make frames from references, not
  text: the product photos (`import_asset`), the set frame, the hero crop.
  Wire them into the scene's image node (three at most).
- Review each frame before paying for its clip, for five things: the hero
  matches the crop, the product is the real one in its place, no product
  in the bad habit shot, every gaze and gesture aims at its target, no
  mess anywhere.
- To change one thing, edit the frame ("replace the cat on the left with
  the cat from the second reference, same pose, keep everything else").
  When the coat drifts back, say what it must NOT be ("not grey or
  silver").
- Clip prompts: the action in order, then "the product keeps exactly its
  shape, colour and lettering", then "silent cats, no meowing, no speech,
  no music, no text".

## 11. Worked example: the cat club (example only)

A bamboo cardboard cat scratcher, 37 s, 9:16. Outside: a grey tabby
bouncer in a black hoodie and round sunglasses guards a glowing cat flap
under a handwritten door sign. A golden spotted cat walks up, is sized up
and let in. Inside a neon living room: a ginger cat in a green hoodie
twerks, its feet dance, a white cat in a party hat sips a martini. The
golden cat shreds the couch arm (no scratcher in frame). The bouncer, in
profile, whistles at it and points at the scratcher on the rug; the music
stops. The golden cat looks, meows once, hops down, and scratches the
scratcher, spotless, as the music returns ("house rules."). The white cat
gives it a slow flirty blink, a low close holds the logo side, and the
bouncer crosses his arms with a satisfied smile.

## 12. Failure modes and fixes

| Failure | Fix |
|---|---|
| The hero's coat changes between scenes | Crop the hero from the best frame; redraw the others with it as a reference; say the wrong colour it must not be |
| The product drawn by the model looks generic | Wire the real product photos into every frame that shows it |
| The product in the bad habit shot | Redraw that frame without it; the catch reveals it |
| The whistler faces the camera | Redraw in profile facing the other animal, eyes on it |
| Crumbs or bits around the product | Edit the frame clean; "spotless, nothing falls off" in the motion prompt |
| Meows everywhere | Mute clip sound; keep one meow as the yes |
| No whistle heard | Layer a whistle on the paw-to-mouth frame; stop the score on it |
| Dead silence after the score stops | A faint room tone under the pause |
| A picture or a still in the film | Every beat is a clip; never cut to the product photo or the user's raw footage |
| Generated text on signs is garbled | Keep signs short or blank; never brand text |

## 13. Policy guards

- Someone else's video gives only an idea, never its footage, its music or
  its characters.
- No claims about the animal's health or behaviour the product cannot
  back ("stops all scratching" is a claim; a cat enjoying it is not).
- No harm or distress to animals, even as a joke; the catch is a whistle
  and a point, never a punishment.
