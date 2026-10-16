# Series continuity

A series is several videos that must feel like one show: the same people,
the same places, the same opening and closing, a story that remembers the
last episode. Everything in [sequence-plan.md](sequence-plan.md) still
applies inside each episode; this file adds what carries across episodes.

## 1. The series bible

Write it once, show it to the user, and reuse it word for word in every
episode.

| Part | Contents |
|---|---|
| Recurring cast | One locked description per person (verbatim in every prompt), their default wardrobe, the hosted reference image |
| Recurring places | One line per place: geography, light source and direction, time of day it usually appears at |
| Recurring objects | Props and products that come back, with their locked description |
| Format | Length, aspect, how an episode opens and closes (a recurring first shot, a title moment, a sign-off line), narration voice, score motif |
| Story so far | One line per published episode: what changed (a new friend, a lost key, a moved house) |

## 2. How it reaches Lavendly

- One project for the series (`create_project`, or `project_name` on
  `create_workflow`); one workflow per episode inside it. For a later
  episode, find the series project with `list_projects` and the earlier
  episodes with `list_workflows`, and read the last one with `get_workflow`
  for its references and final state.
- Import each recurring reference once with `import_asset` and reuse the
  hosted url in every episode; do not regenerate a character sheet per
  episode, the face drifts.
- Same narration voice and the same score brief (or the same hosted score)
  in every episode, so the show sounds like itself.
- Each episode's shot plan is stored with that episode (`set_scene_plan`);
  read the last episode's with `get_scene_plan` for its final heading and
  who was present. The series bible itself has no server tool: it lives in
  the conversation and in the episodes' prompts. Never say the bible is
  stored on the server.

## 3. Between episodes

- Wardrobe and state carry over when the story is continuous (the next
  morning, the same trip); they reset only when the story says time has
  passed. Write the starting state of each recurring person and object at
  the top of the episode plan from the last episode's final frame.
- A person who joined in an earlier episode is known; a newcomer is
  introduced as in any scene. A person who left the show is not silently
  back: the episode says why.
- A recap opening is optional: one or two shots or one narration line that
  states the story so far, only when the episode depends on it.
- Keep the format beats in the same place every episode (the recurring
  first shot, the sign-off), so a viewer recognises the show in a second.

## 4. Checks per episode

- [ ] Every recurring person, place and object matches the bible.
- [ ] Starting states match the end of the previous episode, or the jump is
      explained.
- [ ] Format beats present and in their usual place.
- [ ] Same voice and score identity as the earlier episodes.
- [ ] The story-so-far line for this episode is written after delivery.
