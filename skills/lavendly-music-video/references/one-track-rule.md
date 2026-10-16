# The one-track rule

The song is attached once, as the film's only music. Every generated clip is
silent in the mix, or carries ambience only where the plan says so. This is
the platform's own doctrine ("one music track shared by every clip is the
film's score") and the reason a music video sounds like a record instead of
a playlist of clips.

## 1. The song: once, wired to every clip

```json
{
  "workflow_id": "<id>",
  "clip_id": "<first clip id>",
  "kind": "music",
  "url": "<hosted url of the song>",
  "duration": 30,
  "volume": 1,
  "ducking": false,
  "idempotency_key": "song-<workflow id>"
}
```

- Volume 1 is unity: the master as the artist delivered it. Never above 1
  (the export limiter at about -0.5 dBFS squashes a boosted master).
- `ducking` false: nothing should push the song down. A spoken intro goes
  before the song starts (section 4), never over it.
- Never a second music track, never one per scene. A remix of the song for
  the bridge is a new upload of the whole edit, not a second track.
- `attach_track` wires the song to the first clip only. Add an edge from
  the song's node to every other clip with `update_workflow`
  ([mcp-calls.md](mcp-calls.md)); left on clip 1 the song freezes clip 1's
  last frame for the rest of the track. Split pieces need the edge too.
- `duration` is the block: the song is cut at its end (a `url` song
  defaults to 30 s). Set it to the film's length.
- The source in-point is `edit_clip` `trim` `start_ms` on the song's node:
  a chorus cut can start inside the full song. A song cut before its own
  ending gets `fade_out_ms` on its node.
- Check with `get_workflow_audio`: one track of kind music, wired to every
  clip, and every clip's native mode as planned.

## 2. The clips: silent by default

- `set_clip_native_audio` with mode `off` on every clip. New clips have no
  mode set, and several models (Veo, Seedance, Kling, Wan, Hailuo 3, FLUX 3)
  generate their own sound, often with music. `off` drops it from the mix.
- Write "silent, no music generated" in every motion prompt as well; it
  saves the model's effort for the picture.
- `edit_clip` mute is the same as `off` for a clip that was trimmed or split.

## 3. When a clip may keep its sound

| Moment | Mode | Level | Why |
|---|---|---|---|
| A cold open before the song starts (a door, rain, a needle drop) | `native` | 1 | Diegetic sound sets the place; the song enters after it |
| A breakdown where the song drops to near silence | `mix` | 0.3 to 0.5 | The room breathes under the quiet section |
| A live-session look (room tone between takes) | `mix` | 0.2 to 0.3 | The room under the record, never the instruments |
| A spoken line in a narrative video, in a gap of the song | `native` | 1 | The line is the point; it sits in a gap |

Never keep a clip's sound under a dense section of the song: two musics fight.
Never keep generated singing or instruments: they will not match the record.

## 4. A cold open before the song

When the plan opens on sound (rain, footsteps, a car door) before the music:

1. The first clip is the cold open, `native`.
2. The song is attached to that first clip, wired to every clip, then
   started later with `update_track` `startTime` (seconds on the film
   clock, because the track is film-wide) at the end of the cold open.
3. The cut list's grid starts at the song's start time plus its first
   downbeat.

## 5. No track: making one

When the user has no song:

- Offer a generated score: `attach_track` with `kind` music, `mood` and
  `duration` (5 to 120 s; about 3 credits per 30 s). Charged when attached.
- Write the brief like a producer: genre, tempo, key feel, instruments, the
  section timings, the ending, vocal or instrumental.

```text
Synth-pop, 120 BPM, four-on-the-floor kick, bright arpeggiated synth and a warm bass. Intro 0 to 8 s with filtered drums; verse 8 to 24 s; a riser 22 to 24 s; chorus 24 to 40 s, full and bright; a breakdown 40 to 48 s with pads only; final chorus 48 to 60 s; ends on one hit at 60 s. Instrumental.
```

- Music first, picture after: attach the score, ask the user to listen in the
  app and confirm the downbeat and the section times, then plan the cuts.
  The provider may ignore the tempo in the brief: never promise exact BPM.
  Synthesis is cheap; recutting picture is free; regenerating picture is not.
- The score caps at 120 s: a longer music video needs the user's own track.
- A generated score is not the user's song: say so if they plan to release
  it as their single.

## 6. Mix checks before delivery

- [ ] Exactly one music track; it is the song, wired to every clip.
- [ ] Every clip `off`, except the planned ambience moments.
- [ ] No narration over the song unless the plan has a spoken part in a gap.
- [ ] The song ends where the film ends: the cut ends on the last hit, or
      the excerpt the user uploaded ends with its natural tail. Ask the
      user to listen to the ending in the render.
- [ ] Captions off (`subtitleStyle` off on any voiceover); lyrics are not
      captioned from the song.
