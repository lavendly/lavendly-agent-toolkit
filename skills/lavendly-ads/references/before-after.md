# Recipe: before and after

Cleaning products, organisers, tools, home and garden products, services
(cleaning, detailing, decorating). The most shareable ad shape and the most
easily dishonest one. A before and after that claims what a product does
must be real: the user's own photos of a real case. AI makes the process
shots around it, or an illustration clearly labelled as one.

## 1. Two honest versions

| Version | Before and after frames | Use for | Label |
|---|---|---|---|
| Real case | the user's own before and after photos, same place, same camera position, imported | any claim about what the product or service does | none needed; the photos are the proof |
| Illustration | two text-made stills with identical framing words, one state changed | styling and organising ideas, design proposals, a concept for a launch | "Illustration" in the caption and an on-screen label the user adds |

Never present the illustration version as a result of a cleaning, beauty,
health or repair product. Never make the "after" in a real case better lit
than the "before": same light, same grade.

## 2. Purpose and ending

- Audience: TikTok and Reels viewers who love a reveal; homeowners; service
  buyers.
- The viewer should see the change at a glance and believe it.
- The ending: the after state held 2 to 3 s (longer than any other shot),
  the call to action spoken ("Book your clean."), space for the logo.

## 3. Structure by length

Gen is the length to generate on Veo (4 s); on Wan 2.7 generate 5. "Before
photo" and "after photo" mean the scene opens on the user's imported photo.

**6 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 2 | wide, eye level, 24mm | slow push-in | before: the stained stovetop | 2 | 4, before photo |
| 2 | 2 to 3 | close-up, 50mm | locked-off | a cloth sweeps across the lens, the frame goes dark | 1 | 4 |
| 3 | 3 to 6 | wide, eye level, 24mm | the same slow push-in | after: the clean stovetop, held | 3 | 4, after photo |

**15 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | wide, eye level, 24mm | slow push-in | hook: the worst of the before | 3 | 4, before photo |
| 2 | 3 to 5.5 | macro, 100mm | locked-off | the problem detail: baked-on grease on the glass | 2.5 | 4 |
| 3 | 5.5 to 8.5 | close-up, 50mm | locked-off | process: spray, then a cloth wipes once and covers the lens | 3 | 4 |
| 4 | 8.5 to 11.5 | wide, eye level, 24mm | the same slow push-in | reveal: the after, same framing | 3 | 4, after photo |
| 5 | 11.5 to 15 | close-up, 50mm | locked-off | the clean glass, a hand sets the bottle on the counter, call to action | 3.5 | 4 |

**30 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 1 | wide, 24mm | locked-off | hook: a half-second flash of the after | 1 | 4, after photo |
| 2 | 1 to 4.5 | wide, 24mm | slow push-in | the before, same framing | 3.5 | 4, before photo |
| 3 | 4.5 to 8 | macro, 100mm | locked-off | the problem detail | 3.5 | 4 |
| 4 | 8 to 12 | close-up, 50mm | locked-off | step 1: spray across the glass | 4 | 4 |
| 5 | 12 to 16 | close-up, 50mm | locked-off | step 2: the cloth wipes in one long stroke | 4 | 4 |
| 6 | 16 to 19.5 | macro, 100mm | slow slide | step 3: the scraper lifts the last spot | 3.5 | 4 |
| 7 | 19.5 to 23.5 | wide, 24mm | the same slow push-in | reveal: the after, same framing | 4 | 4, after photo |
| 8 | 23.5 to 30 | close-up, 50mm | locked-off | the clean glass reflecting the window, the bottle set down, call to action | 6.5 | 8 |

Shot 1 is its own short scene opening on the after photo, trimmed to 1 s
with `edit_clip`. The cost table counts eight clips, three on photos.

**60 s**: a story of the change: the before in three angles (wide, detail,
a person sighing at it), the process in five steps, a time-passage shot,
the reveal in the same three angles, a reaction, the call to action. Every
before angle has an after twin with identical framing words or photos.

## 4. Hook and payoff

- Hook: the worst of the before, or a half-second flash of the after then
  back ("wait for it" without saying it).
- Payoff: the reveal on a beat, in the same framing as the before, held
  longer than any other shot; then one detail of the after.

## 5. Camera, light, colour

- Camera: identical framing for before and after, locked-off or the same
  slow push-in at the same speed; match cuts; inserts for the process.
- The cut between before and after hides in motion: a cloth or hand sweeps
  across the lens and darkens the frame at the end of the process shot,
  then the after opens clean. A dip to black (`fade_out_ms`, `fade_in_ms`)
  works for a slower reveal.
- Light: the same source and direction in both ("soft window light from
  the left, overcast"); the same white balance; the same grade.
- Lavendly makes no split screen and no last-frame pin: the reveal is a cut
  between two real frames, never a morph inside one clip for a real case.

## 6. Sound

- Native: spray, wipe squeak, scraper, brush strokes, water.
- Narration: 6 s up to 10 words or none; 15 s 28 to 32; 30 s 60 to 68; 60 s
  120 to 135. Name the problem, the steps, the time it took only if the
  user gave it.
- Score: "Bouncy pizzicato and a light kick around 118 BPM. Opens tight
  under the before, counts through the steps, stops for half a beat before
  the reveal, lands on a bright full hit on the after. Instrumental."
- Mix: process clips `native` 1 when no narration sits over them; before
  and after photo clips `mix` 0.2; score 0.35 with ducking; the half-beat
  silence before the reveal is in the score brief.

## 7. Models on Lavendly

| Role | Model | Why | 15 s (5 shots) | 30 s (8 shots) |
|---|---|---|---|---|
| Best | Veo 3.1 | holds a real photo as the first frame with a gentle move at 1080p; native process sounds | 244 | 437 |
| Value | Veo 3.1 Fast | same, cheaper | 79 | 140 |
| Draft | Veo 3.1 Lite | photo frames still work; no references | 59 | 104 |
| 1:1 and 3:4 feed | Wan 2.7 | 1080p, sound, all feed shapes, 4 references | 69 | 122 |

Totals: clips at 4 s (Veo; shot 8 of the 30 s at 8 s) or 5 s (Wan; shot 8
at 10 s), the photo scenes (two in the 15 s, three in the 30 s) with no
opening image, the rest 2 credits each, score 2 or 3, voice 1.

## 8. Prompt pairs (Veo)

**Pair 1: the before photo, animated gently** (opens on the user's before
photo; the after photo gets the identical motion prompt)

Still (fallback for an illustration only):

```text
Natural-light interior photograph. Wide shot at eye level, 24mm lens, vertical lines straight. A black glass induction stovetop in a white kitchen covered in baked-on grease rings and splatter, a chrome kettle at the back left. Soft overcast window light from the left. Neutral white balance. No text, no logo.
```

Motion:

```text
Slow push-in toward the stovetop at an even speed over the whole shot. Nothing in the room moves. The kitchen, the stovetop and the window light stay exactly as in the opening frame. Exactly one kettle, nobody in frame. Ambient noise: quiet kitchen room tone. No music. Clean frame, no text.
```

**Pair 2: the process wipe that covers the cut**

Still:

```text
Natural-light product photograph. Close-up, 50mm lens. A hand in a yellow rubber glove holds a folded grey microfibre cloth above a black glass stovetop with a fine mist of cleaner on its surface. Soft window light from the left. Neutral white balance. No text, no logo, no label lettering.
```

Motion:

```text
Locked-off camera. 0 to 2 s: the gloved hand wipes the cloth in one long stroke from left to right across the glass. 2 to 3 s: the cloth lifts toward the lens and covers it, the frame going dark. The stovetop and the light stay exactly as in the opening frame until the cloth covers the lens. Exactly one hand, one cloth. SFX: a cloth squeak on glass. No music. Clean frame, no text.
```

**Pair 3: an illustration pair** (labelled illustration; the two stills
differ only in the state)

Still A:

```text
Natural-light interior photograph. Wide shot at eye level, 24mm lens, camera in the doorway. A small bedroom with beige walls, an unmade bed, piles of clothes on a chair, an empty wooden shelf, one harsh overhead bulb. No text.
```

Still B:

```text
Natural-light interior photograph. Wide shot at eye level, 24mm lens, camera in the doorway. The same small bedroom with beige walls, the bed made with white linen, the chair empty, the wooden shelf holding folded sweaters and two plants, warm bedside lamps on. No text.
```

Motion (both):

```text
Locked-off camera in the doorway. Nothing moves except the light: a slow, faint brightening from the window. The room stays exactly as in the opening frame. Nobody in frame. Ambient noise: quiet room tone. No music. Clean frame, no text.
```

**Second family (Wan 2.7).** Motion plus camera only for photo frames:
"Slow push in, wide shot, wide lens. Soft side light, neutral colour tone,
low contrast. The room keeps its exact layout." Same words for the before
and the after clip.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The room changes layout between before and after | real photos from one tripod position; for illustrations, identical framing words and the same lens |
| A morph instead of a cut | never ask one clip to transform a real case; cut between two frames |
| The after looks better lit | the same light words; never brighten the after |
| The stain lifts unrealistically in the process shot | show the stroke and the cover, not the full removal; the after photo carries the result |
| Objects multiply on shelves | name what is on every surface in both stills |
| The before photo drifts during the push-in | slower push; "nothing in the room moves"; trim the tail |

## 10. Policy guards

- Claims about what a product or service does rest only on the user's real
  before and after photos of the same place, with consent from anyone in
  them. No AI-made "after" as proof.
- Beauty, health, weight and hair: no AI before and after at all.
- Time claims ("in five minutes") only as the user gives them.
- Illustrations carry the label; say so at delivery.
