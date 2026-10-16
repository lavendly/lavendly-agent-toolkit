# Acting and timing for generated animation

The principles animators use, translated into words a video model follows,
and the limits of what one generated clip can act.

## 1. The principles, as prompt words

| Principle | What it means | Words that make it |
|---|---|---|
| Squash and stretch | Bodies compress on impact and stretch in speed, keeping their volume | "squashes softly as it lands, then springs back to its round shape" |
| Anticipation | A small opposite move before the main one | "crouches slightly, then leaps"; "pulls its arm back, then throws" |
| Staging | One clear idea per shot, readable in silhouette | "side view, the whole body against the plain sky" |
| Pose to pose | Clear key poses with motion between them | "starts curled asleep, ends sitting upright"; name both poses |
| Follow-through and overlap | Parts keep moving after the body stops | "stops; its ears and tail keep swinging for a moment, then settle" |
| Slow in and slow out | Moves ease out of rest and into rest | "eases into the move and settles gently at the end" |
| Arcs | Living things move along curves | "the head turns in a soft arc"; "the ball bounces in shrinking arcs" |
| Secondary action | A small action supports the main one | "hums while it walks, the scarf bouncing" (one, not several) |
| Timing | Fewer frames feel fast and light, more feel slow and heavy | "a quick, light hop"; "a slow, heavy step" |
| Exaggeration | Push the pose past real life, as far as the style allows | "its eyes go wide and its whole body jolts" (cartoon); subtle for a 3D feature look |
| Solid drawing | Volume and weight stay constant | "keeps its round volume, no stretching of the face" |
| Appeal | A readable, likeable design | in the hero block and the bible, not in motion words |

## 2. One emotion per beat, shown by the body

Never write the emotion alone ("she is sad"). Write what the body does.

| Emotion | Physical behaviour to write |
|---|---|
| Joy | a small hop, ears up, eyes squeezed into crescents |
| Curiosity | head tilts, ears turn toward the sound, one slow step closer |
| Fear | freezes, ears flat, backs away one step |
| Surprise | jolts upright, eyes wide, a held breath of half a second |
| Sadness | head lowers slowly, shoulders drop, a long blink |
| Pride | chest out, chin up, a small nod |
| Embarrassment | looks down, rubs the back of its head |
| Sleepiness | a slow wide yawn, eyelids sinking, head nods once |

The tighter the shot, the smaller the movement. A close-up acts with the
eyes and one small head move; a wide shot acts with the whole body.

## 3. Holds

A held pose lets the viewer read the emotion. Generated motion tends to keep
everything moving; ask for the hold.

- After a reaction: "holds the pose for one second, only blinking".
- On the payoff shot: locked-off camera, the hero still, 1 to 2 s.
- Stop-motion and anime holds are longer and stiller than 3D holds.

## 4. Comic timing

The gag in four parts: setup, anticipation, action, held reaction.

| Part | Length in a 6 to 8 s clip |
|---|---|
| Setup (we see the situation) | 1 to 2 s |
| Anticipation (the beat before it goes wrong) | 0.5 to 1 s |
| Action (it goes wrong) | under 1 s |
| Reaction, held | 1 to 1.5 s, then cut |

- The reaction often plays best in its own shot: a close-up after the wide.
- A slow turn to look at the camera is a reaction the style allows in
  cartoons and 3D comedy; never in a bedtime film.
- Cut on the reaction's hold, not after it fades.

## 5. On ones, twos and threes

Hand-drawn and stop-motion animation hold each drawing or pose for one, two
or three frames. Holding for two (12 poses a second) is the classic feel.

| Feel | Words |
|---|---|
| Smooth, 3D or full animation | "smooth eased motion" |
| On twos | "animated on twos, each pose held for two frames" |
| Limited animation (anime, TV cartoon) | "limited animation: the body holds still while only the mouth, eyes or hair move" |
| Stop-motion | "stop-motion at 12 frames per second, crisp frames with no motion blur" |

The export runs at 30 frames per second with no step control; the stepped
feel must come from the generated clip.

## 6. Dialogue and lip sync

- Lip sync works best in 3 to 8 s clips, medium close-up, one speaking face,
  a locked camera, one short line (about 2 words per second of clip; 16 to
  20 English words per 15 s of speech is the reliable ceiling).
- Write the line in the model's dialect (Veo: quoted after the speaker and
  delivery, then "(no subtitles)"). Keep that clip's native audio `native`.
- Each generated clip invents its own voice: the same character can sound
  different in every clip. When the character speaks in several scenes,
  prefer narration or one voiceover track for the character, and keep the
  on-screen line to one clip.
- Kids and creature films: prefer narration over on-screen speech
  ([creatures.md](creatures.md) section 5).
- Never promise lip sync to an uploaded audio file; Lavendly has no lip-sync
  route.

## 7. Two characters in one shot

- Fix sides for the scene and write them in every prompt: "Pip on the left,
  facing right; Moss on the right, facing left".
- One acts, one reacts; stagger them: the reaction starts while the action
  finishes.
- Never both doing big actions at once; the model merges them.
- Count line: "exactly two characters in frame, nobody else".

## 8. Acting failures and fixes

| Failure | Fix |
|---|---|
| Constant fidgeting, nothing reads | one action, then "holds still for one second" |
| Every emotion at once | one emotion for the beat, its body behaviour named |
| Floaty, weightless motion | anticipation and a settle; "lands heavily, the knees bend" |
| A gesture nobody asked for at the end | the end state named as one action and a held pose |
| Faces melting during expression change | fewer expression changes per clip (at most two), a medium shot |
| The mouth moving while the narrator speaks | "mouth closed, listening" in narrated shots |
