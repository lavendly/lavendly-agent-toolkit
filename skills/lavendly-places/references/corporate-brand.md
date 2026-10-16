# Recipe: corporate and brand films

Mission and "why we exist" films, about-us and culture films, recruiting
films, investor and partner intros, service explainers in the world.
The sale is trust: real work, done with care, for real people. Generated
shots carry the craft (hands, tools, places, the outcome for a customer);
real people from the user's footage carry the testimony. AI people are
never presented as the company's employees or customers.

## 1. Purpose and ending

- Audience: recruits, customers, investors, partners; the website, LinkedIn,
  YouTube, events.
- The viewer should know what the company does, how it does it, and why it
  matters, in concrete pictures, not slogans.
- The ending: one human moment of the work's outcome, held 3 s, the line
  of truth spoken, the call to action ("Come build it with us."), space for
  the logo.

## 2. Structure by length

Gen is the length to generate on Veo (4 s); on Kling generate 5. Scenes are
text-made unless marked "photo" (the company's real premises) or "footage"
(real interviews the user places in the app).

**6 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | close-up, 85mm | slow slider move | hook: weathered hands sand a walnut chair leg, dust in the light | 3 | 4 |
| 2 | 3 to 6 | medium, 50mm | locked-off | the finished chair carried into a bright room, held; the line spoken | 3 | 4 |

**15 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | close-up, 85mm | slow slider move | hook: hands at work, the craft in one gesture | 3 | 4 |
| 2 | 3 to 6 | wide, 24mm | slow push-in | the workshop at morning, benches, tools, window light | 3 | 4, photo |
| 3 | 6 to 9 | medium, 50mm | locked-off | the problem the company solves, shown (a wobbling old chair set aside) | 3 | 4 |
| 4 | 9 to 12 | macro, 100mm | slow slide | a joint glued and clamped, the detail of care | 3 | 4 |
| 5 | 12 to 15 | medium, 50mm | locked-off | the outcome: a family sits down at a table on the new chairs, held, the line | 3 | 4 |

**30 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 4 | close-up, 85mm | slow slider move | hook: hands at work | 4 | 4 |
| 2 | 4 to 8 | wide, 24mm | slow push-in | the place, real premises | 4 | 4, photo |
| 3 | 8 to 12 | medium, 50mm | locked-off | why: the problem in the world | 4 | 4 |
| 4 | 12 to 15.5 | macro, 100mm | slow slide | how 1: the material chosen, grain checked | 3.5 | 4 |
| 5 | 15.5 to 19 | close-up, 85mm | locked-off | how 2: the joint, the tool, the care | 3.5 | 4 |
| 6 | 19 to 23 | medium, 50mm | gimbal drift right | how 3: two people at a bench, one hands a part to the other | 4 | 4 |
| 7 | 23 to 26.5 | medium, 50mm | locked-off | proof: the outcome at a customer's home (a real photo when it names a real customer) | 3.5 | 4 |
| 8 | 26.5 to 30 | wide, 35mm | slow pull-back | the line of truth over the workshop at evening, held | 3.5 | 4, photo |

**60 s**: founder or employee voice from the user's real footage (placed
in the app), with generated b-roll under it: why (three shots), how (five
shots of craft and teamwork), who it is for (three customer-outcome shots),
the future (two shots), the line (one held shot). 14 to 16 shots; about
120 words of real voice or narration.

## 3. Hook and payoff

- Hook: a human face or hands doing the work, mid-gesture, with its sound;
  a line of truth, not a slogan. Never a logo first.
- Payoff: the work's outcome for someone (a family at the table, a patient
  walking out, a parcel arriving), then the line.

## 4. Camera, light, colour

- Camera: 35 to 50mm for people and rooms, 85mm and 100mm for hands and
  materials, slow sliders and gimbal drifts, handheld documentary only for
  busy floors. Specific tasks and props in every shot ("soldering a circuit
  board", "labelling sample jars", "sanding a chair leg").
- Light: natural window light and practicals; "warm window light from the
  left, sawdust in the beam"; "bright soft daylight through a loft's
  windows"; never "harsh corporate fluorescent".
- Colour: brand-aligned warmth, soft contrast, clean. Palette from the
  brand's two colours plus neutrals.
- People: backs, hands, profiles and medium shots of people doing one
  task; faces fine, but never named, never framed as "our team".

## 5. Sound

- Native: tools, a workshop radio faint, a keyboard, a door, footsteps.
- Narration or real voice: 6 s 10 to 13 words; 15 s 28 to 32; 30 s 55 to
  68; 60 s 115 to 135. First person plural for a narrator ("We build
  chairs that outlive us"), facts as the company gives them.
- Score: "Piano and light electronic pulse around 92 BPM, building slowly.
  Opens on a single piano line under the hands, adds a pulse through the
  how, opens warmly on the outcome, ends on a held chord under the line."
  Instrumental.
- Mix: craft clips `mix` 0.4 (tools under the voice); a real interview at
  full level with the score ducked; score 0.3 with ducking.

## 6. Models on Lavendly

| Role | Model | Why | 15 s (5 shots, 1 photo) | 30 s (8 shots, 2 photos) |
|---|---|---|---|---|
| Best | Veo 3.1 | hands, materials, light and room sound at 1080p | 246 | 392 |
| Value | Veo 3.1 Fast | same, cheaper | 81 | 128 |
| Draft | Veo 3.1 Lite | timing check | 61 | 96 |
| People at work, 1:1 for LinkedIn | Kling v3 Standard | good people and hands, square, 720p | 86 | 136 |

Totals: the premises scenes open on photos (one in the 15 s, two in the 30
s), the rest at 2 credits per opening, score 2 or 3, voice 1. Without
premises photos add 2 per scene.

## 7. Prompt pairs (Veo)

**Pair 1: hands at work**

Still:

```text
Documentary photograph. Close-up, 85mm lens, shallow focus. Weathered hands sanding the curved edge of a walnut chair leg on a workbench, a sheet of sandpaper folded in the right hand, fine sawdust in the air, warm window light from the left. Palette: walnut, cream, warm grey. No text, no logos.
```

Motion:

```text
Slow slider move from left to right over the whole shot. The hands sand the curve in two long strokes; sawdust drifts through the window light. The hands, the chair leg and the bench stay exactly as in the opening frame. Exactly two hands, one chair leg. SFX: sandpaper strokes. Ambient noise: a workshop radio faint in the background. No music. Clean frame, no text.
```

**Pair 2: the lab bench**

Still:

```text
Documentary photograph. Medium shot, 50mm lens, eye level. A woman in her forties with short grey hair, a white lab coat and safety glasses at a clean lab bench, writing on a plain white label for a glass sample jar, a rack of six jars in front of her. Bright soft daylight from tall windows. Palette: white, pale blue, steel. No readable text on labels, no logos.
```

Motion:

```text
Locked-off camera. 0 to 2 s: she presses the blank label onto a jar and smooths it with her thumb. 2 to 4 s: she places the jar back into the rack, the sixth in a row, and looks along the row. Her face, coat and the bench stay exactly as in the opening frame. Exactly one woman, six jars. Ambient noise: a quiet lab hum, a distant door. No music. Clean frame, no text.
```

**Pair 3: the outcome**

Still:

```text
Documentary photograph. Medium shot, 50mm lens, eye level. A family of three at a pale oak dining table in a bright kitchen, a man pulling out a walnut chair for a girl of about ten, a woman setting down a bowl of salad. Soft afternoon window light. Palette: walnut, green, warm white. No text.
```

Motion:

```text
Locked-off camera. The girl sits down on the walnut chair and the man pushes it in gently; the woman sits opposite and smiles. The family, the table and the chairs stay exactly as in the opening frame. Exactly three people. Ambient noise: kitchen sounds, light conversation without words. No music. Clean frame, no text.
```

**Second family (Kling v3 Standard).** "From the opening frame" anchor,
plain verbs, one keep line, a "Sound:" line; square for LinkedIn.

## 8. Failure modes and fixes

| Failure | Fix |
|---|---|
| Stock-like "team smiling at a laptop" | a specific task and prop in every shot |
| Logos or text on walls, coats, screens | "no logos, no readable text", screens off |
| Hands merge with tools | one hand action, the tool named, the contact named |
| Faces shift between shots of "the same" worker | avoid recurring AI faces; use hands and backs, or one face block verbatim |
| The real premises look different | photos of the premises open those scenes |

## 9. Policy guards

- AI people are never presented as the company's employees, founders or
  customers; no names, no "meet the team", no testimonials. Real people
  only from the user's footage, with their consent.
- Diversity shown in a recruiting film must reflect the real company, not
  generated faces.
- Facts (founding year, staff count, customers, awards) only as the user
  gives them.
- Investor films: no financial figures or forecasts unless the user gives
  them; no performance claims.
