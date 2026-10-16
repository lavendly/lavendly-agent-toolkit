# Recipe: events and recaps

Conference and festival recaps, launch nights, concerts, weddings,
markets, meetups; teasers for an event still to come. The sale is "you had
to be there" and "be there next time". A recap is a record: it is built
from the event's real photos and footage. AI makes only what is clearly
not the record: title plates, transitions, and the mood of a teaser
before the event. AI crowds are never presented as a real event.

## 1. Two products

| Product | What AI makes | What must be real | Label |
|---|---|---|---|
| Recap of a past event | an opening plate (an empty stage or venue before doors), transitions (confetti, light sweeps), a closing plate | every shot of people, speakers, performers, crowds and moments | none needed; AI plates contain no people |
| Teaser for a future event | mood: the empty venue, lights, details, textures, the date spoken | nothing claimed: no lineup, no speakers, no attendance shown | "concept" if it could be read as footage of a past edition |

Real photos can open scenes, with the camera moving slowly and the people
held still ("the people stay exactly as in the photo; only the camera
moves"); check every frame, because a model may animate faces. Real video
footage is imported (`import_asset` with kind video) and placed by the user
in the app unless `get_schema` shows a way for the MCP.

## 2. Purpose and ending

- Audience: attendees, sponsors, next year's buyers; social channels,
  event sites, sponsor reports.
- The viewer should feel the peak moment and know the next date.
- The ending: the closing plate (the stage lights going down, or the
  venue at night), held 3 s, the next date and the call to action spoken
  ("See you in June. Tickets open Monday."), space for the event logo.

## 3. Structure by length

Gen is the length to generate on Veo (4 s). "Photo" means the scene opens
on the event's real photo; "plate" is AI with no people.

**6 s** (teaser bumper)

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 2 | wide, 24mm | slow push-in | hook: the empty stage, lights sweep up through haze | 2 | 4, plate |
| 2 | 2 to 4 | macro, 100mm | locked-off | confetti falling against black | 2 | 4, plate |
| 3 | 4 to 6 | close-up, 85mm | locked-off | one microphone in a spotlight, held; the date spoken | 2 | 4, plate |

**15 s** (teaser)

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | wide, 24mm | slow push-in | hook: the empty stage before doors, moving lights sweep up | 3 | 4, plate |
| 2 | 3 to 6 | wide exterior, 24mm | locked-off | the venue at dusk, doors lit, nobody yet | 3 | 4, plate or photo of the venue |
| 3 | 6 to 9 | close-up, 85mm | locked-off | a microphone on a stand, a spotlight snaps on | 3 | 4, plate |
| 4 | 9 to 12 | macro, 100mm | locked-off | confetti falling through a beam | 3 | 4, plate |
| 5 | 12 to 15 | wide, 24mm | locked-off | the stage lights hit full white, held; the date and call to action | 3 | 4, plate |

**30 s** (recap from seven real photos, three AI plates)

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | wide, 24mm | slow push-in | hook: the empty stage before doors | 3 | 4, plate |
| 2 | 3 to 6 | wide | slow push-in | the biggest crowd moment, held still | 3 | 4, photo |
| 3 | 6 to 9 | medium | slow push-in | a speaker or performer at the peak | 3 | 4, photo |
| 4 | 9 to 12 | close-up | locked-off | a detail: a badge, a drink, a hand on a railing | 3 | 4, photo |
| 5 | 12 to 15 | wide | slow pan | the room or field from the side | 3 | 4, photo |
| 6 | 15 to 18 | medium | locked-off | a candid laugh between two attendees | 3 | 4, photo |
| 7 | 18 to 21 | macro, 100mm | locked-off | transition: confetti falling through a beam | 3 | 4, plate |
| 8 | 21 to 24 | wide | slow push-in | the final moment on stage | 3 | 4, photo |
| 9 | 24 to 27 | medium | locked-off | the venue emptying, lights still on | 3 | 4, photo |
| 10 | 27 to 30 | wide, 24mm | locked-off | closing plate: the stage lights go down, held, next date | 3 | 4, plate |

**60 s** (recap, chronological day): setup hyperlapse from the user's
footage, arrival, three sessions or sets with two photos each, breaks and
food, the peak, the farewell; AI plates only at the open, between acts and
at the close. 18 to 20 scenes.

## 4. Hook and payoff

- Hook: the stage before the crowd, lights sweeping up (AI), or the
  biggest real crowd moment (photo).
- Payoff: the last real moment, then the closing plate and the next date.

## 5. Camera, light, colour

- Camera: slow push-ins on photo scenes (people held still), locked-off
  plates, a slow push toward the stage, macro confetti. No fast moves on
  real photos.
- Light: "rows of moving head lights pointing upward through light haze, a
  deep blue wash, one warm work light"; "the spotlight snaps on, a hard
  white circle on the floor"; "festoon lights over an empty field at dusk".
- Colour: the event's brand colours in the light, a slight warm grade;
  real photos keep their own colour.

## 6. Sound

- Native: crowd murmur rising, the hum of the rig, a spotlight's clunk.
- Narration: 6 s the date only; 15 s 15 to 25 words; 30 s 40 to 60; 60 s 90
  to 130; or two or three real sound bites from the user's footage.
- Score: "Upbeat electronic around 124 BPM, a building riser into the
  first photo, a cut on each bar, a breakdown before the final moment,
  a last hit on the closing plate." Instrumental; never a performer's song
  without the rights.
- Mix: plates `mix` 0.4 (the room hum); photo scenes `off` (any generated
  crowd noise would be invented) or `mix` 0.2; score 0.6 with ducking.

## 7. Models on Lavendly

| Role | Model | Why | 15 s teaser (5 plates) | 30 s teaser (9 plates) |
|---|---|---|---|---|
| Best | Veo 3.1 | haze, beams and stage light hold best, room sound | 248 | 445 |
| Value | Veo 3.1 Fast | same, cheaper | 83 | 148 |
| Draft | Veo 3.1 Lite | timing check; photo frames work | 63 | 112 |

Recap from real photos (the 30 s above: 7 photo scenes, 3 plates): Veo 3.1
Fast 150 (clips 140, the plates' openings 6, score 3, voice 1), Veo 3.1
Lite 110, Veo 3.1 480. Teaser totals: text-made openings at 2 credits each,
score 2 or 3, voice 1.

## 8. Prompt pairs (Veo)

**Pair 1: the stage before doors**

Still:

```text
Documentary photograph. Wide shot, 24mm lens, from the middle of an empty standing floor. An empty concert stage before doors open, rows of moving head lights pointing upward through light haze, a deep blue wash, one warm work light on the left. Nobody on the stage or the floor. Palette: deep blue, warm white, black. No text, no screens lit, no logos.
```

Motion:

```text
Slow push-in toward the stage over the whole shot. The moving head lights sweep slowly from pointing up to pointing at the stage, their colour shifting from blue to warm white. The stage and the rig stay exactly as in the opening frame. Nobody in frame. SFX: a low hum of the rig, a distant murmur rising. No music. Clean frame, no text.
```

**Pair 2: confetti through a beam**

Still:

```text
Documentary photograph. Macro shot, 100mm lens. Pieces of plain gold and white paper confetti suspended against a black background, one soft backlight beam catching each piece. Palette: gold, white, black. No text, no logos.
```

Motion:

```text
Static camera. The confetti falls slowly in slow motion through the beam, pieces turning and catching the light. The beam and the black background stay exactly as in the opening frame. Nobody in frame. SFX: a soft paper rustle. No music. Clean frame, no text.
```

**Pair 3: a real crowd photo, animated gently** (photo scene)

Motion:

```text
Very slow push-in toward the stage over the whole shot. The people stay exactly as in the photo, still; only the camera moves and the stage lights shift slightly in colour. Nobody new enters the frame. No music. Clean frame, no text.
```

**Second family.** For a 1:1 sponsor cut, Seedance 1.5 Pro or Wan 2.7 for
the plates (production note or motion plus camera wording); photo scenes
need no references.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Faces in a real photo start moving or warp | slower push, "the people stay exactly as in the photo"; or a still frame (speed 0.25 on a short trim) |
| A crowd appears in an AI plate | "nobody on the stage or the floor" in both prompts |
| Screens and banners show garbled words | "no screens lit", "blank banners" |
| The venue in the teaser looks like a different real venue | a photo of the real venue, or keep it generic and labelled |
| Confetti clumps or freezes | "falls slowly in slow motion, pieces turning"; one beam |

## 10. Policy guards

- Never present AI crowds, performers, speakers or moments as footage of a
  real event; never add people to real photos or change their reactions.
- Teasers claim no lineup, speakers, sponsors or attendance the user has
  not confirmed.
- Consent: identifiable attendees in the user's photos are the user's
  responsibility to clear; say so when faces are prominent.
- Music: no performers' recordings without rights; the score is generated.
