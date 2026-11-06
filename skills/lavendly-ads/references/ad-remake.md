# Recipe: ad remake

An ad that already works, rebuilt around the user's product: the same
beats at the same seconds, the same shot sizes and hook mechanics, a new
product, a new cast, another language or another ratio. The remake starts
from a format, not from an idea; the proof that the format works is the
reference ad's own numbers.

## 1. The rule: remake the format, never the film

- What carries over from the reference: its length, the order and timing
  of its beats, the shot sizes and moves, where the product first appears,
  the kind of proof it shows, the rhythm of the call to action, the shape
  of its sound (spoken, narrated, music only).
- What never carries over: another brand's product, name, logo, slogan,
  packaging, colours used as identity, its music, its script word for
  word, and any person in it (an actor, a creator, a founder). A remake of
  someone else's ad is a study of structure; everything seen and heard is
  the user's own.
- The user's own ad: everything carries over, including the script and the
  cast when the cast is theirs to use (their own face, a creator under
  contract). Ask once which it is: "Is this your ad or one you admire?"
- An AI person in the remake follows the UGC rule in
  [ugc-style.md](ugc-style.md): a demonstrator, never a customer; the
  disclosure line at delivery.

## 2. Purpose and ending

- Audience: media buyers and brands who have one converting ad and need
  ten, creators remaking a proven format with their own product, teams
  localising a winner.
- The viewer of the remake should feel the same pull at the same second as
  the viewer of the original: the hook lands where it landed, the proof
  arrives where it arrived.
- The ending keeps the original's call to action rhythm (how long it holds,
  spoken or silent) with the user's own offer and product, and clean
  negative space for the card the user adds in the app.

## 3. Read the reference into a shot log

The MCP does not analyse a video. The log comes from what the user tells
you and from any stills they share by public URL; when they can, ask them
to paste the ad's timing as they see it. Fill this table before any plan:

| # | In to out | Size | Move | What happens | Product | Sound |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | close-up | handheld | hook: the product tapped on the lens, a line | in frame | spoken |
| 2 | 3 to 6 | insert | locked | the proof: the texture holding its shape | large | room |
| ... | | | | | | |

Then the five facts the plan needs, each in one line: total length; what
the hook does in the first 3 s (a face, a sound, an action, a question);
the second the product first fills the frame; the proof beat (what the
viewer sees happen); the ending (spoken, silent, how long held). If the
user cannot give a fact, say which beat the remake will invent.

## 4. The swap plan

Show this before anything is created:

| Field | Keeps | Changes to |
|---|---|---|
| Length and beats | from the log | |
| Product | | the user's packshot: `list_assets` or `import_asset`, the locked description |
| Cast | | the user's own face (a hero sheet) or an AI demonstrator; lavendly-characters |
| Language | | the language asked for, lines rewritten by a native speaker's ear, not translated word for word |
| Ratio | | one per workflow: 9:16 feeds, 16:9 for a video site, 1:1 or 3:4 for a square feed |
| Style | | the user's look (clean studio, phone video, lifestyle) |
| Script | the beat each line does | the user's own lines, the same word budget per clip |
| Sound shape | spoken, narrated or music only | the user's voice brief and one score of the same energy |

Two remakes from one log differ in one field each (cast, language, ratio),
never three at once, so the test says which field moved the number.

## 5. Structure by length

The skeleton is the log; these are the common shapes. Gen is the length
to generate (4 s on Veo, 5 s elsewhere). "Photo" means the scene opens on
the user's packshot or lifestyle photo.

**15 s** (a hook, two proofs, the offer)

| # | Time | Size, angle, lens feel | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | close-up, eye level | handheld sway | the hook beat from the log, the user's product in hand | 3 | 4 |
| 2 | 3 to 6.5 | macro insert | locked | proof one, what the viewer saw happen in the original, done by this product | 3.5 | 4 |
| 3 | 6.5 to 10 | medium close-up | slow push-in | the use, one line in the asked language | 3.5 | 4 |
| 4 | 10 to 13 | close-up | locked | proof two, or the reaction beat | 3 | 4 |
| 5 | 13 to 15 | the product on a real surface | locked | the call to action held, space for the card | 2 | 4, photo |

**30 s**: the same five beats with a second proof pair and one lifestyle
shot (the product where it lives) between beats 3 and 4; 8 shots.

**6 s bumper**: beat 1 and beat 5 only, the product in frame 1.

## 6. Hook and payoff

- The hook keeps the original's mechanism, not its content: a lens tap
  stays a lens tap, a question stays a question, a cold sound stays a cold
  sound, with the user's product and words.
- Payoff: the user's product doing the thing the original's product did at
  the same second, then the call to action with the original's hold.

## 7. Camera, light, colour

- Sizes and moves copied from the log shot by shot; one move per shot.
- Light and colour follow the user's style field, not the reference: a
  phone-video reference remade as a studio ad is a legitimate remake.
- Product-exact shots open on the packshot; the packshot is wired as a
  reference into the rest within the model's cap.

## 8. Sound

- Spoken lines are native in the clip, one speaker per clip, 8 words per
  4 s at most; the line does the beat's job in the new language.
- Narrated originals: one narration track for the film, the same word
  count per beat as the original, numbers spelled out.
- One score of the same energy and tempo as the original's, never the
  original's track. Clips `native` under a spoken line, `mix` under
  narration, `off` for a music edit.
- Captions on for sound-off placements, in the language of the lines.

## 9. Models on Lavendly

| Role | Model | Why | 15 s (5 shots) | 30 s (8 shots) |
|---|---|---|---|---|
| Best | Veo 3.1 | lip sync and room sound in the clip, 9:16 and 16:9, 2 references | 245 | 393 |
| Value | Veo 3.1 Fast | the same dialogue handling at 1080p | 80 | 129 |
| Square feeds | Seedance 2.0 | 1:1 and 3:4, 4 references, sound | 230 | 368 |
| Lines in Spanish, Japanese, Korean or Chinese | Kling v3 Standard | native dialogue in those languages, 9:16 | 85 | 137 |
| Draft of timing | Veo 3.1 Lite | a cheap pass to check the beats land; no references | 60 | 97 |

Totals: clips at 4 s (Veo) or 5 s, one photo scene without an opening
image, the rest 2 credits each, one score. A language variant of a spoken
ad costs the spoken clips again; a narrated ad in another language costs
only the narration (re-attach, re-render, free). A second ratio is a second
workflow at full clip cost: the export takes the first clip's aspect.

## 10. Prompt pairs (Veo)

Examples: the user's own product, cast and lines replace the ones shown.
The reference ad's first beat was a presenter tapping a tube on the lens;
the user sells a matte green water bottle and wants Spanish.

**Pair 1: the remade hook**

Still:

```text
Vertical phone photo, front camera, slight wide-angle distortion. A man in his thirties with short dark hair and a plain navy t-shirt, in a small bright kitchen, holding a matte green steel water bottle with a flat black cap close to the lens beside his cheek. Soft window light from the right, a warm pendant light behind. Natural skin texture. A chopping board and a bowl of lemons behind him. No text, no logo, no on-screen graphics.
```

Motion:

```text
Handheld phone camera with a faint natural sway; the bottle taps the lens once at the start and the frame jolts slightly. He pulls the bottle back to show it and says, casually, in Spanish: Mira esto, frío después de ocho horas. (no subtitles) The bottle's shape, matte green finish and flat black cap stay exactly as in the opening frame. Exactly one man, one bottle. Ambient noise: a quiet kitchen. No music. Clean frame, no battery icon, no timestamp, no record dot.
```

**Pair 2: the proof beat (the original showed a texture holding; here the
cold holds)**

Still:

```text
Vertical photo, back camera, macro close-up. A matte green steel water bottle with a flat black cap stands on a pale wooden counter, beads of condensation on its lower half, a thin curl of cold vapour at the open mouth. Soft window light from the right. No text, no logo, no lettering.
```

Motion:

```text
Locked-off camera. 0 to 2 s: a drop of condensation runs slowly down the bottle. 2 to 4 s: a hand pours water into a clear glass beside it; the glass fogs. The bottle's shape, finish and cap stay exactly as in the opening frame. Exactly one bottle, one glass, one hand. SFX: water pouring, the glass set down. No music.
```

**Second families.** Seedance 2.0 for square feeds: a production note,
"already in motion from the first frame", reference 1 as the bottle's shape
and colours only. Kling v3 Standard for the Spanish lines: the labelled
form `[Man, warm casual voice]: "line"` with the action first and no
pronouns.

## 11. Failure modes and fixes

| Failure | Fix |
|---|---|
| The remake drifts from the log (beats late, the product appears later than in the original) | paste the log's seconds into the sequence plan and check each cut against them before the next scene |
| The original's product shows up (its colour, its shape) | the locked description of the user's product verbatim in every prompt; never describe the original's product anywhere |
| A translated line too long to sync | rewrite the line to the beat's job in 8 words or fewer; a native speaker's phrasing, not a translation |
| The same face across language variants looks different | the same hero sheet wired as reference 1 in every spoken clip of every variant |
| The second ratio crops the product | a second workflow with reframed stills (the product centred for 1:1), not a crop of the first |
| "Make it exactly like the original" | say in one line what the remake keeps and what it cannot copy, and show the swap plan |
| No log, only "that ad" | ask for the five facts; build the 15 s default shape and say which beats are invented |

## 12. Policy guards

- Someone else's ad: structure only. No product, logo, slogan, music,
  script or person from it in any prompt, reference or line. If the user
  insists on a copy, decline in one line and offer the remake.
- The user's own ad: confirm the cast and the music are theirs to reuse.
- AI people as demonstrators only; the disclosure line from
  [ugc-style.md](ugc-style.md) at delivery when one appears.
- Claims, prices and offers only as the user gave them, in every language.
