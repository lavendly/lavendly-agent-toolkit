# Recipe: app and SaaS promo

Mobile apps, web tools, B2B software, AI products. The sale is what the
user's life looks like after the tool did its job. Video models garble
interface text and invent screens, so the generated shots show people,
hands, reactions and outcomes in the world; the screen is out of frame,
turned away, or a soft glow. The real interface appears only from the
user's own screen recording.

## 1. Purpose and ending

- Audience: prospects on LinkedIn, Meta, TikTok, YouTube; app store
  previews (with the store's own rules); landing pages.
- The viewer should recognise their problem, see the relief, and know the
  next step.
- The ending: the person back in their day, the outcome visible, the call
  to action spoken ("Try it free this week."), space for the logo and the
  store badges the user adds in the app.

## 2. Showing the product honestly

| Option | How on Lavendly | When |
|---|---|---|
| No interface | people, hands, reactions, physical outcomes; screens dark, away or a glow | default for every generated shot |
| The real interface | the user's screen recording (`import_asset` with kind video, up to 64 MB by url and 3 minutes), placed in the film as its own clip between generated scenes | when the feature must be seen |
| Phone in hand, screen as glow | "the phone screen faces away from the camera; a soft cool glow lights her face" | reaction shots |
| A laptop from behind | "the laptop seen from behind, its lid toward camera, plain and unmarked" | work scenes |

An imported video becomes a clip through `update_workflow`: add a
videoGenerator node with `data.video_url` set to the hosted url and
`data.duration` set to its length, in scene order. It costs no generation
credits; never call `generate_scene` on that node (it would regenerate over
the recording). Trim it with `edit_clip`.

## 3. Structure by length

Gen is the length to generate on Veo (4 s); on Kling generate 5. No
packshot: every scene has a text-made opening image.

**6 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | medium close-up, 50mm | locked-off | hook: a frazzled freelancer at a cluttered desk, three sticky notes fall off the monitor edge | 3 | 4 |
| 2 | 3 to 6 | medium close-up, 50mm | slow push-in | she taps her phone once, screen away; her shoulders drop; "Try it free." | 3 | 4 |

**15 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | medium close-up, 50mm | locked-off | hook: the problem: sticky notes fall off a monitor edge, she sighs | 3 | 4 |
| 2 | 3 to 6 | close-up of hands, 85mm | locked-off | her thumb taps the phone, screen facing away, a soft glow on her fingers | 3 | 4 |
| 3 | 6 to 9 | close-up, 85mm | slow push-in | relief: her face in the screen glow, a slow breath out, a small smile | 3 | 4 |
| 4 | 9 to 12 | medium, 35mm | locked-off | the outcome in the world: she closes the laptop and pulls on her coat at five o'clock light | 3 | 4 |
| 5 | 12 to 15 | wide, 35mm | locked-off | she walks out into the evening street, call to action | 3 | 4 |

**30 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 4 | medium close-up, 50mm | locked-off | hook: the problem, sticky notes fall | 4 | 4 |
| 2 | 4 to 8 | wide, 24mm | slow push-in | the context: a small studio office at night, one desk lamp, piles of paper | 4 | 4 |
| 3 | 8 to 12 | close-up, 85mm | locked-off | her phone buzzes face down on the desk; she turns it over, screen away from camera | 4 | 4 |
| 4 | 12 to 15.5 | close-up of hands, 85mm | locked-off | a thumb taps once; the glow changes colour on her fingers | 3.5 | 4 |
| 5 | 15.5 to 19 | close-up, 85mm | slow push-in | relief: a breath out, a small smile | 3.5 | 4 |
| 6 | 19 to 23 | insert, top-down, 50mm | locked-off | she peels the sticky notes off the desk and drops them in the bin | 4 | 4 |
| 7 | 23 to 26.5 | medium, 35mm | locked-off | the next morning, a calm tidy desk, coffee, she starts work smiling | 3.5 | 4 |
| 8 | 26.5 to 30 | wide, 35mm | locked-off | she leaves for a walk at lunch, call to action | 3.5 | 4 |

**60 s**: a day in three acts: chaos (four shots), the switch (three
shots, the real recording dropped in by the user when wanted), the new day
(five shots: tidy desk, a call with a smile, a walk, dinner on time, the
call to action). 12 to 14 shots.

## 4. Hook and payoff

- Hook: the problem the viewer has, shown physically (notes falling, a
  phone buzzing face down for the tenth time, a calendar printout covered
  in crossings), in frame 1.
- Payoff: the physical outcome (the desk clear, the person leaving on
  time, the parcel on the doorstep), not a screen.

## 5. Camera, light, colour

- Camera: 50mm medium close-ups for people, 85mm for hands and faces in
  screen glow, 35mm for rooms and outcomes; locked-off for reactions; slow
  push-ins on relief. Screens never centred toward the lens.
- Light: "the cool glow of a phone screen facing away lighting her face
  from below", "one warm desk lamp, the rest of the office in blue night",
  for the after "soft morning window light, a bright tidy room".
- Colour: cool and cluttered for the problem, warm and clean for the after:
  the grade carries the change ("Palette: cold blue, grey, paper white"
  then "warm white, oak, soft green").

## 6. Sound

- Native: phone buzz, keyboard, paper, a door, street ambience.
- Narration: 6 s 10 to 13 words; 15 s 28 to 32; 30 s 60 to 68; 60 s 120 to
  135. Second person, the problem in their words, one feature in plain
  words, the call to action. No jargon, no invented numbers.
- Score: "Light electronic pop around 112 BPM, plucked synth and claps.
  Opens tense and sparse under the problem, brightens on the tap, full and
  warm under the outcome, ends on a short button." Instrumental.
- Mix: problem clips `mix` 0.4 (the buzz under the voice); the tap clip
  `native` 1 for the haptic buzz if no narration sits on it; score 0.35
  with ducking.

## 7. Models on Lavendly

| Role | Model | Why | 15 s (5 shots) | 30 s (8 shots) |
|---|---|---|---|---|
| Best | Veo 3.1 | faces and small reactions, room sound, 1080p | 248 | 396 |
| Value | Veo 3.1 Fast | same, cheaper | 83 | 132 |
| Draft | Veo 3.1 Lite | timing check | 63 | 100 |
| 1:1 for LinkedIn | Kling v3 Standard | square, good people and hands, sound, 720p | 88 | 140 |

Totals: clips at 4 s (Veo) or 5 s (Kling), every scene with a 2 credit
opening image, score 2 or 3, voice 1.

## 8. Prompt pairs (Veo)

**Pair 1: the problem**

Still:

```text
Natural-light office photograph. Medium close-up, 50mm lens, eye level. A woman in her thirties with short grey-streaked hair and a navy cardigan sits at a cluttered desk at night, the back of a plain unmarked monitor toward camera with a row of yellow sticky notes stuck along its top edge. One warm desk lamp, the rest of the room cool blue. Palette: cold blue, grey, paper yellow. No text on the notes, no logo.
```

Motion:

```text
Locked-off camera. 0 to 2 s: three of the yellow sticky notes peel off the monitor edge one after another and flutter down onto the desk. 2 to 4 s: she watches them fall, closes her eyes and lets out a long sigh. Her face, the desk and the lamp light stay exactly as in the opening frame. Exactly one woman, three falling notes. SFX: soft paper flutter. Ambient noise: a quiet office at night, a distant hum. No music. Clean frame, no text.
```

**Pair 2: relief in the screen glow**

Still:

```text
Natural-light office photograph. Close-up, 85mm lens, shallow focus. The same woman with short grey-streaked hair and a navy cardigan holds a phone in both hands at chest height, its screen facing away from the camera, a soft cool glow lighting her face from below. Warm desk lamp behind her out of focus. Palette: cool white glow, navy, warm amber. No text, no visible screen.
```

Motion:

```text
Slow push-in toward her face over the whole shot. 0 to 2 s: her thumb taps the phone once and the glow on her face shifts from cold blue to a softer warm white. 2 to 4 s: she breathes out slowly and a small smile appears. The phone screen stays facing away from the camera. Her face and the light stay exactly as in the opening frame except the glow colour. Exactly one woman. SFX: a single soft phone tap. Ambient noise: quiet room. No music. Clean frame, no text.
```

**Pair 3: the outcome in the world**

Still:

```text
Natural-light photograph. Wide shot, 35mm lens, eye level. The same woman in a camel coat and navy cardigan steps out of a glass office door onto an evening street at golden hour, a canvas bag on her shoulder, warm low sun from the end of the street. Palette: gold, navy, camel. No text, no signs, no logos.
```

Motion:

```text
Locked-off camera. She walks out of the door and down the street away from camera at an easy pace, four steps, then turns her head to look at the sunset. The street and the light stay exactly as in the opening frame. Exactly one woman in focus; distant passers-by stay soft. Ambient noise: evening street, a bicycle bell far off. No music. Clean frame, no text, no signs.
```

**Second family (Kling v3 Standard).** "From the opening frame" anchor,
plain verbs, one keep line ("the phone screen stays facing away"), a short
"Sound:" line; 1:1 for LinkedIn feed, 720p.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| A screen shows invented UI | turn it away or switch it off in both prompts; never describe what is on it |
| Words appear on sticky notes or paper | "blank yellow sticky notes", "plain paper"; no words |
| The monitor or laptop shows a logo | "plain unmarked monitor", "unmarked laptop lid" |
| Typing hands melt into keys | show hands resting or tapping once, not typing in close-up |
| Generic "team smiling at a laptop" | a specific task and prop: "she peels the notes off and drops them in the bin" |
| The imported recording does not play in the film | it must be a videoGenerator node with `data.video_url`; a still never plays as a clip |

## 10. Policy guards

- Show the product honestly: no screen the app does not have, no feature it
  does not ship, no invented dashboards or numbers.
- No ratings, download counts, awards, customer logos or testimonials
  unless the user gives them with their source.
- AI people are actors; no first-person "this saved me ten hours" lines.
- App store previews follow the store's own rules (real app footage);
  say so when the user names a store.
