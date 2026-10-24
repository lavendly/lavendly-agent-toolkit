# Troubleshooting: characters

What you see, the likely cause on the MCP path, and the smallest fix. One
re-roll per scene with the fix named; the same failure twice means the
first-frame source must change, not the wording.

| You see | Likely cause | Do |
|---|---|---|
| Scene 1's face is not the sheet's face | A text-only opening image is a new draw; references never reach it | Start scene 1 from the sheet's own close-up framing (a supplied photo or an app-made still), or re-roll the still with the locked words first and check it before the clip |
| The face changes between scenes | Text-only openings in every scene; a paraphrased description; no reference on the clip | Chain continuing shots; wire the face reference to every clip; paste the description verbatim |
| The face softens and the colour slides warm or green | Too many chained hops | Clean keyframe now; count hops from it; cut instead of a fourth hop |
| Two of the hero in one frame | No exact count; a mirror, window or "another" in the prompt | "Exactly one Dara in frame, nobody else, no copy of her"; name and bound reflections |
| A stranger appears in the background | The cast left open | "Nobody else in frame"; the place described as empty where it should be |
| The outfit changes mid-film | Arc wardrobe not written per heading; the outfit reference missing | The wardrobe line after the locked description; the outfit reference on the clip |
| Hair dry in scene 3 after rain in scene 2 | State not carried | The ledger state in the next still-frame prompt ("hair wet from rain") |
| The prop jumps hands | Which hand holds it was never written | "The cup in her right hand" in both prompts |
| The hero copies the reference's grey background or pose | No role sentence | "Reference 1 is Dara's face and braids only; ignore its grey background and pose" |
| A refusal on a scene with references | Veo 3.1 Lite (Auto) takes none; or more than the cap | Move the scene to a reference-capable model; at most 3 references on the MCP path |
| The product widens, grows buttons or changes proportion | Text-made product, large moves, soft material words | A real packshot as the first frame; rigid material words; rotation under about 90 degrees |
| The label reads as nonsense letters | Video models re-letter text in motion | Label blank, soft or turned away; the user adds words in the app |
| An animal walks upright | Gait not written | "On all four legs, a pangolin's slow walk, never upright" |
| The smaller creature is drawn larger | Scale not stated | The size frame as a reference; "Juno's head reaches Bo's knee" |
| A child character refused or aged up on Veo | Google limits image-to-video with people to adults | Another family for that scene, or a creature hero |
| The character's voice is different in scene 4 | Native dialogue timbre varies; or a voiceover sent without the voice id | The same delivery words in every clip; pass the voice id on every `attach_track` |
| The voice is Rachel, not the chosen one | No voice id, or an OpenAI voice name | Re-attach with the ElevenLabs voice id |
| A 403 voice_not_yours | A cloned voice that belongs to another account | Use a voice the user owns or a premade one |
| Lips move under narration | A speaking face with a voiceover laid over it | Mouth closed or face turned in narrated shots |
| Burned subtitles in a dialogue clip | Veo's subtitle artefact | "(no subtitles)" after the line; the clean-frame line |
| The chained scene starts on a blink or a blur | The last frame caught a transition | Never chain from it: start N+1 from a clean keyframe, and end N's next take on a held pose ("she stops and holds still") |
| The frame option is missing on `get_scene_frame` | An older server | Do not chain from the mid frame; describe N's end state at the start of N+1's prompt |
| A real person's likeness requested without consent | Policy | Decline that part; offer an original character with the same role |
