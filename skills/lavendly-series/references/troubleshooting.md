# Troubleshooting: series

Errors first, then what goes wrong across episodes and the fix. Never retry a
paid call with a new idempotency key; never start a second project or a
second job for the same episode.

## Errors and situations

| You see | It means | Do |
|---|---|---|
| The show's project is not in `list_projects` | Another account or workspace, or a different name | Ask the user for the exact name or the workspace; create nothing until found |
| An episode is missing from `list_workflows` | The list holds every non-trashed workflow of the caller's workspace; a trashed or other-workspace episode is not in it | Ask for the episode's name; read it with `get_workflow` if the user has its link |
| The description came back cut short | Descriptions are stored up to 400 characters, names up to 80 | Shorten to the end state and the next question; store the rest in the conversation and say so |
| A 400 naming references, or a scene missing from a render that says done | References above the model's cap, or a reference reached Veo 3.1 Lite (also through an app Film Bible): that scene is retried, then skipped uncharged | Pick the series model with the right cap; never Veo 3.1 Lite for a show with references |
| `url required` from `attach_track` | No synthesis on this server | The user makes the voice or score in the Asset Library; attach by `url`; reuse that url every episode |
| `insufficient_credits` mid-season | The cadence outgrew the plan | Stop; show the budget table row; offer a shorter format, a cheaper model or a lower cadence |
| `get_monthly_usage` above 0.85 before an unattended run | The month's provider share is nearly spent | Skip the run, report, wait for the operator |
| `version_conflict` on the description update | The episode changed since it was read | `get_workflow`, reapply, send again |
| The schedule time is in the past | `when` must be in the future | Ask for a new time in the user's time zone |

## Series failures

| Failure | Cause | Fix |
|---|---|---|
| The hero looks different from episode 1 | A rebuilt sheet, a paraphrased block, text-only opening images | Episode 1's references by url; the identity block verbatim; compare the first frame to the head close-up before paying for scene 2 |
| A character appears who was never introduced | The cast left open | The count line in every prompt; the newcomer gets an entrance shot and a line, then joins the bible |
| A character who left is back without a reason | The bible was not updated | Mark departures in the story so far; the episode explains the return |
| The episode contradicts the last one (dry fur after the rain) | States written from memory | Starting states from the last frame and the description |
| The show sounds different | A new voice or a new score | The bible's voice id and the hosted score url |
| The recurring first shot changes every week | Paraphrased locked fields | The locked still and motion prompt pasted verbatim; episode 1's opening image when it must be identical |
| Colours slide over a season | Chained frames, style drift | Never chain across episodes; the style line verbatim; compare with episode 1 |
| The cliffhanger is never answered | The next cold open forgot it | The description's "Next:" field drives the next cold open |
| The recap eats the episode | A long narrated summary | One sentence, under 10 percent of the runtime |
| Kids episode frightens | Low-key light, open-mouth close-ups, artefacts | Gentle light, medium shots, every frame checked for extra eyes and teeth |
| A daily run spends past its cap | Re-rolls not counted | `max_credits` per scene; one re-roll per shot; cost-aware's hard cap |
