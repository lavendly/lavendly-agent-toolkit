# Editing, rhythm, sound and transitions

Plan the edit and the sound before generation, so every shot has a role and
nothing is generated to be thrown away.

## 1. The arc

1. Hook: a question, a surprise, a promise, a striking frame. Scene 1, inside
   the first two seconds.
2. Orientation: enough context to understand the subject.
3. Development: actions, evidence, progression, escalating detail.
4. Payoff: the reveal, the answer, the transformation, the feeling.
5. Exit: a conclusion, an image, a call to action, or a deliberate silence.

Not every film needs all five or the same proportions. Three scenes can be
hook, development, payoff.

## 2. Coverage that earns its place

Establishing shot (where we are), action shot (the main event), insert (a
small action made legible), reaction (the consequence), cutaway (context or
a bridge over a continuity change), detail (tactile or emotional
specificity), narration (what the eye cannot see). Every shot adds new
information, action, mood or rhythm; a redundant shot is cut before it is
paid for.

## 3. Cuts Lavendly can make

| Cut | How | Note |
|---|---|---|
| Hard cut | the default between clips | Often the best choice for clarity and energy |
| Cut on action | end the motion prompt mid-move, start the next with the same move | "the hand is still withdrawing as the next shot opens" |
| Match cut | matched framing or shape across two still-frame prompts | Before and after, a comparison |
| Dip to black | `fade_out_ms` on the outgoing clip, `fade_in_ms` on the incoming | Passage of time, a chapter |
| Dissolve | `move_clip` the later clip to start before the earlier ends, then `fade_out_ms` on the earlier and `fade_in_ms` on the later, both equal to the overlap ([mcp-calls.md](mcp-calls.md)) | A soft change of place or time; picture and sound blend over the overlap |

Wipes, J-cuts and L-cuts are not rendered; do not promise them.
Clips play back to back in order, a timeline gap is never rendered (an
overlap is, only as a dissolve), and a
voice track's `startTime` is a position on its mix clock (the film for a
track wired to every clip, the clip's start for a per-clip track), so a
clip's sound cannot be slid under its neighbour. Choose a transition for
meaning, not novelty.

## 4. Rhythm and duration

- Complex actions last long enough to understand; reveals long enough to
  register.
- Shorter shots when energy or information density rises, never so short
  that details become unreadable.
- Stillness and pauses create contrast.
- Not every shot the same length: 6, 4, 8 reads as a film; 4, 4, 4 reads as
  a loop.
- Pacing follows action, narration and the music's phrasing.
- Generate the model's length (4, 6, 8 s on Veo) and trim to the cut's
  length with `edit_clip`; the strongest 4 s of a 6 s clip is rarely the
  first 4.

## 5. Sound layers

Only the layers that serve the scene:

- Narration: clear, paced, never masked by music. One voice per film.
- Dialogue: written into the clip, spoken by the model, one line per clip.
- Ambience: the bed that says where we are (room tone, wind, traffic, a
  kitchen). It lives in the clip's own audio; keep native sound on.
- Foley: close sounds of actions (a switch, fabric, chopping, a door). In
  the motion prompt under "Sound:".
- Effects: a designed accent, rarely.
- Music: emotional and rhythmic support, never a substitute for story.
- Silence: a deliberate way to focus attention or build tension.

## 6. The three mixes

| Mix | Native audio | Narration | Score |
|---|---|---|---|
| Voice over | `mix` at 0.3 to 0.5 | one voice, captions on | 0.3 to 0.4, ducking on |
| Natural sound | `native` | none, or one line | 0.2 to 0.3, or none |
| Music edit | `off` | none | 0.9 to 1 |

Set every clip with `set_clip_native_audio`; new clips have no mode.

## 7. Synchronisation and perspective

- Sounds match visible causes and contact points.
- Ambience constant across continuous shots in one place.
- Distance respected: far sources are not close and detailed.
- Reverb fits the room.
- No impact sound on every cut; no music that fights dialogue or action.

## 8. Music direction

One score for the film, one brief, in concrete terms:

- its role (warmth under a product, tension under a reveal, drive under a
  drive);
- its character (instruments, tempo feel, instrumental);
- its arc: where it enters, builds, drops, stops, and how it ends;
- whether narration needs space (ducking on).

Never "epic music". Say "sparse felt piano and a low string pad, opening on
one held note, building through the second scene, landing on a sustained
chord for the hero shot".

## 9. Timing plan

Per scene: the clip length, the narration line and its word count, the key
sound, the music change, the transition out. The sum matches the target
within a second or two; narration never exceeds 2.3 words per second of its
scene.

## 10. Audio checklist

- Narration intelligible; dialogue intelligible.
- Foley matches visible action.
- Ambience does not jump between cuts in one place.
- Music supports and leaves room for the voice.
- No clipping, abrupt cutoff or unexplained silence.
- Every audible event has a plausible source or a deliberate design reason.

## Rules learned on a long animated short (2026-10-16)

Example notes from one long creature film; they hold for any multi-shot
film.

- Every third shot is an insert of 3 or 4 s that changes the angle: a point
  of view, a macro on paws or hands, a view from above. Inserts cost little
  and are what makes a sequence feel like a film rather than a slideshow.
- A change of place gets a bridging shot that shows the new place before
  the hero acts in it. A change of light (day to dusk) gets a time-passage
  shot (the sun sinking, the sky changing) in one continuous take, never a
  cut from gold to blue.
- Carry the body: when a shot continues the previous one, the hero starts
  in the pose the previous shot ended in. Use continue mode for every shot
  whose first moment is the previous shot's last moment.
- Native sound under narration: the clip's own audio bed (Veo often adds
  music of its own) is the sound that fights the narrator, not the score.
  Under a narrated line set the clip's native level low (0.2 to 0.3) or off,
  keep native only on the shots whose sound is the point (a sneeze, ice,
  a spoken line), and keep one score at 0.2 to 0.25 with ducking on.
- The last shot answers the scene's small question and asks a bigger one,
  with one named action by the hero.

