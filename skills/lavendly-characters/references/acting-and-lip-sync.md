# Acting and lip sync

A consistent face that acts badly still reads as AI. Acting in a prompt is
written as what the body does, beat by beat, never as an adjective for the
feeling.

## 1. Directing a performance

- An objective as a verb aimed at someone: "she tries to make him stay",
  not "she is sad".
- An obstacle and what is at stake: he has his coat on; the last ferry
  leaves at nine.
- One emotion per beat, two to four visible beat changes in a scene at
  most; one per clip is safer.
- Each beat as physical behaviour:

| Instead of | Write |
|---|---|
| sad | her eyes drop to the cup; she turns it slowly by the handle |
| angry | his jaw sets; he puts the glass down too hard and keeps his hand on it |
| nervous | she tucks the same strand of hair behind her ear twice |
| happy | a smile starts at one corner of his mouth before he can stop it |
| surprised | she stops mid-step; her hand stays in the air |
| thinking | he looks off to the left, lips pressed, then back |

- Eye life is written: where the eyes go, when they move, when they hold.
- The tighter the shot, the smaller the movement. A close-up gets a breath,
  a glance, a swallow; a wide shot gets a walk.
- Reactions begin before the other person finishes. In two-person scenes,
  the stronger character is still; the weaker one fidgets.
- Subtext leaks through a behaviour that contradicts the line ("Fine," she
  says, already putting her coat on).
- Never put wardrobe, camera or colour inside the acting sentences; they
  belong to the still-frame prompt and the camera line.

## 2. Lip sync on Lavendly

- Lips move with words only on sound models, with the line written in the
  motion prompt and the clip's native audio set to `native`. Nothing on
  Lavendly syncs lips to a voice attached with `attach_track`.
- Rules that hold sync:

| Rule | Value |
|---|---|
| Clip length | 3 to 8 s |
| Framing | Medium close-up or closer |
| Speaking faces | One per clip; the listener seen in the next clip |
| Camera | Locked-off; no head-motion words ("nods while talking") |
| Words | Never more than 2 per second of clip; about 16 to 20 English words per 15 s of speech for reliable sync |
| Lines | One short sentence is one breath; one line per clip |
| Numbers | Spelled out ("twenty-five", not "25") |

| Clip | Words at most | Words for reliable sync |
|---|---|---|
| 4 s | 8 | 4 to 5 |
| 6 s | 12 | 6 to 8 |
| 8 s | 16 | 8 to 11 |

## 3. Dialogue syntax per family

| Family | Write |
|---|---|
| Veo 3.1, Fast, Lite | `Elias says, quiet and hoarse: "You came back." (no subtitles)` |
| Kling v3, O1 | `[Character A: Elias, quiet hoarse voice]: "You came back."` and the same label in every clip |
| Seedance | Under an audio line: `AUDIO: Elias, quiet and hoarse: "You came back."` |
| Wan, Hailuo 3, FLUX 3 | The speaker by name and position, the line in quotes, the delivery in words |

Silent models (Hailuo 2.3, Hailuo 3 Max, Runway, HeyGen, Grok 1.5 and 1.5
Lite) never get a line: their faces move and nothing is heard.

## 4. Narration over a character

- Narration is a voiceover, not the character speaking. Over a face with a
  closed mouth, or a face turned away, it reads as inner voice or a
  narrator. Over a moving mouth it reads as a bad dub.
- One voice id for each narrator and each character, the same in every
  scene and episode.

## 5. Symptoms and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Mouth moves but the words drift off the lips | Line too long for the clip; camera moving | Fewer words, a locked camera, medium close-up |
| The wrong person speaks | Two faces in frame, speaker not placed | Name the speaker by look and position; one speaking face per clip |
| Burned-in subtitles | Veo's subtitle artefact | "(no subtitles)" after the line, the clean-frame line |
| Dead eyes, a fixed stare | No eye direction written | Write where the eyes go and when |
| Mannequin stillness | No behaviour between lines | One small physical action: a breath, a hand on the cup |
| Over-acting, every emotion at once | Adjectives stacked | One emotion, one behaviour per beat |
| Playing the result (crying on the first word) | The beat states the outcome | Write the objective and the obstacle; let the behaviour arrive late |
| Gesture illustrates every word | "Explains with her hands" | Hands still, one gesture on the key word |
| The same smile on every line | No change between beats | A different behaviour per beat |
| Emotional reset between clips | Each clip prompted from neutral | Start the motion prompt from the state the last frame shows |
| Synchronised ensemble (everyone nods together) | A group told to react | Stagger reactions, name who reacts first |
| Head bobbing while talking | Head-motion words in the prompt | Remove them; locked camera; one small gesture only |
| Speech too clean for the character | A written sentence | Contractions, a restart, a short pause in the line |
| A voice that changes from clip to clip | Native dialogue timbre varies per generation | The same delivery words every clip; or the lines as voiceover over shots without the mouth |
| Teeth or tongue melt on open vowels | Fast speech in a close-up | Fewer words, slower delivery ("slowly, with a pause") |

## 6. Example motion prompt, Veo 3.1 Fast, 8 s

```text
Medium close-up, locked-off camera. Ana sits at the kitchen table, her coat still on, both hands around a cold cup. She looks at the cup, turns it once by the handle, then looks up toward the doorway. Ana says, quietly, almost to herself: "You could have called." (no subtitles) Her eyes stay on the doorway; she does not blink. Exactly one woman in frame, nobody else. Ana, her coat and the lamp light stay exactly as in the opening frame. SFX: the cup scraping on the table. Ambient noise: fridge hum, rain outside, no music. Clean frame: no text, no subtitles, no on-screen graphics.
```
