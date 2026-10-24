# Recipe: talking-head creator and avatar presenter

A person speaking to camera: the creator format, the explainer host, the
LinkedIn thought piece, an AI avatar presenter. Worked example: a cooking
creator, Rosa, with a quick tip; and an AI host for a weekly series. The
user's own creator or host replaces them.

## 1. Purpose, audience, ending

- Purpose: a person the viewer trusts delivers one idea directly.
- Audience: followers of a creator, professionals on LinkedIn, learners.
  Faces hold attention; a face that looks wrong loses it at once.
- The ending is the point restated in one line to the lens, or a question
  to the viewer; never "like and subscribe".

## 2. What Lavendly can and cannot do (read before choosing a route)

- Lavendly cannot sync a generated face to an attached voice. There is no
  lip-sync route on the MCP.
- A native-audio model (Veo 3.1 Fast, Veo 3.1, Kling v3, Seedance) can
  speak a line written in the motion prompt, with mouth movement in the same
  clip. Reliable when: 4 to 8 s clips, medium close-up or closer, one face,
  locked camera, no head-turn instructions while speaking, one sentence,
  about 2 words per second of clip (8 s: 12 to 16 words). About 16 to 20
  English words per 15 s of on-camera speech is the reliable ceiling.
- The voice of a native clip varies a little from clip to clip; keep the
  delivery words identical in every prompt.
- Native speech gets no burned captions (no word timings); the platform's
  auto-captions cover it.
- HeyGen Video 1 on Lavendly is a people-centric general video model, not
  an avatar lip-sync tool: 5 to 15 s, six shapes including 9:16, 7 credits
  per 5 s at 768p, and silent (the flag and the app say no sound; plan for
  silence and check the first clip with `quality_check` and `expect_audio`).
  Its people move naturally; their mouths are not synced to anything you
  attach.

## 3. Two routes

| Route | When | How | Captions |
|---|---|---|---|
| A. Spoken on camera | The person must be seen saying the words; short scripts; English or the five Kling languages | Native-audio model, one sentence per 4 to 8 s clip, jump cuts between takes, b-roll with native sound between lines | Platform auto-captions |
| B. Presenter with voiceover | Longer scripts, exact wording, burned captions, cheapest | A silent presenter who acts (demonstrates, reacts, gestures, nods, lips closed) and b-roll; the voice is a synthesized voiceover from 0.0 s | Burned from the voiceover |

Never show a mouth moving out of sync with a voice: in route B the
presenter's lips stay closed whenever the voice plays over them, or the
mouth is out of frame (hands, profile, back, b-roll).

## 4. Structures

### Route A (9:16, Veo 3.1 Fast, jump-cut takes)

Character block: "Rosa, a cook in her forties with short curly black hair,
small gold hoop earrings, a mustard linen apron over a white t-shirt".

| Length | Shots | Words on camera |
|---|---|---|
| 6 s | 1 take, 8 s, trimmed to 6: medium close-up, locked, one sentence | 10 to 12 |
| 15 s | Take 1 (8 s, trim 5) hook line; b-roll insert (4 s, trim 3) native sizzle; take 2 (8 s, trim 6) payoff line; closing frame (from take 2) | 16 to 20 |
| 30 s | Hook take; b-roll; take 2; b-roll; take 3; b-roll; payoff take (4 takes of 8 s, 3 inserts of 4 s) | 36 to 44 |
| 60 s | 8 takes and 6 inserts; offer route B instead (more words, burned captions) | 75 to 90 |

15 s table:

| # | Time | Shot | Lens | Move | Picture | Gen | Line |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 5 | Medium close-up, eye level, into the lens | 50mm feel | Locked | Rosa holds up a lemon and speaks | 8, trim 5 | "Stop squeezing lemons like this." (5) |
| 2 | 5 to 8 | Insert, top-down | Macro | Locked | A lemon rolled hard under a palm on a board | 4, trim 3 | native: board creak |
| 3 | 8 to 14 | Medium close-up | 50mm | Locked | Rosa squeezes, juice pours, she speaks | 8, trim 6 | "Roll it first, and you get twice the juice." (9) |
| 4 | 14 to 15 | Same take | | | She raises an eyebrow, end frame | from 3 | none |

### Route B (9:16 or 1:1, HeyGen Video 1 presenter plus b-roll)

| # | Time | Shot | Picture | Gen | Voice line (words) |
|---|---|---|---|---|---|
| 1 | 0 to 4 | Medium close-up, presenter | Rosa holds up a lemon toward the lens, lips closed, eyebrows raised | 5, trim 4 | 9 hook |
| 2 | 4 to 8 | Insert, top-down b-roll | Lemon rolled under a palm | 5, trim 4 | 10 step |
| 3 | 8 to 12 | Medium, presenter | Rosa squeezes the lemon over a bowl, juice running | 5, trim 4 | 10 result |
| 4 | 12 to 15 | Close-up, presenter | She nods once at the lens, lips closed, a half smile | 5, trim 3 | 6 payoff |

30 s: 8 clips alternating presenter and b-roll, about 70 words; 60 s: 15
clips, about 140 words. The presenter never speaks; she shows.

## 5. Hook and payoff

- Hook: the presenter already mid-gesture at frame 0 with the claim (route
  A spoken in the clip; route B in the voice from 0.0 s). "Stop <common
  habit>." "Here is why <surprising result>."
- Payoff: the result in her hands and one line; held 1.5 s.

## 6. Camera, light, colour

- "Medium close-up at eye level, 50mm look, shallow depth of field, she
  looks straight into the lens"; face in the upper middle of the vertical
  frame. Locked camera on every speaking take.
- Creator light: "soft key light at 45 degrees from the left, a warm
  practical lamp in the background, background a stop darker than the
  face". Native phone look instead: "Phone video, filmed at arm's length on
  a phone front camera, kitchen window light".
- One set for the series: the same 3 props in the same places in every
  still prompt.
- Avatar series: a reference sheet (face close-up on grey, outfit) wired as
  references on Seedance 2.0 Fast or Wan 2.7 when the presenter recurs;
  HeyGen and Veo take two references.

## 7. Sound

- Route A: native speech; clips `native` at 1; b-roll `native` (the
  sizzle) or `mix` 0.6. Bed at 0.15 or none: under live speech any music
  fights the voice.
- Route B: voiceover with the whole script on clip 1, `tiktok` or `reels`
  captions (`caption` on LinkedIn); presenter clips are silent, b-roll
  `mix` 0.3; bed 0.25 with ducking: "Warm acoustic guitar and soft shaker
  at about 100 BPM, light and steady, a pause on the payoff."
- Voice names for route B: sarah, matilda, lily, alice (warm female); will,
  chris, brian, roger (male); confirm by ear in the app.

## 8. Models and credits

| Pick | Model | Why | 15 s | 30 s |
|---|---|---|---|---|
| Route A | Veo 3.1 Fast | Natural English speech and faces | 2 takes of 8 s and 1 insert: 70 + 6 + 2 = 78 | 4 takes and 3 inserts: 154 + 14 + 3 = 171 |
| Route A, other languages | Kling v3 Pro | Speech in Chinese, English, Japanese, Korean, Spanish | 3 clips of 5 s: 60 + 6 + 2 = 68 | 7 clips: 140 + 14 + 3 = 157 |
| Route B | HeyGen Video 1 plus Seedance 2.0 Mini b-roll | Cheapest people shots, silent, burned captions | 2 x 7 + 2 x 9 = 32 + 8 + 3 = 43 | 8 clips: 64 + 16 + 4 = 84 |
| Recurring avatar | Seedance 2.0 Fast | 4 references hold the face and outfit | 5 clips: 55 + 10 + 3 = 68 | 134 |

## 9. Prompt pairs

**Pair 1, route A, Veo 3.1 Fast (the hook take).**

Still-frame prompt:

```text
Creator studio video, soft key light. Rosa, a cook in her forties with short curly black hair, small gold hoop earrings and a mustard linen apron over a white t-shirt, stands at a wooden kitchen counter holding up one lemon beside her face, looking straight into the lens. Medium close-up at eye level, 50mm look, shallow depth of field, her face in the upper middle of the frame. Soft key from the left, a warm lamp behind. Clean frame, no text.
```

Motion prompt:

```text
Creator studio video, soft key light, one continuous take. Medium close-up, eye level. 0 to 1 s: Rosa holds the lemon still and looks into the lens. 1 to 4 s: she says, warm and quick, slightly husky: "Stop squeezing lemons like this." (no subtitles) 4 to 8 s: she gives the lemon a small shake and holds it. Camera: locked-off, no movement. End state: the lemon held beside her face, her eyebrows raised. Rosa, the counter and the light stay exactly as in the opening frame. Exactly one person in frame. Ambient noise: quiet kitchen room tone. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Pair 2, route B, HeyGen Video 1 (the silent presenter beat).**

Still-frame prompt:

```text
Creator studio video, soft key light. Rosa, a cook in her forties with short curly black hair, small gold hoop earrings and a mustard linen apron over a white t-shirt, stands at a wooden counter with a cut lemon in her right hand above a white bowl, looking down at the bowl. Medium shot at eye level, 50mm look, her face in the upper middle of the frame. Soft key from the left, a warm lamp behind. Clean frame, no text.
```

Motion prompt:

```text
Creator studio video, one continuous take. Medium shot. Rosa squeezes the lemon hard over the bowl; juice runs into it in a steady stream for two seconds. Then she looks up at the lens and nods once, lips closed, a small half smile. Camera: locked-off. End state: Rosa looking into the lens, lemon squeezed, lips closed. Rosa, the counter and the light stay as in the opening frame. Exactly one person.
```

**Second family, Kling v3 Pro for route A in Spanish.**

```text
A wooden kitchen counter in soft key light. Rosa, a cook in her forties with short curly black hair, gold hoops and a mustard apron, holds up a lemon and looks into the lens. [Rosa, warm quick voice]: "Deja de exprimir los limones así." She shakes the lemon once. Camera: locked, medium close-up. Audio: quiet kitchen room tone, no music.
```

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| Mouth movement in route B under the voice | "lips closed" and a non-speaking action; frame the mouth out; re-roll |
| Lip sync drift in route A | Shorter line, locked camera, medium close-up, one face; split over two takes |
| The same hand gesture in every take | Name a different gesture per take ("the left hand opens on the second word") |
| Waxy, airbrushed skin | "natural skin texture, fine lines visible, real pores" in the still prompt; soft key, not beauty light |
| Eyes that do not blink or look dead | Short takes, "she blinks naturally", a reaction beat after the line |
| Voice timbre jumps between takes | Identical delivery words; fewer takes; or route B |
| Burned subtitles from the model | "(no subtitles)" after every line; clean-frame line |
| The presenter changes between clips | The character block verbatim; references on Seedance or Wan |

## 11. Policy guards

- An AI presenter is a character. Never present them as a real person, a
  real expert, a doctor, a lawyer, a financial adviser, a customer or a
  witness; never claim credentials they do not have.
- No real person's likeness or voice, no cloned creator, no voice clone
  without the owner's consent (a cloned voice in the account is usable
  only by its owner).
- No testimonials from AI people: "I used this and it fixed my skin" from a
  generated face is never made.
- The post caption says the presenter is AI-generated; lavendly-publish
  adds the platform label.
