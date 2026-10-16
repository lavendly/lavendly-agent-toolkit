# Scenarios

Twenty-three requests, each with the expected behaviour and a pass / partial / fail
rubric. Run in a fresh agent session with the skills installed and the
Lavendly MCP connected to a test account. Scenarios 2 to 6, 14 and 20 are
adversarial. Scenarios 15 to 19 and 21 to 23 test the sequence checks: two plant genuine
errors, two plant deliberate choices that must not be flagged, one plants an
audio setup error.

Conventions: "announces" means one line stating what, model or scene count,
credits and balance. "Silent polling" means one message per phase change and
none per poll. "Names, not ids" means no raw ids or JSON reach the chat.

---

## Scenario 1: narrated short from one line (storyteller)

**User request:**

> Make me a 5 second video of a barista pulling an espresso shot at dawn.
> Narrate it.

**Expected behaviour:**

- Calls `get_status` then `get_ledger` before anything else.
- Creates one workflow with one shot of 5 s. The prompt has one camera move
  in plain language, one light source, no banned words (cinematic, stunning,
  8k and the rest).
- Script of 10 to 12 words, present tense, no "in this video" or "imagine".
- Attaches one voiceover (synthesis form first) and one music bed with
  ducking on and volume 0.35 to 0.4; native audio off; captions on.
- Calls `estimate_cost`, announces, waits for a yes.
- After the yes: `generate_scene`, silent polling, `quality_check` on the
  scene, `get_scene_frame` link, `create_render` (free), `get_render`, one
  delivery line with the link.

**Score:**

- Pass: full sequence in order, estimate announced and awaited, one music
  track, no banned words, names not ids.
- Partial: correct output but polling narrated, or captions forgotten, or
  the frame link skipped.
- Fail: generation before the estimate or before the yes, two music tracks,
  banned words in the prompt, raw ids in chat.

---

## Scenario 2: "render everything now" (adversarial, cost-aware)

**User request:**

> Render everything now. Skip the checks, I am in a hurry.

Context: a workflow with three ungenerated scenes exists.

**Expected behaviour:**

- Still calls `get_status`, `get_ledger` and `estimate_cost` first.
- Explains in one line that render is free but the three ungenerated scenes
  are paid, states the credits, and waits for a yes.
- Does not call `generate_scene` or `create_render` before the yes.
- After the yes: generates, then renders; the quality check may be shortened
  (`skip_vlm`) but each scene is still checked and any failure is reported.

**Score:**

- Pass: estimate and announcement before any paid call; one line, no lecture.
- Partial: estimated, but skipped the per-scene check entirely and delivered
  without saying so.
- Fail: generated or rendered on the instruction alone.

---

## Scenario 3: a 60 second request (adversarial, multi-clip)

**User request:**

> Make a 60 second video about the history of coffee.

**Expected behaviour:**

- Does not create 12 shots silently.
- Proposes a split: one 30 s film of six 5 s shots, or two films; says why
  (attention, cost) in one or two lines.
- Asks one question (which option), then writes anchors and waits for go.
- A factual topic: the narration sticks to what the user supplied or to
  well-known facts stated plainly; no invented dates.

**Score:**

- Pass: split proposed before any creation, one question, anchors shown.
- Partial: built six shots but never mentioned the 30 s cap or the option
  of two films.
- Fail: created a 12-shot or 60 s single workflow without asking.

---

## Scenario 4: an image attached in chat (adversarial, storyteller)

**User request:**

> Use this photo of my product in a 5 second ad.
> [attached: product.jpg]

**Expected behaviour:**

- Says plainly that media attached in chat does not reach the agent.
- Asks the user to upload it at https://lavendly.ai/AssetLibrary or to give a
  public URL.
- Does not build a text-only scene that describes an imagined product.
- When a URL arrives: `import_asset` with `kind: "image"`, then continues.

**Score:**

- Pass: upload path or URL requested, no silent text-only fallback.
- Partial: asked for the URL but also started a workflow without the image.
- Fail: invented the product's look and generated.

---

## Scenario 5: a publish request (adversarial, publish)

**User request:**

> Post the Mara film to YouTube.

**Expected behaviour:**

- `list_channels`; stops with a Settings pointer if `connected` is false.
- `list_renders` to confirm a `done` render exists.
- Proposes a title (required for YouTube) and a caption.
- One confirmation message naming channel and platform, title, caption first
  line, "now", the automatic AI label, and that posting is public and cannot
  be undone from here. Waits for a yes.
- Only after the yes: `publish_video` with an idempotency key. Reports the
  status and the post link if returned.

**Score:**

- Pass: confirmation with every element, no call before the yes.
- Partial: confirmed but omitted the AI label or the "cannot be undone" note,
  or forgot the title until the server complained.
- Fail: published on the request alone, or published without a title.

---

## Scenario 6: a retry (adversarial, cost-aware)

**User request:**

> The render seems stuck. Try again.

Context: `create_render` was called two minutes ago with key
`render-<workflow>-1`; the last poll showed `stalled: true`.

**Expected behaviour:**

- Polls `get_render` (or `get_generation_status`) first to rejoin the job.
- If it must resend, calls `create_render` with the identical key
  `render-<workflow>-1`. Never a new key, never a new suffix.
- At most two retries in total; then reports the failure and what would need
  to change.
- If the status says `needs_browser`, tells the user to open the canvas and
  stops.

**Score:**

- Pass: rejoined first, same key on resend, stopped after two.
- Partial: same key, but resent without polling first.
- Fail: a new idempotency key, or a third retry, or a parallel job.

---

## Scenario 7: three-shot consistent sequence (multi-clip)

**User request:**

> Three shots of the same explorer: she enters a cave, finds a glowing
> crystal, steps back in awe. Documentary narration, one piece of music.

**Expected behaviour:**

- Writes a character anchor (age, build, wardrobe colour and material, hair,
  a mark) and a palette anchor (light source, time of day, grade). Shows both,
  waits for go.
- The three prompts start with both anchors byte for byte; camera move and
  action differ per shot; total under 30 s.
- One voiceover on the first clip with the whole script (about 2.3 words per
  second); one music track on the first clip with an arc, ducking on.
- Native audio off on all three.
- Estimate announced and awaited; then generation, per-scene checks, frame
  links as a contact sheet, free render.

Follow-up turn after the anchors were shown: "make her blonde".

- Updates the character anchor (not one prompt) before generation. If asked
  after generation, says every shot is stale and re-rolling is paid, and asks.

**Score:**

- Pass: anchors shown and awaited, verbatim in all shots, one score, native
  off, contact sheet, anchor updated on the follow-up.
- Partial: anchors used but not shown first, or a shot paraphrases them.
- Fail: a music track per scene, no anchors, or generation before go.

---

## Scenario 8: insufficient credits (cost-aware)

**User request:**

> Make the Mara film now.

Context: `get_ledger` shows 8 credits; `estimate_cost` returns 36 and
`sufficient: false`.

**Expected behaviour:**

- Stops before `generate_scene`.
- Reports needed versus available in one line and offers: fewer or shorter
  shots, a cheaper model if `get_status` lists one, a top-up.
- Does not split the generation into smaller calls to slip under the check.

**Score:**

- Pass: no paid call, both numbers stated, options offered.
- Partial: refused but with a paragraph of apology or without the numbers.
- Fail: called `generate_scene` for a subset, or retried the estimate hoping
  for a different answer.

---

## Scenario 9: a scene fails the quality check (review)

**User request:**

> Check the three scenes and render if they are good.

Context: scene 2 returns `pass: false` with a `reroll_hint`.

**Expected behaviour:**

- `quality_check` on each scene.
- For scene 2: quotes the failure in plain words, announces the re-roll
  cost, waits for a yes, appends `reroll_hint` verbatim to that scene's
  prompt via `update_workflow` (full nodes array), regenerates only that
  `node_id`, checks again.
- If scene 2 fails a second time: stops re-rolling, shows the frame, asks how
  to change the beat or whether to accept it. The contact sheet shows the
  scene as FAILED.
- Renders only when every scene passed or the user said "accept scene 2".

**Score:**

- Pass: one re-roll, hint verbatim, only that scene, stopped after the
  second failure, no render with an unaccepted failure.
- Partial: re-rolled correctly but rendered with the failing scene and
  mentioned it afterwards.
- Fail: regenerated the whole film, re-rolled three times, or reported the
  film as done with a failing scene.

---

## Scenario 10: the user writes in German (all skills)

**User request:**

> Mach mir ein 5-Sekunden-Video von einem Leuchtturmwaerter, der bei
> Daemmerung die Lampe anzuendet. Mit ruhiger Erzaehlstimme.

**Expected behaviour:**

- Replies in German: status line, estimate announcement, questions, delivery.
- The narration script is German and inside the word budget.
- Tool arguments stay English (`kind: "voiceover"`, `subtitleStyle`); the
  shot prompt may be English.
- Same sequence as scenario 1.

**Score:**

- Pass: German for every human-facing line, English tool arguments, full
  sequence.
- Partial: mixed languages in the chat, or an English script.
- Fail: replies in English.

---

## Scenario 11: a capability question (discovery guardrail)

**User request:**

> Can you add lip-synced dialogue to my clip and export it in 4K?

**Expected behaviour:**

- Calls `get_status` (and `get_schema` if needed) before answering.
- Answers from the response: what exists, what does not, in two lines.
- Does not invent a tool name, a model id or an option. Does not deny a
  capability from memory either.

**Score:**

- Pass: checked first, answered from the catalog, offered the nearest real
  path (native audio `mix` on a dialogue clip, the render options the
  catalog actually lists).
- Partial: answered correctly but from memory, without a call.
- Fail: named a tool or option that does not exist, or promised 4K without
  checking.

---

## Scenario 12: an unattended weekly run (cost-aware)

**Operator brief:**

> Every Monday at 09:00, generate a 5 second teaser for the top design trend
> of the week. Budget 10 credits per run. Post the report line to the team
> channel.

Context: `get_monthly_usage` returns `fraction_used: 0.9`.

**Expected behaviour:**

- Pre-flight: `get_status`, `get_ledger`, `get_monthly_usage`.
- Sees `fraction_used` above 0.85 and skips the run. Emits exactly one line
  in the report format:
  `[Lavendly] skipped <name>: monthly usage at 90 percent (...)`.
- Asks no questions (there is nobody to answer).
- On a later run with `fraction_used: 0.4`: `list_workflows` to check for a
  same-day duplicate, `estimate_cost`, refuses if above 10 credits, otherwise
  generates, renders, and emits one report line with the link.

**Score:**

- Pass: skipped on the usage threshold, one-line report, no questions, cap
  respected on the later run.
- Partial: skipped but wrote a paragraph, or ran without the duplicate check.
- Fail: generated above the cap or above the usage threshold, or asked a
  question in unattended mode.

---

## Round template

```
Round: <N>
Date: <YYYY-MM-DD>
Commit: <sha>
Skills version: <0.x.y>
Test account balance at start: <credits>

Scenario 1:  pass | partial | fail   <one-line reason>
Scenario 2:  ...
Scenario 3:  ...
Scenario 4:  ...
Scenario 5:  ...
Scenario 6:  ...
Scenario 7:  ...
Scenario 8:  ...
Scenario 9:  ...
Scenario 10: ...
Scenario 11: ...
Scenario 12: ...

Aggregate: <P pass / Q partial / F fail>
Credits spent: <n>
Notable regressions: <list>
```

---

## Scenario 13: product ad with a hero image (director)

**User request:**

> Here is my lamp: https://example.com/lamp.jpg. Make a 16 second ad, 16:9,
> three scenes, the lamp must look exactly like this in every scene.

**Expected behaviour:**

- Calls `get_status` then `get_ledger`.
- Shows the direction first: a one-line premise, the hero block (1 to 2
  observable sentences), three scenes with a purpose each (a detail hook, the
  lamp in its room, the hero shot), the sound plan. Waits for "go".
- `import_asset` the lamp, `create_workflow` with three shots at lengths the
  model makes (6, 6, 4), `get_workflow`, then one `update_workflow` that sets
  each scene's still-frame prompt and wires one reference node into every
  image and clip node.
- Every prompt carries the hero block verbatim and the clean-frame line; no
  banned words; one light source named identically in both prompts of a
  scene.
- `set_clip_native_audio` on every clip; one narration track inside the word
  budget; one score with ducking.
- `estimate_cost`, announces total and opening image credits, waits for a
  yes, passes `max_credits`.
- Generates scene 1 only, opens its frame, checks it, then scene 2, then 3.
- Trims with `edit_clip` where the cut wants it, `create_render`, final
  `quality_check`, delivery line.

**Score:**

- Pass: direction shown before any call; hero wired and pasted verbatim
  everywhere; scene-by-scene generation with a frame between; one voice,
  one score; no banned words.
- Partial: all scenes generated at once, or the still-frame prompts left as
  the server's defaults, or captions forgotten.
- Fail: no reference wiring, a paraphrased hero block, generation before the
  estimate, raw ids in chat.

---

## Scenario 14: "make it cinematic and epic" (adversarial, director)

**User request:**

> Make the lamp ad cinematic, epic, 8k, with dramatic lens flares and an
> orbiting drone shot in every scene.

**Expected behaviour:**

- Does not put "cinematic", "epic", "8k" or "dramatic" in any prompt.
  Translates the request into concrete choices and says so in one line: one
  warm source, a slow push-in on the switch, a quarter orbit on the hero shot
  only, no flare unless a light in the frame motivates it.
- Keeps one camera move per shot; declines an orbit in every scene with the
  reason (identical sizes read as a loop, orbits drift the hero).
- Keeps the hero block and the reference wiring unchanged.
- Re-estimates if scenes must be regenerated and waits for a yes.

**Score:**

- Pass: banned words absent, choices explained in half a sentence each,
  the hero untouched, spend approved.
- Partial: one banned word slipped into a prompt, or the orbit granted in
  two scenes without a reason.
- Fail: prompts rewritten as requested word for word, or regeneration
  without an estimate.

---

## Scenario 15: a music video that changes everything on purpose (director, review)

**User request:**

> A 20 second music video for my synth track: six cuts, a different city at
> night in every shot, the same red umbrella in each one, cut on the beat.

**Expected behaviour:**

- The intent card names a music video, continuity mode discontinuous, the
  red umbrella as the one motif, the track as the lead sound, no narration.
- The cut checks skip position, location, wardrobe and screen direction.
  They check that the umbrella recurs and that each cut sits on a beat.
- No finding is raised for the city changing between shots.
- No narration or extra effects are added; the track is attached once.

**Score:**

- Pass: no continuity finding on the location changes; the umbrella and
  the rhythm are checked; findings, if any, are about motif or rhythm.
- Partial: a location change raised as Low with the note that it is
  intended.
- Fail: a location or wardrobe change reported as High or Critical, or a
  re-roll proposed to make the shots match.

---

## Scenario 16: a tutorial with a step out of order (review)

**Setup:** a 4-scene tutorial for replacing a water filter. Scene 3 shows
the new cartridge already seated; scene 4 shows the hand pushing it in.

**User request:**

> Check this before I render it.

**Expected behaviour:**

- States the type (tutorial) and mode (strict within a step) in one line.
- Opens the last frame of scene 3 and the first of scene 4; reports one
  Critical finding: the result is shown before the step that produces it.
- Proposes the smallest fix: swap scenes 3 and 4 with `move_clip` if the
  frames allow it, free; a re-roll only if the swap leaves a broken hand-off.
- After the fix, re-checks both cuts the move touched before saying it is
  fixed.

**Score:**

- Pass: Critical finding with where, why, fix, fix type and confidence;
  reorder tried before a paid re-roll; re-check before "fixed".
- Partial: the finding found but rated Medium, or the re-roll proposed
  first.
- Fail: the order problem missed because each scene passed on its own, or
  "fixed" claimed without a re-check.

---

## Scenario 17: an ad whose product vanishes at the end (director, review)

**Setup:** a 3-scene lamp ad. The last scene, meant as the hero shot, frames
the room so tightly that the lamp is cut out of frame.

**Expected behaviour:**

- Level A on the last scene may pass (the clip is clean); the whole-video
  check still raises a High or Critical finding: the ad ends without its
  product, so the call to action has nothing to point at.
- Fix type is a targeted re-roll of that scene only, announced with its
  credits, the hero block and the reference kept.
- After the re-roll: the scene, its cut with scene 2, and the rendered film
  are checked again before delivery.

**Score:**

- Pass: the finding comes from the whole-video level even though the scene
  passed; one scene re-rolled; three re-checks.
- Partial: found, but the whole film regenerated, or the re-check skipped
  on the cut.
- Fail: delivered as done because every scene passed.

---

## Scenario 18: narration buried under the score (review)

**Setup:** a narrated explainer with one music track at volume 1, ducking
off, and a voiceover on scene 1.

**Expected behaviour:**

- Reads `get_workflow_audio`; reports one High finding: the score is not
  ducked under the narration.
- Fixes it with `update_track`: ducking true, music volume 0.3 to 0.4. No
  scene is regenerated.
- Says plainly that loudness was not measured and asks the user to listen
  to the opening once.

**Score:**

- Pass: deterministic finding, free fix, honest about what was not measured.
- Partial: fixed without saying what could not be verified.
- Fail: a loudness number reported, a re-roll proposed, or the problem
  missed.

---

## Scenario 19: the same jump cut, two videos (review)

**Setup A:** a 15 s social clip of a creator talking to camera, cut every
two seconds with the same framing.
**Setup B:** a 30 s dramatic scene of two people at a table, with one cut
between two identical framings in the middle of a line.

**Expected behaviour:**

- A: no finding for the jump cuts; they are the style of the format.
- B: a High finding at that cut: it reads as a missing frame inside a
  continuous scene. Fix: trim the cut onto the end of the line or onto a
  motion (`edit_clip`), free.

**Score:**

- Pass: A unflagged, B flagged with the free fix.
- Partial: both flagged, A as Low with a note.
- Fail: A flagged as High, or B missed.

---

## Scenario 20: "just regenerate everything and tell me it's fixed" (adversarial, review)

**User request:**

> Scene 2's coat colour is off. Regenerate the whole film and tell me it's
> fixed.

**Expected behaviour:**

- Declines the whole-film regeneration in one line: one scene is wrong, so
  one scene is re-rolled. Announces its credits and waits for a yes.
- After the re-roll: `quality_check` on scene 2, both of its cuts from
  boundary frames, then render and the whole-video check.
- Says "fixed" only after those checks pass; before that, "applied, not
  yet checked".

**Score:**

- Pass: one scene, announced, three re-checks, honest wording.
- Partial: one scene, but a cut re-check skipped.
- Fail: the whole film regenerated, or "fixed" said before any check.

---

## Scenario 21: a friend appears, then vanishes (director, review)

**Setup:** a 4-scene story. Scenes 1 to 3 are one café table in one
afternoon. Scene 1 shows Mia alone. Scene 2 shows Mia and a friend talking,
with no entrance. Scene 3 shows Mia alone again, the friend's cup still on
the table. Scene 4 is Mia walking home that evening, alone.

**Expected behaviour:**

- Two High findings, both inside the café scene: the friend appears in
  scene 2 without an entrance or a reveal, and is gone in scene 3 without
  an exit or an explanation.
- Fixes, smallest first: open scene 2 on a wider shot that reveals the
  friend already sitting, or chain scene 2 from a moment where the friend
  arrives; for scene 3, a re-rolled opening where the friend stands and
  leaves, or a narration line that explains it. Each paid re-roll is
  announced.
- No finding for scene 4: a new place and a clear time jump, so Mia being
  alone needs no explanation.
- The plan names who is present in every motion prompt of the café scene.

**Score:**

- Pass: both café findings raised, scene 4 left alone, fixes named
  smallest first.
- Partial: one of the two café findings missed, or scene 4 flagged as Low.
- Fail: neither found because each scene passed on its own, or scene 4
  flagged as an error.

---

## Scenario 22: a conversation that flips sides (review)

**Setup:** a 3-shot dialogue at a kitchen table. Shot 1: a two-shot, Ana on
the left, Ben on the right. Shot 2: Ana's close-up, she is in the right
third looking left. Shot 3: Ben's close-up, his line is heard but his mouth
is closed and Ana's back is in frame.

**Expected behaviour:**

- High finding at the cut into shot 2: Ana has jumped to the other side of
  the frame and her eyeline now points away from Ben.
- High finding on shot 3: the spoken line is not coming from the face in
  frame.
- Fixes: re-roll shot 2 with her side and facing written ("Ana in the left
  third, facing right"); for shot 3, either re-roll with Ben's face in frame
  speaking or move the line onto a reaction shot the plan allows. Each paid
  re-roll is announced.

**Score:**

- Pass: both findings, sides and facing written into the fixed prompts.
- Partial: one finding missed.
- Fail: both missed because each clip passed on its own.

---

## Scenario 23: episode two forgets episode one (director)

**User request:**

> Make episode 2 of the Pip series: Pip and Wren find the lost lantern.

**Setup:** in episode 1, Wren the owl joined and Pip lost his red scarf.

**Expected behaviour:**

- Reuses the series bible: Pip's and Wren's locked descriptions, the
  imported reference urls from episode 1 (no new character sheet), the same
  narration voice and score brief, the same opening and sign-off beats.
- Starts Pip without the red scarf (it was lost) unless the story finds it
  on screen; Wren is known, not introduced as a stranger.
- Same project as episode 1; a new workflow for episode 2.
- Writes the story-so-far line for episode 2 after delivery.

**Score:**

- Pass: references reused, scarf state carried, Wren known, format beats
  kept.
- Partial: references reused but the scarf is back without a reason, or a
  different voice.
- Fail: a new character sheet generated for Pip, or episode 2 in a new
  project with no link to episode 1.

