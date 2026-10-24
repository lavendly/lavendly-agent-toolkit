# Beat maths: from a track to a cut list

You cannot hear the track. Every cut time comes from numbers: the tempo, the
time of the first downbeat in the file, and the section start times. Get
them from the user, compute the grid, cut with trims in milliseconds, and
ask the user to confirm sync after the render.

## 1. The numbers to ask for

One question, all at once:

- BPM (beats per minute).
- Time signature, if not 4/4 (most pop, rock, hip-hop, electronic are 4/4).
- The time of the first downbeat in the uploaded file, in seconds (the first
  "one" of a bar: usually where the kick and bass land together, or the
  first strong vocal word).
- Section start times (intro, verse, pre-chorus, chorus, bridge, drop,
  outro) as the user's player shows them.

If they do not know the BPM, the tap method: play the song, start counting
beats on a strong beat, count for exactly 15 seconds, multiply by 4. Check by
counting a second 15 s stretch. Any free online tap-tempo tool gives the
same. Tempos that come out near 70 or near 140 may be half or double what the
song feels like: ask which one the user nods to.

## 2. The formulas

```text
beat_ms = 60000 / BPM
bar_ms  = beats_per_bar x beat_ms          (4/4: 4 beats; 3/4: 3 beats)
cut_ms(n) = downbeat_ms + n_beats x beat_ms
frame at export = 33.3 ms (the render runs at 30 fps)
```

6/8 is felt in two: if the user gives the BPM of the dotted-quarter pulse,
a bar is 2 of those pulses. Half-time feel (trap, many hip-hop tracks at 140)
is cut on the felt pulse (70): bars twice as long.

## 3. The grid

| BPM | Beat ms | 1 bar ms | 2 bars ms | 4 bars ms | 8 bars | Export frames per beat |
|---|---|---|---|---|---|---|
| 60 | 1000.0 | 4000 | 8000 | 16000 | 32.00 s | 30.0 |
| 70 | 857.1 | 3429 | 6857 | 13714 | 27.43 s | 25.7 |
| 75 | 800.0 | 3200 | 6400 | 12800 | 25.60 s | 24.0 |
| 80 | 750.0 | 3000 | 6000 | 12000 | 24.00 s | 22.5 |
| 85 | 705.9 | 2824 | 5647 | 11294 | 22.59 s | 21.2 |
| 90 | 666.7 | 2667 | 5333 | 10667 | 21.33 s | 20.0 |
| 95 | 631.6 | 2526 | 5053 | 10105 | 20.21 s | 18.9 |
| 100 | 600.0 | 2400 | 4800 | 9600 | 19.20 s | 18.0 |
| 105 | 571.4 | 2286 | 4571 | 9143 | 18.29 s | 17.1 |
| 110 | 545.5 | 2182 | 4364 | 8727 | 17.45 s | 16.4 |
| 115 | 521.7 | 2087 | 4174 | 8348 | 16.70 s | 15.7 |
| 120 | 500.0 | 2000 | 4000 | 8000 | 16.00 s | 15.0 |
| 124 | 483.9 | 1935 | 3871 | 7742 | 15.48 s | 14.5 |
| 126 | 476.2 | 1905 | 3810 | 7619 | 15.24 s | 14.3 |
| 128 | 468.8 | 1875 | 3750 | 7500 | 15.00 s | 14.1 |
| 130 | 461.5 | 1846 | 3692 | 7385 | 14.77 s | 13.8 |
| 135 | 444.4 | 1778 | 3556 | 7111 | 14.22 s | 13.3 |
| 140 | 428.6 | 1714 | 3429 | 6857 | 13.71 s | 12.9 |
| 150 | 400.0 | 1600 | 3200 | 6400 | 12.80 s | 12.0 |
| 160 | 375.0 | 1500 | 3000 | 6000 | 12.00 s | 11.2 |
| 170 | 352.9 | 1412 | 2824 | 5647 | 11.29 s | 10.6 |
| 174 | 344.8 | 1379 | 2759 | 5517 | 11.03 s | 10.3 |

Typical tempos: ballads 60 to 80; hip-hop 80 to 100 (or 140 to 170 in
half-time); pop 100 to 130; house 120 to 128; techno 125 to 140; drum and
bass 170 to 175; rock 110 to 150.

## 4. Which generation covers a slot

A slot is the time between two cuts. Generate the shortest length that
covers the slot plus about 0.5 s of warm-up to trim off the front.

| Slot | Veo (4, 6, 8 s) | Seedance, Kling, Wan, Hailuo 3 (per 5 s block) | Grok (1 to 15 s) |
|---|---|---|---|
| up to 3.5 s | 4 s | 5 s (1 block) | 5 s (1 block) |
| 3.5 to 4.5 s | 8 s (6 s costs the same) | 5 s | 5 s |
| 4.5 to 9.5 s | 8 s, trim | 10 s (2 blocks) | 10 s |
| 9.5 to 14.5 s | two clips | 15 s (3 blocks) | 15 s |

At 120 BPM a 4 s Veo clip is exactly 2 bars, an 8 s clip 4 bars. At 128 BPM
a 5 s block holds 2 bars (3.75 s) with room to trim.

## 5. Cutting density by section

| Section | Cut every | Notes |
|---|---|---|
| Intro | 2 to 4 bars, or one held shot | The motif or the artist's signature image |
| Verse | 2 to 4 bars | Closer, quieter, the story |
| Pre-chorus | 1 to 2 bars | Tension rises; shorter cuts toward the chorus |
| Chorus | 1 to 2 bars | Wider, brighter, the performance; the same place each chorus |
| Drop | every beat or every 2 beats for 1 to 2 bars, then a held 2-bar shot | Bursts from one clip split into pieces |
| Bridge | 4 bars or one long hold | Strip down: one image, one colour |
| Final chorus | 1 bar, with one burst | The biggest version of the chorus look |
| Outro | one held shot to the last hit | Rhymes with the first frame |

Variation matters more than speed: a held 2-bar shot after a burst makes the
burst land. Uneven is good: 2 bars, 1 bar, 1 bar, 2 bars.

## 6. The song map

Write it before any shot:

| Section | Bars | Start s | End s | Energy | Look | Cut every |
|---|---|---|---|---|---|---|
| Intro | 4 | 0.00 | 7.97 | low | blue dusk, the empty stage | 4 bars |
| Chorus | 8 | 7.97 | 22.97 | high | red light, the artist wide | 1 bar, a burst at bar 5 |

Starts come from the downbeat plus whole bars; when the user's section times
disagree with the grid by more than a beat, ask: a tempo change or a
pickup bar is likely.

## 7. Building the cut list

1. Grid: list every bar line from the downbeat to the end of the excerpt.
2. Pick cut points per section by its density; mark bursts.
3. Assign a shot to each slot (performance, b-roll, motif, burst piece).
4. Compute each slot's length from absolute times (never by adding rounded
   lengths, so errors never accumulate past one frame).
5. Pick the generation length per slot (section 4); group burst pieces and
   performance pieces under one source clip.
6. Trim windows: start_ms about 500 (skip the model's warm-up), end_ms =
   start_ms + slot length.
7. Order: `move_clip` each clip to its cut time so the order matches.
   Clips play back to back, so the trims alone set the cut times; a gap on
   the timeline is never rendered.

Optional: cut one export frame (33 ms) before each beat; the change then
reads as on the beat. Apply it to every cut or none.

## 8. A worked cut list (128 BPM, 30 s excerpt)

The user uploads an excerpt that starts one pickup before the pre-chorus:
first downbeat at 0.470 s; 4 bars of pre-chorus, 8 bars of chorus, 4 bars
of post-chorus; 16 bars x 1875 ms = 30.0 s, plus the pickup = 30.47 s.
Model: Seedance 2.0 Fast (5 s or 10 s clips).

| Slot | From ms | To ms | Length ms | Shot | Source |
|---|---|---|---|---|---|
| 1 | 0 | 4220 | 4220 | Pickup and 2 bars: wide, the empty rooftop at dusk | Clip 1, 5 s |
| 2 | 4220 | 7970 | 3750 | 2 bars: the artist's hand on the railing | Clip 2, 5 s |
| 3 | 7970 | 9845 | 1875 | Chorus bar 1: the artist wide, singing, back-lit | Take A, piece 1 |
| 4 | 9845 | 11720 | 1875 | Bar 2: city lights b-roll | Clip 4, 5 s |
| 5 | 11720 | 13595 | 1875 | Bar 3: the artist profile, eyes closed | Take A, piece 2 |
| 6 | 13595 | 15470 | 1875 | Bar 4: motif (a silver ribbon in the wind) | Clip 5, 5 s |
| 7 to 10 | 15470 | 19220 | 4 x 937.5 | Bars 5 and 6: burst, four jump cuts on half bars | Clip 6, 5 s, split in four |
| 11 | 19220 | 22970 | 3750 | Bars 7 and 8: the artist wide, held | Take A, piece 3 |
| 12 | 22970 | 30470 | 7500 | Post-chorus: crane up from the rooftop, held to the end | Clip 7, 10 s |

Take A is one 10 s performance clip: trim 500 to 8000 ms (7.5 s) and split
it into 1875, 1875 and 3750 ms pieces. Cost: five 5 s clips and two 10 s
clips on Seedance 2.0 Fast = 5 x 11 + 2 x 22 = 99 credits, plus about 14
for opening images.

## 9. Speed to fit

A move that takes 4.4 s in the clip and must fill a 3.75 s slot plays at
speed 4.4 / 3.75 = 1.17 (`edit_clip` speed; the timeline box becomes the
trim window divided by the speed). Between 0.8 and 1.25 the change is
invisible; beyond that it reads as an effect, so use it only when the effect
is wanted. Below 0.7, generated frames stutter.

## 10. Without the numbers

- A generated score: write the tempo and the section timings into the
  brief (`mood`), cut on that grid, and say the sync is approximate until
  the user confirms the downbeat and the drop after listening in the app.
  Trims are free to adjust.
- The user's track with no tempo: offer the tap method; meanwhile plan the
  looks per section, not the cuts.
- After the render, ask the user to check three named moments ("the
  chorus cut at 7.97 s, the burst at 15.47 s, the last hit at 30.47 s").
  Adjust trims, render again (free).
