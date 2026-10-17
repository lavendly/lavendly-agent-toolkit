# Troubleshooting: cinematic

Error strings first, then what goes wrong on screen in narrative films and
the fix. Never retry a paid call with a new idempotency key; one re-roll per
shot, with the fix named; after two failures, change the direction and ask.

## Errors and situations

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | This server does not synthesize voice or music | The user makes it in the app's Asset Library; find it with `list_assets`, attach its `url` |
| `invalid_args` naming the duration | The model does not make that length | Set the clip to a length from the model's list (Veo 4, 6, 8; Kling o1 5 or 10; Hailuo 2.3 6 or 10) with `update_workflow`; trim later |
| A 400 naming references, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | More references wired than the model takes, or references on Veo 3.1 Lite | Remove reference edges down to the cap (4 Seedance and Wan 2.6, 2.7; 2 others; 0 Lite) |
| A Veo clip with references refused at 4 or 6 s | The provider asks for 8 s with reference images | Set that clip to 8 s; trim in the edit |
| `insufficient_credits`, `sufficient` false | The balance cannot cover the quote | Stop; propose fewer shots, a cheaper model (Veo 3.1 Fast, Seedance 2.0 Mini) or a 15 s version |
| `quote_exceeded` | Over `max_credits` | Re-run `estimate_cost`, announce, get a new yes |
| A 429 with a retry delay | Mutation limit | Wait; batch node changes into one `update_workflow` |
| `needs_browser` | The scene must be made from the canvas | Tell the user to open the film in the app; stop polling |
| `stalled` twice | The job stopped reporting | Re-check once; report; never start a second job for the same scene |
| `version_conflict` | The workflow changed since you read it | `get_workflow`, reapply, send again |
| `story_pass` false with `pass` true | The action may not have happened | Open the frames; re-roll only if the frames confirm it |
| The film ends on a frozen frame | Narration ran past the picture | Cut words to 2.3 per second of the shots; re-attach |
| A 21:9 film exports letterboxed into a vertical frame | 21:9 is not an export size | Make the film 16:9 with the action in the central band |

## Genre failures on screen

| Failure | Cause | Fix |
|---|---|---|
| The wrong person speaks | Two people in frame, speaker not placed | One speaker per clip; name the speaker by side and clothing; the listener "stays silent" |
| Lips out of sync | Line too long, head moving, camera moving | 1.2 words per second, medium close-up, locked-off, no head turn |
| Burned-in subtitles | Veo writes captions under dialogue | "(no subtitles)" right after each line, the clean-frame line at the end |
| Dialogue cannot be captioned | Captions come only from a voiceover's word timings | Say so; the film must read on picture, or the user adds captions in the app |
| Faces differ between singles | Opening images drawn from text | The locked description verbatim; references wired; app stills for the close-ups |
| A face drifts after chaining | Chained frames lose detail per hop | Stop after 2 to 3 hops; a fresh still from the prompt |
| A third person appears | Rooms and streets invite extras | The count line names everyone; the background described as empty |
| Eyelines cross or the line flips | Sides not written in every prompt | The screen-side sentence in both prompts of every shot; no orbits in dialogue |
| Over-acting | Emotion adjectives | Behaviour words, timed late, "holds still" ([acting.md](acting.md)) |
| Frozen, dead face | No eye path, no behaviour | Name where the eyes go and one blink |
| Dark scenes turn to noise | Too little light named | "deep blacks but the face readable, one practical light" |
| Monster, gore or a weapon appears, or a filter refuses | Explicit threat words | Imply: a figure standing still, a silhouette, a sound; no injury |
| Kisses melt faces together | Contact at close range | Cut before contact; silhouette wide; foreheads touching |
| Body parts morph in action | Fast motion, several actions | One movement per clip, the path written, slow motion at the peak |
| Text on letters, screens, signs is gibberish | Models cannot spell in frame | Turn them away, keep them blank, or "no handwriting visible" |
| Black-and-white looks grey and flat | Monochrome plates sent to the video model | Generate in colour with hard light; desaturate with `edit_clip` colour |
| A modern object in a period room | An empty surface the model filled | Name every object; "lit only by candles" |
| Native music fights the score | Some models add their own music | `off` on score-only clips; "No music" in the motion prompt; `mix` at 0.2 under narration |
| Two shots open on the same frame | Chaining used for a new angle | A new angle gets its own still; never reuse an opening |
| A comedy pause lands wrong | Timing left to the model | Separate setup and punchline clips; set the pause with trims |
