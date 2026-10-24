# Recipe: performance video

## 1. Purpose, audience, ending

- Purpose: the artist and the song as one image. The viewer should know who
  sings, what the song feels like, and remember one signature picture.
- Audience: fans, new listeners on Shorts, Reels and TikTok, a premiere on
  YouTube.
- The ending: the last section visually resolved: the artist's signature
  pose or image held to the last hit, rhyming with the first frame.

## 2. Performance without lip sync

Lavendly cannot sync a mouth to the user's vocal. A performance video is
built from shots where the mouth does not need to match:

| Shot | How it reads as singing |
|---|---|
| Back-lit silhouette, wide | The body and the breath carry the line |
| Back view, facing a light or a crowd-free void | The artist "sings" into the space |
| Profile with the microphone across the mouth | Mouth hidden, jaw and throat move |
| Eyes closed between lines, close-up | The feeling, not the words |
| Extreme close-up on the eyes only | Intensity without a mouth |
| Hands: the microphone grip, a hand reaching on the hook | The gesture lands on the key word |
| Hair and fabric moving in wind or haze | Energy on the chorus |
| The breath before the line, mouth closed, chest rising | The moment before the vocal |
| Walking toward the lens, head down, then up on the downbeat | A chorus entrance |

A close-up of a singing mouth is at most one beat in the cut. Write it as
"singing, mouth open on a held note" and accept that the shape is generic.

## 3. Structures by length

Cut lists at 128 BPM (1 bar = 1875 ms) for 6 to 30 s and 120 BPM (1 bar =
2000 ms) for 60 and 90 s; scale with [beat-maths.md](beat-maths.md). Model
lengths for Seedance 2.0 Fast (5 s or 10 s). "Take A" is one 10 s
performance clip split into pieces.

### 6 s: the hook (120 BPM, 3 bars)

| Slot | Bars | Size, angle, lens | Move | Action | Source |
|---|---|---|---|---|---|
| 1 | 1 | Wide, low angle, 24mm | locked-off | Silhouette in haze, arms rising on the downbeat | Clip 1, 5 s |
| 2 | 2 | Two half-bar pieces | per piece | Hair whipping, a hand closing on the mic stand | Clip 2, 5 s, split |
| 3 | 3 | Extreme close-up, eyes, 85mm | slow push-in | Eyes open on the hook word | Clip 3, 5 s |

### 15 s: the chorus clip (128 BPM, 8 bars)

| Slot | Bars | Size, angle, lens | Move | Action | Source |
|---|---|---|---|---|---|
| 1 | 1 | Wide, back-lit, 24mm | locked-off | Silhouette steps forward into the light | Take A, piece 1 |
| 2 | 2 | Insert, 100mm | locked-off | The motif: a silver ribbon lifting in the wind | Clip 2, 5 s |
| 3 | 3 to 4 | Medium close-up, 50mm | slow orbit left to right | Profile, mic across the mouth, eyes closed | Clip 3, 5 s |
| 4 | 5 | Medium, 35mm | locked-off | Facing the lens, one hand reaching out on the downbeat | Take A, piece 2 |
| 5 | 6 | Four half-bar pieces | per piece | Burst: hair, hand, light flare, eyes | Clip 4, 5 s, split in four |
| 6 | 7 to 8 | Wide, 24mm | locked-off | Signature pose held to the last hit | Take A, piece 3 |

Take A: 10 s, trimmed 500 to 8000 ms and split into 1875, 1875 and 3750 ms.

### 30 s: verse fragment and chorus (128 BPM, 16 bars)

| Section | Bars | Shots | Cut every |
|---|---|---|---|
| Verse | 1 to 8 | 4 shots: close and quiet (eyes, hands, a slow walk, the breath), one look | 2 bars |
| Chorus | 9 to 16 | The 15 s chorus clip above | 1 bar, a burst at bar 13 |

### 60 s: intro, verse, pre-chorus, chorus, tag (120 BPM, 30 bars)

| Section | Bars | Start s | Look | Cut every | Shots |
|---|---|---|---|---|---|
| Intro | 4 | 0 | Blue dusk, empty stage, one lamp | 4 bars | 1 held, the signature image |
| Verse | 8 | 8 | Close, warm practical light | 2 bars | 4 |
| Pre-chorus | 4 | 24 | Red light starts to pulse | 1 bar | 4 |
| Chorus | 8 | 32 | Magenta and cyan, haze, wide | 1 bar, burst at bar 5 | 9 to 10 slots from 5 clips |
| Tag and outro | 6 | 48 | Back to blue dusk | 2 bars, then a held last shot | 3 |

About 13 clips for 21 slots, with one performance take split three ways.

### 90 s: a full short edit (120 BPM, 45 bars)

Intro 4, verse 8, pre-chorus 4, chorus 8, post-chorus 4, bridge 4, final
chorus 8, outro 5 bars. The bridge is one long hold (a spotlight, the artist
still); the final chorus is the first chorus's place, bigger (denser haze,
a crane, two bursts). About 20 clips for 32 slots.

### Up to 180 s: the whole song

Three performance takes of 10 to 15 s (one per look), each split across its
sections, plus b-roll and motif clips: about 30 clips. Show the cost before
planning further; over 180 s, ask the user for an edit under 3 minutes.

## 4. Hook and payoff

- Hook: start on the song's most recognisable part (usually the chorus) and
  the artist's signature image inside the first second.
- Payoff: the last chorus is the biggest version of the first; the final
  shot rhymes with the first frame and holds to the last hit.

## 5. Camera, light, colour

- Orbits around the performer at chest height for choruses; handheld energy
  for rock; gimbal glides for pop; fisheye close for hip-hop; locked
  symmetry for art pop; a crane for the final chorus.
- Light: coloured gels, a hard backlight in haze, strobing only in burst
  pieces, a single spotlight for ballads and bridges.
- Colour: one dominant hue per section; the chorus colour returns every
  chorus.

Exact phrases that work:

- "a hard white light behind her, beams cutting through thick haze, her silhouette sharp"
- "profile, the microphone held across her mouth, eyes closed"
- "slow orbit from left to right at chest height, a quarter turn"
- "she sways slowly, about one sway every two seconds"
- "the breath before the line: mouth closed, chest rising, eyes opening"

## 6. Sound plan

- The song once, wired to every clip, volume 1, `ducking` false.
- Every clip `off`; "silent, no music generated" in every motion prompt.
- No narration; no captions. A spoken intro only before the song starts
  ([one-track-rule.md](one-track-rule.md)).
- Without a track, a generated score brief with tempo and section timings,
  music first, picture after.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Seedance 2.0 | 4 references (face, outfit, stage, style plate), 1080p |
| Value | Seedance 2.0 Fast | 11 per 5 s, 4 references |
| Body and dance motion | Kling v3 Pro | Holds the outfit through motion, 20 per 5 s, 2 references |
| Silent value, no references | Hailuo 3 Max | 10 per 5 s |
| Draft | Seedance 2.0 Mini | 9 per 5 s, 4 references |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s chorus (3 x 5 s, 1 x 10 s) | 30 s (7 x 5 s, 1 x 10 s) |
|---|---|---|
| Seedance 2.0 Fast | 3 x 11 + 22 = 55, plus 8 | 7 x 11 + 22 = 99, plus 16 |
| Seedance 2.0 | 3 x 44 + 88 = 220, plus 8 | 7 x 44 + 88 = 396, plus 16 |
| Kling v3 Pro | 3 x 20 + 40 = 100, plus 8 | 7 x 20 + 40 = 180, plus 16 |
| Seedance 2.0 Mini | 3 x 9 + 18 = 45, plus 8 | 7 x 9 + 18 = 81, plus 16 |

## 8. Prompt pairs

Worked example: the pairs use one invented artist, Nova. The user's artist
and their locked description replace her.

### Pair 1: the corridor (Seedance 2.0 Fast, chorus, with the artist reference)

Still frame:

```text
Music video frame, white tiled corridor, light haze. Medium shot, low angle, 24mm lens. Nova: a singer in her twenties, a sharp silver bob, dark brown skin, a black vinyl jacket, one silver ring on her right thumb. She stands centred between a magenta neon tube on the left wall and a cyan tube on the right, eyes closed, chin raised. Symmetrical composition. Palette: magenta, cyan, white, black. No text, no letters, no logos.
```

Motion:

```text
Reference 1 is Nova's face, hair and jacket only; ignore its background and pose. Nova, already moving from the first frame, sways slowly side to side, about one sway every two seconds, and raises her right hand toward the magenta light on the third sway. Slow orbit from left to right around her at chest height, a quarter turn. The neon tubes flicker once. Nova, her jacket and the corridor stay as in the opening frame. Exactly one person in frame, nobody else. Silent, no music generated. Clean frame: no text, no letters, no logos.
```

### Pair 2: the silhouette (Kling v3 Pro, hook)

Still frame:

```text
Music video frame, black stage, thick haze. Wide shot, low angle, 24mm lens. Nova: a singer with a sharp silver bob and a black vinyl jacket, seen as a silhouette in the centre of a bare black stage, arms at her sides. One hard white light directly behind her, beams cutting through the haze. Palette: black, white. No text, no letters, no logos.
```

Motion:

```text
Scene: a bare black stage filled with haze. Character: Nova in silhouette, centre stage. Action: she breathes in, then lifts both arms slowly out to her sides on a count of two, and holds them there; the haze rolls across the light beams. Camera: static, low angle. Audio: silent, no music generated. Nova's silhouette, the stage and the light stay exactly as in the opening frame. Exactly one person in frame, nobody else. Clean frame: no text, no letters, no logos.
```

### Pair 3: the burst (Seedance 2.0 Fast, one take split into four)

Still frame:

```text
Music video frame, white tiled corridor, dense haze, strobing magenta light. Close-up, 50mm lens. Nova: a singer with a sharp silver bob, dark brown skin, a black vinyl jacket, a silver ring on her right thumb. Her head is turned away to screen left, hair swinging, her right hand reaching for a chrome microphone stand. Magenta light on her cheek. Palette: magenta, black, silver. No text, no letters, no logos.
```

Motion:

```text
Reference 1 is Nova's face, hair and jacket only; ignore its background and pose. Already in motion from the first frame: Nova snaps her head from left to right so her silver hair whips across her face, grabs the microphone stand with her right hand, pulls it toward her and looks straight into the lens. The magenta light flashes on and off twice a second. Handheld camera close to her, small natural shakes. Exactly one person in frame, nobody else. Silent, no music generated. Clean frame: no text, no letters, no logos.
```

Split this one take into four pieces with `split_clip` and trim each to its
half bar: the jump cuts of one continuous take are the burst. When the
whole film is on Veo, one 8 s clip with four bracketed time ranges ("[00:00-00:02] ...")
makes four different framings instead.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Mouth shapes do not match the song | Hide or avoid the mouth (section 2); a singing close-up one beat at most |
| The artist's face changes between sections | References on Seedance or Wan; the locked description verbatim in every still; one look per section but the same face |
| Clips arrive with their own music | `off` on every clip; "silent, no music generated" |
| Cuts feel late | Cut one export frame (33 ms) before each beat; check the downbeat time with the user |
| Every shot the same orbit | One move per shot; never repeat a move in adjacent shots; static on the payoff |
| Logos on the jacket or the mic | "no letters, no logos"; plain clothing in the description |
| A second singer or a crowd appears | The count line; "the stage is empty around her" |

## 10. Policy guards

- The artist's own likeness only with their consent, from their own photo;
  never a celebrity or another artist's look.
- No other artist's album art, logos or stage designs named.
- Staging stays non-sexual; no minors in suggestive performance.
