---
name: lavendly-explainer
version: 0.2.0
priority: normal
description: |
  Make explainers, lessons, how-tos, documentaries, history, science, news explainers and staff training on the Lavendly MCP: script first at 2.5 words per second, a picture that shows each claim, numbers spoken not drawn, illustrative footage labelled.
  Use when: "explain how vaccines work", "a 60 s history of the printing press", "how to repot a plant", "a nature short about otters", "turn this report into a video", "onboarding video for staff".
  Chain: lavendly-director runs the process; lavendly-storyteller for one shot; lavendly-social for hook-led Shorts.
  NOT for: AI footage shown as real news or archive, real people's likeness, charts or UI drawn by the model, films over 90 s, media pasted in chat.
argument-hint: "[topic or script] [sub-genre] [duration 15..90] [aspect 16:9|9:16] [audience] [sources]"
---

# Lavendly Explainer

An explainer is judged by one thing: after one viewing, can the viewer repeat
the idea? Everything here serves that. The narration is written first and is
the clock; every sentence gets a picture that shows what it claims; nothing
the model cannot draw truthfully (text, numbers, charts, real people, real
events) is asked of it. This skill holds the field knowledge for explainers,
education, tutorials, documentary, history, science, news and training on
Lavendly. lavendly-director owns the shared process (intent card, sequence
plan, ledger, three-level checks, repair); this skill supplies the genre
decisions on top.

## Before anything else

- `get_status` and `get_ledger` once per session. Never claim a capability
  from memory; `get_schema` when unsure of an argument.
- Load lavendly-director when installed and follow its process. The
  Sequence below is complete on its own when it is not.
- Name the sub-genre and open its recipe (Decision rules, first table).
- Facts come from the user, from sources the user names, or from settled
  common knowledge stated plainly. Specific numbers, dates, quotes and
  study results need a source the user gave. Never invent one; ask.
- Run the concept gate before any spend
  ([references/script-writing.md](references/script-writing.md) section 5).

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, voices, credits |
| 2 | write | Sub-genre, audience, platform, aspect, length; intent card (type explainer, educational, tutorial, documentary or presentation; continuity flexible, strict for a tutorial step that spans shots) |
| 3 | write | Concept gate: the film retold in three sentences; the muted viewer's three answers; the one image |
| 4 | write | Script first, inside the word budget, numbers spelled out; count the words per line ([references/script-writing.md](references/script-writing.md)) |
| 5 | write | Beat sheet: one idea per beat, a picture per sentence from the recipe and [references/visual-metaphors.md](references/visual-metaphors.md); mark each beat Picture or Page |
| 6 | write | Shot list from the recipe tables; a still-frame prompt and a motion prompt per shot ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 7 | show | Script with word counts, shot list (one line each), look line, sound plan, model and credits; wait for "go" |
| 8 | `import_asset` | Real footage, screen recordings, photos, a hero or style reference the user supplied |
| 9 | `create_workflow` | `shots` in order, `aspect`, `videoModel`, `idempotency_key` ([references/mcp-calls.md](references/mcp-calls.md)) |
| 10 | `get_workflow`, `update_workflow` | Still-frame prompts on the image nodes; reference node with its role; imported footage as ready clips |
| 11 | `set_clip_native_audio` | Every clip: `mix` 0.2 to 0.4 under narration, `native` only where the sound is the point, `off` for silent illustration |
| 12 | `attach_track`, `update_workflow` | One voiceover with the whole script and a caption style; one score with `ducking: true`; then `update_workflow` edges from both to every clip, confirmed with `get_workflow_audio` (`scope` only once `get_schema` lists it) ([references/mcp-calls.md](references/mcp-calls.md)) |
| 13 | `estimate_cost` | Announce in one line; wait for a yes |
| 14 | `generate_scene` | Scene 1, open its frame, check, then the rest in order |
| 15 | `get_scene_frame`, `quality_check` | Per scene: the picture shows its line, no drawn text, the truth check; then each cut |
| 16 | `edit_clip`, `split_clip`, `move_clip` | Cut on sentence ends; trim warm-up; fades only for chapters |
| 17 | `create_render`, `get_render` | Free |
| 18 | `quality_check`, `get_workflow_audio` | Whole film: the muted test, narration inside its picture, labels said; deliver with the disclosure line |

## Decision rules

### Sub-genre routing

| The brief | Recipe | Default aspect, length | Lead sound |
|---|---|---|---|
| Narrated knowledge short for a channel, no presenter | [references/recipe-faceless-explainer.md](references/recipe-faceless-explainer.md) | 9:16 30 to 60 s, or 16:9 60 to 90 s | Narration and score |
| Teach one concept (how, why, what is) | [references/recipe-concept-explainer.md](references/recipe-concept-explainer.md) | 16:9 or 9:16, 30 to 60 s | Narration |
| Steps toward a result | [references/recipe-how-to.md](references/recipe-how-to.md) | 9:16 short, 16:9 long, 30 to 60 s | Narration and tool sounds |
| Observe animals, places, people, processes | [references/recipe-documentary-nature.md](references/recipe-documentary-nature.md) | 16:9, 30 to 90 s | Natural sound, sparse narration |
| A past event, era or invention | [references/recipe-history.md](references/recipe-history.md) | 16:9, 60 to 90 s | Narration and score |
| A mechanism, a finding, a set of numbers | [references/recipe-science-data.md](references/recipe-science-data.md) | 16:9 or 9:16, 30 to 60 s | Narration |
| A current story, what happened and why it matters | [references/recipe-news-explainer.md](references/recipe-news-explainer.md) | 9:16 or 1:1, 30 to 60 s | Narration, neutral bed |
| A procedure, policy or skill for staff | [references/recipe-corporate-training.md](references/recipe-corporate-training.md) | 16:9, 60 to 90 s per objective | Narration, boxed captions |

A brief that mixes two (a history of a scientific idea) takes the structure
of the first and the guards of both.

### The script is the clock

- Write the narration before the shot list and count it. The server's
  ceiling is 2.5 words per second of picture (15 s = 37 words, 30 s = 75,
  60 s = 150, 90 s = 225); a voice longer than its picture freezes the last
  frame. Aim lower by type: documentary 2.1, tutorial 2.3, explainer 2.4.
- The first sentence is the hook and is spoken from 0.0 s. It lands inside
  2.5 s: six words or fewer before the first full stop.
- Numbers are spelled out as they are spoken ("about forty percent", "in
  nineteen sixty-nine"); one number per sentence; compare it to something
  the viewer can see.
- Signpost structure out loud ("First", "The second reason", "Here is the
  catch", "So"). Name the subject again after any aside.
- Lines, budgets, hook templates, arcs and the retention beats are in
  [references/script-writing.md](references/script-writing.md).

### One idea per scene, the picture shows the claim

- Every sentence gets a picture that shows what it says: literally (the
  root ball goes into the pot) or by a metaphor the narration declares once
  ("think of the cell as a factory") and the section keeps. Never decorative
  footage under a fact.
- Words-off test: describe each shot with the narration removed. A shot
  that shows nothing the viewer needs is a page, not a picture; more than a
  third of the runtime like that means rework the beats before spending.
- Introduce before use: the thing before its part, the term before it is
  used, the tool before the step, the problem before the fix.
- Two shots per beat under one continuous line (a wide that sets the
  context, then a detail that proves it), cutting mid-sentence. Adjacent
  shots never repeat a shot size or a camera move (two push-ins in a row);
  locked-off may repeat when the size changes; the payoff is static.
- Every third shot is a 3 to 4 s insert that changes the angle (macro, top
  down, a point of view).

### What the model must not draw

- No readable text, digits, charts, graphs, equations, labelled diagrams,
  maps with names, interface screens, signs, logos or watermarks. Write the
  surfaces as blank ("a blank paper label", "an unlabelled relief map", "a
  monitor turned away from the camera", "printed lines too soft to read").
- Data is spoken and shown in captions from the narration; a physical
  comparison may show direction (more, less, rising) but never a value.
- Real screens, real charts, real documents and real footage are imported
  by the user (`import_asset`) and placed as ready clips. Leave negative
  space for titles the user adds in the app; say where.

### Truth and labels

- AI footage is never presented as a real event, a real place at a real
  moment, archive footage or evidence. Illustrative scenes look like
  illustration (a diorama, a miniature, paper, clay, a symbolic still life)
  or the narration or the post caption says "illustration" or
  "reconstruction". News and history follow their recipes' stricter rules.
- No real person's likeness, living or historical, and no real logo or
  brand: name people in the narration only and show objects, hands, places
  or anonymous figures at distance or from behind. Never put a real
  person's name in a prompt.
- Illustrative numbers are said to be illustrative ("example figures").
  Health, finance and legal topics stay general information; no AI picture
  is offered as proof of a result.
- Animal behaviour shown is real behaviour of that species, described
  precisely; nothing impossible is presented as observed.

### Look

- One style line for the whole film, first in every prompt, from
  [references/prompt-anchors.md](references/prompt-anchors.md) section 3:
  observational documentary, macro lab, clean studio tabletop, paper
  diorama, clay miniature, illustrated still life. Choose an illustrated
  look when the subject is abstract, current news or a sensitive real event.
- One light recipe per film, written once and pasted verbatim into every
  still-frame prompt of a scene.

### Models and credits

| Pick | Model (display name) | Why | 15 s | 30 s |
|---|---|---|---|---|
| Default | Veo 3.1 Fast | 1080p, native ambience, 2 references, 16:9 and 9:16; 4 s and 8 s clips | 67 | 132 |
| Best | Veo 3.1 | Finest texture and light for documentary and science macro | 199 | 396 |
| Value with references | Wan 2.7 | 1080p, sound, 4 references, 1:1 and 4:3 too; 5 s and 10 s clips | 45 | 88 |
| Value 1080p | Seedance 1.5 Pro | 1080p, sound, 4 references, 4 to 12 s | 51 | 100 |
| Draft | Veo 3.1 Lite (Auto) | Cheapest Veo; never wire references to it | 51 | 100 |
| Long observational holds, 16:9 | Hailuo 2.3 | 10 s for 20 credits, 1080p, silent (narration and score carry sound) | 47 | 70 |

Totals include opening images (about 2 each), one voiceover (1) and the
score (2 for 15 s, 3 for 30 s). On Free and Starter the export is 720p:
a 1080p model adds cost, not sharpness. Durations come from each model's
exact list (Veo 4, 6, 8 only; 6 s costs as much as 8 s). Full table and
the formula: [references/models-and-credits.md](references/models-and-credits.md).

### Sound

- Narration leads: one voice for the film, named once, one track with the
  whole script on the first clip, then an `update_workflow` edge from it
  to every other clip (and the same for the score), confirmed with
  `get_workflow_audio`, so both run film-wide and the score ducks
  under the voice. Under it every clip is `mix` at 0.2 to
  0.4 and the motion prompt says "No music." (Veo adds its own). A clip
  whose sound is the point (a click, a bird call, a pour) stays `native`
  and gets a gap in the script.
- One score: 60 to 95 BPM, instrumental, an arc (opens, builds under the
  mechanism, settles on the takeaway), volume 0.25 to 0.35, `ducking: true`.
  Documentary keeps the score at 0.2 and lets the ambience carry.
- Captions: `youtube` for 16:9, `tiktok` or `reels` for 9:16, `caption`
  (boxed) for training and accessibility-first briefs, `off` only on request.

### Length and parts

- One film is 15 to 90 s. The export stops at 180 s; topics that need more
  become parts, each ending on the question the next part answers. A
  ten-minute YouTube essay is not one Lavendly film: offer chapters.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from `mood`
plus `duration` on servers that carry the synthesis update. Try that form
first. If the server answers `url required`, ask the user to make the voice
or the music in the Lavendly app (Asset Library), then attach the hosted file
by `url`. A voiceover attached by `url` carries no word timings, so it gets
no burned captions; say so and offer the synthesized voice instead.

## When to stop

- The brief asks for AI footage of a real event as if filmed, a real
  person's face or voice, a fake archive clip, or a chart the model draws:
  decline that part in one line and offer the illustrated or imported
  version in the same message.
- Specific claims with no source on news, science, health, finance or
  history: ask for the source before writing the script.
- `sufficient` is false, or the user declines the estimate.
- More than 90 s in one film: propose parts.
- `needs_browser`, `stalled` twice, the same failure twice on one scene: as
  lavendly-director says.
- Media pasted in the chat: ask for an Asset Library upload or a public URL,
  then `import_asset`.

## UX rules

1. Show the script first, one line per scene with its word count and the
   picture beside it; that is where explainers are fixed cheaply.
2. Say what the model will not draw and where the user's own titles go.
3. Names and links in chat, never ids or JSON. Models by display name.
4. Silent polling; one line per phase; a frame link per scene.
5. The user's language in chat; English in prompts and tool arguments; the
   narration in the language the audience hears.
6. Deliver with one disclosure line when illustrative or reconstructed
   footage is in the film, ready for the post caption.

## Reference docs

- [references/script-writing.md](references/script-writing.md): budgets by length, hooks, signposts, numbers in speech, arcs, the concept gate, retention beats.
- [references/visual-metaphors.md](references/visual-metaphors.md): concrete, filmable pictures for abstract ideas, by field.
- [references/models-and-credits.md](references/models-and-credits.md): every model's lengths, shapes, references, sound, credits; the cost formula; builds by length.
- [references/prompt-anchors.md](references/prompt-anchors.md): the two prompts, style lines, lock and clean-frame lines, blank surfaces, model dialects, banned words.
- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes, imported footage as a clip, voices.
- [references/troubleshooting.md](references/troubleshooting.md): failures and fixes.
- [references/recipe-faceless-explainer.md](references/recipe-faceless-explainer.md)
- [references/recipe-concept-explainer.md](references/recipe-concept-explainer.md)
- [references/recipe-how-to.md](references/recipe-how-to.md)
- [references/recipe-documentary-nature.md](references/recipe-documentary-nature.md)
- [references/recipe-history.md](references/recipe-history.md)
- [references/recipe-science-data.md](references/recipe-science-data.md)
- [references/recipe-news-explainer.md](references/recipe-news-explainer.md)
- [references/recipe-corporate-training.md](references/recipe-corporate-training.md)
