# Troubleshooting: social

Failures specific to short-form, with the fix. General errors (credits,
idempotency, stalls) follow lavendly-director. Never retry a paid call with
a new idempotency key.

| You see | It means | Do |
|---|---|---|
| The first frame is soft, static or black | Model warm-up at the start of the clip | `edit_clip` trim `start_ms` 300 to 600 on the hook clip; on re-rolls write "already in motion from the first frame" |
| The hook is spoken after a pause | The voice track does not start at 0 | `update_track` `startTime` 0; cut any lead-in words |
| Captions hidden under the platform's buttons | Captions burn at the bottom on an MCP render; the brand-kit position does not reach it | Keep the picture's key content in the upper two thirds |
| No captions on spoken lines | Native speech and imported footage have no word timings | Platform auto-captions at upload, or the app; a synthesized voiceover gets captions |
| Captions missing on the voiceover | Attached by `url`, `subtitleStyle` missing or `off`, or a film of one clip node | Synthesize from `text`; `update_track` with `tiktok` or `reels`; two or more clips |
| The first clip freezes while the voice or bed plays on | The track is wired to the first clip only | `update_workflow`: an edge from the track's node to every clip ([mcp-calls.md](mcp-calls.md)) |
| The presenter's mouth moves under the attached voice | A silent model drew speech | "Her lips stay closed; she listens and nods" or frame the mouth out (profile, hands, back); re-roll |
| Lip sync drifts on a spoken line | The line is too long for the clip | One sentence, about 2 words per second, medium close-up, locked camera; split the line over two clips |
| The voice of a native-speech host changes between clips | Each clip voices itself | Identical delivery words in every clip; fewer speaking clips; the rest as b-roll |
| Phone UI, a recording dot, a timestamp in frame | "phone video" without the clean-frame line | Add the phone clean-frame line; re-roll |
| Too clean, too smooth for a phone look | Tripod defaults | The four questions and one imperfection per shot (phone-footage.md) |
| Two of the creator, or a stranger in frame | Count not stated | "Exactly one person in frame, nobody else, no copy of her" |
| The creator's face changes between clips | No reference, or a paraphrased description | Face close-up as reference 1 with its role sentence on Seedance or Wan; the description verbatim |
| A reference image fails on a Veo 3.1 Lite clip | Veo 3.1 Lite takes no references | Remove the edges or use Veo 3.1 Fast |
| `invalid_args` naming the duration | Length not in the model's list (Veo 5 s, HeyGen 4 s) | Next allowed length; trim |
| The video is letterboxed | The first clip is another shape | Every clip 9:16; one workflow per shape |
| An imported clip does not appear | The node is not a videoGenerator node with `video_url` | Check it in `get_workflow`; fix the node with `update_workflow`; `move_clip` only reorders |
| Import refused | Over 64 MB by URL, about 11 MB inline, or over 3 minutes | Asset Library upload in the app; cut the source into parts of 3 minutes or less |
| An invalid edits error on a trim | The window is outside the media's length | Read the clip's length; trim inside it |
| A crop looks soft | A 16:9 1080p source cropped to vertical keeps 608 px of width | Say so; prefer vertical sources; crop less (a 3:4 or 1:1 version) |
| The loop has a visible jump | The last frame does not match frame 0 | recipe-loops.md: a cyclic action, a ping-pong copy, or a matched end state checked with first and last frames |
| A trend asked for with a specific song | Licensed audio is not ours to attach | Original bed; the user adds the platform sound when posting |
| The user wants "the same video as @creator" | Copying | The format only, with original concept, script, look and voice |
| Hook and payoff do not match | The video changed in the edit | Rewrite the hook to the payoff that exists, or re-cut |
| The payoff arrives after 90 percent | Body too long | Cut beats before the payoff; never add an outro |
| A 1080p model looks no sharper | Free and Starter export at 720p | Value model on those plans |
