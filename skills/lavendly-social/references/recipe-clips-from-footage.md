# Recipe: podcast and long-video clips from imported footage

Cut the best moments of a podcast, interview, talk or long video into
vertical shorts, using the user's own footage. Worked example: a two-host
podcast episode; the clip is the moment one host tells how she lived in a
van for a year. The user's own footage replaces it.

## 1. Purpose, audience, ending

- Purpose: one complete thought, strong enough to stand alone, that sends
  viewers to the full episode.
- Audience: people who have never heard the show; they need the context in
  the clip itself.
- The ending is the strongest line of the moment (a punchline, a reveal, a
  verdict), cut right after it lands.

## 2. What Lavendly can and cannot do here

- The agent cannot watch or hear the source. It needs a transcript with
  timestamps (most podcast and recording tools export one) or the
  timecodes of the moments the user wants. Ask for it first.
- Import limits: `import_asset` takes video up to 3 minutes and 64 MB by
  url; bigger files (up to 300 MB) go through the Asset Library upload
  in the app; find it with `list_assets` (`type` video) and set the clip's
  `data.duration` from `metadata.duration_sec`. Long episodes are cut
  into parts of 3 minutes or less around the chosen moments before import.
- Imported footage placed as a ready clip costs no generation credits; the
  render is free.
- Cutting: `edit_clip` trim (source milliseconds), `split_clip` (seconds
  into the clip, not film time) to remove pauses and filler, the unwanted
  piece's node removed with `update_workflow` (clips play back to back, so
  no gap remains; `move_clip` sets the order), `edit_clip` crop to reframe
  16:9 to vertical.
- A film of one clip node applies the trim and the crop too: any picture
  edit other than volume and mute sends it through the full stitch.
- Captions: burned captions come only from a voiceover Lavendly
  synthesized. The speech in imported footage gets none from the MCP. Tell
  the user to switch on the platform's auto-captions when posting (TikTok,
  Reels and Shorts offer them) or caption in the app.
- There is no picture-only cutaway over continuing speech: a b-roll clip
  replaces the speaker's sound for its length. Put b-roll only in a natural
  pause between thoughts (about 1 s), or skip it.
- Speaker names and titles on screen are added by the user in the app.

## 3. Choosing the moment (score every candidate)

Score each candidate segment 0 to 100 on each axis, then weight:

| Axis | Weight | High when |
|---|---|---|
| Hook | 0.30 | The first sentence is bold, contrarian, a curiosity gap or a specific number |
| Standalone | 0.25 | No "as I said earlier", no pronoun without its person or thing |
| Emotion | 0.20 | Laughter, surprise, conflict, vulnerability |
| Value | 0.15 | A fact, a method or a story the viewer can retell |
| Payoff | 0.10 | It ends on a line that lands |

Keep segments that score 60 or more. Length that works: 15 to 55 s, best
around 25 to 40 s (claimed by one clipping tool, not measured by
Lavendly). Boosters: a specific number, a named place or thing, a personal
experience. Red flags: a slow start ("So, yeah, um"), an inside joke, a
reference to earlier in the episode.

## 4. Structures

### 6 s (one line)

| # | Time | Picture | Edit |
|---|---|---|---|
| 1 | 0 to 6 | The host's single quotable line, cropped vertical on her face | Trim to the line, 300 ms of air before and after; split once at a word gap so the film holds two pieces (one piece would ship untrimmed and uncropped) |

### 15 s (hook line, setup, payoff)

| # | Time | Picture | Edit |
|---|---|---|---|
| 1 | 0 to 2 | Payoff preview: the punchline, 2 s | A second node of the same source, trimmed to the punchline, placed first |
| 2 | 2 to 13 | The setup and the answer | Trimmed; pauses split out |
| 3 | 13 to 15 | The punchline again in context | The end of the segment |

### 30 s (question, answer arc, punchline)

| # | Time | Picture | Edit |
|---|---|---|---|
| 1 | 0 to 3 | The co-host's question, cropped on him | Trim |
| 2 | 3 to 15 | The answer, first half, cropped on her | Trim; two pauses split out |
| 3 | 15 to 16 | B-roll in a natural pause: the van at dawn (generated, 4 s trimmed to 1.2) | Optional |
| 4 | 16 to 27 | The answer, second half | Trim |
| 5 | 27 to 30 | The punchline and the co-host's laugh | Trim; end on the laugh |

### 45 to 55 s (a mini-story)

The 30 s shape with a longer middle; at most two b-roll beats, each in a
pause; a reaction shot of the listener (from the other camera angle or the
wide) every 10 to 15 s when the source has one.

## 5. Hook and payoff

- Hook options: start on the most quotable sentence (trim the lead-in), or
  a payoff preview (the punchline first for 2 s, then "here's how that
  happened" in the host's own words if they said it). Never add a voice
  that pretends to be a host.
- Payoff: the last line of the thought; cut within half a second after it.
  A laugh from the other host is a good out.

## 6. Picture

- Reframe: with x and y both 0, crop reframes to the shape w:h centred
  (`{ "x": 0, "y": 0, "w": 9, "h": 16 }`); for a speaker off centre, an
  exact pixel box (on a 1920x1080 source, w 608, h 1080, x where the
  speaker sits, never 0 for both). Check one frame per crop with
  `get_scene_frame`.
- Two-shot sources: switch the crop between speakers on split pieces (each
  piece its own crop) so the speaking face is in frame.
- 16:9 sources cropped to vertical lose sharpness (608 px wide); vertical or
  multi-camera sources are better; a 1:1 or 3:4 version loses less.
- Face in the upper half of the vertical frame; the bottom third will hold
  the platform's captions and buttons.

## 7. Sound

- The source's sound is the clip: every piece `native` at 1. Level-match
  pieces with `edit_clip` volume when one speaker is quieter.
- Remove "um", false starts and long pauses with splits, keeping 200 to
  300 ms of air so the cut does not clip a word.
- No music under speech. Optional: a 5 s original sting at the start at
  0.2 with ducking, or nothing.
- B-roll beats keep their own quiet native ambience (`mix` 0.3).

## 8. Models and credits

| Item | Credits |
|---|---|
| Imported clips, trims, splits, crops, render | 0 |
| A generated b-roll beat on Veo 3.1 Fast (4 s) with its opening image | 16 |
| The same on Seedance 2.0 Mini | 11 |
| A 15 s clip with no b-roll | 0 |
| A 30 s clip with one b-roll beat | 16 on Veo 3.1 Fast |

## 9. Prompt pairs for b-roll beats (Veo 3.1 Fast)

B-roll shows the concrete noun of the sentence it sits beside (a van, keys,
a road), never a metaphor that judges the speaker.

**Pair 1, the van at dawn.**

Still-frame prompt:

```text
Phone video still, handheld on a phone rear camera. An old white camper van with rust on the wheel arches is parked on a gravel pull-off above the sea at dawn, its side door open, a folded blanket on the step. Wide shot from a little behind, phone wide lens. Soft pink dawn light, mist over the water. No number plate visible, no lettering. Clean frame, no text.
```

Motion prompt:

```text
Phone video, one continuous take, unstabilised handheld phone camera. Wide shot. 0 to 4 s: mist drifts slowly across the water behind the van; the open door's curtain moves once in the breeze. Camera: handheld sway, no deliberate move. End state: the van and the sea as before, the mist further right. The van and the light stay exactly as in the opening frame. No person in frame. Ambient noise: distant waves, a gull. No music. Clean frame: no text, no recording dot, no timestamp, no on-screen graphics.
```

**Pair 2, the keys.**

Still-frame prompt:

```text
Phone video still, handheld. A hand holds a ring of three worn keys on a faded red fob above a small ceramic bowl on a wooden shelf by a door. Close-up, phone wide lens, shallow depth of field. Warm evening lamp light from the right. Clean frame, no text.
```

Motion prompt:

```text
Phone video, one continuous take, handheld. Close-up. 0 to 2 s: the hand opens and the keys drop into the bowl with a clatter, already in motion from the first frame. 2 to 4 s: the keys settle; the hand leaves frame. Camera: handheld sway. End state: the keys still in the bowl. The bowl, the shelf and the light stay exactly as in the opening frame. Exactly one hand. SFX: keys clattering into ceramic. No music. Clean frame: no text, no recording dot, no timestamp, no on-screen graphics.
```

**Second family, Seedance 2.0 Mini.** The same content as a production note;
4 s clips, 9 credits.

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| The clip makes no sense without the episode | Score standalone again; start earlier, or pick another moment |
| A word is clipped at a cut | Move the split 200 ms into the pause |
| The speaker drifts out of the crop | A new crop box on that piece; split where they move |
| B-roll silences the speaker mid-sentence | Move the b-roll into a pause or remove it |
| Loudness jumps between pieces | `edit_clip` volume on the quiet piece |
| No captions | Platform auto-captions at posting, or the app |
| Import refused | Asset Library upload, then `list_assets`; parts of 3 minutes or less |

## 11. Policy guards

- Only footage the user owns or has the rights to clip, and guests who
  agreed to appear; ask when unclear.
- Never change meaning: no splice that makes someone say what they did not
  say, no cut that removes a "not" or a qualifier.
- Never synthesize a host's or guest's voice or face, never add generated
  words to their mouths.
- Clips of other people's shows, talks or streams are not made without the
  owner's permission.
