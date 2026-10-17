# Troubleshooting: places

What goes wrong in AI films of places and on the MCP path, and what to do.
Repair with the smallest fix first (trim, audio, order), then one targeted
re-roll of one scene with the fix named. Never retry a paid call with a new
idempotency key.

## Places and picture

| You see | It means | Do |
|---|---|---|
| The room re-arranges mid-glide | the move was long or fast; the model is drawing space it never saw | 4 s glide at walking pace; trim before the change; one room per clip |
| Doors or windows multiply | openings left uncounted | count them in the still or check them against the photo; "exactly three windows" in the motion prompt |
| Walls and verticals bend | a wide lens with a fast move | "vertical lines stay straight, no lens distortion"; slower; 24mm feel rather than 14mm |
| The view outside changes | the model re-imagined the window | "the view through the window stays the same garden"; trim |
| A photo scene drifts away from the photo | the move pushed into unseen space | a smaller move (push-in, pedestal) that stays inside what the photo shows |
| Furniture melts during a pan | a pan past the photo's edge | keep pans inside the frame's content, 30 to 45 degrees |
| Landmarks look wrong | models cannot draw real landmarks faithfully | use the user's photo of the landmark as the first frame, or keep it out |
| Crowds have melted faces | crowds near the lens | keep people distant, soft and few; or nobody |
| Clones of a person | cast left open | "exactly one woman, nobody else" |
| Signs or menus garbled | text in the scene | "signs blank or turned away"; never write the name on the sign |
| Food morphs into another dish | two actions in a clip | one action, the dish named the same way in both prompts |
| Day turns to night between rooms | light left unnamed | one light line pasted in every prompt of the place |
| Twilight asked of a daylight photo | the photo carries its light | ask for a twilight photo; never relight a real photo into another time |
| 21:9 or 3:2 film exports vertical | those shapes export at the 9:16 size | use 16:9 |
| A vertical film from landscape photos looks cropped or odd | the photo's shape differs from the film | ask for vertical photos, or make the film 16:9 |

## Sound and words

| You see | It means | Do |
|---|---|---|
| The last frame freezes at the end | narration ran past the picture | shorten to `floor(seconds x 2.5)` words or fewer and re-attach |
| Ambience jumps between two shots of one room | clip sound left at different levels | the same `mix` volume on every clip of that place |
| The model adds music under the waves | the provider's default bed | "No music." in the prompt; `mix` low or `off` under the score |
| Captions missing | no narration, a voiceover by `url`, or style `off` | captions come only from a synthesized voiceover (a one-scene film too); `update_track` with a `subtitleStyle` |
| The first scene freezes while the voice or score plays on | the track is wired to the first clip only | Attach with `"scope": "film"`; for a clip it missed, `update_workflow`: an edge from the track's node to that clip ([mcp-calls.md](mcp-calls.md)) |
| The address reads wrong in captions | digits in the script | spell numbers out; the user adds the address card in the app |

## Platform and errors

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | no synthesis on this server | ask the user to make the voice or music in the Asset Library; find it with `list_assets`, attach by `url` |
| A refusal naming the duration | the length is not on the model's list | a listed length with `update_workflow` (Veo 4, 6, 8; Hailuo 2.3 6 or 10), trim later |
| A refusal naming the aspect | Hailuo 2.3 makes 16:9 only; Veo 16:9 and 9:16 only | pick a model with the shape |
| A 400 naming references, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | too many references, or any on Veo 3.1 Lite | photo scenes need none; remove the reference edges |
| `insufficient_credits` or `sufficient` false | the balance cannot cover it | stop; offer Wan 2.7 or Veo 3.1 Lite, or fewer scenes |
| `quote_exceeded` | the call would pass `max_credits` | `estimate_cost` again, announce, new yes |
| `needs_browser` | this scene must run on the canvas | tell the user to open the video in the app; stop polling |
| `stalled` twice | the job stopped reporting | check once more; never start a second job for the scene |
| `version_conflict` | the workflow changed since you read it | `get_workflow`, reapply, send again |
| `pass` false with `reroll_hint` | an artefact was found | one re-roll with the hint and a smaller move; then stop and report |

## Requests to reshape

| Request | Answer |
|---|---|
| "Add a pool", "make the room bigger", "put a sea view in the window" on a real listing | a real listing shows what is there. Offer virtual staging of furniture only, labelled "virtually staged", or a concept film labelled as one |
| "Make it look packed" for a real event recap | a recap is real footage; AI makes title plates, transitions and a labelled mood intro, never a crowd presented as the event |
| "Show the famous tower" for a destination | the user's photo of it as a first frame, or keep it out; models draw real landmarks wrong |
| "Use our staff and guests" | real people only from the user's footage with consent; AI people are actors, never presented as staff or guests |
| "Make the dish look bigger" for a restaurant | the dish shown is the dish served; animate the restaurant's own photo |
| "In the style of a famous director or studio" | describe the look in light, lens, colour and pace instead |
