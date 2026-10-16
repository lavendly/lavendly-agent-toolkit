# Hooks library: social

The first 1 to 3 seconds decide whether the rest is seen. A hook is two
things at once: what is in frame 0 (the visual hook) and the first spoken
words (the spoken hook, which the captions show). On Lavendly there is no
other on-screen text, so both must carry the idea.

## 1. Rules for every hook

- Frame 0 is the strongest frame of the video: the subject large and
  legible, mid-action or mid-expression. Trim the model's warm-up so the
  first frame is already moving (`edit_clip` trim `start_ms` 300 to 600 on
  the hook clip).
- The voice starts at 0.0 s. Six words or fewer before the first full stop;
  the whole hook spoken by about 2 s.
- One open question per hook. Two hooks stacked close neither.
- The hook and the payoff make the same promise. Write the payoff line next
  to the hook before choosing it.
- Specific beats general: a number, a named object, a place, a time ("I
  slept in an airport for three nights" beats "crazy travel story").
- Never open with: "So today I want to talk about", "Hey guys", "Welcome
  back", "In this video", "Before we start", a logo, a title card, black.

Relative strength by archetype, as scored by one long-video clipping tool
(claimed, not measured by Lavendly): bold or contrarian claim 80 to 100,
curiosity gap 75 to 95, value promise 70 to 90, pattern interrupt 70 to 90,
payoff preview 65 to 85, mid-action start 60 to 80, "So today I want to
talk about" 10 to 40.

## 2. Hooks by goal

Columns: the spoken template, the visual for frame 0, an example. Fill the
brackets with the user's real content; never with invented claims.

### Teach (value promise)

| Spoken | Frame 0 | Example |
|---|---|---|
| "Stop <doing common thing>." | The common thing mid-action, about to go wrong | "Stop rinsing your pasta." over water pouring off pasta in a colander |
| "<Result> in <time>." | The finished result, close | "Crispy eggs in ninety seconds." over a sizzling egg edge |
| "You have been <doing X> wrong." | X done the usual way | "You have been folding shirts wrong." |
| "One <tool> trick nobody uses." | Hand holding the tool to the lens | "One tape measure trick nobody uses." |
| "Three signs <thing is happening>." | The first sign, macro | "Three signs your plant is drowning." over a yellow leaf |
| "The <number>-second rule for <thing>." | Hands starting the action | "The five-second rule for cold brew." |
| "Do this before <common moment>." | The moment about to happen | "Do this before you book a flight." |

### Curiosity (gap)

| Spoken | Frame 0 | Example |
|---|---|---|
| "This <object> <did something unexpected>." | The object, large, odd angle | "This spoon cost me a job." |
| "Nobody tells you this about <topic>." | A detail viewers have seen but not noticed | "Nobody tells you this about airport carpets." |
| "I didn't expect <outcome>." | The moment just before the outcome | "I didn't expect the cat to win." |
| "Watch the <detail>." | The detail in the corner of frame, about to move | "Watch the left glass." |
| "Wait for it." (only with a real payoff by 5 s) | Something poised: a ball on an edge, a lid about to lift | |
| "What happens if you <unusual action>?" | Hands about to do it | "What happens if you freeze a lemon?" |

### Story (open loop)

| Spoken | Frame 0 | Example |
|---|---|---|
| "<Time> ago I <did something big>." | The place or object of the story | "Three years ago I sold everything for a van." |
| "The day I <turning point>." | A frozen moment from the middle of the story | "The day I got locked in a museum." |
| "Nobody believed me when <event>." | The thing nobody believed | |
| "This is how I <lost or won something>." | The aftermath | "This is how I lost my eyebrows." |
| Start at the climax: "And then the door locked." | The climax frame | Then rewind: "Let me back up." |

### Entertain (pattern interrupt)

| Spoken | Frame 0 | Example |
|---|---|---|
| None for 1 s, then one word | An object entering the frame fast toward the lens (the camera bump) | A hand plants a mug against the lens |
| "Rating <things> as <unexpected role>." | The first thing, centred | "Rating office chairs as horror villains." |
| "POV: <situation>." | First-person view of the situation | see recipe-pov.md |
| A sound first: one crisp hit at 0.0 s | The cause of the sound | A cork pops |
| "Me pretending <relatable situation>." | The situation, deadpan | |
| A failed attempt, stopped: "Okay. That didn't work." | The failure frozen at its peak | |

### Opinion (contrarian, community)

| Spoken | Frame 0 | Example |
|---|---|---|
| "Unpopular opinion: <claim>." | The thing the claim is about | "Unpopular opinion: open-plan kitchens are a mistake." |
| "<Common belief>? No." | The believed thing, about to be disproved | |
| "I'm done with <trend>." | The trend's object, pushed out of frame | |
| "Here is what <group> gets wrong about <topic>." | The topic's object | |
| "Tell me I'm wrong." (at the end, not the start) | | |

### Transform (before and after)

| Spoken | Frame 0 | Example |
|---|---|---|
| "Day one versus day thirty." | Day one, matched framing | |
| "From this to this." | The before, about to cut | |
| "<Time> to turn <bad> into <good>." | The bad state, close | "Two hours to save this rusted chair." |

### Sell (the user's own product, honestly)

| Spoken | Frame 0 | Example |
|---|---|---|
| "I made the <thing> I wanted to buy." | The product in hand, moving | |
| "Why <product> costs <price>." | The material or the making | "Why this mug costs forty dollars." over clay on a wheel |
| "The problem with every <product type>." | The problem, shown | |

Product claims follow lavendly-ads: no AI person as a customer, no AI
result as proof.

### Relatable (identity)

| Spoken | Frame 0 | Example |
|---|---|---|
| "If you <specific habit>, this is for you." | The habit | "If you keep forty browser tabs open, this is for you." |
| "Things only <group> understand." | The group's signature object | "Things only night-shift nurses understand." |
| "Tell me you're a <type> without telling me." | The tell-tale object | |

## 3. Visual hook templates (no words needed)

| Template | Frame 0 to 1.5 s | Model note |
|---|---|---|
| Camera bump | An object pushed into the lens, the frame darkens, pulls back to reveal | Simple, works on most models; state the object and the hand |
| Product hit | The object drops into frame and lands on a surface with a crisp sound | `native` sound; name the surface and the landing point |
| Mid-motion start | A pour, a jump, a slice already happening | Seedance and Veo: "already in motion from the first frame" |
| The stare | A face looking straight into the lens, one beat, then speaks | Veo 3.1 Fast, medium close-up |
| The odd angle | The everyday object from below or inside (inside a fridge, under a glass table) | Name the camera position exactly |
| The reveal pull | Extreme close-up texture, fast pull back to what it is | One move, "fast pull-back", end state named |
| The interruption | A calm scene, something enters fast from the edge | Name the entry side and destination |
| The scale gap | A tiny object beside a huge one | Exact counts and depth order |
| The failed attempt | The fail frozen at its peak, then the voice | Trim the clip so frame 0 is the peak |
| The countdown object | Three objects in a row, the first one lifts | Same treatment for every item later |

## 4. Writing the hook for the captions

- Captions show three words at a time on `tiktok`, four on `reels`. A hook
  of six words reads as two chunks: make each chunk meaningful ("Stop
  rinsing / your pasta.").
- Put the strongest word first or last in a chunk, never in the middle.
- Numbers are spoken as words in the script; the captions show what the
  voice says.

## 5. Testing hooks

- Make one video, then change only the hook (the first clip and the first
  line) for a variant: one variable per variant. Never a flood of variants.
- Judge on the platform's 3-second hold rate, not on likes.
