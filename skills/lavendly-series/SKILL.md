---
name: lavendly-series
version: 0.2.0
priority: normal
description: |
  Episodic video on the Lavendly MCP: the series bible (recurring cast, places, objects, format, voice, score, story so far), episode formats (cold open, recurring first shot, sign-off, cliffhanger, recap), one project per series and one workflow per episode, references imported once, earlier episodes and end states found, daily or weekly runs inside a budget.
  Use when: "a series", "episode 2", "the next episode", "a daily show", "a kids series about", "same characters as last time".
  Chain: lavendly-director runs each episode with the genre skill's craft; lavendly-cost-aware wins spend and unattended runs; lavendly-publish schedules.
  NOT for: one-off films, episodes over 90 s (split them), real people as recurring cast.
argument-hint: "[show name] [new series or episode N] [format: daily or weekly, length, aspect] [cast and places] [budget per month]"
---

# Lavendly Series

A series is a promise kept every episode: the same people, the same places,
the same opening and sign-off, a story that remembers. The bible is written
once and pasted word for word; the references are imported once and reused;
every episode starts from where the last one ended. Each episode is made
with the director's process and the genre skill's craft; this skill owns
what carries between episodes and the production around them.

## Before anything else

- Load lavendly-director when installed, and the genre skill the show
  belongs to (cinematic for drama, animation for cartoons and kids, explainer
  for education, social for creator formats). Its series-continuity notes
  are the base; this skill goes further.
- `get_status` and `get_ledger` once per session; `get_monthly_usage` for any
  run that repeats.
- New series or next episode? `list_projects` for the show's project, then
  `list_workflows` for its episodes (it returns the whole account with no
  filter: keep the rows with the show's `project_id`). Never start a second project for an
  existing show, and never ask the user for what the platform already holds.
- Never invent a tool, an argument or a model id; `get_schema` when in doubt.
  Never say the bible is stored on the server unless you wrote it into a
  description and read it back.

## Sequence

### A new series

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, credits, voices |
| 2 | write | The series bible ([references/series-bible.md](references/series-bible.md)): logline, cast, places, objects, style and forbidden list, voice, score motif, format |
| 3 | write | The episode format: the skeleton of slots, which fields are locked per slot and which change per episode ([references/episode-formats.md](references/episode-formats.md)) |
| 4 | write | The pilot plan (episode 1) with the genre skill; the cost per episode and per month at the chosen cadence |
| 5 | show | Bible, format, pilot plan, budget; wait for "go" |
| 6 | `create_project` | One project for the show; its description holds the short bible |
| 7 | `list_assets`, `import_asset` | Every recurring reference, once (character sheets, head close-ups, places, style plate): already in Lavendly, `list_assets`; a public URL, `import_asset`; keep the hosted urls in the bible |
| 8 | director steps | Episode 1 with `create_workflow` (`project_id`, the episode name); `set_scene_plan` per clip node (`heading` equal to the plan's heading, `present` from the closed cast, `hands_off`) before any generation; references wired, sound, estimate, scene-by-scene generation, checks (each cut with `previous_node_id`), render |
| 9 | `update_workflow` | After delivery: the episode's `description` gets its story-so-far line and its end state; `get_workflow` to read it back |

### The next episode

| Step | Call | Purpose |
|---|---|---|
| 1 | `list_projects`, `list_workflows` | The show's project; its episodes by name |
| 2 | `get_workflow`, `get_scene_plan` | The last episode: its description (story so far, end state), its reference nodes' hosted urls, its node prompts, and its stored scene plan (last heading, who was present, the final hand-off) |
| 3 | `get_scene_frame` | The last clip, frame last: the starting state of every recurring person and object |
| 4 | write | The episode plan on the format skeleton: only the free fields change; starting states from step 3; the story-so-far line it adds |
| 5 | show | The plan and the cost; wait for "go" (or the operator's cap in an unattended run) |
| 6 | director steps | `create_workflow` with the show's `project_id`; `set_scene_plan` for this episode before generating; the same references by url, the same voice and score brief, generate, check, render |
| 7 | `update_workflow` | Write this episode's story-so-far line and end state into its description |
| 8 | lavendly-publish | Schedule or post only after an explicit yes |

## Decision rules

### The bible is law

- Locked descriptions, place lines, the style line and the forbidden list
  are pasted verbatim into every prompt of every episode. A word changed is
  a different character. A change to the bible is a new version shown to the
  user, and it applies only to episodes made after it.
- The cast is closed: only bible characters appear, one of each. A newcomer
  is introduced on screen (an entrance shot, a line naming them) before they
  act, and is added to the bible after the episode.
- A character who left the show is not silently back: the episode says why.

### The format makes the show recognisable

- Every episode has the same beats in the same places: the cold open, the
  recurring first shot or title room, the sign-off. A viewer should know the
  show in one second, before any character speaks.
- Lock per slot what never changes (style, place, light, framing, camera
  move, sound); vary per episode only the opening state, the action, the end
  state and the narration. This is the series skeleton the platform's own
  episode engine uses.
- A recurring first shot is regenerated each episode from the same still
  prompt (and the same opening image url when the shot is identical by
  design); never paste an earlier episode's clip unless `get_schema` shows a
  way to place an imported video as a clip.
- Cliffhangers ask a question with a picture; the next episode's cold open
  answers it within 5 s. A recap is one line of narration or one shot, only
  when the episode depends on it.

### Continuity between episodes

- Starting states come from the last episode's final frame, not from memory:
  wardrobe, injuries, objects held, time of day, who is present.
- Continuous story (the next morning): states carry over. Time passed: say it
  on screen (light, season, a line) and reset what the time explains.
- References carry identity across episodes; frame chaining does not. Never
  chain from an earlier episode's frames beyond the first shot, and regenerate
  a clean keyframe from the sheet whenever a face has drifted.
- Same narration voice id and the same score brief (or the same hosted
  score) in every episode. A new voice is a new show.

### Cadence and budget

- Cost per episode times episodes per month must fit the plan's monthly
  credits (Free 35 plus daily claims, Starter 200, Creator 450, Studio 1,200,
  Enterprise 12,500) with room for one re-roll per episode. Show the monthly
  number before the pilot. Worked budgets in
  [references/production.md](references/production.md).
- Daily shows: 15 to 30 s, 3 to 5 shots, a value model (Seedance 2.0 Mini,
  Seedance 2.0 Fast, Hailuo 3 Max for narrated shots). Weekly shows: 60 to
  90 s with the genre's first-choice model.
- Unattended or scheduled runs follow lavendly-cost-aware: a hard cap per
  run and per month, `get_monthly_usage` before each run, a report after.
  The agent's host schedules the runs; the MCP schedules only the posts.

### Models

- One `videoModel` for the whole series. A model change mid-season changes
  the look; propose it between seasons.
- References are the identity backbone of a series: pick a model with a
  reference cap that fits the recurring cast in one shot (Seedance and Wan
  2.6 and 2.7: 4; most others: 2). Never Veo 3.1 Lite for a series with
  reference images.
- If the user keeps a Film Bible for the show in the app, the server adds
  its consistency block to every clip (in a scene with a stored plan, the
  plan's "In frame" line replaces its cast line); still write the locked descriptions
  into the still prompts (opening images are made from text). Ask once
  whether one exists; the MCP cannot read it.

### Kids series

- Gentle light, no frightening images, slow cuts (4 to 6 s), narration at
  1.8 to 2.1 words per second, repetition and a catchphrase, a goodnight or
  goodbye sign-off. Animal heroes move on all four paws unless the bible says
  otherwise. Mark the channel's made-for-kids setting at publish.

### Policy guards

- Recurring cast are fictional or the consenting creator; never a real
  person, celebrity or another show's characters.
- No franchise names, studio styles by name or protected characters in the
  bible or the prompts.
- An AI series is disclosed as AI-made when posted (lavendly-publish).

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration` on servers that carry the synthesis update. Try that
form first. If the server answers `url required`, ask the user to make the
voice or the score in the Lavendly app (Asset Library), then find it with
`list_assets` and attach its `url`; reuse that hosted score in every episode. `get_scene_frame`
takes a frame option (first, mid, last) where `get_schema` lists it; without
it, read the end state from the episode's description and say the
confidence is lower.

## When to stop

- The show's project or the last episode cannot be found: ask the user for
  the names before creating anything new.
- The bible and the last episode disagree (a character's coat, a place): ask
  which wins before generating.
- The monthly budget cannot cover the cadence: propose a shorter episode, a
  cheaper model or a lower cadence; never start a run that will stop midway.
- `sufficient` false, the estimate declined, `needs_browser`, `stalled` twice,
  or the same failure twice on one shot.
- A request to bring in a real person or another show's character.

## UX rules

1. Show the bible on one screen: cast lines, places, format beats, voice,
   score, the story so far. Show what changed since the last episode.
2. Names and links in chat, never ids or JSON. Episodes by their names
   ("Pip of Whisperpine, E04: The Lantern").
3. One line of cost per episode and one per month at the cadence.
4. Silent polling; one line per phase; a frame link per scene.
5. After delivery, one line: the story-so-far entry written for this
   episode.
6. The user's language in chat; English in prompts and tool arguments.

## Reference docs

- [references/series-bible.md](references/series-bible.md): the bible template, character sheet laws, the forbidden list, the story-so-far log, versioning.
- [references/episode-formats.md](references/episode-formats.md): daily and weekly formats, cold open, recurring first shot, title room, sign-off, cliffhanger, recap; kids, educational, creator and micro-drama series; skeleton tables with timings and costs.
- [references/production.md](references/production.md): one project per series, naming, finding episodes, references once, end states, template-driven daily runs, budgets per cadence, drift control, seasons.
- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes for the project, the episodes, the descriptions, the frames and the schedule.
- [references/troubleshooting.md](references/troubleshooting.md): errors and series failures with fixes.
