# Prompt anchors: social

The two prompts every shot needs, the lines that make them work in short
form, each model family's dialect, and the words to avoid.

## 1. The two prompts

Every scene animates its own opening image, made from text alone on the
MCP path. The still-frame prompt carries the full description; the motion
prompt carries only the change.

### Still-frame prompt (image model, 500 characters at most)

```text
<style line>. <subject with its locked description>, <pose and where they look>, <where they are, 3 to 6 specific things around them>. <shot size, angle, lens or device feel>. <light as the place has it>. <vertical placement: subject in the upper middle, bottom third plain>. Clean frame, no text.
```

Subject in the first 15 words; the start of the action, never the payoff;
every surface that could carry writing named blank.

### Motion prompt (the clip)

```text
<style line>, one continuous take. <shot size>. 0 to N s: <the first change, already in motion from the first frame>. N to M s: <the next change, ending in a state>. Camera: <one move, or handheld sway with no deliberate move, or locked-off>. End state: <one line>. <lock sentence>. <exact count>. <Sound line>. No music. Clean frame: no text, no recording dot, no battery icon, no timestamp, no on-screen graphics.
```

## 2. Lines to reuse

| Purpose | Line |
|---|---|
| Lock | "<Name>, the room and the light stay exactly as in the opening frame." |
| Count | "Exactly one person in frame, nobody else, no copy of her." |
| Not posed | "She looks at the <object>, not at the camera." |
| To the lens (selfie, talking head) | "She looks straight into the lens." |
| Silent presenter | "Her lips stay closed; she listens, nods once and gestures with her right hand." |
| Already moving | "already in motion from the first frame" |
| Vertical placement | "her face in the upper middle of the frame, the lower third plain floor" |
| Centre square | "the subject centred, inside the middle square of the frame" |
| Phone camera | "unstabilised handheld phone camera, colour straight from the phone" |
| No music in clip | "No music." |
| Clean phone frame | "Clean frame: no text, no recording dot, no battery icon, no timestamp, no on-screen graphics." |
| Reference roles | Example, for Luca, a gear reviewer in his twenties: "Reference 1 is Luca's face only, from the close-up; ignore its background. Reference 2 is his grey hoodie only." |
| Destination | "the sock lands in the basket and stays there" |
| Ending on a beat | "she freezes mid-shrug for the last second" |

## 3. Style lines for social (one per video, first in both prompts)

| Look | Style line |
|---|---|
| Native phone, selfie | "Phone video, filmed at arm's length on a phone front camera" |
| Native phone, rear | "Phone video, handheld on a phone rear camera" |
| POV | "First-person view, head-height, hands at the bottom of the frame" |
| Creator studio (polished talking head) | "Creator studio video, soft key light, clean home-office set" |
| Faceless b-roll | "Clean vertical b-roll, soft natural light" |
| Deadpan reaction | "Static phone shot propped on a shelf, flat room light" |
| Action camera | "Head-mounted action camera, very wide fisheye" |
| Retro home video | "2008 pocket camcorder video, soft and noisy in low light" |

## 4. Speech in a clip

Lavendly does not sync a face to an attached voice. A line spoken on camera
is written into the motion prompt of a native-audio model and the clip
stays `native`.

- One line per clip, 4 to 8 s clips, medium close-up, one face, locked
  camera, no head-turn instructions while speaking.
- About 2 words per second of clip at most: 8 s holds 12 to 16 words.
- Veo 3.1 Fast, for instance: `Luca looks into the lens and says, warm and quick: "Okay, I tried the forty-dollar pan." (no subtitles)` then the action after the line.
- Kling v3, for instance: `[Luca, warm quick voice]: "Okay, I tried the forty-dollar pan."`; label every speaker the same way in every clip; for Chinese, English, Japanese, Korean or Spanish lines.
- The voice changes a little between clips. Keep the delivery words
  identical in every clip ("warm and quick, slightly husky") and keep the
  number of speaking clips small.
- Burned captions do not exist for native speech (no word timings); the
  platform's auto-captions cover it.

## 5. Dialects by model family

Never write the model name, duration or aspect in a prompt.

- **Veo 3.1 (Fast, Lite):** shot and camera first, then subject, action,
  context, style and ambience; `SFX:` and `Ambient noise:` labels; quoted
  speech followed by "(no subtitles)"; exclusions as presence.
- **Seedance (Mini, Fast, 2.0):** 30 to 100 words, subject first; most
  motion happens in the first two seconds, so write the action "already in
  motion from the first frame"; timed beats as a production note
  (STARTING STATE, TIMELINE, CAMERA, AUDIO, ENDING STATE).
- **Wan 2.7:** image to video is motion plus camera only; literal look
  words ("handheld, natural light, warm colour tone") hold the phone look.
- **Kling v3:** scene, subject, action, camera, audio in plain sentences;
  labelled speakers; plain verbs (push in, pan left).
- **HeyGen Video 1:** people-centric and silent: describe the presenter's
  behaviour (posture, gesture, gaze, a nod) and the set; no speech; lips
  closed or turned away when a voice is attached.
- **Hailuo 3 Max:** silent; one bracket camera command after the action
  (`[Static shot]`, `[Push in]`, `[Pan left]`).

## 6. Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the device and the move: "phone rear camera, handheld" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic | the thing: "steam rising off the mug in window light" |
| masterpiece, award-winning, trending, viral | delete |
| 8k, 4k, ultra realistic, hyperrealistic, highly detailed, photorealistic | delete; name the texture |
| dynamic, energetic, dramatic, insane, mind-blowing | the motion: "she spins once and stops facing the lens" |
| vibe, aesthetic, vibrant | the light and colour: "warm lamp, cool window, muted pastels" |

State constraints positively: "locked-off camera", "the room empty except
the couch", "one person in frame".
