# Troubleshooting: animation

Error strings and what animated films typically get wrong, with what to do.
Never retry a paid call with a new idempotency key.

## Platform messages

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | this server does not synthesize voice or music | ask the user to make it in the app's Asset Library, attach the hosted file by `url`, keep `text` for captions |
| `invalid_args` naming the duration | the model does not make that length | set the clip's duration to a listed length with `update_workflow` (Veo: 4, 6, 8; Wan 2.6: 5, 10; Hailuo 2.3: 6, 10) and trim later |
| a 400 naming references, or a receipt saying the model takes none, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | too many references for the model, or references on Veo 3.1 Lite | keep the hero first and the plate second within the cap; on Veo 3.1 Lite remove every reference edge or change the model |
| `insufficient_credits` or `sufficient` false | the balance cannot cover the quote | stop; propose fewer scenes, shorter clips or a cheaper model from the picks table |
| `quote_exceeded` | the call would spend more than `max_credits` | re-run `estimate_cost`, announce, get a new yes |
| a 429 with a retry delay | too many changes per minute | wait the stated time; batch node changes into one `update_workflow` |
| `needs_browser` | the scene must be generated from the canvas | tell the user to open the film in the app; stop polling |
| `stalled` true twice | the job stopped reporting | check once more; report it; never start a second job for the scene |
| `version_conflict` | the workflow changed since you read it | `get_workflow` again, reapply, send |
| `pass` false with `reroll_hint` | the vision check found an artefact | one re-roll with the hint appended and a simpler action, then stop |
| `story_pass` false, `pass` true | the action may not have happened | open the mid and last frames; re-roll only if they confirm it |

## Style and character problems

| You see | Likely cause | Do |
|---|---|---|
| Scene 2 is drawn in a different style from scene 1 | the style line differs, or the opening image drifted | compare the two still prompts word for word; open scene 2's first frame; rewrite and regenerate that opening image |
| The look slides from 2D to 3D during the clip | motion asked too much of a flat style | add "flat 2D colour, the drawing stays flat"; shorten; wire the plate |
| Stop-motion looks smooth | the motion-feel line is missing or late | put "stop-motion at 12 frames per second, crisp frames with no motion blur" second |
| Paper or paint texture crawls | texture not locked | "the paper texture stays fixed; only the pieces move"; less motion |
| The hero's colours or ear marks change | hero block paraphrased, or the head reference not wired | the block verbatim in every still; the head close-up as reference 1 |
| Two copies of the hero | no count line, a mirror, or water reflection | "exactly one Pip in frame, nobody else, no copy of him"; bound reflections |
| An animal stands up and runs on two legs | the gait was not named | "on all four paws, a fox's trot, never upright" ([creatures.md](creatures.md)) |
| Extra legs during a turn | a turn in place inside one clip | cut the turn, or "four legs visible throughout, never more than four" |
| Teeth or a stretched jaw when a creature talks | on-screen speech | move the line to narration; "mouth closed" |
| Eyes look in two directions | not stated | "both eyes look at the star together" |
| A scary frame in a kids' film | an artefact or low-key light | re-roll that scene with soft fill named; never deliver it |
| Signs, books or labels with gibberish letters | text in the world | keep them blank or turned away; "no text, no letters" |
| A named studio look was refused or ignored | a studio or artist name in the prompt | describe the traits instead ([prompt-anchors.md](prompt-anchors.md) section 5) |
| The palette slides warm or green over a chain | chained frames drift after 2 to 3 hops | start the next scene from a fresh still from the bible |
| The narrator speaks over the last frame frozen | narration over budget | cut words to 2.0 to 2.3 per second of the scene; re-attach |
| The first scene freezes while the narration or score plays on | the track is wired to the first clip only | `update_workflow`: an edge from the track's node to every clip ([mcp-calls.md](mcp-calls.md) section 7) |
| The clip's own music fights the score | the model added music | write "No music." in Veo prompts; set the clip to `mix` low or `off` |
| Native voice differs between scenes | each clip invents its voice | one voiceover track for the character; on-screen speech in one clip only |
