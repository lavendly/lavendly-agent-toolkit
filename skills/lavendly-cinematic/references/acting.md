# Acting: performance direction for AI video

A model performs what the prompt makes visible. Adjectives ("sad",
"angry", "nervous") produce the stock face for that word, usually too big.
Behaviour (what the body does, in order, and for how long) produces a
performance. Direct the model the way a director talks to an actor: an
objective, an obstacle, one change per beat, and the physical evidence.

## 1. The five pillars, in prompt form

| Pillar | What it means | How it reaches the prompt |
|---|---|---|
| Objective | A verb aimed at the partner: to calm him, to get the truth from her | The action reads as a tactic: "she leans in and lowers her voice" (to calm) |
| Obstacle | What resists: he will not look at her | Written as his behaviour: "he keeps his eyes on the window" |
| Stakes | What is lost if they fail | Shown in props and place, never said: the packed suitcase by the door |
| Beat change | The moment a tactic changes | One per clip, timed: "at 3 s she stops pleading and sits back" |
| Subtext | What is felt but not said | Leaks through the body against the line: she says "fine" and her hand tightens on the cup |

## 2. One emotion per beat

- One clip, one beat, one emotion. A clip that needs a change of feeling
  gets the change timed ("0 to 3 s ... at 3 s ..."), and only one.
- Two to four visible beat changes across a 30 s scene, not per clip.
- States, not transitions: write where she is at the start and where she is
  at the end; the model makes the passage.
- Reactions begin before the partner's line ends: the listener's shot starts
  with the reaction already under way.

## 3. Behaviour words

Pick two or three per beat. The tighter the shot, the smaller the movement:
in a close-up the eyes and breath carry it; in a wide the whole body does.

| Feeling | Close-up behaviour | Wide behaviour |
|---|---|---|
| Grief held in | jaw tightens, she swallows, eyes drop to the cup and stay there, a slow breath through the nose | sits very still, shoulders folded in, hands around the cup |
| Grief breaking | lower lip presses, eyes fill but do not spill, she looks away to the window | a hand goes to her mouth, she turns her back to the room |
| Anger contained | nostrils flare once, gaze fixed, very still, a muscle in the jaw | stands too close, does not sit when asked |
| Anger released | voice drops lower, not louder; one sharp exhale | sweeps the papers off the table in one motion, then stops |
| Fear | eyes widen slightly and dart to the door and back, breath held, lips parted | backs up until the wall stops her, hands flat against it |
| Suspicion | eyes narrow a little, head tilts, a long look held one beat too long | keeps the table between them |
| Relief | shoulders drop, a long exhale, eyes close for a second | sits down heavily on the step |
| Love, unspoken | looks at him while he is not looking, a small smile that she hides | stands near enough to touch and does not |
| Shame | eyes down and to the side, chin lowers, a hand on the back of the neck | turns slightly away, speaks to the floor |
| Resolve | stops blinking, chin lifts a little, a slow nod | picks up the bag and walks without looking back |
| Comic deadpan | no change at all for a full second, then one slow blink | stands perfectly still while chaos happens around him |
| Surprise, small | eyebrows lift a little, stops mid-chew | freezes mid-step |

Eye life: say where the eyes go and when ("looks at the door, back to him,
down to the letter"). Dead eyes are the most common failure in generated
faces; a named eye path fixes most of them.

## 4. The bad-acting atlas

| Symptom on screen | Cause in the prompt | Fix in the prompt |
|---|---|---|
| Indicating: the face shows the label (sad face, angry face) | An emotion adjective | Replace the adjective with two behaviours from the table |
| Playing the result: tears at second 0 | The end state written as the whole shot | Write the start state and the change: "her eyes fill over the last two seconds" |
| Waiting for the cue: blank face until the line | No behaviour before the line | "She is already shaking her head before she speaks" |
| One tactic only: the same plea for 8 s | No beat change | One timed change: "at 4 s she stops asking and goes quiet" |
| Gesture illustration: hands mime every word | "Expressive", "animated", or a long line | "Hands still on the table; only the eyes move" |
| Free emotion: crying with no reason in the shot | Feeling written without its cause | Put the cause in frame: the letter in her hand, the empty chair |
| Body false to the person: a tired old man springs up | Action verbs without weight | "He gets up slowly, one hand on the table for support" |
| Speech too clean: every word crisp, no breath | Long, formal lines | Shorter lines with a breath: "She starts, stops, then says:" |
| Threat signalling: the villain glowers | "Menacing", "sinister" | "He smiles politely and refills her glass" |
| Synchronised ensemble: everyone reacts at once | "They all react" | Stagger: "Tom looks up first; a second later Mia does" |
| Dead pause: a frozen face between lines | A pause written as nothing | Give the pause a behaviour: "she turns the cup a quarter turn" |
| Emotional reset: calm again at the start of the next shot | Each prompt written fresh | Start each prompt from the previous shot's end state |
| Commenting: a wink, a knowing look at the lens | "Funny", "ironic" | "He does not look at the camera; he looks at the printer" |
| Close-up overload: huge expressions in tight frames | Wide-shot behaviour in a close-up | Scale down: eyes and breath only in a close-up |
| Dead eyes: glassy, unfocused | No gaze written | Name the eye path and one blink |

## 5. The performance scale

Grade each landed take on the frames (`get_scene_frame` first, mid, last)
before keeping it.

| Score | What you see | Decision |
|---|---|---|
| 0 | Frozen face, a mask, or a different person | Re-roll with a simpler beat |
| 1 | Stock expression for the adjective | Rewrite with behaviour |
| 2 | Plausible but generic, the beat change missing | Re-roll only if it is a hero shot |
| 3 | The beat reads; small falseness (timing, eyes) | Keep for inserts and wides |
| 4 | Readable, specific, the change lands | Keep; target for hero shots |
| 5 | Two things true at once (the smile and the grief) | Keep and build the cut around it |

Hero shots (the turn, the reveal, the last face) need 4 or more. One re-roll
per shot, with the fix named; then keep the better take.

## 6. Dialogue and lip sync limits

- 3 to 8 s clip, medium close-up or closer, one speaking face in frame,
  locked-off or very slow camera, no head turns written during the line.
- About 1.2 words per second for clean sync: 4 s holds 5 words, 8 s holds 9
  or 10. The hard ceiling is 2 words per second. "One short sentence is one
  breath."
- The line comes after a behaviour and before a held reaction: "She looks at
  the mug for two seconds, then says ... She holds the look."
- Speech over a back, a wide or a listener needs no sync: that is where long
  lines and a supplied voice go.
- Native dialogue only on models with sound (Veo, Seedance, Kling, Wan,
  Hailuo 3, FLUX 3). Set that clip to `native` so the line is not ducked.

## 7. Ensembles and extras

- Strong is still, weak is fidgety: the person with power moves least.
- Name every person allowed in frame; models add extras to rooms, streets
  and parties. "Exactly three people at the table, nobody else in the room."
- Background people do one named thing ("two diners at the far table eat in
  silence") or are not there.

## 8. Performance checklist before sending

- [ ] One emotion, written as two or three behaviours.
- [ ] The eye path written.
- [ ] Start state matches the previous shot's end state.
- [ ] One timed beat change at most.
- [ ] No wardrobe, camera or colour words inside the acting sentence.
- [ ] The line under the word budget; the speaker in frame.
- [ ] The listener's reaction already under way at the start of their shot.
