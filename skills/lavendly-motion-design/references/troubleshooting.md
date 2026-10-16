# Troubleshooting: motion design

Error strings and what motion-design pieces typically get wrong, with what
to do. Never retry a paid call with a new idempotency key.

## Platform messages

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | this server does not synthesize voice or music | ask the user to make it in the app's Asset Library, attach the hosted file by `url` |
| `invalid_args` naming the duration | the model does not make that length | a listed length with `update_workflow` (Veo: 4, 6, 8; Hailuo 2.3: 6, 10; FLUX 3: 5 to 20), then trim |
| an invalid edits error from `edit_clip` | an unknown key or a value out of range | only trim, speed, volume, mute, loop, fades, crop, resize, rotate, flip, color, reverse; check the bounds. The export ignores loop and resize (and stabilize, `lut_id`) |
| a 400 naming references, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | more references than the model takes, or references on Veo 3.1 Lite | the product first, the plate second, within the cap; none on Veo 3.1 Lite |
| `insufficient_credits` or `sufficient` false | the balance cannot cover the quote | stop; offer fewer shots, a shorter cut or a cheaper model |
| `quote_exceeded` | the call would spend more than `max_credits` | re-run `estimate_cost`, announce, get a new yes |
| a 429 with a retry delay | too many changes per minute | wait; batch node changes into one `update_workflow` |
| `needs_browser` | the scene must be generated in the app | tell the user; stop polling |
| `stalled` true twice | the job stopped reporting | check once more; report; never start a second job |
| `version_conflict` | the workflow changed since you read it | `get_workflow`, reapply, send |
| `pass` false with `reroll_hint` | an artefact (often bad text, melting, warp) | one re-roll with the hint and a simpler move, then stop |

## Motion-design problems

| You see | Likely cause | Do |
|---|---|---|
| Letters, numbers or a fake logo in the frame | "title", "logo", "label" or "chart" written as content | describe empty areas as plain surfaces; blank labels and dials; re-roll |
| The product changes shape during the orbit | orbit too long, product invented from text | the real packshot as the opening frame; 45 degrees; lock sentence |
| A second product in a reflection | an unbounded mirror or water surface | "exactly one bottle; a faint reflection in the water, nothing else" |
| Exploded parts multiply | more than five parts, no order | 3 to 5 parts, even gaps, the assembly order stated |
| The loop seam jumps | cyclic motion missed the exact amount | the ping-pong method on the same clip |
| The ping-pong turnaround jerks | motion fast at the clip's ends | ask for easing at both ends; trim a few frames from each end |
| Reversed segment looks wrong | gravity, smoke or liquid in a ping-pong | choose motion that reverses well, or method B |
| The camera creeps in during a hold | the model adds motion | "locked-off camera on a tripod, the frame does not move"; trim the hold |
| The empty area fills with objects | layout not locked | "the right half stays an empty field with nothing in it" in both prompts |
| A slow motion falls apart after a few seconds | slow motion too long | under 4 s, one simple motion |
| Liquid behaves like jelly | complex pour | one pour path, slow, the end state named |
| Architecture bends in a fly-through | geometry not locked | "rigid and fixed, verticals straight; only the camera moves" |
| Repeating tiled pattern flagged | identical elements | fewer elements, varied sizes named |
| Colour off-brand | hex in prompt or no colour words | named colours; `edit_clip` `color` nudge; check frames |
| Clip's own music under the motif | the model added music | "No music." in the prompt; the clip to `mix` or `off` |
| Cuts miss the beat | trims not on the bar grid | trims as multiples of the bar length (4 s at 120 BPM) |
| A 720p clip looks soft in a 1080p film | the model's default resolution is 720p | a 1080p model for full-frame hero shots |
| The export is letterboxed oddly | the first clip is 21:9 or another shape with no export frame | regenerate in 16:9, 9:16, 1:1, 4:3 or 3:4 |
