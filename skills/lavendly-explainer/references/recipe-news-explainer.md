# Recipe: news explainer

A current story explained clearly and credibly: what happened, why it
matters, what comes next. Newsrooms, newsletters, civic creators. Worked
example: a rail strike announced for next week (the facts in every example
are placeholders the user's source replaces).

## 1. Purpose, audience, ending

- Purpose: a viewer who missed the story understands it in under a minute
  and knows what to watch for.
- Audience: feeds on phones, often muted; they need the headline in the
  first two seconds and trust signals throughout.
- The ending says what happens next and when, plainly, with the date.

## 2. The credibility rules (binding)

- AI footage never depicts the real event, a real person or a real place as
  if filmed. No generated strike line, flood street, protest, courtroom,
  politician, police action, crash or disaster.
- Generated pictures are clearly illustrative: a paper diorama, a clay
  miniature, a symbolic still life, generic objects (a ticket, a closed
  gate, a stack of documents with soft unreadable print). They never carry
  a recognisable landmark, logo, uniform insignia or face.
- Every illustrative scene is labelled. The MCP cannot render a label:
  the narration says it where natural ("in this illustration"), the post
  caption says "Illustrations are AI-generated", and the user adds an
  on-screen "Illustration" tag in the app before publishing. Say all three.
- Real footage and photos come only from the user, with rights (agency,
  own reporting), imported with `import_asset` and placed as ready clips.
- Every claim is attributed in the narration ("the union said", "according
  to the ministry"). Facts come only from the user's sources. No source,
  no claim.
- The date is spoken ("as of Thursday the sixteenth"). News ages; the film
  says when it was true.
- Quotes are read by the narrator and attributed ("the minister said, quote,
  ..."), never put in a generated mouth.
- Neutral words, no loaded metaphors (no ticking bombs, no burning
  buildings for a policy), no music that editorialises.

## 3. Structures (9:16 or 1:1)

### 6 s (headline plus one image)

| # | Time | Shot | Lens | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Medium, paper diorama | 50mm | Slow push-in | A paper station gate swings shut | 8, trim 6 | 13 ("Rail workers will strike next Tuesday, the union said today.") |

### 15 s (what happened, why it matters, what next)

| # | Time | Shot | Lens | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Medium, paper diorama | 50mm | Locked-off | Paper gate swings shut | 4 | 9 what happened, attributed |
| 2 | 4 to 8 | Top-down | 35mm | Slow push-in | A paper train stops short of a paper platform | 4 | 9 why it matters |
| 3 | 8 to 12 | Close-up | 85mm | Locked-off | A paper calendar page turns to a blank square | 4 | 9 when |
| 4 | 12 to 15 | Medium | 50mm | Locked-off | Paper commuters (silhouettes) wait on the platform | 4, trim 3 | 7 what to watch |

### 30 s (headline, three facts, context, what to watch)

| # | Time | Shot | Lens | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Medium | 50mm | Locked-off | Gate shuts | 4, trim 3 | 7 headline |
| 2 | 3 to 7 | Top-down | 35mm | Slow pan right | Paper rail lines across a paper landscape, one train stopping | 4 | 9 fact one: scale |
| 3 | 7 to 11 | Close-up | 85mm | Locked-off | A paper ticket torn in half | 4 | 9 fact two: who is affected |
| 4 | 11 to 15 | Insert | 100mm | Slow truck right | A stack of documents, print too soft to read, a highlighter | 4 | 9 fact three: the dispute |
| 5 | 15 to 19 | Wide | 24mm | Slow push-in | A paper town at dusk, windows lit | 4 | 9 context |
| 6 | 19 to 23 | Medium | 50mm | Locked-off | Two paper chairs facing across a table | 4 | 9 the talks |
| 7 | 23 to 27 | Close-up | 85mm | Locked-off | Calendar page turns | 4 | 9 the date |
| 8 | 27 to 30 | Medium | 50mm | Locked-off | Paper platform, silhouettes waiting | 4, trim 3 | 7 what to watch |

### 60 s

The 30 s plan with a hook question (shot 0: "Will your train run next
week?"), a background section (two shots: paper timeline objects laid in a
row), "voices" read by the narrator over symbolic objects (a paper
microphone stand, an empty lectern seen from the side), and imported real
footage where the user has it. About 140 words, every claim attributed.

| # | Time | Shot | Move | Picture | Gen |
|---|---|---|---|---|---|
| 1 | 0 to 3 | Medium | Locked-off | Gate shuts | 4, trim 3 |
| 2 | 3 to 7 | Top-down | Slow pan right | Paper railway | 4 |
| 3 | 7 to 11 | Close-up | Locked-off | Ticket torn | 4 |
| 4 | 11 to 15 | Wide | Slow push-in | Paper town at dusk | 4 |
| 5 | 15 to 19 | Insert | Slow truck right | Documents and highlighter | 4 |
| 6 | 19 to 23 | Top-down | Locked-off | Paper objects in a row (the background timeline) | 4 |
| 7 | 23 to 27 | Medium | Locked-off | Empty lectern, side view | 4 |
| 8 | 27 to 31 | Medium | Locked-off | Two paper chairs across a table | 4 |
| 9 | 31 to 39 | Real footage (imported) or a paper station hall (hold) | as shot | Platform | 8 |
| 10 | 39 to 43 | Close-up | Locked-off | Calendar page turns | 4 |
| 11 | 43 to 47 | Top-down | Slow push-in | A paper bus waiting beside the station (alternatives) | 4 |
| 12 | 47 to 55 | Medium | Slow pull-back | Platform with silhouettes (hold) | 8 |
| 13 | 55 to 60 | Medium | Locked-off | Gate, as in shot 1 | 8, trim 5 |

### 90 s

Add a "how we got here" chapter (dated steps from the source over paper
objects laid along a table, panning one direction) and "what each side
says" (two matched shots, narrator reads attributed quotes). About 205
words.

## 4. Hook and payoff

- Hook: the single most important fact, attributed, in the first sentence,
  spoken from 0.0 s so the captions carry it while muted.
- Payoff: what happens next and when; the last line names the date and
  where to check updates (the user's outlet).

## 5. Camera, light, colour

- Style line: "Handmade paper diorama, layered cut paper with soft shadows"
  (default) or "Clay miniature set, matte plasticine surfaces".
- Light: "soft even top light with gentle shadows under each paper layer";
  dusk shots "one warm lamp inside the paper windows".
- Colour: restrained, two to three tones plus the outlet's accent colour
  ("off-white paper, slate grey, one muted red accent").
- Moves: locked-off and slow push-ins; no whip pans, no shakes.
- Pacing: a picture change every 3 to 5 s.

## 6. Sound

- Narration neutral, 2.4 words per second; daniel, river or alice.
- Native `off` (paper miniatures need no ambience) or `mix` 0.2 for a soft
  paper rustle on movement.
- Score: "Neutral and steady: a soft muted pulse and low synth pad at about
  90 BPM, no melody that tells the viewer how to feel; constant level,
  ends cleanly with the last line." Volume 0.2, ducking on.
- Captions: `reels` or `tiktok` on 9:16, `caption` (boxed) on 1:1 feeds.

## 7. Models and credits

| Pick | Model | Why | 15 s | 30 s |
|---|---|---|---|---|
| 9:16 default | Veo 3.1 Fast | Paper texture and soft light | 67 | 132 |
| 1:1 feed | Wan 2.7, 5 s clips | Makes 1:1; 4 references hold the paper style | 45 | 88 |
| Value, any shape | Seedance 1.5 Pro | 1080p, 1:1 and 9:16 | 51 | 100 |

## 8. Prompt pairs (Veo 3.1 Fast)

**Pair 1, the headline picture.**

Still-frame prompt:

```text
Handmade paper diorama, layered cut paper with soft shadows. A small station entrance cut from off-white card, an open paper gate of thin grey strips, a paper platform behind it, a slate grey paper sky. Medium shot at the height of the gate, 50mm look, shallow depth of field. Soft even top light, gentle shadows under each paper layer. Off-white, slate grey, one muted red accent on the gate. No signs, no lettering. Clean frame, no text.
```

Motion prompt:

```text
Handmade paper diorama, layered cut paper with soft shadows, one continuous take. Medium shot. 0 to 1 s: the scene is still. 1 to 3 s: the two halves of the paper gate swing inward and meet in the middle, closing. 3 to 4 s: the gate settles with a small bounce of the paper. Camera: locked-off, no movement. End state: the gate closed, the platform empty behind it. The station, the platform and the light stay exactly as in the opening frame. No people, no figures, no lettering. SFX: a soft paper tap. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Pair 2, the documents.**

Still-frame prompt:

```text
Clean studio tabletop film, soft even light. A stack of printed pages lies on a plain wooden desk, the printed lines soft and grey, far too blurred to read, a yellow highlighter resting across the top page. Insert shot, 100mm macro look, focus on the highlighter tip. Soft window light from the left. Neutral white, wood, one yellow accent. No logos, no letterheads. Clean frame, no text.
```

Motion prompt:

```text
Clean studio tabletop film, soft even light, one continuous take. Insert shot, macro. 0 to 1 s: still. 1 to 4 s: a hand enters from the right, picks up the highlighter and draws one slow yellow line across a blurred row of print, then lifts away. Camera: slow truck right following the stroke, stopping at its end. End state: one yellow line across the page, the hand gone. The pages, the desk and the light stay exactly as in the opening frame. Exactly one hand, no face. SFX: highlighter squeak, paper rustle. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Second family, Wan 2.7 (1:1).**

```text
The two halves of the paper gate swing inward and meet, closing, then settle with a small bounce. Static shot, locked-off. Medium shot, soft top light, low contrast, neutral colour tone, layered cut paper. No people. Sound: soft paper tap. No music.
```

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The diorama grows readable signs or a station name | "No signs, no lettering" in the still; blank paper boards |
| Paper figures look like a real crowd or real people | Silhouettes only, at distance, a few; or no figures |
| A landmark appears (a famous station roof) | Generic shapes; no place name in any prompt |
| Music that sounds tense or triumphant | The neutral score brief; volume 0.2 |
| A claim without attribution | Add the source to the line before any spend |
| The story changed after the render | Say the film's date; update the narration and render again (free) |

## 10. Policy guards

- Never AI footage of a real event, person or place presented as real.
- Illustration labelled three ways: narration where natural, post caption,
  the user's on-screen tag.
- Facts and quotes only from the user's sources, attributed.
- Elections, conflicts, disasters, crime and health emergencies: symbolic
  illustration only; no depiction of victims, suspects or officials.
- Never fabricate a statement, a poll, a number or a document.
