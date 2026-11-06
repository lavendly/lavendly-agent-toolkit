# Recipe: micro drama

Vertical serial drama for the feed: 60 to 90 s episodes, a hook inside
3 s, one turn, a cliffhanger on a face. Romance, revenge, the boardroom, a
secret identity, a hidden world. The genre is melodrama played straight,
built for a thumb that swipes when nothing happens.

## 1. Purpose and ending

- Audience: viewers of vertical drama apps and the drama side of TikTok
  and Reels, who watch with the sound on half the time and expect a turn
  every twenty seconds.
- Purpose: one relationship moves in each episode, and the last image asks
  the next episode's question.
- The ending: the cliffhanger is a picture, a face holding a reaction for
  2 to 4 s, with a sting on the score and the dialogue cut dead. Never a
  line of narration that explains it.

## 2. From source to episodes

A logline, a script or a chapter arrives; episodes leave.

- One turn per episode: a reveal, a betrayal, a choice, an arrival. List
  the turns first; the count of turns is the count of episodes.
- Each episode: the cold open answers the last cliffhanger in 5 s, the
  want is stated by 20 s, the turn lands between 35 and 50 s, the
  cliffhanger holds the last 4 s.
- A chapter with no turn is two chapters' worth of setup; merge it into the
  next one. A chapter with three turns is three episodes.
- Dialogue carries the plot: the short lines that change the room ("You
  knew.", "Sign it.", "She is not your sister."). Exposition goes into a
  shown object (a contract, a photo, a ring on the wrong hand) or a line of
  inner monologue narration, never a speech.
- The series skill (lavendly-series) holds the bible, the story so far and
  the cadence; this recipe makes one episode.

## 3. Structure by length

Gen is the length to generate on Veo (4 s; spoken clips 4 to 8 s). On
Seedance generate 5. Spoken clips hold one speaker and 8 words per 4 s.
Worked example used through this file: Leyla, who runs a small hotel, and
Davut, the investor who turns out to own her debt. The user's own story
replaces it.

**60 s episode**

| # | Time | Size, angle, lens feel | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 4 | close-up, eye level, 50mm | locked | cold open: Leyla's face reading the letter the last episode ended on | 4 | 4 |
| 2 | 4 to 8 | insert | locked | the letter: a seal, a signature, no readable text | 4 | 4 |
| 3 | 8 to 14 | medium, stacked two-shot | slow push-in | Davut enters the lobby: "You read it." | 6 | 8 |
| 4 | 14 to 20 | close-up, Leyla | locked | "You bought my debt." | 6 | 8 |
| 5 | 20 to 26 | close-up, Davut | locked | "I bought the hotel." a half smile | 6 | 8 |
| 6 | 26 to 30 | wide, the empty lobby | locked | she sets the letter down; the staff watch from the stairs | 4 | 4 |
| 7 | 30 to 36 | medium, Leyla | handheld sway | the want: "Give me a month." | 6 | 8 |
| 8 | 36 to 42 | close-up, Davut | locked | the turn: he slides a ring across the desk: "Give me an answer." | 6 | 8 |
| 9 | 42 to 46 | insert | locked | the ring on the desk, her hand not taking it | 4 | 4 |
| 10 | 46 to 52 | close-up, Leyla | slow push-in | silence; her eyes go to the stairs | 6 | 8 |
| 11 | 52 to 56 | medium, the stairs | locked | a figure on the landing the viewer has not seen before | 4 | 4 |
| 12 | 56 to 60 | close-up, Leyla | locked | cliffhanger: her face as she recognises them, held | 4 | 4 |

**90 s episode**: the same twelve slots with a second dialogue exchange
after the want (two clips) and a two-clip walk between places (a corridor,
a car) that carries a line of inner monologue narration; 16 shots.

Numbers in the lines (a sum, a date) are spelled out in speech and carried
by captions, never shown on paper.

## 4. Vertical geometry

- Faces between 15 and 55 percent of frame height; a single is a close-up
  or a medium close-up, never a wide with a small face.
- Two people: stacked, not side by side. An over-the-shoulder with the
  listener's shoulder across the bottom third, or a near and far staging
  with one face above the other. Paste the staging sentence ("Leyla in the
  lower left facing up and right; Davut above and right, facing down and
  left") into every prompt of the scene.
- The line between their eyes runs top to bottom of the frame; the camera
  stays on one side of it. Coverage, eyelines and reverses in
  [dialogue-scenes.md](dialogue-scenes.md).
- Headroom small; the top fifth of the frame is where the app's own text
  sits, so nothing the story needs lives there.

## 5. Performance

- The currency is the reaction: every line is followed by the face that
  hears it. Plan the listener's shot before the speaker's.
- Melodrama played straight: still bodies, small moves, big eyes. "a half
  smile", "a swallow", "her hand stops". Nothing shouted; the volume is in
  the cut. Behaviour words and symptoms in [acting.md](acting.md).
- One held reaction per episode, the cliffhanger, 2 to 4 s with nothing
  else moving in the frame.

## 6. Camera, light, look

- Camera: locked-off singles, one slow push-in per scene on the turn,
  handheld only on the want. Never a whip, never an orbit.
- Lens feel: 50mm to 85mm on faces, shallow depth, the background soft.
- Light: glossy and motivated: a window, a lamp, a corridor of downlights,
  rain on glass with the street's colour in it. Warm on the home, cool on
  the office, mixed on the threshold.
- Look: premium serial, clean skin texture, a mild grade with lifted
  blacks. The same place lines in every episode; the series skill locks
  them.
- Places as stakes: a lobby, a boardroom, a hospital corridor, a wet
  street, a car at night. Props carry the plot: a ring, a contract, a
  phone face down, keys.

## 7. Sound

- Dialogue is native in the clip: `native` 1, one speaker per clip, the
  face in frame, "(no subtitles)" after the line on Veo. Lines in Spanish,
  Japanese, Korean or Chinese on Kling v3 Standard.
- Inner monologue: one narration track for the film, one short line per
  walk or insert, the character's own voice brief, ducked score beneath.
- Score: "Slow, glossy, string pad and a low piano pulse around 70 BPM,
  held tension, a single sting on the last cut." Volume 0.25 with ducking;
  the sting lands on the cliffhanger's first frame.
- Captions on, `tiktok` or `reels` style: half the audience watches muted.
- Reaction clips `native` 0.6 for room tone; inserts `mix` 0.4 under the
  monologue.

## 8. Cast that holds across episodes

- Each lead has a hero sheet (lavendly-characters): a front close-up and
  a three-quarter, wired as reference 1 in every clip the face is in, with
  the locked description pasted verbatim.
- Wardrobe is locked per episode in one sentence ("a cream silk blouse, a
  thin gold chain, hair down"); the next episode changes it only when time
  has passed on screen.
- `set_scene_plan` on every clip: who is present, from the closed cast;
  the hand-off to the next scene. A face that drifts is regenerated from
  the sheet, never chained from the drifted frame.

## 9. Models on Lavendly

| Role | Model | Why | 60 s (12 shots) | 90 s (16 shots) |
|---|---|---|---|---|
| Best | Veo 3.1 | lip sync and room sound in the clip, 9:16, 2 references | about 735 | about 1,020 |
| Value | Veo 3.1 Fast | the same dialogue handling at 1080p | about 235 | about 325 |
| Several references (two faces, the place) | Seedance 2.0 | 4 references, sound, 720p | about 585 | about 790 |
| Lines in Spanish, Japanese, Korean or Chinese | Kling v3 Standard | native dialogue in those languages, 9:16 | about 215 | about 300 |
| Draft of the cut | Veo 3.1 Lite | timing and staging only; no references | about 180 | about 245 |

Totals: spoken clips at 8 s and the rest at 4 s on Veo (5 and 10 s
elsewhere), opening images 2 credits each, one score and one monologue
voice. Two episodes a week on Veo 3.1 Fast fit a Studio month with a
re-roll per episode.

## 10. Prompt pairs (Veo)

**Pair 1: the turn (shot 8)**

Still:

```text
Vertical 9:16 photo, 85mm, shallow depth. Over-the-shoulder from behind a woman in her thirties with dark hair down and a cream silk blouse, her shoulder soft across the bottom third of the frame. Facing her, above and right, a man in his forties with grey at the temples and a charcoal suit, seated behind a walnut hotel reception desk, one hand resting on a small velvet box. Warm lamp light from the left, cool evening window light behind him. Clean skin texture, lifted blacks. No text, no logo, no readable paper.
```

Motion:

```text
Locked-off camera. 0 to 2 s: he opens the box and slides it across the desk toward her without looking down. 2 to 6 s: he says, quietly, with a half smile: Give me an answer. (no subtitles) His face, suit and the desk stay exactly as in the opening frame; the woman's shoulder stays in frame. Exactly one man, one woman, one box. Ambient noise: a quiet lobby, a distant lift. No music.
```

**Pair 2: the cliffhanger (shot 12)**

Still:

```text
Vertical 9:16 photo, 50mm, close-up at eye level. A woman in her thirties with dark hair down and a cream silk blouse, in a hotel lobby, looking slightly up and left past the camera toward a staircase, lips parted, eyes wide and still. Warm lamp light from the left, a cool blue edge from a window behind. Clean skin texture, lifted blacks. No text, no logo.
```

Motion:

```text
Locked-off camera. She holds the look for the whole clip; at 1 s her eyes narrow very slightly and her breath catches; nothing else in the frame moves. Her face, hair and blouse stay exactly as in the opening frame. Exactly one woman. Ambient noise: a quiet lobby. No music, no dialogue.
```

**Second families.** Seedance 2.0: a production note, "already in motion
from the first frame", reference 1 the woman's face, reference 2 the
man's, reference 3 the lobby plate. Kling v3 Standard: the labelled form
`[Man, low calm voice]: "line"` with the action first and no pronouns.

## 11. Failure modes and fixes

| Failure | Fix |
|---|---|
| Faces small in a wide vertical frame | singles are close-ups; wides only for the empty room beat, no faces in them |
| The two leads side by side, both tiny | stacked staging sentence in every prompt; over-the-shoulder for the exchange |
| A reaction that moves too much and reads as comedy | "nothing else in the frame moves", one micro-gesture named, locked-off camera |
| Lip sync drifts on a long line | 8 words per 4 s, one speaker, the face in frame; split the speech across clips |
| The cliffhanger explained by narration | no narration on the last 4 s; the sting and the cut do the work |
| Readable text on a letter or a contract | "no readable text, a seal and a signature only"; the content is spoken |
| The lead's face changes between episodes | the same hero sheet by url in every episode, regenerated keyframes, never chained from a drifted frame |
| A newcomer who was never introduced | an entrance shot or a naming line before they act; added to the bible after |

## 12. Policy guards

- No real people, no celebrities' likeness, no real companies as the
  villain's firm.
- Romance stays implied: a hand, a look, a door closing; no explicit
  scenes. Leads are adults, stated as such in the description.
- Violence off screen: the sound, the reaction, the aftermath.
- A branded mini-drama (a product inside the story) is an ad: the ads
  skill's disclosure and claim rules apply.
