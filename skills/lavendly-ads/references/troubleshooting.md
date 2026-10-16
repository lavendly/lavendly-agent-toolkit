# Troubleshooting: ads

What goes wrong in AI ads and on the MCP path, and what to do. Repair with
the smallest fix first (trim, audio, order), then one targeted re-roll of
one scene with the fix named. Never retry a paid call with a new
idempotency key.

## Product and picture

| You see | It means | Do |
|---|---|---|
| The product looks different from the packshot | the scene opened on a text-made image; the reference only nudged it | open that scene on the packshot (`data.url` on its image node) or keep the product small and partial in it |
| The label letters crawl, melt or change | the model redrew lettering while moving | open on the packshot and shrink the move (push-in only); or turn the label away in the still prompt |
| The bottle widens, grows droplets, gains a button | i2v locks what it is, not exact proportions | "a rigid glass bottle, a solid unchanging form" first in the motion prompt; turn under 45 degrees; trim before the change |
| Two products in frame, or a mirrored twin | a reflection or "another" left open | "exactly one bottle"; bound the reflection; re-roll |
| The hand has six fingers or melts into the product | the hand does two things | one hand, one grip, one action, the contact point named; or cut before the grasp |
| The liquid moves like jelly or freezes | complex pour physics | one pour, one path, slow motion stated, under 4 s; or show the result, not the pour |
| Screens show nonsense UI | models garble interface text | "a plain dark glass screen, switched off"; shoot hands and reactions ([app-saas.md](app-saas.md)) |
| A logo or text appears on its own | "brand", "poster", "ad" in the prompt | delete those words; add the clean-frame line |
| Skin looks waxy or plastic | smoothing by default | "natural skin texture, fine pores, a few freckles"; softer key, not stronger |
| The model adds music under the product sound | Veo and others add a bed | "No music." in the motion prompt; native audio `mix` low or `off` under the score |
| Phone UI, battery icon, record dot on a UGC shot | "phone video" without the clean-frame line | add "clean frame with no on-screen graphics, no timestamps" |
| The opening frame already shows the payoff | the still prompt described the action | rewrite it as the start state |
| The motion starts late and the shot feels empty | Seedance front-loads; others warm up | "already in motion from the first frame"; trim the first 300 to 600 ms |
| Camera drifts after the move | the model kept moving | "the camera settles and holds for the last second"; trim the tail |
| A 1:1 or 3:4 ad comes out letterboxed | the model does not make that shape (Veo is 16:9 and 9:16 only) | pick a model with the shape (Seedance, Wan 2.7, Kling for 1:1, Hailuo 3) |
| The 21:9 banner exports as vertical | 21:9, 9:21, 3:2, 2:3 export at the 9:16 size | use 16:9 |

## Sound and words

| You see | It means | Do |
|---|---|---|
| The last frame freezes at the end | narration ran past the picture | cut the line to `floor(seconds x 2.5)` words or fewer, re-attach |
| The first scene freezes while the voice or score plays on | the track is wired to the first clip only | `update_workflow`: an edge from the track's node to every clip ([mcp-calls.md](mcp-calls.md)) |
| The voice fights a clip's own sound | the clip is `native` under narration | set that clip to `mix` at 0.3, or `off` |
| Captions missing | no narration, a voiceover by `url`, style `off`, or a one-scene film | captions come only from a synthesized voiceover on a film of two or more scenes; `update_track` with a `subtitleStyle` |
| A spoken price reads wrong in captions | digits in the script | spell numbers out in speech; captions follow the words |
| Garbled subtitles inside a Veo clip | Veo sometimes burns its own | "(no subtitles)" after each spoken line; burn captions from narration |

## Platform and errors

| You see | It means | Do |
|---|---|---|
| `url required` from `attach_track` | no synthesis on this server | ask the user to make the voice or music in the Asset Library; attach by `url` |
| A refusal naming the duration | the length is not on the model's list | set a listed length with `update_workflow` (Veo 4, 6, 8), trim later |
| A 400 naming references, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | more references than the model takes, or any on Veo 3.1 Lite | keep the packshot only (cap 2, MCP path 3 besides the first frame on Seedance and Wan 2.6, 2.7); none on Lite |
| `insufficient_credits` or `sufficient` false | the balance cannot cover it | stop; offer a cheaper model from the recipe or fewer shots |
| `quote_exceeded` | the call would pass `max_credits` | `estimate_cost` again, announce, new yes |
| `needs_browser` | this scene must run on the canvas | tell the user to open the video in the app; stop polling |
| `stalled` twice | the job stopped reporting | check once more; never start a second job for the scene |
| `version_conflict` | the workflow changed since you read it | `get_workflow`, reapply, send again |
| `pass` false with `reroll_hint` | an artefact was found | one re-roll with the hint and a simpler action; then stop and report |
| A rate-limit answer with a delay | too many changes per minute | wait the stated time; batch node changes into one `update_workflow` |

## Requests to reshape

| Request | Answer |
|---|---|
| "Make it look like a real customer review" with AI people | AI people demonstrate; they are never presented as customers. Offer a hands-only demo, or a real review read by an AI person with the dramatisation label |
| "Show the wrinkles disappearing" | AI results are not proof. Show application and texture; real before and after photos only from the user, with consent |
| "Put the logo and price on screen" | the MCP renders no text; the price is spoken and captioned, the last shot leaves space for the user's logo and price card in the app |
| "Copy this competitor's ad" | take the pattern (a hook type, a structure), never the brand, footage or copy |
| "Add a famous person" or "in the style of a named studio" | no real people or studio names; describe the look in light, lens and colour |
| "Make twenty variants" | two or three, one variable each; more only on request and estimate |
