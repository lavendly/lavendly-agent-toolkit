# Episode formats

A format is a skeleton of slots that every episode fills the same way. Per
slot, some fields are locked for the whole series (style, place, light,
framing, angle, camera move, what stays the same, sound) and some change per
episode (the opening state, the action, the end state, the narration). This
is the same split the platform's own episode engine uses, and it is what
makes episode 12 look like episode 1.

## 1. The format beats

| Beat | What it is | How to make it on Lavendly |
|---|---|---|
| Cold open | The first 2 to 5 s: a question or a moment that grabs, often answering the last cliffhanger | A normal shot; scene 1 of the workflow |
| Recurring first shot | The same framing, place and move every episode (for example the rooftop at sunrise, the desk from above) | One locked still prompt and motion prompt; regenerated each episode. When the shot must be identical, reuse episode 1's opening image url on the image node and the same prompt, and pass the same `seed` in `generate_scene` options (honoured by Veo, Seedance, Wan, HappyHorse and Runway per the catalog; not verified) |
| Title room | 2 to 3 s of quiet frame where the show's title can sit | A plain area in the frame ("an empty dusk sky across the upper third"); the MCP renders no titles; the user adds the card in the app, or the narrator says the title and captions carry it |
| The episode's story | The beats of this episode on the skeleton | Free fields only |
| Recap | One line or one shot that states the story so far | Only when this episode depends on it; a narration line over a new shot, never a pasted old clip |
| Cliffhanger | The last image asks a question with a picture | A held shot of 2 to 4 s: a door opens, a light goes out, a stranger's paw print |
| Sign-off | The same closing every episode: a line, a gesture, a sound motif | Locked line in the narration, locked final framing, the score's motif |

Cliffhanger rules: the question is visible (not "what will happen?" but a
watering can tipping over by itself); the next episode's cold open answers or
deepens it within 5 s; never two cliffhangers in a row without an answer.

Recap rules: one sentence, present tense, the one fact the episode needs
(for example "Last time, the watering can cracked down the side."); 6 to 8 words at the very
start or after the recurring first shot; never more than 10 percent of the
runtime.

## 2. Daily vertical series (15 to 30 s, 9:16)

For a feed that wants one a day. One beat per episode, a strong hook, a
recurring sign-off.

### 15 s daily skeleton (3 shots)

| Slot | Time | Locked | Free | Model length |
|---|---|---|---|---|
| 1 Hook and recurring place | 0 to 5 s | place, light, framing (medium), camera (locked-off), style | the opening state, the action that raises the question | 5 s |
| 2 The beat | 5 to 10 s | style, light, framing (close-up) | the action that answers or escalates | 5 s |
| 3 Payoff and sign-off | 10 to 15 s | framing (wide), sign-off gesture, motif | the end state, the cliffhanger image | 5 s |

Narration: up to 32 words (2.3 per second), the sign-off line locked
(for example "See you tomorrow on the roof." 6 words).

Cost on Seedance 2.0 Mini: 3 x 9 = 27, opening images about 6, narration
about 1, the reused hosted score 0: about 34 per episode, about 1,020 for 30
episodes (fits Studio's 1,200 with room for re-rolls; not Creator's 450).

### 30 s daily skeleton (5 shots)

Hook (3 s), recurring first shot (3 s), the beat (2 shots of 5 to 6 s), the
insert (3 s), the payoff and sign-off (5 s). About 60 per episode on
Seedance 2.0 Mini; daily needs Enterprise or credit packs; three a week fits
Studio.

## 3. Weekly series (60 to 90 s, 16:9 or 9:16)

For a show with a story arc across episodes.

### 60 s weekly skeleton

| Slot | Time | Locked | Free |
|---|---|---|---|
| Cold open | 0 to 5 s | style | the moment (often the last cliffhanger's answer) |
| Recurring first shot and title room | 5 to 9 s | place, light, framing, move, the empty sky for the title | the time of day only if the story says so |
| Recap (optional) | over the first shot | narration form | the line |
| Act one | 9 to 25 s, 3 to 4 shots | style, place lines | the want, the problem |
| Act two | 25 to 45 s, 4 to 5 shots | style | attempts, a friend, a complication |
| Act three | 45 to 55 s, 2 shots | style | the solution, held |
| Sign-off and cliffhanger | 55 to 60 s | final framing, sign-off line, motif | the new question |

Cost on Veo 3.1 Fast (9 clips of 4 s, 3 of 8 s): 9 x 14 + 3 x 28 = 210,
opening images about 24, narration about 1: about 235 per episode, about 940
for four a month (Studio). On Seedance 2.0 Fast (10 of 5 s, 2 of 10 s):
10 x 11 + 2 x 22 = 154, plus about 25: about 179 per episode, about 716 a
month.

### 90 s weekly skeleton

The 60 s skeleton with a midpoint turn at about 45 s (a second complication
or a reveal) and an act two of 6 to 7 shots. About 17 clips; over 90 s,
split the episode into two parts.

## 4. Kids series

| Rule | Why |
|---|---|
| Gentle light only (warm daylight, golden hour, lantern glow); never frightening low key | Young viewers and parents |
| Cuts every 4 to 6 s; slow push-ins and static frames; no shaky camera, no fast cuts | Readable for small children |
| Narration 1.8 to 2.1 words per second, simple words, repetition, one catchphrase per episode | Comprehension and recall |
| A fixed opening (for example the rooftop at sunrise, the first ripe tomato) and a fixed goodbye or goodnight sign-off | Ritual |
| A small problem, two tries, help from a friend, a kind solution, a one-line moral | The fable shape children follow |
| Medium shots over open-mouth close-ups; check every frame for extra eyes, odd teeth, extra limbs | Artefacts frighten children more than adults |
| Animal heroes on all four paws unless the bible says otherwise | Models stand animals up |
| Captions in the `caption` boxed style or `youtube` serif, large | Read-along |
| The channel's made-for-kids setting at publish | Platform rules |

### 60 s kids skeleton

Home world (8 s, 2 shots), the problem (8 s, 2 shots), the journey with
two tries (30 s, 6 shots), help and the solution (10 s, 2 shots), the
goodnight sign-off (4 s, 1 shot, locked). Narration about 100 to 110 words.
Cost on Veo 3.1 Fast (13 clips, 11 of 4 s and 2 of 8 s): 11 x 14 + 2 x 28 = 210, plus about 27 for opening images and narration: about 237 per episode.

## 5. Educational series

| Slot | Locked | Free |
|---|---|---|
| The question of the day (0 to 3 s) | the recurring opening framing, the narrator's opening phrase ("Today's question:") | the question, its image |
| The answer in 3 to 4 steps | style plate, one visual per step | the facts, each pictured literally |
| The recurring segment ("Try it at home", "One more thing") | the segment's framing and sound cue | the content |
| Recap and next question | the sign-off line | the recap sentence and the teaser for next time |

Facts come from the user or from well-known knowledge stated plainly; no
invented numbers. 30 s episode: about 65 words, 6 to 7 shots; about 100
credits per episode on Veo 3.1 Fast.

## 6. Creator series (a recurring persona or mascot)

For a creator's channel: the same mascot or character in a recurring
situation (a cat reviewing breakfasts, a robot learning one human habit a
day).

- The persona is a bible character with references; never the creator's
  face unless it is their own, with their photo and consent. There is no
  avatar or lip-sync route: the persona does not speak on camera in sync; the
  narrator or captions carry the words.
- Format: hook (the day's situation in one image), the reaction beat, the
  verdict or the lesson, the sign-off gesture. 15 s, 3 shots.
- Cost on Seedance 2.0 Fast: 3 x 11 = 33, plus about 7: about 40 per episode;
  three a week is about 520 a month.

## 7. Micro-drama series (vertical, 60 to 90 s)

Episodes of a serial drama for vertical feeds: every episode ends on a
cliffhanger, every episode opens on its answer.

- Cold open on the last cliffhanger, answered in 5 s.
- Two or three dialogue scenes, each with one turn (see lavendly-cinematic
  for coverage and dialogue limits).
- The last 5 s: the new cliffhanger, a face holding a reaction.
- 9:16 framing: faces between 15 and 55 percent of frame height; two-shots
  stacked, not side by side.
- Cost on Veo 3.1 Fast for 60 s: about 235 per episode; two a week fits
  Studio.

## 8. Anthology series

Same format, different cast each episode (a different fable per week, the
same narrator, the same storybook style). The bible locks the style line,
the narrator, the score motif and the format beats; the cast block is per
episode. References are made per episode and are not carried over.

## 9. A format check per episode

- [ ] Every locked field identical to the bible, word for word.
- [ ] The cold open answers or deepens the last cliffhanger.
- [ ] The recurring first shot and the sign-off are in their usual places.
- [ ] The recap, if any, is one line and under 10 percent of the runtime.
- [ ] The cliffhanger is a picture, held 2 to 4 s.
- [ ] Narration within the word budget; the voice and the score are the
      show's.
