# Recipe: live-session look

## 1. Purpose, audience, ending

- Purpose: the feel of a band playing the song in one room, caught by two or
  three cameras: intimate, warm, honest. A session video, a stripped-back
  version, a "live in the studio" release.
- Audience: fans who want the musicians, not a story; acoustic and indie
  audiences; channels that post sessions.
- The ending: the last chord rings out in the room and the band holds still;
  a glance between two musicians; the room lights.

## 2. The look and its limits

- One room, one light, the band in fixed positions for the whole video:
  strict continuity. Write the room and the positions once and paste them
  into every prompt: "a small wooden studio room; the singer with an acoustic
  guitar centre, the cellist left, the pianist right at an upright piano".
- Two or three "cameras": a locked-off wide, a handheld camera roaming close,
  a long lens catching hands and faces from the corner. Cut between them on
  bars as an editor would cut a multicam session.
- No lip sync: the singer is framed from the side, from behind, in the wide,
  or between lines with eyes closed; the camera favours the instrumentalists
  and hands.
- Instruments are where models fail: string counts, bent necks, piano keys,
  fingers. Count the parts, keep fingering hands in medium shots or soft
  focus, and never hold a close-up on a fretboard.
- The one-take feel: a single 20 to 30 s continuous generation (Wan 3.0,
  Seedance 2.5) of the wide, intercut with shorter handheld pieces.

## 3. Structures by length

At 90 BPM (1 bar = 2667 ms), a typical session tempo. Model lengths for Kling
v3 Pro (5 s, 10 s, 15 s).

### 6 s: the room (2 bars and a beat)

| Slot | Size, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Wide, 35mm, locked | locked-off | The band in the room, the singer's head bowed, the first chord | 6 s | 10 s |

### 15 s: wide, hands, faces

| Slot | Bars | Size, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 2 | Wide, 35mm | locked-off | The band playing, warm lamps | 10 s, trimmed to 5.3 s |
| 2 | 3 | Medium, 85mm, from the corner | locked-off | The cellist's bow arm, her face soft behind | 5 s |
| 3 | 4 | Medium close-up, 50mm | handheld, subtle sway | The singer in profile, eyes closed | 5 s |
| 4 | 5 to 6 | Wide, 35mm | locked-off | The band, the singer lifts his head | 10 s, trimmed to 5.3 s |

### 30 s: verse and chorus (about 11 bars at 90 BPM)

| Section | Shots | Cameras |
|---|---|---|
| Verse | 4 shots of 2 bars: wide, cello hands, piano from behind, singer in profile | Wide locked, long lens |
| Chorus | 4 to 5 shots of 1 to 2 bars: handheld moving round the singer's back, the band wide, a glance between cellist and pianist, the wide held | Handheld enters on the chorus |

About 7 clips, or one 30 s single take of the wide plus four handheld clips
cut into it.

### 60 s: a full section of the song

The 30 s structure twice, with the second chorus covered from the opposite
corner of the room (keep the band's positions; only the camera moves) and a
final held wide. About 13 clips, or two 30 s takes of the wide plus six
handheld clips.

### 90 s: a session edit

Intro (the room before playing: a cough, a count-in gesture, `native` room
sound before the song starts), two verses, two choruses, an outro where the
last chord rings and the band holds still. About 18 clips.

## 4. Hook and payoff

- Hook: the first chord in the wide, or a close shot of a hand on the strings
  on the downbeat; a cold open of room sound before the song is the classic
  session start.
- Payoff: the last chord ringing, the band still, a shared glance; the wide
  held until the sound dies.

## 5. Camera, light, colour

- Wide locked-off at chest height; handheld with subtle sway close to the
  musicians; 85mm from the corner for hands and faces, shallow focus.
- Light: practical lamps in the room (warm bulbs, a standard lamp), a window
  with daylight, string lights; one key per scene, no coloured gels.
- Colour: warm, natural, slightly soft; 16mm grain or clean digital,
  chosen once.

Exact phrases that work:

- "a small wooden studio room with rugs, warm standard lamps, daylight from one window on the left"
- "the singer centre with an acoustic six-string guitar, straight neck"
- "an upright piano with its lid closed, the pianist seen from behind"
- "the cellist's bow arm moves slowly and smoothly; her left hand soft in the background focus"
- "handheld camera with subtle natural sway, moving slowly behind the singer"

## 6. Sound plan

- The song once, volume 1, `ducking` false; clips `off`, except room tone at
  `mix` 0.2 to 0.3 on the wides if the session should feel live
  ([one-track-rule.md](one-track-rule.md)). Never the clips' generated
  instruments.
- A cold open before the song (a breath, a chair creak, the count-in
  gesture) with `native` sound; the song's `startTime` moved after it with
  `update_track`.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Kling v3 Pro | Human motion and hands from a still; holds positions |
| One-take wide | Wan 3.0 | Up to 30 s continuous with sound (set `off` or `mix`) |
| One-take wide, more references | Seedance 2.5 | Up to 30 s, 4 references, 720p |
| Value with references | Seedance 2.0 Fast | 4 references (singer, room, two players), 11 per 5 s |
| Draft | Seedance 2.0 Mini | 9 per 5 s |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (2 x 10 s, 2 x 5 s) | 30 s (7 clips of 5 s; on Wan 3.0 one 30 s take plus 4 x 5 s) |
|---|---|---|
| Kling v3 Pro | 2 x 40 + 2 x 20 = 120, plus 8 | 7 clips of 5 s = 140, plus 14 |
| Seedance 2.0 Fast | 2 x 22 + 2 x 11 = 66, plus 8 | 7 x 11 = 77, plus 14 |
| Wan 3.0 | 2 x 48 + 2 x 24 = 144, plus 8 | one 30 s take 144 plus 4 x 24 = 240, plus 10 |

## 8. Prompt pairs

### Pair 1: the room (Kling v3 Pro, wide)

Still frame:

```text
Music video frame, small wooden studio room, warm standard lamps, daylight from one window on the left. Wide shot, eye level, 35mm lens. Three musicians: the singer centre, a bearded man in a grey wool jumper with an acoustic six-string guitar; a cellist left, a woman with a short dark bob in a mustard cardigan; a pianist right at an upright piano, seen from behind. Rugs on the floor. Palette: warm wood, mustard, grey. No text, no letters, no logos.
```

Motion:

```text
Scene: a small wooden studio room, warm lamps, daylight from the left window. Characters: the singer centre with the guitar, the cellist left, the pianist right at the upright piano, all in fixed positions. Action: they play softly; the cellist's bow moves slowly; the singer's head is bowed, then at 3 s he lifts it and closes his eyes. Camera: static, eye level. Audio: silent, no music generated. The room, the three musicians and the light stay exactly as in the opening frame. Exactly three people in frame, nobody else. Clean frame: no text, no logos on the instruments.
```

### Pair 2: the long take (Wan 3.0, 30 s)

Still frame:

```text
Music video frame, small wooden studio room, warm standard lamps. Medium shot, 35mm lens, from behind the singer's left shoulder: the singer in a grey wool jumper playing an acoustic six-string guitar, the cellist in a mustard cardigan facing him across the room, an upright piano at the right edge. Daylight from a window on the left. Palette: warm wood, mustard, grey. No text, no letters, no logos.
```

Motion:

```text
One continuous handheld take with subtle natural sway: the camera moves slowly from behind the singer's left shoulder, around the room at walking pace, past the cellist, to a wide view of all three musicians, and stops there. The musicians keep playing softly in fixed positions; nobody walks. Medium shot to wide shot, practical light, warm tone. The room, the three musicians and the light stay the same throughout. Exactly three people, nobody else. Sound: room tone. Clean frame: no text, no logos.
```

Set this clip `mix` at 0.2 so the room breathes under the song; never `native`
at full level.

Second family notes: on Seedance give the four references one job each
(singer's face, cellist's face, the room, a style plate) and say "ignore
their poses".

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Guitar necks bend, extra strings, melted keys | Count the parts; medium shots; hands in soft focus; no fretboard close-ups |
| A musician moves to another spot | The positions sentence in every prompt; strict continuity |
| A fourth musician appears | The count line; the room described as empty around them |
| The singer's mouth does not match | Profile, behind, eyes closed between lines; never a singing close-up held |
| The long take drifts or warps late | Trim to the clean part; Seedance 2.5 or Wan 3.0 at 15 to 20 s instead of 30 |
| Generated instruments heard in the mix | `off`, or `mix` low on a clip asked for room tone only |

## 10. Policy guards

- The user's own band or fictional musicians; never a real artist's
  likeness.
- No instrument, amp or studio brand names or logos.
