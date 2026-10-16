# Troubleshooting: models

What you see, what it means on the MCP path, and what to do. Never retry a
paid call with a new idempotency key; rejoin the running job instead.

## Refusals and errors

| You see | It means | Do |
|---|---|---|
| `invalid_args` naming the duration, or the provider refuses a length | The server path sends the duration as written; the model does not make it | Set a value from the model's exact list with `update_workflow` (Veo 4, 6, 8; Hailuo 2.3 6, 10; Kling Video O1 and Wan 2.6 5, 10) |
| A refusal on a Veo 3.1 Lite or Auto scene with images wired | Lite takes no references; the server sent some | Remove the reference edges, or move the scene to Veo 3.1 Fast or Seedance |
| A 400 naming references on another model | More references than the model's cap | Keep the hero (and one style plate on 2-reference models); at most 3 on the MCP path |
| A refusal on a Veo clip with references at 4 or 6 s | Google runs reference clips at 8 s | Set 8 s, trim in the edit |
| A refusal or an altered person on Veo with a child character | Google limits image-to-video with people to adults | A creature hero, or move the scene to another family |
| An unknown model error | The id is not on the allowlist (Sora, Luma, LTX, Pixverse never are) | Pick from the catalogue; never guess an id |
| `quote_exceeded` | The scene costs more than `max_credits` | Re-run `estimate_cost`, announce the new number, get a new yes |
| `insufficient_credits` or `sufficient` false | The balance cannot cover the quote | Stop; offer a cheaper model from the cost tables, fewer scenes, or a top-up |
| 403 plan_resolution | Canvas only: a model that renders above the plan (Hailuo 3 at 2k, HeyGen at 2k) | On the MCP path this gate does not fire; in the app it needs Studio |
| 402 monthly_cost_cap | The account's monthly provider cap is reached | Stop; the cap grows with purchased credit packs |
| 400 video_too_long or 402 video_over_budget | Over 180 s of film, or over $30 upstream in one generation | Split into two films |
| 429 rate_limited with a retry delay | Too many calls in 60 s | Wait the delay; batch node changes into one `update_workflow` |

## Wrong picture

| You see | It means | Do |
|---|---|---|
| A vertical film exports letterboxed | A clip was made 16:9 (Hailuo 2.3 snaps to 16:9), or the first clip has another shape | Every clip on one aspect the model makes; the first clip sets the film |
| The export is pillarboxed in a 9:16 frame | The film's first clip is 21:9, 9:21, 3:2 or 2:3 | Use 9:16, 16:9, 1:1, 3:4 or 4:3 for films |
| A Grok clip looks soft | Likely rendered at the provider default (unverified, xAI defaults to 480p) | Use it as a draft, or move the scene to another family |
| A Hailuo shot does something the prompt did not say | The provider's prompt optimiser may have rewritten it | Simpler words, the bracket command right after its description, the end state stated |
| Seedance puts all motion in the first two seconds, then drifts | Known behaviour | "Already in motion from the first frame", the camera's stopping point, a shorter clip |
| Runway barely moves | The prompt described the picture | Motion only, short, positive |
| The scene ignores the planned end composition | Last-frame conditioning is not reachable | Write the end state in words; chain the next scene from the landed last frame (`/api` before the path `get_scene_frame` returns; only from an end that is not trimmed) |
| The model drew its own opening image wrong | The `shots` text became the image prompt | Set the image node's `prompt` to a real still-frame prompt; clear its url; re-roll that scene |
| Mush or warped detail after a crop | A clip zoomed in the edit by more than about 1.5 | Make the close-up its own clip |

## Wrong sound

| You see | It means | Do |
|---|---|---|
| Burned-in subtitles on a Veo dialogue clip | Veo's subtitle artefact | "(no subtitles)" after each line, the clean-frame line, one re-roll |
| A sound model's clip is silent | The provider default was off, or the clip failed | Report it; carry the sound with `attach_track`; native audio off on that clip |
| Music inside a clip fights the film's score | The model added music | End sound lines with "no music"; set the clip to `mix` under narration or `off` |
| A clip from a "silent" model has sound | Provider behaviour differs from the flag (HeyGen's catalogue claims audio) | Keep native audio off unless the user wants it |
| A presenter's lips move under the narration | A face filmed speaking with a voiceover laid over it | Mouth closed or face turned in presenter beats; spoken lines only on sound models |

## Cost surprises

| You see | It means | Do |
|---|---|---|
| Grok 1.5 Lite quoted 17 per block | The MCP path quotes its default 1080p | Seedance 2.0 Mini (9) or Veo 3.1 Lite (10) for drafts |
| A 6 s Veo clip costs as much as 8 s | Two blocks either way | Write 8 and trim |
| Hailuo 3 quoted on a Starter plan | The plan gate is canvas only | It is 18 per block on the MCP path; the export frame stays at the plan's size |
| The estimate is higher than the tables | Opening images, or a node on a different model | Read `per_scene` line by line |
| Credits held but the clip never arrived | The server path charges billed but undelivered clips and alerts the operator | Report it to the user with the scene name; do not regenerate silently |
