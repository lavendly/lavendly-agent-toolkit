# Recipe: noir and mystery

## 1. Purpose, audience, ending

- Purpose: a question someone needs answered, in a world of hard light and
  bad choices. Noir is the mood (shadow, rain, a tired voice); mystery is
  the structure (question, clues, answer).
- Audience: genre fans, narrative creators, series pilots, puzzle audiences.
- The ending: the answer shown on screen, and what it costs the person who
  found it. Fair play: the answer points back to a clue the viewer saw.

## 2. The craft

- The voice: noir is often narrated in the first person, past tense,
  terse, concrete, a little bitter. Short sentences. Nouns and verbs. The
  narration tells what the detective noticed, never what the picture shows.
- Clues are objects in inserts the viewer can read without words: a
  matchbook with no lettering, a wet footprint, a stopped watch, lipstick on
  a glass, a key that does not fit. Every clue gets 3 to 4 s on screen.
- Shadows as composition: half-lit faces, stripes from blinds, a figure in a
  doorway as a silhouette, smoke in a beam. One hard source per scene.
- Black and white is a grade, not a prompt: generate in colour with
  high-contrast light, then `edit_clip` colour saturation 0 and contrast
  1.2 on every clip (both are multipliers, 1 neutral). Neon noir keeps colour: magenta and cyan on wet black.

## 3. Structures by length

Model lengths for Veo 3.1 Fast (4 or 8 s). With narration over most shots,
silent models (Hailuo 3 Max) are a good value choice.

### 6 s: the clue

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Insert, 100mm | locked-off | A gloved hand sets a wet matchbook on a desk under a hard lamp | 3 s | 4 s |
| 2 | Close-up, 85mm, half-lit | locked-off | The detective's eyes go from the matchbook to the door | 3 s | 4 s |

Narration: "She left in a hurry. Not in a hurry enough." (10 words)

### 15 s: the question

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Wide, 35mm, through blinds | locked-off | A small office at night, rain on the window, a man at the desk | 4 s | 4 s |
| 2 | Insert, 100mm | locked-off | A stopped pocket watch on the desk, the glass cracked | 3 s | 4 s |
| 3 | Medium close-up, 85mm | locked-off | He turns the watch over; his jaw sets | 4 s | 4 s |
| 4 | Wide, 35mm | slow push-in | The office door's frosted glass: a silhouette stands outside, still | 4 s | 4 s |

Narration: about 30 words over shots 1 to 3; silence on shot 4.

### 30 s: question, clue, false lead, clue, answer, cost

| # | Size, lens | Move | Action | Beat | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Close-up, 85mm | locked-off | Rain running down a window; a face beyond it, half lit | Question | 4 s | 4 s |
| 2 | Wide, 35mm | locked-off | An empty hotel room, an unmade bed, a lamp on | Question | 4 s | 4 s |
| 3 | Insert, 100mm | locked-off | Lipstick on a whisky glass | Clue 1 | 3 s | 4 s |
| 4 | Medium, 50mm | slow pan right | The detective follows wet footprints to the window | False lead | 5 s | 8 s |
| 5 | Insert, 100mm | locked-off | A brass key on the sill, too small for the door | Clue 2 | 3 s | 4 s |
| 6 | Medium close-up, 85mm | slow push-in | He looks from the key to the wardrobe | Connection | 4 s | 4 s |
| 7 | Wide, 35mm | locked-off | The wardrobe door opens a crack from inside; a woman's eyes; held | Answer and cost | 7 s | 8 s |

Narration over shots 1 to 6: 45 to 55 words, two shots per sentence where
a beat runs over 6 s.

### 60 s: three clues, two false leads

Question (2 shots), clue 1 (insert and reaction), false lead 1 (a walk, a
wrong door), clue 2, a witness (one line of dialogue, a single), false lead
2, clue 3, the connection (the detective alone with the three objects, a
slow push), the answer (a static reveal), the cost (a last image held).
Twelve to fourteen shots; narration 100 to 120 words, with silences.

### 90 s: a case with a second question

The 60 s case, then the answer raises a second question (the woman in the
wardrobe holds a photograph of the detective), and three more shots set it
up for a next episode. Hand off to lavendly-series when the user wants the
next one.

## 4. Hook and payoff

- Hook: the question as an image in frame 1 (an empty room with the lamp
  still on, a body implied by a hand hanging off a bed edge out of focus,
  a stopped watch), with the first line of narration under it.
- Payoff: the answer as a static reveal, held 4 s or more, then one line of
  narration about the cost, or none.

## 5. Camera, light, colour

- Camera: locked-off, low angles on the detective, high angles on the
  victim or the suspect, slow pans that follow a clue, a slow push on the
  realisation. Deep focus in rooms so the background can hold a clue.
- Light: hard light through blinds (stripes of shadow), a single desk lamp,
  street light through rain, a silhouette against frosted glass, smoke in
  the beam. Low key always; the face half lit.
- Colour: black and white via the edit, or neon noir (magenta and cyan on
  wet black), or a muted sodium-orange city.

Exact phrases that work:

- "Noir mystery still, hard light, deep shadows"
- "hard light through window blinds from camera left, stripes of shadow across his face and the wall"
- "a silhouette behind the frosted glass of the door, perfectly still"
- "deep focus, the wardrobe in the background sharp"
- "rain streaking the window, the street lamp beyond it a hard white point"
- "a matchbook with a plain red cover and no lettering"

## 6. Sound

- Narration leads: one voice for the film, low and unhurried (the voice
  list is in [mcp-calls.md](mcp-calls.md); the OpenAI names all play as
  Rachel). Captions on (`youtube` serif style suits
  noir). Lines short; leave 0.5 s gaps for the rain to be heard.
- Clips under narration: `mix` at 0.25 to 0.3 (rain, a radiator knock, a
  far siren). The clip whose sound is the point (a door, a key) stays
  `native`.
- Score: "Muted trumpet and brushed snare over a slow upright bass walk,
  about 66 BPM, smoky and sparse; drops to bass alone under the clues;
  returns on the answer and ends on an unresolved minor chord.
  Instrumental." Volume 0.3, `ducking` on.
- ElevenLabs v3 takes inline delivery tags such as `[whispers]`; use one at
  most, on the last line.

Narration example for the 30 s case (51 words, the last line over the answer):

```text
The room was paid for till Friday. Nobody had slept in it.
She drank rye and left her colour on the glass.
The footprints went to the window. They were meant to.
The key was too small for any door in the building.
Except one.
I should have left it shut.
```

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Veo 3.1 | Holds hard light, rain and texture in low key |
| Value with sound | Veo 3.1 Fast | 14 per 4 s |
| Value, narrated shots | Hailuo 3 Max | Silent, 10 per 5 s; the narration and score carry the sound |
| Faces from approved stills | Kling v3 Pro | Small expressions in half light |
| Draft | Seedance 2.0 Mini | 9 per 5 s |

Typical cost (clips plus about 2 per opening image; narration and score
extra, about 1 and 3 credits):

| Model | 15 s (4 clips) | 30 s (7 clips) |
|---|---|---|
| Veo 3.1 Fast | 4 x 14 = 56, plus 8 | 5 x 14 + 2 x 28 = 126, plus 14 |
| Hailuo 3 Max (5 s, 10 s) | 4 x 10 = 40, plus 8 | 6 x 10 + 20 = 80, plus 14 |
| Veo 3.1 | 4 x 47 = 188, plus 8 | 5 x 47 + 2 x 94 = 423, plus 14 |

## 8. Prompt pairs

### Pair 1: the office (Veo 3.1 Fast, 15 s shot 3)

Still frame:

```text
Noir mystery still, hard light, deep shadows. Medium close-up, low angle, 85mm lens. Walt: a man in his fifties, heavy-lidded eyes, a grey moustache, a broken nose, a loosened dark tie and a rumpled white shirt. He sits at a desk at night holding a cracked pocket watch. Hard light through window blinds from camera left, stripes of shadow across his face and the wall. Palette: black, white, sodium orange.
```

Motion:

```text
Noir mystery shot, hard light, deep shadows. Locked-off camera. 0 to 2 s: Walt turns the watch over in his fingers. 2 to 4 s: he stops; his jaw sets; his eyes lift to the door off screen right and stay there. The stripes of shadow, his face and the desk stay exactly as in the opening frame. Exactly one person in frame, nobody else. Sound: rain on the window, a radiator knock. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 2: the key (Hailuo 3 Max, silent)

Still frame:

```text
Noir mystery still, hard light, deep shadows. Insert shot, 100mm macro lens. A small brass key lies on a wet white-painted window sill at night, rain beads around it. Hard white street light from outside the window, long shadow of the key across the sill. Palette: brass, white, black.
```

Motion:

```text
Rain drips onto the sill beside the key; one drop runs down the glass behind it; the key does not move [Static shot]. The key, the sill and the light stay exactly as in the opening frame. Exactly one key, nothing else on the sill. Clean frame: no text.
```

### Pair 3: the answer (Veo 3.1 Fast, 30 s shot 7)

Still frame:

```text
Noir mystery still, hard light, deep shadows. Wide shot, eye level, 35mm lens, deep focus. A shabby hotel room at night: an unmade bed on the left, a tall dark wooden wardrobe on the right with its door closed, a lamp on the bedside table. One hard lamp light from the left, the wardrobe half in shadow. Palette: black, white, amber.
```

Motion:

```text
Noir mystery shot. Locked-off camera, deep focus. 0 to 3 s: the room is still; the lamp hums. 3 to 6 s: the wardrobe door opens a few centimetres from inside, slowly. 6 to 8 s: in the dark gap, a woman's eyes catch the lamp light and do not blink. The room, the bed and the lamp stay exactly as in the opening frame. Exactly one person, inside the wardrobe, nobody else in the room. Sound: a slow hinge creak, the lamp hum. Clean frame: no text, no subtitles.
```

Second family notes: on Kling, put the half-light in the Scene field and the
eye path in the Action field; Kling holds the stripes of shadow well from an
approved still.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Black-and-white plates come back grey and flat | Generate in colour with hard light; desaturate with `edit_clip` colour on every clip |
| The stripes of shadow change direction between shots | One light line pasted into every still of the scene |
| Clues carry gibberish lettering | Plain objects: "a matchbook with a plain red cover and no lettering" |
| Narration explains the picture | Rewrite: narration says what he noticed or felt, never what we see |
| Narration runs over the shot and freezes the frame | 2.3 words per second; cut words, not pictures |
| Smoke and rain look like noise | One element per shot, lit from behind |
| The answer arrives as a line, not an image | Make the reveal a static picture; the line comes after it |

## 10. Policy guards

- No real crimes, real victims or real detectives; no real police insignia.
- Smoking may appear as period texture; never as a product.
- Violence implied (a hand, an empty room), never shown.
