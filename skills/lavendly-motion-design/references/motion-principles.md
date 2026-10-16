# Motion principles for generated motion design

Easing, anticipation, overshoot, stagger, rhythm, camera choreography for
CG, 3D lighting rigs and materials, written as words a video model follows.
A motion designer sets curves in a graph editor; here the curve is a
sentence, so it must be precise and short.

## 1. Easing

| Curve | Feels like | Use | Words |
|---|---|---|---|
| Linear | mechanical, constant | conveyors, rotating gears, endless loops, scrolling textures | "turns at a constant speed from the first frame to the last" |
| Ease-out (decelerate) | arriving, settling | an object landing in place, a camera arriving | "slides in fast and slows to a gentle stop" |
| Ease-in (accelerate) | departing, gathering | an object leaving, a launch | "starts slowly and accelerates out of frame" |
| Ease-in-out | controlled, premium | camera moves, product orbits, reveals | "eases into the move, glides, and eases to a stop" |
| Overshoot and settle | playful, springy | idents, icons, mascot props | "snaps into place, overshoots slightly and settles back" |
| Bounce | toy-like, light | small objects dropping onto a surface | "drops and bounces twice, each bounce smaller" |
| Elastic | rubbery, comic | squash-and-stretch props | "stretches as it flies and squashes once on landing" |

Premium pieces use ease-in-out and long, slow moves; playful pieces use
overshoot and bounce on short, quick moves. Never stack two curves on one
move.

## 2. Anticipation, follow-through, stagger

- Anticipation: a small counter-move before the main one: "the cube dips
  slightly, then rises".
- Follow-through: parts keep moving after the main body stops: "the
  ribbon tails keep swinging for a moment, then settle".
- Stagger (offset): several elements start one after another, not
  together: "the five tiles flip one after another from left to right, a
  short beat apart". Keep staggered sets to 5 elements or fewer; more get
  merged or miscounted.
- Arcs: natural objects travel on curves, mechanical ones on straight
  lines. Say which.
- Hold: a designed stillness of 0.6 to 1.5 s before the payoff move makes
  it land; the final hold for a logo the user adds is 2 s or more.

## 3. Rhythm

- Beats: frames per beat = (60 / BPM) x fps. At 120 BPM one beat is 0.5 s
  (15 frames at the export's 30 fps); a bar of 4/4 is 2 s.
- Lengths that sit on the grid: 4 s = 2 bars at 120 BPM; 8 s = 4 bars;
  15 s = 8 bars at 128 BPM; 30 s = 16 bars at 128 BPM.
- Cut on phrases (2, 4 or 8 beats), not every beat. Motion personality sets
  the phrase: playful 4 beats, corporate 8, premium 8 to 16, an energetic
  climax 1 to 2 beats for a bar, then a held shot.
- Silence before the biggest move: drop the score for half a bar before the
  reveal, then hit.
- On Lavendly the cut is placed with `edit_clip` trims and `move_clip`; the
  score is generated from a brief, so name its tempo and where it hits, and
  check the render: beat-exact sync is not guaranteed.
- Inside one generated clip, timing is approximate: write beats in seconds
  ("0 to 2 s"), keep to 1 or 2 events per 5 s.

## 4. Camera choreography for CG

One move per shot, with amount, speed, start trigger and stop.

| Move | Limits on Lavendly | Words |
|---|---|---|
| Orbit | 45 to 90 degrees per clip; beyond that the product drifts | "orbits 60 degrees to the right at an even pace and stops on the three-quarter view" |
| Turntable (object turns, camera locked) | a quarter turn per clip | "the turntable turns the bottle a quarter turn; the camera stays locked" |
| Push-in | slow; a close-up past about 1.5 times the start becomes mush, so a tight close-up is its own clip | "slow push-in from medium to close-up, stopping on the cap" |
| Pull-back reveal | end on a composed frame | "slow pull-back revealing the whole set, stopping when the floor edge enters" |
| Crane over | modest height change | "camera rises over the top edge and looks down at the cap" |
| Top-down spin | slow | "top-down, the camera rotates slowly a quarter turn around the vertical axis" |
| Macro slide | a few centimetres of travel | "macro slide along the bevelled edge, a few centimetres, constant speed" |
| Push through layers (2.5D parallax) | foreground fastest | "glides forward through three planes of floating glass, nearest passing fastest" |
| Rack focus | one change per clip | "rack focus from the droplet in front to the bottle behind" |
| Dolly zoom | slow, short | "pushes in while zooming out, the background stretching behind the object" |
| Fly-through (environments) | one path with landmarks, long takes on Wan 3.0 or Seedance 2.5 | "glides forward at walking pace past the fountain, under the arch, and stops facing the tower" |

- Avoid "snap", "slam", "punch-in", "quick zoom" inside a shot: models make
  a jump that reads as a one-frame flash. Cut to the closer shot instead.
- A model told to hold still may still push in. When stillness matters,
  say "locked-off camera on a tripod, the frame does not move" and check.
- Speed changes: the model's own slow motion holds for about 4 s on simple
  motion. A speed ramp across a cut is `split_clip` plus a different
  `speed` per half with `edit_clip`: a step change, not a smooth ramp.

## 5. 3D lighting rigs, in words

| Rig | Words |
|---|---|
| Product hero, glossy | "one large overhead softbox, two tall strip lights left and right drawing long edge highlights, black flags beside the camera keeping the sides dark" |
| Glass on black | "clear glass on black, backlit, two thin strip lights tracing its edges, nothing else lit" |
| Glass on white | "clear glass on a white cyc, dark cards either side drawing black edge lines" |
| Liquid | "backlight through the liquid making it glow, a soft front fill" |
| Brushed metal | "large soft sources reflected as long smooth gradients, one hard rim on the edge" |
| Soft clay render | "soft dome light, gentle ambient occlusion in the creases, no hard shadows" |
| Rim kicker | "a narrow rim light from behind left separating the object from the background" |
| Caustics | "a hard light through the glass throwing caustic patterns on the floor" |
| Emissive | "the neon tube is the only light, glowing magenta on the wet floor" |
| Exterior sky | "low warm sun from the left, a soft blue sky fill, long shadows" |

Backgrounds: "seamless white cyclorama, the floor curving up into the wall
with no horizon line"; "smooth gradient from charcoal at the top to black at
the floor"; "infinite black"; "a coloured paper sweep in brand blue"; "a
mirror floor reflecting the object"; "a shallow film of still water on black".

## 6. Materials (physically based, as words)

| Property | Words |
|---|---|
| Roughness | "mirror gloss", "satin", "soft-touch matte" |
| Metal | "polished chrome reflecting the softboxes", "brushed aluminium with fine anisotropic streaks", "anodised cobalt aluminium" |
| Transmission | "clear glass with thick bevelled walls", "frosted glass diffusing the light behind it", "water with a meniscus at the glass" |
| Subsurface | "translucent wax glowing where the light enters", "jade-green soap", "skin-like silicone" |
| Clearcoat | "glossy lacquer over a matte base colour" |
| Sheen | "velvet catching a soft highlight at its folds" |
| Emission | "a glowing white LED ring", "neon tube" |
| Surface detail | "fine knurling on the crown", "leather grain", "machined concentric circles" |

Render-look words that help: "physically based materials", "ray-traced
reflections", "soft global illumination", "ambient occlusion in the
creases", "depth of field like a 100mm macro", "motion blur only on the
fast parts". Describe the look; do not name renderers or software.

## 7. Physics in sequence

Write cause before effect and how it settles: "the drop touches the water;
a ring spreads outward; the surface settles flat". Liquids, cloth, smoke and
glass breaking are weak points: one event, slow, under 6 s, and the end
state named.
