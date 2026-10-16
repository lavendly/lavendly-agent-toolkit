# Troubleshooting: explainer

Failures specific to explainers, with the fix. General errors (credits,
idempotency, stalls) follow lavendly-director. Never retry a paid call with
a new idempotency key.

| You see | It means | Do |
|---|---|---|
| Garbled letters on a label, a board, a screen, a map | The prompt left a writable surface open | Name it blank ("a blank white label", "an unlabelled relief map"); re-roll once; carry the words in narration and captions |
| A chart, a graph or numbers drawn in frame | "chart", "graph", "statistics" or a number reached the prompt | Replace with the physical comparison from visual-metaphors.md; say the number |
| The picture does not show the sentence | A decorative shot was written for a fact | Rewrite the beat from the claim: what object changes, from what to what |
| The last frame freezes at the end of a scene | Narration ran past its picture | Cut words to the budget (2.5 per second ceiling, aim 2.3) and attach again; the picture is not at fault |
| Music under the narration that nobody attached | Veo's own bed in a clip set to `native` | Add "No music." to the motion prompt on re-rolls; set the clip to `mix` 0.2 to 0.3 or `off` |
| The voice reads "1969" as "one nine six nine" or mangles an acronym | Digits or letters in the script | Spell the number as spoken; spell out the acronym or use the full name |
| Captions missing | The voiceover was attached by `url` (no word timings), or `subtitleStyle` is missing or `off` | Synthesize the voice from `text`; `update_track` with a caption style |
| Captions sit under the platform's buttons | Captions burn bottom aligned on an MCP render; the brand-kit caption position does not reach it | Keep key picture content in the upper two thirds |
| A diagram turned into a tangle of lines | Diagrams are not a model strength | Use a physical model, a cutaway object or a miniature; or import the user's real diagram |
| An animal with wrong anatomy or extra legs | Fast motion or a vague species | Name the species and its markings, medium-wide framing, slow simple motion, "on all four legs" |
| An impossible animal behaviour | The prompt asked for drama | Write the species' real behaviour; documentary never invents one |
| Anachronisms (zips, plastic, wristwatches, electric light) in a period scene | Period not specified in materials | List the period materials and light sources in the still prompt; see recipe-history.md |
| A face that looks like a known person | A real name or a famous role reached the prompt | Remove the name; show hands, objects, a figure from behind or at distance |
| Hands do the step wrong (knot, cut, assembly) | Precise manual steps are a model weakness | Show the result state and a simple action; import real footage for the exact step |
| A UI or app screen invented by the model | The prompt asked for a screen | Import a real screen recording; keep generated shots to the hands and the device turned away |
| A 400 naming references on a Veo 3.1 Lite clip, or a scene missing from a render that says done (a referenced Veo 3.1 Lite scene is retried, then skipped uncharged) | Veo 3.1 Lite takes no references | Remove the reference edges or switch that film to Veo 3.1 Fast |
| `invalid_args` naming the duration | A length the model does not make (Veo 5 s, Hailuo 2.3 4 s) | Set the next allowed length with `update_workflow`; trim with `edit_clip` |
| The film is letterboxed or pillarboxed | Clips of another shape than the first clip | Keep one aspect for the film; render a second version for the other platform |
| A 1080p model looks no sharper than a cheap one | Free and Starter exports are 720p | Use a value model on those plans |
| The imported clip is missing from the render | The clip node is not a videoGenerator node with `video_url` | Check the node in `get_workflow`; set its type and `data.video_url`; `move_clip` only places a clip that is already in the render |
| The render refuses: film too long | Over 180 s | Split into parts |
| The hook frame is an establishing wide | Habit from long-form | Open on the subject of the first sentence, close and legible |
| Every shot pushes in | No move plan | Apply the arc's camera rhythm; static for the payoff |
| `story_pass` false on an illustrative scene | The checker expected literal action | Open the frame; if the metaphor reads, keep it |
