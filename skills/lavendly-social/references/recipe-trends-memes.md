# Recipe: trends and memes

Ride a recognisable format for reach, with original material. Worked
example: "expectation versus reality" for a home espresso setup, and a
deadpan reaction format. The user's own subject replaces them.

## 1. Purpose, audience, ending

- Purpose: a format the audience already knows, filled with a new,
  specific, true-to-life observation. Recognition plus surprise.
- Audience: social-native viewers; the format is the hook, the twist is the
  reward. Trends age in days: ship fast or pick an evergreen format.
- The ending is the punchline frame, held about 1 s, or a loop.

## 2. Format rules

- You cannot see what is trending. Ask the user to name or describe the
  format and its beats; build those beats with original concept, script,
  people, place and sound. Never recreate a specific creator's video, shot
  for shot, or their catchphrase, voice or face.
- No protected audio. Lavendly attaches only original voice and music.
  When the trend lives on a song or a sound, deliver without it (or with an
  original bed) and tell the user to add the platform's licensed sound in
  the platform's app when posting; ads use the platform's commercial
  library.
- No real person memes: no celebrity faces, no politicians, no private
  people, no copyrighted characters or mascots.
- Formats that depend on text overlays, green screen or split screen are
  rebuilt for Lavendly: the joke text becomes the spoken line (captions show
  it), the green screen becomes a cut between the commentator and the
  subject, the split screen becomes a fast back-and-forth cut.
- Decline dangerous challenges (anything a viewer could get hurt copying)
  and trends that mock a group.

### Evergreen formats that build well

| Format | Beats | Lavendly build |
|---|---|---|
| Expectation versus reality | The polished version, the real version | Two looks: studio clean, then phone real; matched framing |
| "When you ..." | The situation, the reaction | Phone shot of the moment, deadpan reaction close-up |
| Rating X as Y | Item, verdict, next item | Same framing per item, voice verdicts |
| Things that just make sense | 3 to 5 satisfying fits | Macro inserts, each a perfect fit, native clicks |
| Tell me you're a <type> without telling me | 3 tell-tale objects or habits | Phone shots of each, no explanation, voice line once |
| Day one versus day one hundred | Matched before and after | Same framing, time change in light and wear |
| The overly honest review | Each claim, the deadpan truth | Product shots and one reaction face (a fictional reviewer, said to be a sketch) |
| Nobody: / Me: | Nobody does anything, then the absurd act | A static empty frame, then the act |

## 3. Structures (9:16)

### 6 s (setup and reaction)

| # | Time | Shot | Lens | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Studio clean, medium | 85mm feel | Slow push-in | Expectation: espresso pouring in thick ribbons into a white cup | 4, trim 3 | 3 "What I expected." |
| 2 | 3 to 6 | Phone, medium | Phone wide | Handheld | Reality: a sputtering portafilter spraying coffee on the counter | 4, trim 3 | 3 "What I got." |

### 15 s (setup, reveal, reaction, twist)

| # | Time | Shot | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Studio close-up | Slow push-in | The perfect pour | 4, trim 3 | 4 |
| 2 | 3 to 6 | Phone medium | Handheld | The spray mess | 4, trim 3 | 4 |
| 3 | 6 to 9 | Studio top-down | Locked | Expected latte art: a clean leaf | 4, trim 3 | 3 |
| 4 | 9 to 12 | Phone top-down | Handheld | Reality: a brown blob | 4, trim 3 | 3 |
| 5 | 12 to 15 | Phone medium close-up | Locked, propped | A person stares at the cup, then drinks anyway | 4, trim 3 | 4 "And I drank it." |

### 30 s (three escalating instances)

Three expectation and reality pairs (the pour, the art, the clean-up), each
pair 8 to 9 s, the third pair the most absurd (the machine steams the
ceiling), a reaction close-up to finish. 10 clips of 4 s trimmed to 3 s.

### 60 s

Rarely worth it. A compilation of six instances of the format with one
running gag; offer 30 s first.

## 4. Hook and payoff

- Hook: the format's first beat at frame 0 (the polished expectation),
  with its spoken label ("What I expected.").
- Payoff: the reality, held a beat longer than the setup; the last instance
  is the biggest. The reaction face closes it.

## 5. Camera, light, colour

- Two looks in one video when the format is a contrast: "Clean studio
  tabletop film, soft even light, white sweep" for the expectation; "Phone
  video, handheld on a phone rear camera, kitchen ceiling light" for the
  reality. Matched framing between the two so the contrast reads.
- Reactions: "Static phone shot propped on a shelf, flat room light,
  deadpan face, looks at the cup, not the lens" (or into the lens when the
  format breaks the fourth wall).
- Timing is the joke: setup 3 s, punch 3 s, reaction 2 to 3 s.

## 6. Sound

- Voice: a few words per beat, deadpan, 2.5 words per second at most;
  laura, roger or charlie. Or no voice when the format is purely visual.
- Native sound for the punch (the sputter, the hiss); clips `native` 1 or
  `mix` 0.5 under the voice.
- Bed: original, matching the trend's energy, never a copy of the trend
  song: "A bright, slightly smug bossa nova guitar loop at about 110 BPM for
  the expectation shots, cutting out dead on each reality shot." Volume
  0.3, ducking on. Or no bed, and the user adds the platform sound.
- Captions: `tiktok`.

## 7. Models and credits

| Pick | Model | Why | 15 s | 30 s |
|---|---|---|---|---|
| Best | Veo 3.1 Fast | Holds both the studio and the phone look, native sound | 83 | 164 |
| Value | Seedance 2.0 Mini | 9 per clip, sound | 58 | 114 |
| Fast drafts, odd shapes | Grok Imagine | 9 per 5 s, seven shapes; plan as silent | 5 clips: 45 + 10 + 3 = 58 | 114 |

## 8. Prompt pairs (Veo 3.1 Fast)

**Pair 1, expectation.**

Still-frame prompt:

```text
Clean studio tabletop film, soft even light, white sweep. A plain white espresso cup sits under the spouts of a brushed steel espresso machine with no logo, the first dark drops forming at the spout tips. Close-up from the side at cup height, 85mm look, shallow depth of field. One soft key light from the left, a thin backlight on the steel. Clean frame, no text.
```

Motion prompt:

```text
Clean studio tabletop film, soft even light, one continuous take. Close-up. 0 to 4 s: two thick ribbons of espresso pour smoothly from the spouts into the cup, golden crema rising, already in motion from the first frame. Camera: slow push-in toward the cup, stopping when it fills the lower half of the frame. End state: the cup two thirds full, crema even. The cup, the machine and the light stay exactly as in the opening frame. Exactly one cup, no hands. SFX: a soft steady pour. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Pair 2, reality.**

Still-frame prompt:

```text
Phone video still, handheld on a phone rear camera. The same plain white cup under a cheap plastic espresso machine with no logo on a cluttered kitchen counter, a sticky ring of coffee around the cup, a crumpled towel beside it. Medium shot from slightly above, phone wide lens. Warm kitchen ceiling light, a dark window behind. Clean frame, no text.
```

Motion prompt:

```text
Phone video, one continuous take, unstabilised handheld phone camera, colour straight from the phone. 0 to 1 s: the machine shudders, already in motion from the first frame. 1 to 3 s: thin coffee sputters from the spout and sprays in a fan across the counter and the towel, a few drops hitting the lens edge. 3 to 4 s: the sputter stops; a weak drip into the cup. Camera: handheld sway, a small flinch back at the spray. End state: coffee splattered across the counter, the cup a quarter full. The machine, the counter and the light stay as in the opening frame. No person in frame. SFX: a rattling pump, a spitting sputter. No music. Clean frame: no text, no recording dot, no timestamp, no on-screen graphics.
```

**Second family, Seedance 2.0 Mini.** The same changes in 30 to 100 words,
subject first, "already in motion from the first frame"; the phone look as
"handheld phone camera, warm ceiling light, unpolished".

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The "reality" looks as polished as the expectation | Phone style line, one imperfection, warm ceiling light, clutter named |
| A brand logo on the machine | "with no logo"; plain shapes |
| Coffee behaves like gel | Short action, "thin coffee sputters", one liquid event |
| The joke needs on-screen text | Move the text into the spoken line; captions show it |
| The format is a copy of one video | Change the concept, script, people and sound; keep only the beat pattern |

## 10. Policy guards

- Format, never a copy. No creator's face, voice, catchphrase or footage.
- No protected music; the user adds licensed platform sounds at posting.
- No real people, no copyrighted characters.
- No dangerous challenges, no mocking of groups or private individuals.
- Sketch characters reviewing products are labelled as a sketch; never a
  fake customer review.
