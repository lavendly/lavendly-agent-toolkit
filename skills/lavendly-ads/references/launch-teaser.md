# Recipe: launch teaser

Coming-soon films, drop announcements, pre-order teasers, reveal countdowns.
The sale is anticipation: show enough to want it, hide enough to come back.
The product, even half-seen, must be the real one (a final render or
packshot); dates and features are only what the user has confirmed.

## 1. Purpose and ending

- Audience: followers and waitlist subscribers on Instagram, TikTok,
  YouTube, X; launch pages.
- The viewer should recognise a shape, feel a detail, and remember a date.
- The ending: the full product revealed once, held 2 to 4 s (the render or
  packshot), the date and the call to action spoken ("October twentieth.
  Join the list."), space for the logo and date card the user adds.

## 2. Structure by length

Gen is the length to generate on Veo (4 s); on FLUX 3 generate 5. "Render"
means the scene opens on the imported final render or packshot.

**6 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 2 | macro in darkness, 100mm | locked-off | hook: a thin line of light traces one edge | 2 | 4 |
| 2 | 2 to 4 | close-up, low angle, 85mm | slow push-in | the silhouette against a glowing back wall | 2 | 4 |
| 3 | 4 to 6 | medium, 85mm | locked-off | light rises; the product revealed, held; the date spoken | 2 | 4, render |

**15 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | macro in darkness, 100mm | locked-off | hook: a line of light traces one curved edge | 3 | 4 |
| 2 | 3 to 6 | macro, 100mm | slow slide | a texture passes through a narrow beam | 3 | 4 |
| 3 | 6 to 9 | close-up, low angle, 85mm | slow push-in | the silhouette against a glowing wall, haze | 3 | 4 |
| 4 | 9 to 12 | close-up, 85mm | locked-off | a second detail catches the light, then darkness: half a beat of silence | 3 | 4 |
| 5 | 12 to 15 | medium, 85mm | locked-off | light rises across the whole product, held, date and call to action | 3 | 4, render |

**30 s**

| # | Time | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|
| 1 | 0 to 3.5 | macro in darkness, 100mm | locked-off | hook: a light line traces the edge | 3.5 | 4 |
| 2 | 3.5 to 7 | wide, 24mm | slow push-in | an empty dark studio, one shape under a cloth on a plinth | 3.5 | 4 |
| 3 | 7 to 10.5 | macro, 100mm | slow slide | a texture through a beam | 3.5 | 4 |
| 4 | 10.5 to 13.5 | close-up, 85mm | locked-off | a corner of the cloth lifts in a draught, a glint beneath | 3 | 4 |
| 5 | 13.5 to 16.5 | macro, 100mm | locked-off | a button or seam lit for a moment | 3 | 4 |
| 6 | 16.5 to 20 | close-up, low angle, 85mm | slow push-in | the silhouette against the glowing wall | 3.5 | 4 |
| 7 | 20 to 23.5 | wide, 24mm | locked-off | the cloth slides off the plinth, the shape still in shadow | 3.5 | 4 |
| 8 | 23.5 to 26.5 | close-up, 85mm | locked-off | darkness, then one beam finds the top: half a beat of silence | 3 | 4 |
| 9 | 26.5 to 30 | medium, 85mm | locked-off | light rises; the product revealed, held, date and call to action | 3.5 | 4, render |

**60 s**: a three-act teaser. Act 1 (0 to 20 s): the world the product is
for, no product, four shots. Act 2 (20 to 45 s): details in darkness, the
covered shape, six shots on a rising score. Act 3 (45 to 60 s): silence,
the reveal held 6 s from the render, the date. 12 to 14 shots.

## 3. Hook and payoff

- Hook: a fragment that raises a question: an edge in a line of light, a
  texture in a beam, a shape under a cloth, a sound with no source shown
  (a click in darkness).
- Payoff: one clean reveal, light rising over the whole product, then
  stillness and the date. Reveal once; never show the product fully before
  the last scene.

## 4. Camera, light, colour

- Camera: 100mm macro for fragments, 85mm low angle for silhouettes,
  locked-off reveals, slow push-ins. One move per shot, alternating move
  families (slide, push, still) so no two neighbours repeat.
- Light: "low-key studio, a single narrow beam raking across", "a thin line
  of light travelling along the edge", "a softly glowing back wall, the
  product a dark silhouette in front, light haze in the air", for the
  reveal "a large soft light rising slowly from below until the whole
  product is lit".
- Colour: near-black with one accent from the brand or the product
  ("Palette: black, graphite, one warm orange accent").
- Haze only where a beam needs to read; never "flare" without a light in
  frame.

## 5. Sound

- Native: almost none; a single click, a cloth sliding, the hum of a light.
- Narration: 6 s 6 to 10 words (the date); 15 s 15 to 25; 30 s 35 to 55; 60
  s 90 to 120. Sparse, questions or fragments ("Lighter. Quieter. Yours on
  the twentieth."). Never a feature list.
- Score: "Low synth drone around 90 BPM with a slow pulse, rising risers
  across the details, a hard stop to silence for half a beat before the
  reveal, then one deep warm hit and a sustained chord under the reveal.
  Instrumental."
- Mix: fragments `mix` 0.2 or `off`; the reveal `mix` 0.3; score 0.5 to 0.7
  with ducking under the date line.

## 6. Models on Lavendly

| Role | Model | Why | 15 s (5 shots) | 30 s (9 shots) |
|---|---|---|---|---|
| Best | Veo 3.1 | low-key light, beams and haze hold at 1080p; quiet native sound | 246 | 443 |
| Value | Veo 3.1 Fast | same dialect, 1080p | 81 | 146 |
| Draft | Veo 3.1 Lite | timing check; no references; render frames still work | 61 | 110 |
| Art-directed reveal | FLUX 3 Video | stylised, art-directed shots, 5 to 20 s takes, sound, 1080p | 181 | 326 |

Totals: clips at 4 s (Veo) or 5 s (FLUX), one render scene without an
opening image, the rest 2 credits each, score 2 or 3, voice 1.

## 7. Prompt pairs (Veo)

Examples: the user's own product, brand and photos replace the ones shown.

**Pair 1: the light line on the edge**

Still:

```text
Premium product teaser still. Macro shot, 100mm lens, very shallow focus. Near-total darkness; the curved matte black edge of a small rounded device is barely visible, one thin line of white light touching the start of the curve on the left. Low-key, deep blacks. Palette: black, graphite, one thin white line. No text, no logo.
```

Motion:

```text
Locked-off camera at macro distance. 0 to 3 s: the thin line of light travels slowly along the curved edge from left to right, revealing its smooth matte surface, then fades at the far end. The object stays exactly as in the opening frame; only the light moves. Exactly one object. SFX: a faint electric hum rising. No music. Clean frame, no text, no logo.
```

**Pair 2: the covered shape**

Still:

```text
Premium product teaser still. Wide shot, 24mm lens, eye level. An empty dark studio with a concrete floor, one waist-high black plinth in the centre with a small shape under a draped grey cloth, a softly glowing pale wall behind, light haze in the air. Palette: black, grey, pale warm wall glow. No text, no logo.
```

Motion:

```text
Slow push-in toward the plinth over the whole shot, then the camera settles. The haze drifts slowly through the glow; the cloth stays still over the shape. The studio, the plinth and the cloth stay exactly as in the opening frame. Exactly one plinth, one covered shape, nobody in frame. Ambient noise: a low room hum. No music. Clean frame, no text.
```

**Pair 3: the reveal** (opens on the imported render)

Motion:

```text
Locked-off camera. 0 to 3 s: a large soft light rises slowly from below until the whole product is evenly lit, then holds still. The product's shape, finish and details stay exactly as in the opening frame. Exactly one product. SFX: one deep soft tone as the light reaches the top. No music. Clean frame, no text, no logo.
```

When the render is dark-on-dark, ask the user for a version with the
product lit; the light rise then works as a reveal from a darker trim of
the first second.

**Second family (FLUX 3 Video).** Short art-directed prose: the light, the
palette, the one move, the keep line. Use it for a single long reveal (10
to 15 s) in place of shots 6 to 9; it accepts 21:9 but the export would
fall back to the 9:16 size, so stay on 16:9 or 9:16.

## 8. Failure modes and fixes

| Failure | Fix |
|---|---|
| The silhouette reveals a different product | open the reveal on the render; keep silhouettes small and backlit |
| "Flare" and haze everywhere | name one beam and where haze sits; no flare without a source in frame |
| Darkness turns to muddy grey | "deep blacks, one source"; trim the clip to the frames where the beam reads |
| Shapes appear under the cloth | "one small shape under the cloth, nothing else on the plinth" |
| The reveal happens in an early scene | every early still keeps the product partial or covered |
| The date appears garbled on a wall | no dates or words in prompts; the date is spoken and captioned |

## 9. Policy guards

- Dates, prices and features only as the user has confirmed them; never
  imply a feature the product will not ship with.
- Pre-order claims follow the user's terms; say "join the list" rather than
  "order now" when ordering is not open.
- No competitor shapes or other brands' signature designs.
