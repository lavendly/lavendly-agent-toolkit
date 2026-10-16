# Recipe: narrative music video

## 1. Purpose, audience, ending

- Purpose: a short story told across the song, with the song's sections as
  its acts. The story gives the song a picture people remember and share.
- Audience: fans, playlist listeners, Shorts and Reels viewers who stay for
  a story.
- The ending: the story's last image lands on the song's last section and
  rhymes with the first frame. An open ending is fine if it is chosen.

## 2. Mapping a story onto a song

| Song section | Story job | Look |
|---|---|---|
| Intro | The world and the person, one image | Quiet, wide, the place |
| Verse 1 | The want, the routine | Close, warm, observational |
| Pre-chorus | The inciting moment | The light starts to change |
| Chorus 1 | The feeling of the song made visible (often the performer or the motif) | The chorus place and colour |
| Verse 2 | The attempt, the complication | Closer, the story moves |
| Chorus 2 | The chorus place again, bigger | Same colour, more energy |
| Bridge | The low point or the turn, one image | Stripped down, one source |
| Final chorus | The climax, the choice acted | The chorus look at its biggest |
| Outro | The new state, held | Rhymes with the intro |

- Story continuity is flexible inside a section and free between sections:
  time can jump on a cut. The character's identity and the motif do not
  change.
- Literal or counterpoint: a sad song over a sunny story can hit harder than
  a sad story. Choose once and keep it.
- The performer can appear as narrator (intercut in the chorus) or not at
  all; decide in the intent card.
- Dialogue does not fit: the song is the soundtrack. A spoken line goes in a
  gap of the song or before it starts.

## 3. Structures by length

At 120 BPM (1 bar = 2 s). Model lengths for Veo 3.1 Fast (4 s = 2 bars,
8 s = 4 bars, exactly).

### 6 s: one story image on the hook (3 bars)

| Slot | Bars | Size, angle, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 2 | Wide, 35mm | locked-off | A woman alone in a rowing boat on a still lake at dawn, holding a lantern | 4 s |
| 2 | 3 | Close-up, 85mm | slow push-in | She blows the lantern out on the hook word | 4 s, trimmed to 2 |

### 15 s: verse tail and chorus entrance (128 BPM, 8 bars)

| Slot | Bars | Size, angle, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 2 | Medium, 50mm | locked-off | He packs a single bag in a bare room | 4 s |
| 2 | 3 to 4 | Insert, 100mm | locked-off | A photo left face down on the bed | 4 s |
| 3 | 5 to 6 | Wide, 35mm | tracking alongside | Chorus entrance: he walks out into the street at dawn | 4 s |
| 4 | 7 to 8 | Wide, 24mm | slow crane up | He is small at the crossroads, the city waking | 4 s |

At 128 BPM each 2-bar slot is 3750 ms: generate 4 s and trim 3750.

### 30 s: verse and chorus (16 bars at 128 BPM)

| Section | Bars | Shots | Story |
|---|---|---|---|
| Verse | 1 to 8 | 4 shots, every 2 bars | The routine and the want: morning, the empty chair, the unsent letter, the decision |
| Chorus | 9 to 16 | 6 slots: 4 bars of 1-bar cuts, a held 2-bar, a held 2-bar end | The act: running to the station, the train doors, the face in the window, the held last image |

About 8 clips.

### 60 s: two verses and a chorus (120 BPM, 30 bars)

Intro 4 bars (one held establishing shot), verse 1 8 bars (4 shots), pre 4
bars (4 one-bar cuts building), chorus 8 bars (6 to 8 slots), verse 2 shortened
to 4 bars (2 shots: the complication), outro 2 bars (the held image). About
14 clips.

### 90 s: the whole story (120 BPM, 45 bars)

Intro, verse 1, pre, chorus 1, verse 2, chorus 2, bridge (one long hold: the
low point), final chorus (the climax), outro (the rhyme with the intro).
About 20 clips; the bridge and the outro are the longest holds.

## 4. Hook and payoff

- Hook: a story image on the song's first strong moment, with a question in
  it (why is she on the lake with a lantern at dawn).
- Payoff: the climax on the final chorus downbeat; the last image held to
  the last hit and framed like the first.

## 5. Camera, light, colour

- Camera: observational in verses (locked-off, slow push-ins), moving in
  choruses (tracking, crane), still in the bridge.
- Light: motivated and real (dawn, a kitchen lamp, a train window); the
  chorus may carry a stylised accent (the same colour every chorus).
- Colour: one palette for the story, one accent for the chorus. Film
  texture is a section choice (Super 8 for memories in a verse).

Exact phrases that work:

- "soft overcast dawn light, pale blue and peach palette"
- "Super 8 film texture with light leaks" (memory sections only)
- "camera tracks alongside him at walking pace, the shop fronts passing"
- "crane rising slowly until he is small at the crossroads"
- "silent, no music generated"

## 6. Sound plan

- The song once, volume 1, `ducking` false; every clip `off`.
- A spoken line or a diegetic sound only in a gap of the song or before it
  starts ([one-track-rule.md](one-track-rule.md)).
- No narration; no captions.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Veo 3.1 | Faces, light, texture; 4 s and 8 s are exactly 2 and 4 bars at 120 BPM |
| Value | Veo 3.1 Fast | 14 per 4 s |
| Character references across many shots | Seedance 2.0 Fast | 4 references at 11 per 5 s |
| Value at 5 s blocks | Kling v3 Standard | 15 per 5 s |
| Draft | Veo 3.1 Lite | 10 per 4 s; no references |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 x 4 s) | 30 s (8 x 4 s) |
|---|---|---|
| Veo 3.1 Fast | 4 x 14 = 56, plus 8 | 8 x 14 = 112, plus 16 |
| Veo 3.1 | 4 x 47 = 188, plus 8 | 8 x 47 = 376, plus 16 |
| Kling v3 Standard (5 s) | 4 x 15 = 60, plus 8 | 8 x 15 = 120, plus 16 |

## 8. Prompt pairs

### Pair 1: the lake (Veo 3.1 Fast, intro)

Still frame:

```text
Music video frame, overcast dawn, Super 8 film texture with light leaks. Wide shot, eye level, 35mm lens. Elin: a woman in her thirties, long straight blonde hair, a knitted cream sweater with a frayed left cuff. She sits alone in a small wooden rowing boat on a still lake, holding a lit paper lantern in both hands. Low mist on the water, pines on the far shore. Soft overcast dawn light. Palette: pale blue, peach, cream.
```

Motion:

```text
Music video frame, overcast dawn, Super 8 film texture. Locked-off camera on a tripod. 0 to 4 s: the boat drifts slowly from right to left; mist rolls across the water; the lantern flame flickers. Elin does not move. Elin, the boat and the light stay exactly as in the opening frame. Exactly one person and one boat in frame, nobody else. Silent, no music generated. Clean frame: no text, no letters, no logos.
```

### Pair 2: the crossroads (Veo 3.1 Fast, chorus end)

Still frame:

```text
Music video frame, early morning city. Wide shot, high angle, 24mm lens. Jonas: a young man with short red hair, a long olive canvas coat and a single brown leather bag over his shoulder, standing still at an empty crossroads, small in the centre of frame. Wet asphalt, shop shutters closed, the first sun striking the top floors. Palette: olive, wet grey, warm gold.
```

Motion:

```text
Music video frame, early morning city. Crane rising slowly over the whole shot until Jonas is small at the centre of the crossroads. 0 to 4 s: he turns his head to the left road, then the right, and stays still; a flock of pigeons lifts off the corner behind him. Jonas, his coat and the street stay exactly as in the opening frame. Exactly one person in frame, nobody else on the street. Silent, no music generated. Clean frame: no text, no letters on the shop signs, no logos.
```

Second family notes: on Seedance, give reference 1 the character's face and
coat only and add "already in motion from the first frame" to every walk; on
Kling, put the street in the Scene field and the turn of the head in Action.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The story is lost in pretty shots | Each section has one story job; each shot one event |
| The character changes between sections | Locked description verbatim; references on Seedance; same coat in every section |
| Shop signs and posters garble | "no letters on the shop signs"; signs out of focus or turned away |
| Extra people in streets and stations | "nobody else on the street"; early morning, empty places |
| The climax lands off the downbeat | Compute the cut from the grid; ask the user to confirm the time |
| Clips carry their own music | `off` on every clip |

## 10. Policy guards

- Fictional characters only, or the consenting artist.
- No real places presented as news; no real brands in shop fronts.
- Sensitive stories (loss, addiction) handled with care, nothing
  instructional.
