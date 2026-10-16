# Recipe: romance

## 1. Purpose, audience, ending

- Purpose: two people moving toward (or away from) each other, and the
  moment one of them risks something. Romance is drama about distance.
- Audience: adults; romance micro-dramas on vertical feeds; wedding and
  anniversary stories made for a couple (fictional characters only).
- The ending is the held moment after the choice: a hand taken, a step
  toward, or a step away. The viewer must feel the distance change.

## 2. The craft

- Distance is the story: the singles grow closer across the film (medium,
  then medium close-up, then close-up), and the two-shot arrives only at
  the choice. Write the distance between them in metres in the wide shots.
- Looks carry romance: one looks while the other does not; then both look;
  then one looks away. Write every eye path.
- Hands are the second face: a hand that almost touches, a sleeve, a cup
  passed. Inserts at 100mm on hands are the strongest shots in the genre.
- Kisses: generated faces merge and distort at contact. Cut before the
  lips meet, frame it as a wide silhouette against light, or play it as
  foreheads touching, eyes closed. Never a close-up of the kiss itself.
- Restraint over display: the moment before is stronger than the moment.

## 3. Structures by length

Model lengths for Veo 3.1 Fast (4 or 8 s).

### 6 s: the look

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Medium close-up, 85mm | locked-off | He watches her across the café; she does not see | 3 s | 4 s |
| 2 | Close-up, 85mm | locked-off | She looks up and catches him; neither looks away | 3 s | 4 s |

### 15 s: look, risk, held moment

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Wide, eye level, 35mm | locked-off | A rooftop at golden hour; two people a metre apart at the railing | 4 s | 4 s |
| 2 | Medium close-up, 85mm | locked-off | She glances at him, then back at the city | 4 s | 4 s |
| 3 | Insert, 100mm | locked-off | His hand slides a few centimetres along the railing toward hers and stops | 3 s | 4 s |
| 4 | Close-up, 85mm | slow push-in | She looks down at his hand; a small smile she does not hide | 4 s | 4 s |

### 30 s: meet, test, choose

| # | Size, lens | Move | Action | Beat | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Close-up, 85mm | locked-off | A wet umbrella shaken out at a bookshop door | Hook | 3 s | 4 s |
| 2 | Wide, 35mm | locked-off | Two strangers reach for the same last book; they stop | Meet | 4 s | 4 s |
| 3 | Medium close-up, 85mm | locked-off | He laughs once and lets go | Look | 4 s | 4 s |
| 4 | Medium close-up, 85mm | locked-off | She holds the book, then offers it back | Risk | 5 s | 8 s |
| 5 | Insert, 100mm | locked-off | Their fingers both on the cover, neither pulling | Test | 4 s | 4 s |
| 6 | Medium two-shot, 50mm | slow push-in | She says "We could share it." He looks at her, not the book | Choice | 5 s | 8 s |
| 7 | Wide from outside the window, 35mm | locked-off | Through rainy glass, they sit down together at the reading table; held | Held | 5 s | 8 s |

### 60 s: two tests

Hook, meet, look, first risk, first test (a misunderstanding: she leaves),
a gap (him alone with the book), second risk (he goes out into the rain),
second test (she is already gone, then is not), choice (two-shot, one line),
held moment (wide). Eleven to twelve shots; dialogue 6 to 8 lines.

### 90 s: a relationship in three moments

Three scenes at three times (meeting, a quarrel, a reconciliation), each a
heading of its own with its own light (spring morning, winter night, the
same spring morning a year later). Each scene is 5 to 6 shots. Mark the time
jumps with a dip to black (`fade_out_ms`, `fade_in_ms`) and a change of
light; the last scene repeats the first scene's framing with one detail
changed (the circle ending).

## 4. Hook and payoff

- Hook: a detail of one of them (the umbrella, a hand on a cup, a look)
  before we know who they are.
- Payoff: the held moment after the choice, wide or in a slow push, 4 to
  6 s, with the score's resolution.

## 5. Camera, light, colour

- Camera: locked-off singles; slow push-ins on the risk and the choice; a
  wide through glass or across a street for the held moment (privacy).
- Lens: 85mm singles with a soft background; 100mm hand inserts; 50mm
  two-shot; 35mm wides.
- Light: golden hour backlight with warm rim on hair; soft window light;
  string lights with round bokeh; rain on glass at night with warm interior.
- Colour: warm, soft, low contrast; warm film skin tones; one cool accent (the
  blue hour outside).

Exact phrases that work:

- "Romantic drama still, soft 35mm film look"
- "low golden sun behind them, warm rim light on their hair, long shadows"
- "85mm portrait lens, the city behind her a soft blur of warm lights"
- "round creamy bokeh from the string lights"
- "soft warm film colours, gentle skin tones, creamy highlights"
- "they stand a metre apart at the railing"

## 6. Sound

- Native ambience on every shot (rain, café murmur, city far below): `native`.
- Dialogue: few words. 30 s holds 3 to 4 lines; the most important line is
  the shortest.
- Score: "Solo piano and soft strings, about 72 BPM, warm and unhurried.
  Enters on the first look, holds back during the test, opens into a gentle
  theme on the choice, resolves on one held chord over the last image.
  Instrumental." Volume 0.3 under ambience; 0.45 over the held ending.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Veo 3.1 | Faces, skin and small expressions; native dialogue |
| Value | Veo 3.1 Fast | 14 per 4 s |
| Subtle performance from approved stills | Kling v3 Pro | Holds two faces from stills; labelled dialogue |
| Two references | Seedance 2.0 Fast | 4 references at 11 per 5 s |
| Draft | Seedance 2.0 Mini | 9 per 5 s |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 clips) | 30 s (7 clips) |
|---|---|---|
| Veo 3.1 Fast | 4 x 14 = 56, plus 8 | 4 x 14 + 3 x 28 = 140, plus 14 |
| Veo 3.1 | 4 x 47 = 188, plus 8 | 4 x 47 + 3 x 94 = 470, plus 14 |
| Kling v3 Pro | 4 x 20 = 80, plus 8 | 7 x 20 = 140, plus 14 |

## 8. Prompt pairs

### Pair 1: the railing (Veo 3.1 Fast, 15 s shot 3)

Still frame:

```text
Romantic drama still, soft 35mm film look. Insert shot, 100mm lens, very shallow depth of field. Two hands resting on a weathered metal rooftop railing, a hand's width apart: on the left a woman's hand with a thin gold bracelet and a cream knit sleeve; on the right a man's hand with a faded denim cuff. Low golden sun from behind, warm rim on the knuckles, the city a soft warm blur below. Palette: gold, cream, denim blue.
```

Motion:

```text
Romantic drama, soft 35mm film look, one continuous take. Locked-off camera. 0 to 2 s: both hands rest still on the railing. 2 to 4 s: the man's hand slides slowly a few centimetres toward hers and stops just before touching. Her hand does not move. Both hands, the sleeves and the light stay exactly as in the opening frame. Exactly two hands in frame. Ambient noise: city far below, wind. Clean frame: no text, no on-screen graphics.
```

### Pair 2: the offer (Veo 3.1 Fast, 30 s shot 6)

Still frame:

```text
Romantic drama still, soft 35mm film look. Medium two-shot in profile, 50mm lens. Rosa on the left facing right: a woman in her late twenties, freckles, auburn hair in a loose braid, a mustard raincoat. Sam on the right facing left: a man in his thirties, brown skin, close-cropped black hair, round tortoiseshell glasses, a grey wool coat. Both hold one hardback book between them in a warm bookshop. Warm lamp light from above, rain on the window behind. Palette: mustard, grey, warm amber.
```

Motion:

```text
Romantic drama, soft 35mm film look, one continuous take. Slow push-in from the two-shot toward the book between them. 0 to 2 s: Rosa keeps her fingers on the book and looks at it. 2 to 4 s: Rosa, the woman on the left in the mustard raincoat, says softly: "We could share it." (no subtitles) 4 to 8 s: Sam looks at her, not at the book, and smiles slowly. Both faces, their coats and the bookshop light stay exactly as in the opening frame. Exactly two people in frame, nobody else. Ambient noise: rain on glass, pages turning far off. Clean frame: no text, no subtitles, no title on the book cover.
```

### Pair 3: the held moment (Kling v3 Pro)

Still frame:

```text
Romantic drama still, soft 35mm film look. Wide shot from outside a bookshop window at night, 35mm lens. Through rain-streaked glass, two people sit at a wooden reading table under a warm lamp, an open book between them. Warm interior light, cool blue street outside. Rain drops sharp on the glass in the foreground. Palette: warm amber, night blue, black.
```

Motion:

```text
Scene: a bookshop at night seen through its rain-streaked window. Characters: the woman in the mustard raincoat on the left and the man in the grey coat on the right, seated, the book between them. Action: she turns a page; he leans in a little to read; their shoulders almost touch. Camera: static, outside the window. Audio: rain on glass, a far car passing. The two people, the table and the lamp stay exactly as in the opening frame. Exactly two people in frame, nobody else. Clean frame: no text, no shop sign letters.
```

Second family notes: on Seedance give reference 1 Rosa's face and coat only
and reference 2 Sam's face and coat only, and say "ignore their backgrounds
and poses".

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Faces merge or distort in a kiss | Cut before contact; silhouette wide; foreheads touching, eyes closed |
| Both actors smile at once the whole time | Stagger: one looks, then the other; write the eye paths |
| Glossy, over-smoothed skin | "visible skin texture, a few freckles, soft film grain" |
| Book titles, shop signs garbled | "no title on the book cover", signs out of focus or turned away |
| The two drift into each other's side | Screen sides in every prompt; the 180 degree rule |
| Saccharine score drowns the scene | Score enters late, 0.3 under ambience, silence at the risk |

## 10. Policy guards

- Adults only; no minors in romantic scenes. No explicit sexual content or
  nudity; intimacy is implied.
- Fictional couples only; a real couple's story is told with fictional
  stand-ins, never their faces.
