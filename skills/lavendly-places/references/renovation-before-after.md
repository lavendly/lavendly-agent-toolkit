# Recipe: renovation before and after

Contractors' and designers' portfolio films, kitchen and bathroom remodels,
garden makeovers, flip reveals, design proposals. The sale is the change,
and the proof is that it is real: the before and the after are the job's
own photos, taken from the same spot. AI adds the gentle camera move and
the craft inserts between them, never the result.

## 1. Two versions

| Version | Before | After | Process | Label |
|---|---|---|---|---|
| Real job | the user's photo | the user's photo from the same position | the user's progress photos, or AI inserts of hands and materials only | none needed |
| Design proposal | the user's photo of the room today | a text-made still of the proposed design, same framing words | AI inserts | "design visualisation" by the user on screen and in the caption |

Ask for the after photo from the before photo's exact position and lens;
that single match makes the reveal.

## 2. Purpose and ending

- Audience: homeowners choosing a contractor or designer, on Instagram,
  TikTok, Houzz-style sites, the firm's website.
- The viewer should see the change at a glance, believe it, and know who
  did it and how to book.
- The ending: the after held 3 s (longer than any other shot), the call to
  action spoken ("Book a free visit."), space for the firm's logo and
  contact card.

## 3. Structure by length

Gen is the length to generate on Veo (4 s); on Wan 2.7 generate 5. "Before
photo" and "after photo" open their scenes on the user's photos.

**6 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 2.5 | wide, eye level, 18mm | slow push-in | before: the old kitchen | 2.5 | 4, before photo |
| 2 | 2.5 to 6 | wide, 18mm | the same slow push-in | after: the new kitchen, held | 3.5 | 4, after photo |

**15 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | wide, 18mm | slow push-in | hook: the before, at its worst | 3 | 4, before photo |
| 2 | 3 to 5.5 | close-up, 85mm | locked-off | process: a trowel spreads adhesive on the wall (hands and materials only) | 2.5 | 4 |
| 3 | 5.5 to 8.5 | close-up, 85mm | locked-off | process: a tile pressed into place, spacers set | 3 | 4 |
| 4 | 8.5 to 11.5 | wide, 18mm | the same slow push-in | reveal: the after from the same spot | 3 | 4, after photo |
| 5 | 11.5 to 15 | detail, 85mm | slow slide | the after's material: the new tile and brass tap, held, call to action | 3.5 | 4 |

**30 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3.5 | wide, 18mm | slow push-in | hook: the before | 3.5 | 4, before photo |
| 2 | 3.5 to 6.5 | detail, 50mm | locked-off | the before's problem detail: cracked tiles, a stained counter | 3 | 4, before photo (detail) |
| 3 | 6.5 to 10.5 | medium, 35mm | locked-off | process: old units removed, the empty wall | 4 | 4 |
| 4 | 10.5 to 14 | close-up, 85mm | locked-off | process: plaster smoothed with a float | 3.5 | 4 |
| 5 | 14 to 18 | close-up, 85mm | locked-off | process: a tile pressed into place | 4 | 4 |
| 6 | 18 to 22 | wide, 18mm | the same slow push-in | reveal: the after from the same spot | 4 | 4, after photo |
| 7 | 22 to 26 | detail, 50mm | the same move as shot 2 | the after's detail from the same spot as the before detail | 4 | 4, after photo (detail) |
| 8 | 26 to 30 | detail, 85mm | slow slide | the new tap, a hand turns it on, water runs; held, call to action | 4 | 4 |

**60 s** (the story of the job): the brief (the owners' problem, two before
angles), the plan (a drawing on the user's own paper, as a photo), the work
(six progress photos or AI hand inserts), a time-passage shot, the reveal
in the same two angles, a detail tour (three), the owners' reaction from
the user's footage, the call to action. 16 to 18 scenes.

## 4. Hook and payoff

- Hook: the before at its worst, or a half-second flash of the after then
  back to the before.
- Payoff: the after from the same spot, with the same move, on the beat,
  held; then one material detail.

## 5. Camera, light, colour

- Camera: the same lens feel, height and move for every before and after
  pair (write it once, paste it in both); 85mm locked-off inserts for the
  craft; slow slides for materials. No orbit, no long glide.
- Light: the photos carry it; ask for before and after photos in similar
  light (same time of day, same lamps on). Never brighten the after
  artificially.
- Colour: neutral white balance and the same grade on both; insert shots in
  "soft daylight, neutral white balance".

## 6. Sound

- Native: the trowel, the float, a tile tapped, a drill far off, water
  from the new tap.
- Narration: 6 s up to 10 words or none; 15 s 25 to 32; 30 s 55 to 68; 60 s
  115 to 135. What was wrong, what was done, how long only if the user
  gives it.
- Score: "Steady acoustic groove around 104 BPM with hand claps, building
  through the work, half a beat of silence before the reveal, a full warm
  hit on the after, ends on a short guitar figure." Instrumental.
- Mix: process clips `native` 1 when no narration sits on them; photo
  scenes `mix` 0.2; score 0.35 with ducking.

## 7. Models on Lavendly

| Role | Model | Why | 15 s (5 scenes, 2 photos) | 30 s (8 scenes, 4 photos) |
|---|---|---|---|---|
| Best | Veo 3.1 | steady rooms from photos, crisp craft inserts with sound | 244 | 388 |
| Default | Veo 3.1 Fast | same dialect, 1080p | 79 | 124 |
| Value, any feed shape | Wan 2.7 | 1080p, sound, 1:1, 4:3, 3:4 for portfolio feeds | 69 | 108 |
| Draft | Veo 3.1 Lite | photo frames work | 59 | 92 |

Totals: photo scenes have no opening image, inserts 2 credits each, score
2 or 3, voice 1.

## 8. Prompt pairs (Veo)

Examples: the user's own place, brand and photos replace the ones shown.

**Pair 1: the before and after push** (both photo scenes; the identical
motion prompt on each)

Motion:

```text
Slow push-in toward the far wall at an even speed over the whole shot, then the camera settles. Nothing in the room moves. The walls, window, units and floor stay exactly as in the opening frame; vertical lines stay straight. Nobody in frame. Ambient noise: a quiet room. No music. Clean frame, no text.
```

For a design proposal, the after still (text-made, same framing words as
the before photo):

```text
Interior photograph. Wide shot, 18mm lens, camera at chest height in the doorway, vertical lines straight. A small kitchen with one window on the far wall: matte sage cabinets, a white zellige tile wall, a honed white quartz counter, a brushed brass tap under the window, warm oak open shelves with three white bowls. Soft daylight from the window. Neutral white balance. Nobody in frame. No text.
```

**Pair 2: the tile insert**

Still:

```text
Documentary photograph. Close-up, 85mm lens. A gloved hand holds a square white glazed tile against a wall freshly spread with grey adhesive in even combed lines, two tiles already set on the left with small white spacers between them. Soft daylight from the left. Neutral white balance. No text, no logos.
```

Motion:

```text
Locked-off camera. 0 to 2 s: the hand presses the tile into the adhesive beside the others and wiggles it once to bed it. 2 to 3 s: the hand pushes a small white spacer into the gap. 3 to 4 s: the hand leaves frame. The wall, the set tiles and the light stay exactly as in the opening frame. Exactly three tiles, one hand. SFX: a soft press, a click of the spacer. No music. Clean frame, no text.
```

**Pair 3: the new tap**

Still:

```text
Documentary photograph. Detail shot, 85mm lens, shallow focus. A brushed brass bridge tap over a white ceramic sink, a white zellige tile wall behind, soft window light from the left. Palette: brass, white, soft grey. No text, no logos.
```

Motion:

```text
Slow slide to the right over the whole shot. At 1 s a hand enters and turns the tap handle a quarter turn; water runs in a clear steady stream into the sink; the hand leaves. The tap, the sink and the wall stay exactly as in the opening frame. Exactly one tap, one hand. SFX: the handle turning, running water. No music. Clean frame, no text.
```

**Second family (Wan 2.7).** Photo scenes: "Slow push in, wide shot, wide
lens, eye level. Soft daylight, neutral colour tone, low contrast. The room
keeps its exact layout." Identical for before and after.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Before and after framed differently | ask for the after photo from the same spot; identical motion prompts |
| The room changes during the push | slower move, "nothing in the room moves", trim |
| The after looks better lit by the model | "nothing in the room moves" and no light words that brighten |
| Tiles multiply or float | counts in the insert prompts; one press per clip |
| Water from the tap looks like glass | "a clear steady stream", under 4 s |
| A worker's face appears in an insert | hands and gloves only, "the face out of frame" |

## 10. Policy guards

- Real jobs only from the user's own before and after photos, with the
  owners' consent to show their home. No AI "after" presented as work done.
- Design proposals are labelled as visualisations.
- Prices, durations, warranties and certifications only as the user gives
  them.
- AI process inserts show generic hands and materials; never a named crew
  member, never a step that was not done.
