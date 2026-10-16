# What generated video cannot do here, and the honest alternative

Motion designers expect typography, logos, charts, alpha channels and
frame-exact loops. Lavendly's pictures come from video models through the
MCP, and the render stitches them. Say the limit plainly before planning,
then offer the alternative that works.

| The brief wants | Why it fails here | The honest alternative |
|---|---|---|
| Readable titles, kinetic type, lower thirds, credits | the MCP renders no on-screen text, and video models misspell and warp letters | generate plates with described empty space; the user sets the type in the app's editor where it offers one, or in their own editor after export; or carry the words as narration with captions burned from the voice track |
| An exact logo animated | models redraw marks; a logo sent as a reference comes back altered | a logo-free ident built from the brand's colour, shape, material, motion and sound, ending on a clean field where the user places the real logo ([recipe-brand-idents.md](recipe-brand-idents.md)) |
| A precise chart (bars, axes, percentages) | models invent bars, counts and labels | a physical metaphor with at most five countable objects, the exact number spoken and captioned, and the user's own chart dropped in by the user in the app ([recipe-visual-metaphors.md](recipe-visual-metaphors.md)) |
| A product label or packaging text exact in every frame | text on a moving surface garbles | start from the real packshot as the opening image, keep the label small or turned away, short clips; the user composites the real label if it must read |
| App screens and UI | generated UI is nonsense | a blank or softly glowing screen; real screen recordings imported and placed by the user |
| A full 360-degree product spin | identity drifts beyond about 90 degrees per clip | cuts between four angles on the beat, or two quarter orbits chained once for 180 degrees |
| A loop where the last frame equals the first by pinning | Lavendly sends a first frame only; no last-frame pin exists | the ping-pong loop, cyclic motion by design, or an occlusion seam ([recipe-loops.md](recipe-loops.md)) |
| Transparent background (alpha) | exports are MP4 with a picture in every pixel | a flat solid field in one colour the user can key in their editor; say keying generated edges is imperfect |
| Exact brand colours by hex | models do not read hex reliably | named colours in prompts ("cobalt blue"), hex kept in the brief; check frames; `edit_clip` `color` can nudge brightness, contrast, saturation and hue per clip |
| More than five identical objects counted exactly | models add and drop items | five or fewer, or a mass with no count ("a pile of sand", "a sea of spheres") |
| Beat-exact sync of motion inside a clip | a generated clip's timing is approximate | cut points placed on the beat with `edit_clip` trims (clips play back to back, so the trims set every cut; `move_clip` only orders); the event inside the clip lands near its second |
| A smooth speed ramp | `speed` is set per clip | `split_clip` and a different `speed` per half: a step change, or the model's own slow motion inside one clip |
| 4K delivery, 60 fps | the render outputs at most 1080p frames at 30 fps | say so; 1080p on Creator and up |
| Ultra-wide 2.39:1 frame | no export frame for 21:9; it falls back to the 9:16 size | compose 16:9 with the action in a central band; the user adds bars in their editor |
| Dissolves between shots | the render makes hard cuts and fades to black today | cut on motion or on a shape match; a dip to black with `fade_out_ms` and `fade_in_ms`; dissolves only where `get_schema` shows them |
| A sound effect layer under the score | `attach_track` takes voiceover or music only | the clip's own sound is the Foley (`native` or `mix`); a designed sound file can ride as the film's one music track by `url` |
| Lip sync to an uploaded voice | no lip-sync route | narration over picture, no speaking face |

Never promise a fix the platform does not have. When `get_schema` lists a
new capability (dissolves, scene plans, loudness), use it where it appears;
never before.
