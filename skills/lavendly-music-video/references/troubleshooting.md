# Troubleshooting: music video

Error strings first, then what goes wrong in music videos and the fix. Never
retry a paid call with a new idempotency key. Trims, speed, splits, moves
and renders are free: fix sync in the edit before any re-roll.

## Errors and situations

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | No synthesis on this server | The user makes the track in the app's Asset Library; find it with `list_assets`, attach by `url` |
| The track file pasted in the chat | It never reaches you | Ask for the Asset Library upload, then `list_assets`; or a public link, `import_asset` with `kind` music |
| `import_asset` refuses the music file | Over 50 MB or 10 minutes, or not a public file link | Ask for a smaller export (a 320 kbps MP3 or a shorter edit) or an Asset Library upload, then `list_assets` |
| video_too_long on render | The film is over 180 s | Ask for a song edit under 3 minutes, or two parts |
| `invalid_args` naming the duration | Not a length the model makes | Use the model's list (Veo 4, 6, 8; Kling o1 5 or 10); trim later |
| A 400 naming references, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | More references than the cap | 4 on Seedance and Wan 2.6, 2.7; 2 others; 0 on Veo 3.1 Lite |
| `split_clip` refused | `at_sec` outside the clip, or a half under 0.25 s | `at_sec` counts from the clip's own start (0.25 to its length minus 0.25); read its duration from `get_workflow` |
| invalid_edits on `edit_clip` | An unknown key or a value out of range | Speed 0.1 to 8; fades 0 to 30000; trim end after start |
| `insufficient_credits`, `quote_exceeded` | Balance or cap | Stop; fewer clips (split takes), a cheaper model, a shorter cut |
| `needs_browser`, `stalled` twice | The job cannot finish here | Report; never start a second job for the same scene |

## Music video failures

| Failure | Cause | Fix |
|---|---|---|
| Two musics at once | Clips kept their generated sound | `off` on every clip; "silent, no music generated" |
| Cuts land late or early everywhere | Wrong downbeat or BPM | Ask the user to confirm both; recompute; retrim (free) |
| Cuts drift later through the song | Lengths added after rounding, or a tempo change | Compute from absolute times; ask about tempo changes and section times |
| One cut feels off | A slot length wrong | Retrim that clip and its neighbour (the trims set the cuts; `move_clip` sets the order) |
| The song starts on the wrong part | The upload starts earlier than the section | `edit_clip` `trim` `start_ms` on the song's node (the source in-point), or an excerpt starting one bar before the section |
| The first clip freezes while the song plays on | The song is wired to the first clip only | Attach with `"scope": "film"`; for a clip or split piece it missed, `update_workflow`: an edge from the song's node to that clip |
| The song stops abruptly at the end | The film ends mid-phrase | End the cut on the last hit, or ask for an excerpt with its natural tail |
| Mouths do not match the vocal | No lip sync route | Hide the mouth; singing close-ups one beat at most |
| The artist looks different per section | Text-only opening images, no references | References on Seedance or Wan; the locked description in every still |
| Lettering on clothes, signs, screens | Models draw text | "no text, no letters, no logos"; plain clothes; signs turned away |
| Guitars, pianos, drums melt | Close-ups on fingering and keys | Medium shots, counted parts, soft-focus hands |
| Dancers gain or lose limbs | Several moves per clip, cropped bodies | One move, full body, slower rate |
| Bursts look like a glitch | Pieces too short or from unrelated clips | Burst pieces from one take; at least half a bar each |
| Strobe flashes too fast | Strobe written over long shots | Strobe only in burst pieces, at most three flashes a second |
| A loop jumps at the seam | First and last frames differ | Cyclic motion that returns to the start; check both frames |
| A second music track got attached | A per-scene score | `detach_track` the extra; one song only |
