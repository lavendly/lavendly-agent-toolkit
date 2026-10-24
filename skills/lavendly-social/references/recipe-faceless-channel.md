# Recipe: faceless channels

A recurring short-form series with no person on camera: a voice, one look,
one format, published on a schedule. Worked example: "Objects with a
secret", a series where each episode reveals what an old object was for. The user's own series replaces it.
For lessons and facts in depth, lavendly-explainer has the teaching rules.

## 1. Purpose, audience, ending

- Purpose: a format viewers recognise in one second and come back for,
  made at a cost the user can sustain every week.
- Audience: subscribers to a niche (history objects, nature facts,
  satisfying processes, mysteries, money tips).
- Every episode ends on its reveal and the same closing pattern (a one-line
  sign-off or a loop), so the series feels like one show.

## 2. The channel bible (write once, reuse every episode)

| Field | Example |
|---|---|
| Format line | "One old object. What was it for? The answer in 30 seconds." |
| Length | 25 to 35 s |
| Hook pattern | Extreme close-up of the object turning, the question spoken |
| Beat pattern | Hook, three clues, the guess, the reveal in use, the sign-off |
| Style line | "Macro object study, dark velvet background, one warm side light" |
| Light | "one warm tungsten key from the left, deep shadow on the right" |
| Palette | "brass, walnut, deep burgundy velvet, cream" |
| Voice | george, the same every episode |
| Bed | One brief, regenerated per episode with the same words, or one approved track imported once and attached by `url` (it then plays the same in every episode) |
| Caption style | `tiktok` |
| Sign-off line | "Guess the next one in the comments." |
| Model | Seedance 2.0 Mini (value) or Veo 3.1 Fast (flagship episodes) |
| Budget | Credits per episode and per month, against the plan |

The bible lives in the conversation and in the user's notes; the MCP has no
field that stores it. Each episode is its own workflow built from it.
lavendly-series, when installed, owns series bibles in depth.

## 3. Rules that keep a channel healthy

- Every episode has its own research, script and point of view. Platforms
  reduce or demonetise mass-produced, repetitive videos; a template is the
  format, never the content.
- No variant floods: one episode per idea, one hook variant at most.
- Facts from sources the user trusts; say "historians think" when it is a
  guess.
- No stock clichés (spinning globes, generic city timelapses, people
  shaking hands); pictures show the episode's own subject.
- Faceless formats that borrow other people's material (gameplay
  backgrounds, film clips, other creators' stories read aloud, reposted
  posts) are out: original pictures and original or licensed stories only.
- AI-generated footage disclosed in the post caption on every episode.

## 4. Structures (9:16)

### 6 s (teaser)

| # | Time | Shot | Lens | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Extreme close-up | 100mm macro | Slow orbit a quarter turn | A brass object with a toothed wheel turns on velvet | 8, trim 6 | 12 ("What was this brass wheel for? Wrong answers only, then the truth.") |

### 15 s

| # | Time | Shot | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Extreme close-up | Slow orbit | The object turning | 4, trim 3 | 6 hook |
| 2 | 3 to 6 | Macro | Locked | Clue: the toothed wheel | 4, trim 3 | 7 |
| 3 | 6 to 9 | Macro | Locked | Clue: a worn wooden handle | 4, trim 3 | 7 |
| 4 | 9 to 15 | Medium, in use | Slow push-in | Reveal: it crimps the edge of a pie crust on a floured table | 8, trim 6 | 13 reveal and sign-off |

### 30 s (the series standard)

| # | Time | Shot | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Extreme close-up | Slow orbit | The object turning | 4, trim 3 | 7 hook |
| 2 | 3 to 6 | Macro | Locked | Clue one | 4, trim 3 | 7 |
| 3 | 6 to 9 | Macro | Truck right | Clue two | 4, trim 3 | 7 |
| 4 | 9 to 12 | Macro | Locked | Clue three: flour caught in the teeth | 4, trim 3 | 7 |
| 5 | 12 to 16 | Medium | Locked | The guess: the object beside three possible uses (a lock, a bread, a clock), objects only | 4 | 9 |
| 6 | 16 to 24 | Medium, in use | Slow push-in | Reveal: crimping a pie edge (hold) | 8 | 18 |
| 7 | 24 to 28 | Close-up | Locked | The crimped edge, finished | 4 | 9 |
| 8 | 28 to 30 | Extreme close-up | Locked | The object at rest, as in shot 1 (loop) | 4, trim 2 | 5 sign-off |

### 45 to 60 s (a special)

Two objects compared, or one object's story across three eras (three
reveals). About 110 to 140 words; the same opening and sign-off.

## 5. Hook and payoff

- Hook: the same pattern every episode (the object turning, the question
  spoken), so viewers recognise the series at frame 0.
- Payoff: the reveal in use, never only described; then the sign-off.

## 6. Camera, light, colour

- The bible's style, light and palette lines pasted verbatim into every
  still prompt of every episode.
- Macro: "100mm macro look, focus plane millimetres deep, dark velvet
  background"; reveals: "medium shot, the object in use by two hands, warm
  kitchen light", hands described the same way every episode.
- One orbit per episode at most (the hook); everything else locked or a
  slow push-in.

## 7. Sound

- Voice: george (warm, curious), the same each episode; 2.5 words per
  second at most; 30 s about 65 words.
- Native `mix` 0.3: the click of the wheel, flour, a crust pressed.
- Bed: "Curious music-box melody over a low upright bass at about 90 BPM,
  the same motif every episode, pausing for one beat before the reveal."
  Volume 0.25, ducking on. For a bed that sounds identical in every
  episode, the user approves one track, imports it once and every episode
  attaches it by `url`.
- Captions: `tiktok`.

## 8. Models and credits

| Pick | Model | Why | 15 s | 30 s | Per month at 3 episodes a week (30 s) |
|---|---|---|---|---|---|
| Value | Seedance 2.0 Mini | 9 per clip, 4 references for the hands and the set | 4 clips: 36 + 8 + 3 = 47 | 8 clips: 72 + 16 + 4 = 92 | about 1,200 |
| Flagship | Veo 3.1 Fast | Macro texture and sound | 3 x 14 + 28 = 70 + 8 + 3 = 81 | 7 x 14 + 28 = 126 + 16 + 4 = 146 | about 1,900 |
| Draft | Veo 3.1 Lite | Check a new format; no references | 3 x 10 + 20 = 50 + 8 + 3 = 61 | 7 x 10 + 20 = 90 + 16 + 4 = 110 | about 1,430 |

Three 30 s episodes a week (about 13 a month) on Seedance 2.0 Mini just fit
the Studio plan (1,200 credits); Creator (450) fits about one a week. Say it before the user
commits to a schedule.

## 9. Prompt pairs (Seedance 2.0 Mini)

**Pair 1, the hook.**

Still-frame prompt:

```text
Macro object study, dark velvet background, one warm side light. An old brass hand tool with a small toothed wheel on a short shaft and a worn walnut handle lies on deep burgundy velvet. Extreme close-up on the toothed wheel, 100mm macro look, focus plane millimetres deep. One warm tungsten key from the left, deep shadow on the right. Brass, walnut, burgundy. Clean frame, no text.
```

Motion prompt:

```text
Macro object study, dark velvet background. The brass tool rotates slowly a quarter turn on the velvet, already in motion from the first frame, light sliding across the teeth of the wheel; it settles with the handle toward the camera. Camera: locked-off macro. The tool, the velvet and the warm side light stay exactly as in the opening frame. Exactly one tool, no hands. Sound: a faint metallic tick as it settles. No music. Clean frame, no text.
```

**Pair 2, the reveal.**

Still-frame prompt:

```text
Macro object study, warm kitchen light. Two hands with short clean nails and rolled cream sleeves hold the old brass tool with the toothed wheel against the raw edge of a pie crust on a floured walnut table. Medium shot from slightly above, 50mm look. One warm tungsten key from the left. Flour, pale dough, brass, walnut. Clean frame, no text.
```

Motion prompt:

```text
STARTING STATE: two hands hold the brass wheel tool against the raw pie edge on a floured table. TIMELINE: [0-3s] the wheel rolls along the crust edge, already in motion from the first frame, leaving a neat crimped line. [3-6s] it reaches the far side of the pie and lifts away. [6-8s] the hands set the tool down beside the pie. CAMERA: slow push-in, stops on the crimped edge. AUDIO: soft rolling crunch of dough, no music. ENDING STATE: a crimped edge along the pie, the tool at rest. Exactly two hands.
```

**Second family, Veo 3.1 Fast.** The same lines in the five-part order with
`SFX: a soft rolling crunch` and 4 or 8 s clips; two references at most
(hands, then the tool).

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| Episodes drift in look | Bible lines verbatim; a style reference wired; the same model every episode |
| The object morphs during the orbit | A quarter turn only, slow; or locked camera and the object still |
| The reveal shows a wrong use | Name the use exactly, step by step; re-roll once; otherwise a simpler reveal shot |
| Hands change between episodes | The hands block verbatim; a hands reference on Seedance |
| The series feels repetitive | New research and a new angle per episode; vary the clue shots, never the hook pattern |
| Budget runs out mid-month | The per-month column against the plan before scheduling |

## 11. Policy guards

- Original pictures and stories; nothing taken from other creators,
  games, films or posts.
- Facts sourced or hedged; no invented history.
- Disclose AI-generated footage on every episode.
- No variant floods; every episode carries its own value.
