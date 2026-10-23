# Production: running a series on Lavendly

How a show is organised on the platform, how the agent finds and continues
it across sessions, and how daily or weekly episodes are made inside a
budget without the show drifting.

## 1. One project per series

- `create_project` once, named after the show. Its description holds the
  short bible (title, logline, cast identity lines, style line, format in one
  line, bible version). There is no tool to update a project afterward, so
  write it carefully and keep it under about 1,000 characters.
- Every episode is a workflow inside that project: `create_workflow` with
  `project_id` (or `project_name` equal to the show's name).
- A season is a bible version, not a new project. A spin-off with its own
  cast is a new project.

## 2. Naming

Names are how episodes are found again. Use one pattern and never vary it:

```text
<Show> S01E03: <Episode title>
Pip of Whisperpine S01E03: The Long Night
```

Zero-padded numbers sort correctly. The episode's `description` follows a
fixed shape too:

```text
S01E03. Bible v2. Story so far: the rain put out the oak's lantern; Moss the owl lent a match; tonight the stream freezes. End state: Pip in the hollow, scarf on, one lantern lit; Moss on the lowest branch; snow on the ground. Next: who left the paw prints by the stream.
```

Keep it under 400 characters (the server cuts longer text silently), write it with `update_workflow` after
the episode is delivered, and read it back with `get_workflow` to confirm it
was stored whole.

## 3. Finding the show again

1. `list_projects`: the show's project by name.
2. `list_workflows` (no arguments: it ignores `limit` and has no filters):
   every workflow of the account, most recently updated first, each with
   `name`, `description` and `project_id`. Keep the show's `project_id` and
   the name pattern.
3. `get_workflow` on the latest episode: its description (story so far, end
   state, next question), its reference nodes (`data.reference` true, with
   their hosted urls), the image node prompts of the locked slots, the
   episode's model.
4. `get_workflow_audio` on it: the narration voice and the hosted score url
   to reuse.
5. `get_scene_frame` with frame last on its final clip: the picture the next
   episode starts from.

If an earlier episode is not in the list (it was trashed, or lives in
another workspace), ask the user for its name; never rebuild the bible from
guesses.

## 4. References once, reused forever

- `import_asset` each sheet, head close-up, place plate and style plate once
  before the pilot. The hosted urls go into the bible; every episode wires
  the same urls.
- Never regenerate a character sheet per episode: the face drifts with each
  rebuild. A flawed sheet is edited in the app, then imported once as a new
  version.
- Reference priority when slots are short (2 on most models): the face of
  the character in the shot, then the second character, then the place, then
  the style plate. Seedance and Wan 2.6 and 2.7 take 4.

## 5. Starting states

The first lines of every episode plan are the starting states, written from
the last episode's final frame and its description:

```text
Pip: in the hollow, blue scarf on, fur dry, awake.
Lantern 1: lit, on the flat stone. Lanterns 2 and 3: dark, inside the hollow.
Moss: on the lowest branch, eyes closed.
Place: the hollow at night, snow on the ground, moonlight from above.
```

Continuous story: these states open episode N+1. Time passed: the cold open
shows the passage (the snow melted, a new morning) and the states reset as
the story says.

## 6. Template-driven daily runs

A daily show is a template plus an episode card.

- The template is the format skeleton with every locked field written out:
  per slot the style line, place line, light line, framing, angle, camera
  move, what stays the same, the sound line, the duration and the model. It
  lives in the project description (short form) and in episode 1's prompts
  (full form), read with `get_workflow`.
- The episode card holds only the free fields: per slot the opening state,
  the action with timing, the end state, and the narration line. It comes
  from the user's list of ideas, or from the story-so-far and the last
  cliffhanger.
- The agent compiles each prompt by filling the template slot with the card
  fields, checks the narration budget, builds the workflow, and continues
  with the director's steps.
- Build each episode fresh with `shots` and `update_workflow`; do not copy an
  earlier episode's nodes wholesale (they carry its generated clips and
  frames). Copy only the reference nodes' urls and the locked prompt text.
  The exception is a slot that is the same clip every episode (an intro, a
  sign-off): copy that node with its clip url from the template. A node that
  already has a clip is reused and never charged.
- When `get_schema` lists a series episode operation (an episode from a
  skeleton and a story), use it instead; until then the template lives in
  text.

Unattended runs follow lavendly-cost-aware:

| Rule | Value |
|---|---|
| Cap per run | The operator's number, or the episode's estimate plus one re-roll, whichever is lower |
| Before each run | `get_ledger`, `get_monthly_usage` (stop above 0.85 of the month's share), `estimate_cost` |
| Re-rolls | One per shot, with the fix named; then keep the better take and report |
| Posting | Depends on who set up the run: see the two cases below |
| Report | One line: episode name, credits spent, balance, link, any finding left open |

The agent's host (a scheduler, a cron job, the user) starts each run; the
MCP has no run scheduler, only post scheduling.

Posting from a run:

- **A routine the user set up.** The user wrote the schedule themselves (a
  Claude Code routine, a cron job, a scheduled CI job) and it names a channel
  and a credit cap. The routine is the user's yes: render, run
  lavendly-review, then `publish_video` or `schedule_video` to that channel
  without asking. Post only to the channel the routine names, only a film
  that passed review, and once per run (an `idempotency_key` with the date).
  A failed review, a cap hit or a missing channel is a stop with a report,
  never a post.
- **An ad hoc run.** Anything else (the user asked once in chat, a brief with
  no channel or no cap, a run another agent started): render, report, and
  wait for the user's yes in lavendly-publish; `schedule_video` can then
  queue several approved episodes at once.

Each routine run reads the template fresh with `get_workflow` and never edits
it, so a change the user makes to the template film applies from the next run.

## 7. Budgets by cadence

Per episode: clips, opening images (about 2 each), narration (about 1 per
1,000 characters), score (0 when the hosted score is reused).

| Format and model | Per episode | Daily (30) | Three a week (13) | Weekly (4) |
|---|---|---|---|---|
| 15 s, 3 shots, Seedance 2.0 Mini | about 34 | 1,020 | 442 | 136 |
| 15 s, 3 shots, Seedance 2.0 Fast | about 40 | 1,200 | 520 | 160 |
| 30 s, 6 shots, Seedance 2.0 Mini | about 67 | 2,010 | 871 | 268 |
| 60 s, 12 shots, Seedance 2.0 Fast | about 179 | 5,370 | 2,327 | 716 |
| 60 s, 12 shots, Veo 3.1 Fast | about 235 | 7,050 | 3,055 | 940 |

Monthly credits by plan: Free 35 to start plus 5 per daily claim, Starter
200, Creator 450, Studio 1,200, Enterprise 12,500; credit packs of 100, 500
and 1,500. Leave about 15 percent of the monthly budget for re-rolls. Show the
user the table row for their choice before the pilot.

## 8. Drift control across episodes

| Drift | Where it comes from | Control |
|---|---|---|
| Faces soften or change | Text-only opening images, chained frames | Same references every episode; locked description verbatim; never chain frames across episodes beyond the first shot; open the first frame of each new episode next to the head close-up before generating the rest |
| Colours slide warm or green | Chained frames, a paraphrased style line | Style line and palette verbatim; a fresh opening image from the still prompt |
| Wardrobe changes | A paraphrased wardrobe line | Wardrobe line verbatim; alternates only when the story says |
| Places rearrange | The geography not written | The place line with its geography in every still |
| The voice changes | A new voice picked | The voice id from the bible, every episode |
| The music changes | A new score generated | The hosted score url reused, or the same brief |
| Cast creep (extras, a second fox) | Open scenes | The count line; the forbidden list |

Episode 1 is the reference: when a later episode drifts, compare its first
frame with episode 1's, not with the episode before it.

## 9. Seasons and arcs

- A season arc across 6 to 10 episodes: setup in episode 1, a midpoint turn,
  a finale that pays off a setup from the pilot. Write the arc in the bible;
  each episode's card serves one step of it.
- Model or style changes happen between seasons, with a new bible version.
- A season finale can be longer (90 s) or a two-parter; never over 90 s in
  one film.

## 10. Order of production

- Episodes that depend on each other's end states are made in order, each
  delivered and described before the next is planned.
- Independent episodes (anthology, standalone daily gags) can be planned in a
  batch; still generate scene by scene within each episode and check each
  before the next is paid for.
