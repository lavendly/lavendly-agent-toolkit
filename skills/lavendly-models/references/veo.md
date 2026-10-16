# Veo 3.1 family (Google)

Veo 3.1, Veo 3.1 Fast and Veo 3.1 Lite. The strongest native dialogue and
sound on Lavendly, and the strictest shape rules: three lengths, two
aspects. All nine Quick Start templates use Veo 3.1 Fast.

## Lavendly specs

| | Veo 3.1 | Veo 3.1 Fast | Veo 3.1 Lite |
|---|---|---|---|
| id | google/veo-3.1 | google/veo-3.1-fast | google/veo-3.1-lite |
| Seconds (exact) | 4, 6, 8 | 4, 6, 8 | 4, 6, 8 |
| Resolutions | 720p, 1080p (default), 4k | 720p, 1080p (default), 4k | 720p, 1080p (default) |
| Aspects | 16:9, 9:16 | 16:9, 9:16 | 16:9, 9:16 |
| First frame / last frame (provider) | yes / yes | yes / yes | yes / yes |
| References Lavendly sends | 2 | 2 | 0 |
| Native sound | yes | yes | yes |
| Credits per 5 s block | 720p 47, 1080p 47, 4k 70 | 720p 14, 1080p 14, 4k 35 | 720p 10, 1080p 10 |
| Clip at default (MCP) | 4 s 47, 6 s 94, 8 s 94 | 4 s 14, 6 s 28, 8 s 28 | 4 s 10, 6 s 20, 8 s 20 |

## What the MCP path changes

- 6 s costs two blocks, the same as 8 s. Write 4 or 8; trim 8 to 6 with
  `edit_clip` when the cut wants 6.
- 4k needs the canvas and a Studio or Enterprise plan. The MCP path always
  quotes 1080p.
- The last frame is never sent. Google's first-and-last-frame transition is
  not reachable; describe the end state in words.
- Veo 3.1 Lite is Auto. It takes no references, and the server may still
  send some (a Film Bible with images, or 2 or more images wired to the
  clip): the provider then refuses, the scene is retried, then skipped
  uncharged, and the render still ends `done` without it. Never wire
  references into a Lite scene; pick Veo 3.1 Fast when the scene needs one.
- Google runs clips with reference images at 8 s. On Veo 3.1 and Fast,
  write 8 for every referenced scene.
- No sound switch is sent: Veo's default (sound on) applies. Every clip
  speaks, rings or hums unless the prompt says what it hears.
- English is the only spoken language Google has evaluated. For other
  languages use Kling or narration.
- Google allows image-to-video with people for adults only. Every Lavendly
  scene starts from an image, so a child character may be refused or
  altered: prefer a creature hero, or another family, for children.

## The dialect

Five parts in this order, as sentences:
**Cinematography + Subject + Action + Context + Style and ambiance.**

| Part | Write |
|---|---|
| Cinematography | shot size, angle, lens feel, the one move: "Medium close-up, slow push-in" |
| Subject | who or what, observable: age, hair, wardrobe, one mark |
| Action | one beat, a visible verb, its timing |
| Context | place, props, light source and direction |
| Style and ambiance | the look in plain words, palette, texture |

Veo understands: dolly shot, tracking shot, crane shot, aerial view, slow
pan, POV shot, arc shot, wide shot, close-up, extreme close-up, low angle,
two-shot, top-down, worm's eye, eye level, shallow depth of field, deep
focus, soft focus, macro lens, wide-angle lens.

### Sound lines

- Dialogue in quotes with the speaker described and placed:
  `The man in the grey coat says, quietly: "We have to leave now."`
- Effects with a label: `SFX: a brass switch clicks once.`
- Ambience with a label: `Ambient noise: rain on glass, low wind.`
- A score cue can ride an SFX line, but Lavendly's doctrine is one score per
  film from `attach_track`: end the sound lines with "no music".

### The subtitles caution

Veo sometimes burns garbled subtitles into clips with dialogue. Put
"(no subtitles)" right after each spoken line, keep dialogue early in the
prompt, and end with the clean-frame line. Lavendly's captions come from
the narration track, never from the model.

### Dialogue budget

At most 2 words per second of clip: an 8 s clip holds 12 to 16 words, one
speaker. Lip sync holds best in a medium close-up, one face, locked camera.

### Timestamp blocks (several beats in one 8 s clip)

Bracketed ranges, each a beat with its own framing and sound, at least 2 s
each, four at most in 8 s. A clip built this way contains cuts: the first
bracket must match the opening image, the next scene starts from the last
bracket, and the check reads each bracket.

## Example 1: dialogue, Veo 3.1, 16:9, 8 s

Still-frame prompt (image node):

```text
Narrative short film still, 35mm look. Elias, a lighthouse keeper in his seventies, short white beard, weathered face, grey flat cap, navy wool sweater, sits at a scrubbed pine table holding a folded letter, eyes down. Medium close-up from just above eye level, shallow focus. One warm oil lamp on the table to his right, soft, deep shadow on his left cheek. Rain-streaked window behind him, dark blue night. No text, no on-screen graphics.
```

Motion prompt (clip):

```text
Medium close-up, locked-off camera. Elias unfolds the letter, reads for a moment, then lowers it to the table and looks up toward the window. He says, quiet and hoarse: "You said you would come back when the light was fixed." (no subtitles) He holds still after the line, eyes wet, jaw set. Exactly one man in frame, nobody else. Elias, the table and the lamp light stay exactly as in the opening frame. SFX: paper unfolding, the chair creaks once. Ambient noise: rain on glass, low wind, no music. Clean frame: no text, no subtitles, no on-screen graphics.
```

## Example 2: product with effects, Veo 3.1 Fast, 16:9, 8 s, timestamp blocks

Still-frame prompt:

```text
Premium product film still. A table lamp with a matte stone-grey mushroom dome, a slim brass stem and a round brass base, switched off, centred on a dark oak side table. Camera at table height, three-quarter angle, the dome filling the upper third. One cool soft window light from the left, the right side in shadow. Matte stone grain on the dome, brushed brass on the stem. Dark room behind, out of focus. No text, no on-screen graphics.
```

Motion prompt:

```text
[00:00-00:03] Close-up at table height, locked-off: a thumb presses the brass switch at the base of the stone-grey lamp; warm light blooms under the dome. SFX: one soft brass click.
[00:03-00:06] Medium shot from the side: the pool of warm light spreads across the dark oak and reaches the window frame. Ambient noise: quiet room tone, rain outside, no music.
[00:06-00:08] Slow push-in until the dome fills the frame, then the camera holds. Exactly one lamp, the thumb the only other thing that enters. Clean frame: no text, no logo, no on-screen graphics.
```

## Example 3: vertical social, Veo 3.1 Lite (Auto), 9:16, 4 s, no references

Still-frame prompt:

```text
Vertical photo, natural phone-camera look. A ceramic coffee cup full of black coffee on a sunlit cafe counter, steam rising, a wet ring on the pale marble. Camera close and low, at cup height, cup in the lower half of the frame, upper half soft window glare. Morning sun from behind the cup, hard, warm, long shadow toward the lens. No text, no on-screen graphics.
```

Motion prompt:

```text
Close-up, locked-off. A single sugar cube drops from above into the coffee in the first second; the surface ripples and a ring of foam spreads and settles. Steam keeps rising. The cup and the counter stay exactly as in the opening frame. Exactly one cup, one sugar cube. SFX: a small plop, a spoon set down off screen. Ambient noise: cafe murmur, no music. Clean frame: no text, no timestamps, no on-screen graphics.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| Burned-in or garbled subtitles | "(no subtitles)" after each line, the clean-frame line, re-roll once |
| The wrong person speaks | Describe the speaker by look and position; one speaker per clip or per bracket |
| An exclusion ignored ("no cars") | Describe the absence positively: "an empty street with parked bicycles only" |
| Music under the clip clashes with the score | End the sound lines with "no music"; set the clip to `mix` under narration |
| Faces drift with references | One clean, evenly lit front or three-quarter reference per character; text that agrees with it |
| Too much happening | One action per clip or per bracket; under four brackets |
| Refusal on Veo 3.1 Lite | References reached it; move the scene to Veo 3.1 Fast or remove the wired images |
| `invalid_args` on duration | 5 or 10 written on Veo; set 4 or 8 with `update_workflow` |

## When to pick

- Veo 3.1: the hero dialogue scene, the single shot that carries the film,
  when the budget allows 94 per 8 s.
- Veo 3.1 Fast: the default for sound-led films and dialogue on a budget;
  takes the hero and one more reference.
- Veo 3.1 Lite: drafts and shots that need no reference; never a scene
  that must match a reference.
