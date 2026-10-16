# Troubleshooting: director

Error strings and situations, with what to do. Never retry a paid call with
a new idempotency key.

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | this server does not synthesize voice or music | ask the user to make it in the app's Asset Library, attach the hosted file by `url`; a voiceover by `url` gets no captions |
| `invalid_args` naming the duration on `generate_scene` | the model does not make that length (Veo: 4, 6, 8) | set the clip's duration to the next length up with `update_workflow`, trim later with `edit_clip` |
| a 400 naming too many references | the model takes fewer references than wired (Veo: 2) | keep the hero and at most one style plate on that clip; remove the other reference edges |
| `insufficient_credits` or `sufficient` false | the balance cannot cover the quote | stop, say what is missing, propose a cheaper model or fewer scenes |
| `quote_exceeded` | the call would spend more than `max_credits` | re-run `estimate_cost`, announce the new number, get a new yes |
| a 429 with a retry delay | the mutation limit (about 20 per minute) was hit | wait the stated seconds; batch node changes into one `update_workflow` instead of many calls |
| `needs_browser` phase | the scene must be generated from the canvas | tell the user to open the video in the app; stop polling |
| `stalled` true twice | the job stopped reporting | re-check once more; if still stalled, report it and never start a second job for the same scene |
| `version_conflict` on `update_workflow` | the workflow changed since you read it | `get_workflow` again, reapply your change, send again |
| `story_pass` false, `pass` true | the clip is clean but the action may not have happened | open `get_scene_frame`; re-roll only if the frame confirms it |
| `pass` false with `reroll_hint` | the vision check found an artefact | one re-roll with the hint appended and a simpler action; then stop |
| the hero looks different in scene 2 | the block was paraphrased, or the reference is not wired to that clip | compare the prompts word for word; check the reference edge; re-roll scene 2 only |
| the scene ends on black or a frozen frame | narration ran past the clip | shorten the line to the budget (2.3 words per second) and re-attach; the picture was not at fault |
| the clip shows a phone UI, a timestamp, a recorder dot | the prompt said "phone video" or "footage" without the clean-frame line | add "clean frame with no on-screen graphics, no timestamps" and re-roll |
| the product appears twice, or mirrored | a reflection or "another" in the prompt | name the one object, bound the reflection ("a faint reflection in the table, nothing else"), re-roll |
| the opening image shows the payoff | the still-frame prompt described the action | rewrite it as the start state; the clip animates from the start |
| captions missing on the film | the voiceover was attached by `url` (no word timings), its `subtitleStyle` is missing or `off`, or the film has one scene | `update_track` with a `subtitleStyle`; a `url` voiceover needs re-attaching from `text`; a one-scene film burns no captions |
| media the user pasted in the chat | it never reaches you as bytes or a url | ask for an Asset Library upload or a public URL, then `import_asset` |
