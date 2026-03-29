const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
let skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

// ─── STEP 1: Fix tag bugs in existing skills ─────────────────────────────────

// vault-009: tags contain "beginner" but tier is Intermediate
{
  const s = skills.find(x => x.id === 'vault-009');
  if (s) {
    s.tags = s.tags.map(t => t === 'beginner' ? 'intermediate' : t);
    console.log('Fixed vault-009 tags');
  }
}

// floor-003: tags contain "beginner" but tier is Intermediate
{
  const s = skills.find(x => x.id === 'floor-003');
  if (s) {
    s.tags = s.tags.map(t => t === 'beginner' ? 'intermediate' : t);
    console.log('Fixed floor-003 tags');
  }
}

// beam-016: tags contain "intermediate" but tier is Beginner
{
  const s = skills.find(x => x.id === 'beam-016');
  if (s) {
    s.tags = s.tags.map(t => t === 'intermediate' ? 'beginner' : t);
    console.log('Fixed beam-016 tags');
  }
}

// bars-010: tags contain "elite" but tier is Advanced
{
  const s = skills.find(x => x.id === 'bars-010');
  if (s) {
    s.tags = s.tags.map(t => t === 'elite' ? 'advanced' : t);
    console.log('Fixed bars-010 tags');
  }
}

// beam-010: quickTip IDs use "b010-" prefix instead of "bm010-"
{
  const s = skills.find(x => x.id === 'beam-010');
  if (s && s.quickTipsChecklist) {
    s.quickTipsChecklist = s.quickTipsChecklist.map((tip, i) => ({
      ...tip,
      id: 'bm010-' + (i + 1)
    }));
    console.log('Fixed beam-010 quickTip IDs');
  }
}

// ─── STEP 2: Add missing skills ──────────────────────────────────────────────

const newSkills = [
  // CRITICAL: Floor Cartwheel
  {
    "id": "floor-023",
    "name": "Cartwheel",
    "technicalName": "Cartwheel",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The cartwheel is the first major gymnastics skill almost every child learns, and it's the foundation for many future skills including the round-off, aerial cartwheel, and side aerial. Your daughter plants one hand, then the other, on the floor in a sideways arc while her legs sweep over one at a time, and she finishes standing up facing the direction she came from. It looks like a spinning wheel — which is exactly what the name means. In USAG Level 1, the cartwheel is the very first skill on the floor routine. Parents see cartwheels at every single meet from Level 1 upward.",
    "whatToLookFor": [
      "Straight arms when hands contact the floor — bent elbows collapse the skill and are a safety concern",
      "Legs sweeping over fully in a straight line — a cartwheel should stay in one straight path, not curve sideways",
      "Straight legs as they pass overhead — bent knees are penalized at any level",
      "Pointed toes throughout — including when the feet are in the air above her head",
      "A tall finish standing up — not hunching or tilting sideways at the end"
    ],
    "commonMistakes": [
      "Bent arms when hands hit the floor — very common for beginners and always penalized",
      "Doing a 'banana peel' cartwheel — curving around instead of traveling in a straight line",
      "Bent knees during the kick-over — legs should be as straight as possible",
      "Flexed feet (toes pointing up) while legs are overhead",
      "Leaning sideways and losing balance at the finish"
    ],
    "quickTipsChecklist": [
      { "id": "f023-1", "cue": "Straight arms on floor", "description": "Both arms locked — no bending at the elbows" },
      { "id": "f023-2", "cue": "Straight line travel", "description": "She moves in a straight path, not a curve" },
      { "id": "f023-3", "cue": "Legs straight overhead", "description": "Knees don't bend when legs are in the air" },
      { "id": "f023-4", "cue": "Pointed toes", "description": "Feet pointed throughout — including overhead" }
    ],
    "relatedSkillIds": ["floor-020", "floor-021", "floor-014"],
    "videos": [
      {
        "id": "f023-vid1",
        "title": "Cartwheel Tutorial — Gymnastics for Beginners",
        "url": "https://www.youtube.com/results?search_query=cartwheel+gymnastics+tutorial+beginner+level+1",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "cartwheel", "level 1", "level 2", "foundational", "sideways acrobatic"]
  },

  // HIGH: Handstand on Beam
  {
    "id": "beam-022",
    "name": "Handstand on Beam",
    "technicalName": "Handstand",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "A handstand performed on the 4-inch wide balance beam requires everything a floor handstand does — and then the courage to do it on a surface barely wider than your hand. Your daughter places both hands on the beam and kicks up to a fully inverted, vertical position, holding it momentarily before coming back down. It's a required element at Level 4 and above. Judges want to see a controlled, vertical handstand held for a visible moment — not a wobbling pass-through.",
    "whatToLookFor": [
      "A fully vertical body — hips directly over shoulders, feet over hips. She shouldn't be arching or peeking",
      "Hands placed flat and centered on the beam, shoulder-width apart",
      "Pointed toes at the top — every detail counts even upside down",
      "A controlled hold — the handstand should be still for a recognizable moment",
      "A controlled, safe return — either stepping down one foot at a time or lowering with control"
    ],
    "commonMistakes": [
      "An arched back (banana shape) rather than a straight vertical line — very common and always penalized",
      "Kicking over beyond vertical and not catching the balance (falling into a cartwheel or walkover)",
      "Feet not pointed at the top — a detail judges notice even upside down",
      "A wobbly, unstable handstand that looks like she's barely hanging on rather than in control"
    ],
    "quickTipsChecklist": [
      { "id": "bm022-1", "cue": "Fully vertical", "description": "Body stacked: hands → shoulders → hips → feet in a straight line" },
      { "id": "bm022-2", "cue": "Flat hands on beam", "description": "Both palms on beam, fingers pointing forward, centered" },
      { "id": "bm022-3", "cue": "Pointed toes at top", "description": "Feet pointed even when inverted" },
      { "id": "bm022-4", "cue": "Held position", "description": "A clear, still pause at the top — not just swinging through" }
    ],
    "relatedSkillIds": ["beam-001", "beam-002", "beam-003"],
    "videos": [
      {
        "id": "bm022-vid1",
        "title": "Handstand on Balance Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=handstand+balance+beam+gymnastics+tutorial+level+4",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "beginner", "handstand", "inversion", "level 4", "required element"]
  },

  // HIGH: Handstand on Floor
  {
    "id": "floor-024",
    "name": "Handstand",
    "technicalName": "Handstand",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The handstand is the most fundamental inverted position in gymnastics — balancing upside down on two hands with the body fully extended and vertical. Almost every gymnastics skill either starts or ends in a handstand position: giant swings on bars end in handstand, back walkovers pass through handstand, back handsprings land through handstand. Young gymnasts spend an enormous amount of practice time just building handstand balance — usually against a wall first, then freestanding. Level 1-3 gymnasts are expected to kick to a handstand and hold for 1-2 seconds.",
    "whatToLookFor": [
      "A straight, vertical body line — shoulders over wrists, hips over shoulders, feet over hips. No arching or peeking",
      "Arms fully straight — elbows locked out. Bent elbows collapse the handstand",
      "Toes pointed — always, even in a handstand",
      "A held balance — at least a visible moment of stillness at the top, not just swinging through",
      "Fingers spread wide and pressing into the mat — this is how a gymnast steers the handstand"
    ],
    "commonMistakes": [
      "A curved 'banana' shape in the back — the body should be a straight plank, not an arch",
      "Looking up at the floor (head neutral is correct) — some coaches cue 'look at your thumbs' which creates the right head position",
      "Bent elbows that can't support weight and make balance impossible",
      "Feet not pointed — easy to forget when focusing on balance",
      "Not pressing through the fingers — this is the main control mechanism for balance"
    ],
    "quickTipsChecklist": [
      { "id": "f024-1", "cue": "Straight body line", "description": "No arch or pike — body is a rigid straight plank" },
      { "id": "f024-2", "cue": "Arms locked straight", "description": "Elbows fully extended — not bent" },
      { "id": "f024-3", "cue": "Pointed toes", "description": "Feet pointed even when inverted" },
      { "id": "f024-4", "cue": "Fingers spread and pressing", "description": "Fingertips press into the mat to steer the balance" }
    ],
    "relatedSkillIds": ["floor-023", "floor-020", "floor-021"],
    "videos": [
      {
        "id": "f024-vid1",
        "title": "Handstand Tutorial — Gymnastics Basics",
        "url": "https://www.youtube.com/results?search_query=handstand+gymnastics+tutorial+beginner+how+to",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "handstand", "inversion", "level 1", "level 2", "level 3", "foundational"]
  },

  // HIGH: Yurchenko Tuck vault
  {
    "id": "vault-013",
    "name": "Yurchenko Tuck",
    "technicalName": "Yurchenko Tucked",
    "apparatus": "vault",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "The Yurchenko Tuck is usually the first Yurchenko vault a gymnast actually competes — it is the most common vault at Level 6 and lower Level 7 meets. Your daughter does the same round-off entry onto the springboard and back handspring onto the vault table as any Yurchenko, but instead of flying off in a straight body position, she pulls her knees to her chest into a tight tuck for the backflip in the air. The tucked position rotates faster than a layout, making it more accessible than the layout Yurchenko for gymnasts new to this vault family.",
    "whatToLookFor": [
      "A fast, powerful round-off into the springboard — the speed must be maintained all the way to the board",
      "A clean back handspring onto the table — both hands, straight arms, back arched",
      "A tight tuck immediately off the table — knees pulled to chest quickly",
      "Enough height to complete the tuck and open before landing",
      "A two-foot landing — opening from the tuck in time to stick"
    ],
    "commonMistakes": [
      "Losing speed on the round-off approach — slowing down makes the vault fail before it starts",
      "A loose tuck where knees don't fully reach the chest — judges see this clearly",
      "Not opening from the tuck soon enough and landing while still curled (can be dangerous)",
      "Landing too close to the vault table, which means height was lost off the table"
    ],
    "quickTipsChecklist": [
      { "id": "v013-1", "cue": "Full-speed round-off", "description": "Fast round-off approach all the way to the board" },
      { "id": "v013-2", "cue": "Tight tuck off table", "description": "Knees pulled to chest immediately after leaving the table" },
      { "id": "v013-3", "cue": "Open before landing", "description": "Legs extend before feet touch the mat" },
      { "id": "v013-4", "cue": "Distance from vault", "description": "Lands well away from the table — not right underneath it" }
    ],
    "relatedSkillIds": ["vault-003", "vault-004", "vault-005"],
    "videos": [
      {
        "id": "v013-vid1",
        "title": "Yurchenko Tuck Vault — Level 6 Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=yurchenko+tuck+vault+gymnastics+level+6+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["vault", "intermediate", "yurchenko", "tuck", "level 6", "round-off entry"]
  },

  // HIGH: Front Tuck on Floor
  {
    "id": "floor-025",
    "name": "Front Tuck (Front Flip)",
    "technicalName": "Front Salto Tucked",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "B",
    "difficultyTier": "Intermediate",
    "description": "The front tuck (officially called a front salto in tucked position) is a forward flip where your daughter runs, hurdles, punches off both feet, and flips forward with her knees pulled to her chest. Unlike everything in back tumbling where she runs in the same direction she flips, in a front tuck she's moving forward and also flipping forward — making it look very different from a backflip. Many Level 5-6 gymnasts use a front tuck as their second tumbling pass. It's visually spectacular because you can see her face during the flip, unlike a backflip.",
    "whatToLookFor": [
      "A strong hurdle (the run-run-hop that sets up the jump) — this converts forward speed to upward lift",
      "A powerful two-foot punch off the floor — both feet together, not one-then-one",
      "Knees pulling tight to chest immediately after takeoff — forming a compact ball",
      "Completing the full rotation before opening — she should be upright before her feet land",
      "Landing on two feet in control — not stumbling forward"
    ],
    "commonMistakes": [
      "A weak punch off the floor that doesn't create enough height for the rotation",
      "A loose tuck (knees not pulled to chest) that slows the rotation and leaves her short of completing the flip",
      "Opening too early (legs extending before she's completed the rotation) which causes a face-plant landing",
      "Opening too late (still in the tuck when she lands) which causes a crash-land onto her shins"
    ],
    "quickTipsChecklist": [
      { "id": "f025-1", "cue": "Strong hurdle into punch", "description": "The run-hurdle builds the speed; the punch converts it to height" },
      { "id": "f025-2", "cue": "Both feet punch together", "description": "Two-foot takeoff — not one foot then the other" },
      { "id": "f025-3", "cue": "Tight tuck immediately", "description": "Knees to chest right after her feet leave the floor" },
      { "id": "f025-4", "cue": "Open at the right time", "description": "Legs extend when she sees the floor in front of her — not too early or too late" }
    ],
    "relatedSkillIds": ["floor-016", "floor-002", "floor-026"],
    "videos": [
      {
        "id": "f025-vid1",
        "title": "Front Tuck / Front Salto Tutorial — Gymnastics Floor",
        "url": "https://www.youtube.com/results?search_query=front+tuck+front+salto+gymnastics+floor+tutorial+level+5+6",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "intermediate", "front tuck", "front salto", "front flip", "level 5", "level 6", "forward tumbling"]
  },

  // HIGH: Back Layout Step-Out (Floor)
  {
    "id": "floor-026",
    "name": "Back Layout Step-Out",
    "technicalName": "Back Salto Layout Step-out",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "The back layout step-out looks like a back layout (straight-body backflip) but instead of landing on both feet simultaneously, your daughter lands one foot at a time — stepping out into a lunge. This seemingly small difference matters enormously: the step-out version connects naturally into the next acrobatic skill (like another back handspring or walkover) and scores connection bonus points. You'll see it constantly at Level 6-7 when gymnasts do back-to-back tumbling elements. Parents often think it's a sloppy two-foot landing when in fact it's intentional and technically required for the connection.",
    "whatToLookFor": [
      "A fully extended straight body throughout the flip — hips and knees should not bend at any point",
      "The same powerful approach as a regular layout (round-off + back handspring entry)",
      "One foot landing clearly before the other — this is intentional, not a mistake",
      "The landing foot meeting the floor in a lunge or stride position, not a stumble",
      "Flowing directly into the next skill without stopping — the step-out enables continuous tumbling"
    ],
    "commonMistakes": [
      "Piking (bending at the hips) during the layout — the body must stay completely straight",
      "Stepping out with poor control, turning a technical step-out into an actual stumble",
      "Insufficient height that forces an early landing before the full rotation is complete",
      "The step-out direction being sideways rather than in the line of travel"
    ],
    "quickTipsChecklist": [
      { "id": "f026-1", "cue": "Straight body throughout", "description": "Body is a straight plank — no bending at hips or knees" },
      { "id": "f026-2", "cue": "One foot lands first", "description": "Lead foot hits first, then back foot — this is correct technique" },
      { "id": "f026-3", "cue": "Flows into next skill", "description": "No stopping between the step-out and whatever comes next" },
      { "id": "f026-4", "cue": "Lunge position", "description": "Landing foot is in a controlled stride position" }
    ],
    "relatedSkillIds": ["floor-003", "floor-004", "floor-001"],
    "videos": [
      {
        "id": "f026-vid1",
        "title": "Layout Step-Out — Gymnastics Floor Series Connection",
        "url": "https://www.youtube.com/results?search_query=layout+step+out+gymnastics+floor+series+connection+level+6+7",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "intermediate", "layout step-out", "back salto", "step out", "series", "level 6", "level 7", "connection bonus"]
  },

  // HIGH: Layout Flyaway with Half Twist
  {
    "id": "bars-020",
    "name": "Flyaway with Half Twist",
    "technicalName": "Layout Flyaway 1/2 Turn",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "The flyaway with a half twist is the most common 'upgrade' to the basic flyaway dismount, widely seen at Level 6-7 meets. Your daughter releases the bar and adds a 180-degree half-turn while flying through the air, so she lands facing the bar (opposite to the regular flyaway where she faces away from it). The twist is controlled and planned — not a panicked spin — and it significantly raises the difficulty score compared to a plain layout flyaway. Parents at mid-level meets see this regularly and often can't tell it apart from a full twist.",
    "whatToLookFor": [
      "A clean release from both hands simultaneously — the twist cannot start until she's in the air",
      "A straight layout body before and after the twist — no piking or tucking at any point",
      "A smooth, even half-turn — the twist should be in the middle of the flight, not at the end",
      "Landing facing the bar — this is how you know it was a half and not a full",
      "A controlled two-foot landing — the twist adds a new direction, making balance harder"
    ],
    "commonMistakes": [
      "Starting the twist too early (while still on the bar) rather than in the air",
      "A partial twist of only 90-135 degrees — landing sideways to the bar instead of facing it",
      "Piking during the twist, losing the clean layout shape that makes it look and score well",
      "Stumbling sideways on landing because the twist rotated her off-axis"
    ],
    "quickTipsChecklist": [
      { "id": "b020-1", "cue": "Twist starts after release", "description": "The half-turn begins only after both hands leave the bar" },
      { "id": "b020-2", "cue": "Straight body throughout", "description": "No piking — body stays in layout position during the twist" },
      { "id": "b020-3", "cue": "Full 180 completed", "description": "She lands facing the bar — the half-turn is complete" },
      { "id": "b020-4", "cue": "Two-foot landing", "description": "Controlled landing on both feet facing the bar" }
    ],
    "relatedSkillIds": ["bars-015", "bars-019"],
    "videos": [
      {
        "id": "b020-vid1",
        "title": "Flyaway Half Twist Dismount — Gymnastics Bars Tutorial",
        "url": "https://www.youtube.com/results?search_query=flyaway+half+twist+dismount+gymnastics+bars+level+6+7",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "intermediate", "dismount", "flyaway", "half twist", "level 6", "level 7"]
  },

  // MEDIUM: Piked Flyaway
  {
    "id": "bars-021",
    "name": "Piked Flyaway Dismount",
    "technicalName": "Piked Flyaway",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Advanced",
    "description": "The piked flyaway is a more difficult version of the flyaway dismount where instead of a straight body (layout) or bent-knee tuck, your daughter holds her legs completely straight but folds at the hips (like a jackknife shape) during the flip. The straight-legged, pike position requires significantly more flexibility and body tension than the tuck version. It's commonly seen at Levels 7-8 as an upgrade from the layout flyaway. The clean, straight-legged V-shape in the air is visually very different from both the tuck and layout versions.",
    "whatToLookFor": [
      "A clean release off both hands simultaneously — same as any flyaway",
      "A sharp pike — legs completely straight, folded down toward her face. Hips should be at roughly 90 degrees",
      "The pike position showing clearly at the peak of the flight before she opens up",
      "Opening (straightening) before landing — she should be upright when her feet hit the mat",
      "A two-foot landing — the pike version tends to land with more forward pitch, so a solid landing is especially important"
    ],
    "commonMistakes": [
      "Bending the knees in the pike — this turns it into a sloppy position that judges won't credit as a proper pike",
      "A shallow pike (barely any fold at the hips) that looks like a poor layout rather than a true pike",
      "Not opening from the pike soon enough and landing with forward momentum",
      "Releasing too early off the bar, causing insufficient height for the pike to show clearly"
    ],
    "quickTipsChecklist": [
      { "id": "b021-1", "cue": "Straight legs throughout", "description": "Knees must stay fully extended — no bending" },
      { "id": "b021-2", "cue": "Deep pike fold", "description": "Hips fold sharply — body makes a clear V shape" },
      { "id": "b021-3", "cue": "Open before landing", "description": "Straightens out before her feet reach the mat" },
      { "id": "b021-4", "cue": "Solid two-foot landing", "description": "Controls the forward energy on landing — no stumble" }
    ],
    "relatedSkillIds": ["bars-015", "bars-019", "bars-020"],
    "videos": [
      {
        "id": "b021-vid1",
        "title": "Piked Flyaway Dismount — Gymnastics Bars Tutorial",
        "url": "https://www.youtube.com/results?search_query=piked+flyaway+dismount+gymnastics+bars+level+7+8",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "advanced", "dismount", "flyaway", "pike", "level 7", "level 8"]
  },

  // MEDIUM: Endo Circle
  {
    "id": "bars-022",
    "name": "Endo Circle",
    "technicalName": "Endo Circle (Forward Stalder)",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Advanced",
    "description": "The Endo circle is the forward-direction counterpart to the Stalder circle — instead of circling backward around the bar, your daughter circles forward. She starts in a straddle handstand at the top of the bar, folds down (piking and straddling), swings through under the bar forward, and rises back up to a handstand on the other side. Like the Stalder, the legs stay in a straddle (wide-apart) position throughout. It's a Level 7-8 skill that looks similar to the Stalder but travels in the opposite direction, requiring equally impressive flexibility and core strength.",
    "whatToLookFor": [
      "A clear straddle (wide-leg) position maintained throughout the circle",
      "The legs pressing close to or against the bar as she passes under it",
      "A smooth, continuous circular motion — no pausing or stalling mid-circle",
      "Rising back to a handstand at the finish — not just returning to a cast position",
      "Good flexibility in the hips and hamstrings — the straddle must be genuinely wide"
    ],
    "commonMistakes": [
      "Legs drifting wide away from the bar, losing the required shape",
      "Stalling mid-circle because of insufficient swing or flexibility",
      "A narrow straddle — the legs should be as wide as possible",
      "The legs touching the bar as she swings under (slight penalty but also affects flow)"
    ],
    "quickTipsChecklist": [
      { "id": "b022-1", "cue": "Wide straddle throughout", "description": "Legs stay spread wide during the entire forward circle" },
      { "id": "b022-2", "cue": "Legs pressed to bar", "description": "Inner thighs close to the bar as she swings under" },
      { "id": "b022-3", "cue": "No pausing", "description": "Continuous forward rotation — smooth all the way around" },
      { "id": "b022-4", "cue": "Finishes in handstand", "description": "Rises all the way back to a handstand at the top" }
    ],
    "relatedSkillIds": ["bars-016", "bars-006", "bars-004"],
    "videos": [
      {
        "id": "b022-vid1",
        "title": "Endo Circle — Gymnastics Uneven Bars Tutorial",
        "url": "https://www.youtube.com/results?search_query=endo+circle+gymnastics+uneven+bars+tutorial+level+7+8",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "advanced", "endo", "forward circle", "straddle", "level 7", "level 8", "flexibility"]
  },

  // MEDIUM: Front Tuck on Beam (in-routine)
  {
    "id": "beam-023",
    "name": "Back Tuck Series on Beam",
    "technicalName": "Back Salto Tucked (in-routine)",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "D",
    "difficultyTier": "Advanced",
    "description": "A back tuck performed in the middle of a beam routine — where your daughter flips backward and lands back on the beam rather than off it — is one of the most difficult acrobatic elements at Levels 7-9. It's a completely different skill from the back tuck dismount (beam-011), which ends on the mat. Here, she must land precisely back on a 4-inch beam. It's often performed in series with a back handspring before it, creating a connected acrobatic series. The combination of backward flipping and precision landing on beam is what parents most commonly describe as 'the scariest thing I've seen on beam.'",
    "whatToLookFor": [
      "A powerful back handspring leading into the tuck — she needs the momentum from the BHS to complete the flip",
      "A tight tuck (knees to chest) in the air — a loose tuck is harder to control and more dangerous on beam",
      "Good height off the beam — the flip needs airtime to complete safely",
      "Both feet landing on the beam simultaneously and centered — not sideways or catching only one foot",
      "Balance and control after landing — she should arrive in a controlled position ready to continue the routine"
    ],
    "commonMistakes": [
      "Insufficient height, causing an incomplete flip and dangerous landing short of the beam",
      "A loose tuck that slows rotation and makes the flip hard to control",
      "Landing with only one foot or landing sideways (major deduction and fall risk)",
      "Over-rotating and passing through the landing position, causing a forward stumble off the beam"
    ],
    "quickTipsChecklist": [
      { "id": "bm023-1", "cue": "BHS powers the tuck", "description": "The back handspring before it provides the momentum needed" },
      { "id": "bm023-2", "cue": "Tight tuck", "description": "Knees pulled tightly to chest — loose tucks are harder to control" },
      { "id": "bm023-3", "cue": "Height over the beam", "description": "She rises visibly above the beam before coming down" },
      { "id": "bm023-4", "cue": "Both feet land on beam", "description": "Two-foot centered landing — any wobble is a deduction" }
    ],
    "relatedSkillIds": ["beam-004", "beam-005", "beam-006"],
    "videos": [
      {
        "id": "bm023-vid1",
        "title": "Back Tuck on Beam (In-Routine) — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=back+tuck+back+salto+balance+beam+in+routine+gymnastics+level+8+9",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "advanced", "back tuck", "back salto", "in-routine", "series", "level 7", "level 8", "level 9"]
  },

  // MEDIUM: Front Layout / Punch Front
  {
    "id": "floor-027",
    "name": "Front Layout (Punch Front)",
    "technicalName": "Front Salto Layout",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Advanced",
    "description": "The front layout (also called a punch front when done as a punch salto) is an advanced forward flip performed with a completely straight body — no tucking or piking. Your daughter runs, hurdles, and launches into a forward flip while keeping her entire body rigid and extended, like a board rotating through the air. It's significantly harder than a front tuck because a straight body rotates slower than a tucked one, requiring more height and power. Level 7-8 gymnasts use this as a second tumbling pass or as part of a front pass series.",
    "whatToLookFor": [
      "A powerful hurdle and two-foot punch — the straight-body flip needs more height than a front tuck",
      "An absolutely straight body throughout the flip — no pike, no tuck at any point",
      "Arms pressing alongside the body in a tight streamlined position",
      "A full rotation completing before she opens to land — straight body means she must see the floor before feet land",
      "A controlled two-foot landing — the forward momentum in front layout passes is significant"
    ],
    "commonMistakes": [
      "Piking (bending at hips) during the flip — a piked layout isn't a layout",
      "Insufficient height from the punch, making the flip rushed and hard to control",
      "Over-rotating and landing pitched far forward with hands out",
      "Arms floating away from the body, creating drag that slows the rotation"
    ],
    "quickTipsChecklist": [
      { "id": "f027-1", "cue": "Powerful punch upward", "description": "Two-foot takeoff drives her high enough for the straight-body rotation" },
      { "id": "f027-2", "cue": "Straight body throughout", "description": "No bending at hips or knees — body stays rigid the whole flip" },
      { "id": "f027-3", "cue": "Arms tight to body", "description": "Arms pressed alongside the body to streamline the rotation" },
      { "id": "f027-4", "cue": "See floor before landing", "description": "She spots the landing before her feet arrive — not a blind landing" }
    ],
    "relatedSkillIds": ["floor-025", "floor-016", "floor-003"],
    "videos": [
      {
        "id": "f027-vid1",
        "title": "Front Layout / Punch Front — Gymnastics Floor Tutorial",
        "url": "https://www.youtube.com/results?search_query=front+layout+punch+front+gymnastics+floor+tutorial+level+7+8",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "advanced", "front layout", "punch front", "front salto", "forward tumbling", "level 7", "level 8"]
  },

  // MEDIUM: Yurchenko 1.5 (DTY)
  {
    "id": "vault-014",
    "name": "Yurchenko 1.5 Twist",
    "technicalName": "Yurchenko 1/1 + 1/2 (540° twist)",
    "apparatus": "vault",
    "discipline": "WAG",
    "difficultyValue": "E",
    "difficultyTier": "Elite",
    "description": "The Yurchenko 1.5 twist (sometimes called a DTY in coaching shorthand) is the most common elite-level vault below the Amanar. Your daughter performs the standard Yurchenko entry (round-off, back handspring onto table), then adds a full one-and-a-half turns (540 degrees total) in the air after leaving the table, landing facing the vault. It sits between the full-twist Yurchenko (vault-004) and the Amanar 2.5 twist (vault-005) in difficulty. Many Level 9-10 and collegiate gymnasts compete this vault. Parents at upper-level meets see it constantly.",
    "whatToLookFor": [
      "Maximum speed on the approach — one-and-a-half twists require more power than a full",
      "A clean Yurchenko entry: round-off, back handspring onto the table with straight arms",
      "The twist beginning cleanly after leaving the table (not on the table)",
      "The full 1.5 rotations completing before she lands — she should be facing the vault at landing",
      "A controlled landing — 1.5 twists carry significant rotational energy that must be absorbed"
    ],
    "commonMistakes": [
      "Losing speed on the approach — 1.5 twists require maximum power to complete",
      "Starting the twist too late or too early relative to leaving the table",
      "Only completing one full twist (360°) rather than the required 1.5 (540°) — an incomplete twist is a significant deduction",
      "Stumbling on landing from the rotational energy of 1.5 twists"
    ],
    "quickTipsChecklist": [
      { "id": "v014-1", "cue": "Maximum speed approach", "description": "Full sprint all the way — no slowing near the board" },
      { "id": "v014-2", "cue": "Twist starts in air", "description": "Rotation begins after leaving the table, not on it" },
      { "id": "v014-3", "cue": "Full 1.5 completed", "description": "She faces the vault on landing — 540 degrees total" },
      { "id": "v014-4", "cue": "Absorbs rotational landing", "description": "Controlled landing despite the significant twist energy" }
    ],
    "relatedSkillIds": ["vault-004", "vault-005", "vault-003"],
    "videos": [
      {
        "id": "v014-vid1",
        "title": "Yurchenko 1.5 Twist Vault — Level 10 Elite Tutorial",
        "url": "https://www.youtube.com/results?search_query=yurchenko+1.5+twist+vault+gymnastics+level+10+elite",
        "type": "tutorial"
      }
    ],
    "tags": ["vault", "elite", "yurchenko", "1.5 twist", "DTY", "level 10", "collegiate", "round-off entry"]
  }
];

// Add new skills
skills = [...skills, ...newSkills];

// Write updated file
fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));

// Print summary
const byApp = {};
skills.forEach(function(s) {
  if (!byApp[s.apparatus]) byApp[s.apparatus] = {};
  if (!byApp[s.apparatus][s.difficultyTier]) byApp[s.apparatus][s.difficultyTier] = [];
  byApp[s.apparatus][s.difficultyTier].push(s.name);
});
const order = ['vault','uneven_bars','balance_beam','floor_exercise'];
const tiers = ['Beginner','Intermediate','Advanced','Elite'];
console.log('\n=== UPDATED SKILL COUNTS ===');
order.forEach(function(app) {
  console.log('\n' + app.toUpperCase() + ':');
  tiers.forEach(function(t) {
    const list = byApp[app] && byApp[app][t] ? byApp[app][t] : [];
    if (list.length) console.log('  ' + t + ' (' + list.length + '):', list.join(', '));
  });
});
console.log('\nTotal skills:', skills.length);
