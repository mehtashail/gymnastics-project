const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

// Step 1: Tag existing skills with xcel-gold / xcel-platinum / b-level
// b-level is ONLY added to skills with difficultyValue === 'B'
const tagUpdates = {
  // VAULT
  'vault-001': ['xcel-gold', 'xcel-platinum'],
  'vault-009': ['xcel-gold', 'xcel-platinum', 'b-level'],

  // BARS
  'bars-001': ['xcel-gold', 'xcel-platinum'],
  'bars-002': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'bars-003': ['xcel-gold', 'xcel-platinum'],
  'bars-006': ['xcel-platinum', 'b-level'],
  'bars-011': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'bars-014': ['xcel-gold', 'xcel-platinum'],
  'bars-017': ['xcel-gold', 'xcel-platinum'],
  'bars-018': ['xcel-gold', 'xcel-platinum'],
  'bars-019': ['xcel-gold', 'xcel-platinum', 'b-level'],

  // BEAM
  'beam-001': ['xcel-gold', 'xcel-platinum'],
  'beam-002': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'beam-003': ['xcel-gold', 'xcel-platinum'],
  'beam-005': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'beam-007': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'beam-014': ['xcel-gold', 'xcel-platinum'],
  'beam-015': ['xcel-gold', 'xcel-platinum'],
  'beam-016': ['xcel-gold', 'xcel-platinum'],
  'beam-017': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'beam-019': ['xcel-gold', 'xcel-platinum'],
  'beam-020': ['xcel-gold', 'xcel-platinum'],
  'beam-022': ['xcel-gold', 'xcel-platinum'],
  'beam-024': ['xcel-gold', 'xcel-platinum', 'b-level'],

  // FLOOR
  'floor-001': ['xcel-gold', 'xcel-platinum'],
  'floor-002': ['xcel-gold', 'xcel-platinum'],
  'floor-003': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'floor-008': ['xcel-gold', 'xcel-platinum'],
  'floor-009': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'floor-011': ['xcel-gold', 'xcel-platinum'],
  'floor-013': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'floor-014': ['xcel-gold', 'xcel-platinum'],
  'floor-015': ['xcel-gold', 'xcel-platinum'],
  'floor-016': ['xcel-gold', 'xcel-platinum', 'b-level'],
  'floor-017': ['xcel-gold', 'xcel-platinum'],
  'floor-020': ['xcel-gold', 'xcel-platinum'],
  'floor-021': ['xcel-gold', 'xcel-platinum'],
  'floor-023': ['xcel-gold', 'xcel-platinum'],
  'floor-024': ['xcel-gold', 'xcel-platinum'],
  'floor-025': ['xcel-platinum', 'b-level'],
};

let taggedCount = 0;
const missingIds = [];

skills.forEach(skill => {
  const additions = tagUpdates[skill.id];
  if (additions) {
    let changed = false;
    additions.forEach(tag => {
      if (!skill.tags.includes(tag)) {
        skill.tags.push(tag);
        changed = true;
      }
    });
    if (changed) taggedCount++;
  }
});

Object.keys(tagUpdates).forEach(id => {
  if (!skills.find(s => s.id === id)) missingIds.push(id);
});

// Step 2: New skills to add for XG/XP coverage gaps
const newSkills = [
  {
    id: 'bars-024',
    name: 'Front Hip Circle on Bars',
    technicalName: 'Forward Hip Circle',
    apparatus: 'uneven_bars',
    discipline: 'WAG',
    difficultyValue: 'A',
    difficultyTier: 'Beginner',
    description: 'The front hip circle is a foundational bar skill where your daughter starts in a front support position (balanced above the bar with arms straight), leans forward, and circles all the way around the bar while keeping her hips pressed to it, returning to front support on top. Unlike the mill circle where legs are straddled, here the legs stay together the entire time. It counts as the required circling skill in Excel Gold bar routines.',
    whatToLookFor: [
      'Starting in a solid front support with straight arms and body above the bar',
      'Leaning forward gradually and committing to the circle — hesitation causes a stop halfway',
      'Hips staying pressed to the bar throughout the rotation, not pulling away',
      'Legs together and toes pointed the entire time around',
      'Returning to a controlled front support on top, not collapsing forward'
    ],
    commonMistakes: [
      'Pulling the hips away from the bar mid-circle, which breaks the rotation and can cause a fall',
      'Bending the knees during the circle, which loses the clean line judges want to see',
      'Not leaning far enough forward at the start, causing the circle to stall before going around',
      'Letting go of the bar out of fear — the bar should stay in the hip crease the whole time'
    ],
    quickTipsChecklist: [
      { id: 'b024-1', cue: 'Hips to bar', description: 'Her hips stay pressed against the bar all the way around' },
      { id: 'b024-2', cue: 'Legs together', description: 'Legs stay squeezed together, not straddled or bent' },
      { id: 'b024-3', cue: 'Lean forward boldly', description: 'She commits to the lean at the start — no hesitating' },
      { id: 'b024-4', cue: 'Land on top', description: 'She finishes back in front support, balanced above the bar' }
    ],
    relatedSkillIds: ['bars-003', 'bars-014', 'bars-017', 'bars-001'],
    videos: [
      {
        id: 'b024-vid1',
        title: 'Front Hip Circle on Bars — Tutorial',
        url: 'https://www.youtube.com/results?search_query=front+hip+circle+gymnastics+bars+tutorial+beginner',
        type: 'tutorial'
      }
    ],
    tags: ['bars', 'beginner', 'front hip circle', 'circle', 'hip circle', 'xcel-gold', 'xcel-platinum', 'level 3', 'level 4', 'foundational', 'required element']
  },
  {
    id: 'beam-026',
    name: 'Dance Series on Beam',
    technicalName: 'Connected Dance Elements',
    apparatus: 'balance_beam',
    discipline: 'WAG',
    difficultyValue: 'A',
    difficultyTier: 'Beginner',
    description: 'A dance series is not a single trick — it is two dance skills performed back-to-back without stopping on the beam. The most common Excel Gold example is a cat leap flowing directly into a split leap. What makes it a "series" is the direct connection: she lands one skill and immediately launches into the next without pausing or taking an extra step. Judges specifically look for this in Excel Gold routines, so the connection is just as important as the skills themselves.',
    whatToLookFor: [
      'A seamless flow from the first skill into the second — no extra steps or pauses between them',
      'The landing of the first skill acting as the takeoff for the second skill',
      'Both leaps or jumps showing good height, not flat and hurried',
      'Toes pointed and legs extended during both skills, not just the first one',
      'Body staying on the beam center throughout, not drifting sideways'
    ],
    commonMistakes: [
      'Taking an extra step or balance check between the two dance skills — this breaks the series and costs points',
      'Making the second skill smaller or lower because she\'s tired from the first',
      'Rushing through both skills so fast that neither has proper height or form',
      'Connecting skills that are too difficult to perform cleanly back-to-back on a narrow beam'
    ],
    quickTipsChecklist: [
      { id: 'bm026-1', cue: 'No pause between skills', description: 'The landing of skill 1 directly launches skill 2 — no extra step' },
      { id: 'bm026-2', cue: 'Both skills show height', description: 'Neither leap or jump looks flat — both have visible airtime' },
      { id: 'bm026-3', cue: 'Stay on center', description: 'She stays on the beam\'s center line through both skills' }
    ],
    relatedSkillIds: ['beam-019', 'beam-020', 'beam-017', 'beam-015'],
    videos: [
      {
        id: 'bm026-vid1',
        title: 'Beam Dance Series — Cat Leap to Split Leap',
        url: 'https://www.youtube.com/results?search_query=gymnastics+beam+dance+series+cat+leap+split+leap+xcel',
        type: 'tutorial'
      }
    ],
    tags: ['beam', 'beginner', 'dance series', 'connection', 'leap series', 'compositional', 'xcel-gold', 'xcel-platinum', 'required element', 'dance element']
  },
  {
    id: 'floor-028',
    name: 'Round-off BHS Back Tuck (XG Acro Pass)',
    technicalName: 'Round-off + Back Handspring + Back Salto Tuck',
    apparatus: 'floor_exercise',
    discipline: 'WAG',
    difficultyValue: 'A',
    difficultyTier: 'Beginner',
    description: 'This is the most common first tumbling pass in Excel Gold floor routines. Your daughter runs, does a round-off to change direction, flows into a back handspring, and finishes with a back tuck (backflip in a tucked position). The three skills connect seamlessly — she should never look like she\'s stopping between them. The back tuck is the "flight element" that Excel Gold requires, meaning she is fully in the air with no hands touching the floor.',
    whatToLookFor: [
      'A fast run that carries into the round-off — she shouldn\'t be slowing down before she starts',
      'A powerful round-off that snaps her feet to the floor, not a slow one that dies the momentum',
      'The back handspring flowing directly out of the round-off with no pause or step adjustment',
      'A tight tuck in the back flip — knees pulled to chest, not a loose or lazy position',
      'A controlled landing with bent knees, feet together, arms lifting to show she\'s done'
    ],
    commonMistakes: [
      'Losing speed between the round-off and the back handspring, which makes the back tuck fall short',
      'A low, flat back handspring that doesn\'t generate enough height for the back tuck',
      'Legs separating or going wide in the back tuck instead of staying in a tight tuck',
      'Landing the back tuck with bent knees but falling forward — she needs to "block" and stay tall'
    ],
    quickTipsChecklist: [
      { id: 'fl028-1', cue: 'Fast run, don\'t slow down', description: 'She keeps her speed all the way into the round-off' },
      { id: 'fl028-2', cue: 'Snap the round-off', description: 'Round-off finishes with a sharp snap to the floor — this powers everything' },
      { id: 'fl028-3', cue: 'Tight tuck', description: 'Knees pulled to chest in the back flip, not hanging loose' },
      { id: 'fl028-4', cue: 'Stick the landing', description: 'She lands with bent knees and lifts her arms — no stumbling forward' }
    ],
    relatedSkillIds: ['floor-001', 'floor-002', 'floor-020', 'floor-021'],
    videos: [
      {
        id: 'fl028-vid1',
        title: 'Round-off BHS Back Tuck — Full Pass Tutorial',
        url: 'https://www.youtube.com/results?search_query=round+off+back+handspring+back+tuck+gymnastics+tutorial+xcel+gold',
        type: 'tutorial'
      }
    ],
    tags: ['floor', 'beginner', 'round-off', 'back handspring', 'back tuck', 'salto', 'tumbling pass', 'connected acro', 'xcel-gold', 'xcel-platinum', 'level 4', 'level 5', 'required element']
  },
  {
    id: 'floor-029',
    name: 'Front Handspring + Front Tuck',
    technicalName: 'Front Handspring + Front Salto Tuck',
    apparatus: 'floor_exercise',
    discipline: 'WAG',
    difficultyValue: 'B',
    difficultyTier: 'Intermediate',
    description: 'This forward-moving combination is a popular second tumbling pass in Excel Gold and Platinum routines. Your daughter runs, does a front handspring (landing with feet together or stepping out), and immediately punches off the floor into a front tuck (front flip in a tucked position). Because it moves forward instead of backward like the round-off pass, it creates visual variety that judges and audiences notice. In Excel Platinum, where only A and B value skills are allowed, the B-value front tuck makes this a strong choice for the required salto pass.',
    whatToLookFor: [
      'A punchy, powerful front handspring that ends with a strong two-foot takeoff for the tuck',
      'The front tuck going up before it goes forward — height matters, not just rotation',
      'A tight tuck position: knees to chest, back rounded, chin slightly down',
      'Opening up from the tuck in time to see the floor and land on her feet',
      'A controlled landing with bent knees, arms forward for balance'
    ],
    commonMistakes: [
      'A weak "punch" off the floor after the handspring, causing a low flat front tuck that barely makes it around',
      'Throwing the head back to initiate the tuck, which opens the body early and loses rotation',
      'Legs separating wide in the tuck instead of staying together',
      'Over-rotating and landing forward on her hands — she needs to spot the landing and block'
    ],
    quickTipsChecklist: [
      { id: 'fl029-1', cue: 'Strong punch', description: 'Both feet punch the floor hard at the end of the handspring — this launches the tuck' },
      { id: 'fl029-2', cue: 'Go up first', description: 'The front tuck should rise before rotating, not nose-dive forward' },
      { id: 'fl029-3', cue: 'Tight tuck', description: 'Knees to chest, back round, legs together through the flip' },
      { id: 'fl029-4', cue: 'See the floor to land', description: 'She spots the mat before opening — no surprises on landing' }
    ],
    relatedSkillIds: ['floor-016', 'floor-025', 'floor-015', 'floor-028'],
    videos: [
      {
        id: 'fl029-vid1',
        title: 'Front Handspring Front Tuck — Tutorial',
        url: 'https://www.youtube.com/results?search_query=front+handspring+front+tuck+gymnastics+floor+tutorial+xcel',
        type: 'tutorial'
      }
    ],
    tags: ['floor', 'intermediate', 'front handspring', 'front tuck', 'front salto', 'forward tumbling', 'tumbling pass', 'connected acro', 'b-level', 'xcel-gold', 'xcel-platinum', 'level 5', 'level 6']
  },
  {
    id: 'floor-030',
    name: 'Full Turn (Pirouette) on Floor',
    technicalName: 'Full Turn on One Foot',
    apparatus: 'floor_exercise',
    discipline: 'WAG',
    difficultyValue: 'A',
    difficultyTier: 'Beginner',
    description: 'A full turn is a 360-degree spin balanced on one foot (in passé position — the other foot resting against the standing knee) performed on the spring floor. It looks similar to the beam pirouette (beam-003) but without the narrow beam to worry about. Excel Gold requires a minimum 360-degree turn in the floor routine, and Excel Platinum similarly requires a full turn on one foot. A clean, controlled turn on floor demonstrates balance, core strength, and body control that judges reward.',
    whatToLookFor: [
      'Rising to the ball of the foot cleanly at the start — the spin should begin from a stable relevé',
      'The free foot in a clear passé position (touching the side of the standing knee), not dropped or sickled',
      'A single focused spot — she should look at one point, spin away, then snap her head back to the same spot',
      'Arms held in a controlled position (first position or rounded in front), not flying wide',
      'Completing a full 360 degrees and landing with control, not stumbling off balance'
    ],
    commonMistakes: [
      'Not rising high enough on the ball of the foot, so the turn is slow and wobbly from the start',
      'The free foot dropping below the knee, making the passé look messy to judges',
      'Not spotting — the head drifts instead of snapping, causing dizziness and loss of direction',
      'Arms opening wide during the turn, which slows rotation and throws off balance',
      'Completing only three-quarters of the turn and stepping out early — judges count every degree'
    ],
    quickTipsChecklist: [
      { id: 'fl030-1', cue: 'High relevé', description: 'She rises as high as possible on the ball of her foot before spinning' },
      { id: 'fl030-2', cue: 'Passé position clean', description: 'Free foot rests against the standing knee, toes pointed' },
      { id: 'fl030-3', cue: 'Spot one point', description: 'Eyes lock on a spot, then snap back as she completes the turn' },
      { id: 'fl030-4', cue: 'Full 360 degrees', description: 'She finishes all the way around — not stopping at 270' }
    ],
    relatedSkillIds: ['floor-010', 'floor-013', 'beam-003'],
    videos: [
      {
        id: 'fl030-vid1',
        title: 'Full Turn (Pirouette) on Floor — Tutorial',
        url: 'https://www.youtube.com/results?search_query=gymnastics+floor+full+turn+pirouette+one+foot+tutorial+beginner',
        type: 'tutorial'
      }
    ],
    tags: ['floor', 'beginner', 'full turn', 'pirouette', 'turn', '360 turn', 'dance element', 'xcel-gold', 'xcel-platinum', 'level 3', 'level 4', 'required element']
  }
];

// Append new skills
const existingIds = new Set(skills.map(s => s.id));
const addedSkills = [];
newSkills.forEach(skill => {
  if (!existingIds.has(skill.id)) {
    skills.push(skill);
    addedSkills.push(skill.id);
  } else {
    console.warn(`  SKIP: ${skill.id} already exists`);
  }
});

// Step 3: Write updated skills.json
fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));

// Step 4: Print summary
console.log('\n=== Xcel Skills Update Complete ===\n');
console.log(`Skills tagged with xcel-gold / xcel-platinum: ${taggedCount} updated`);
console.log(`New skills added: ${addedSkills.join(', ')}`);
console.log(`Total skills now: ${skills.length}`);
if (missingIds.length > 0) {
  console.warn(`\nWARNING: These IDs in tagUpdates were not found in skills.json:`);
  missingIds.forEach(id => console.warn(`  - ${id}`));
}

const xgCount = skills.filter(s => s.tags.includes('xcel-gold')).length;
const xpCount = skills.filter(s => s.tags.includes('xcel-platinum')).length;
const bLevelCount = skills.filter(s => s.tags.includes('b-level')).length;

console.log(`\nxcel-gold  tagged: ${xgCount} skills`);
console.log(`xcel-platinum tagged: ${xpCount} skills`);
console.log(`b-level tagged: ${bLevelCount} skills`);

['vault', 'uneven_bars', 'balance_beam', 'floor_exercise'].forEach(app => {
  const xg = skills.filter(s => s.apparatus === app && s.tags.includes('xcel-gold')).length;
  const xp = skills.filter(s => s.apparatus === app && s.tags.includes('xcel-platinum')).length;
  console.log(`  ${app.padEnd(16)} — XG: ${xg}, XP: ${xp}`);
});