const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
let skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

// ─── Confirmed real YouTube video IDs ─────────────────────────────────────────
// From previous session (verified against gymnastics coaching sites):
//   crNEeo63POQ - Back handspring tutorial (GymnasticsHQ)
//   IBGYNDGXY20 - Round-off BHS layout series (Coach Meggin)
//   VNUVKrN4ndc - Kip / glide kip tutorial
//   ANAbkv5XSjo - Kip drills (Swing Big)
//   eIcbSqWL_nk - Cartwheel on beam (Gymneo)
//   mVj28FLCHD0 - Beam cartwheel progressions
//   zTaxFy7Hy14 - Split leap drill
//   Nl36XsYN6IQ - Full turn on beam drills (Tammy Biggs)
// From this session:
//   a_zI6XrUEHk - Cartwheel tutorial (GymnasticsHQ)
//   ccu0trnI5kI - Pullover / chin-up bar drill (RecGymPros)

// Helper: replace video for a given skill ID
function setVideo(skillId, vidIdx, patch) {
  const skill = skills.find(s => s.id === skillId);
  if (!skill) { console.warn('Skill not found:', skillId); return; }
  if (!skill.videos[vidIdx]) { console.warn('Video index not found:', skillId, vidIdx); return; }
  Object.assign(skill.videos[vidIdx], patch);
  console.log('Updated', skillId, '-', patch.url ? patch.url.substring(0, 60) : '');
}

// Helper: add a second video to a skill
function addVideo(skillId, video) {
  const skill = skills.find(s => s.id === skillId);
  if (!skill) { console.warn('Skill not found:', skillId); return; }
  skill.videos.push(video);
  console.log('Added video to', skillId);
}

// ─── Apply confirmed real video IDs ───────────────────────────────────────────

// floor-023: Cartwheel — confirmed GymnasticsHQ video
setVideo('floor-023', 0, {
  url: 'https://www.youtube.com/watch?v=a_zI6XrUEHk',
  title: 'How to Do a Cartwheel — GymnasticsHQ Tutorial',
  channel: 'GymnasticsHQ',
});

// floor-021: Back Handspring — confirmed GymnasticsHQ video
setVideo('floor-021', 0, {
  url: 'https://www.youtube.com/watch?v=crNEeo63POQ',
  title: 'How to Do a Back Handspring — GymnasticsHQ Tutorial',
  channel: 'GymnasticsHQ',
});

// bars-017: Pullover/Bar Mount — confirmed RecGymPros drills video
setVideo('bars-017', 0, {
  url: 'https://www.youtube.com/watch?v=ccu0trnI5kI',
  title: 'Chin-Up Pullover Drills for Gymnastics Bars',
  channel: 'Rec Gym Pros',
});

// bars-001: Glide Kip — confirmed video from previous session
setVideo('bars-001', 0, {
  url: 'https://www.youtube.com/watch?v=VNUVKrN4ndc',
  title: 'How to Do a Kip on Bars — Step by Step Tutorial',
  channel: 'SwingBig',
});

// beam-001: Cartwheel on Beam — confirmed Gymneo video from previous session
setVideo('beam-001', 0, {
  url: 'https://www.youtube.com/watch?v=eIcbSqWL_nk',
  title: 'Cartwheel on Beam — Gymneo Tutorial',
  channel: 'Gymneo',
});

// floor-001: Round-off BHS — confirmed Coach Meggin video from previous session
setVideo('floor-001', 0, {
  url: 'https://www.youtube.com/watch?v=IBGYNDGXY20',
  title: 'Round-Off Back Handspring to Layout — Coach Meggin',
  channel: 'Coach Meggin',
});

// floor-004: Split Leap — confirmed drill video from previous session
setVideo('floor-004', 0, {
  url: 'https://www.youtube.com/watch?v=zTaxFy7Hy14',
  title: 'Split Leap Drill — The Hybrid Perspective',
  channel: 'The Hybrid Perspective',
});

// beam-003: Full Turn on Beam — confirmed Tammy Biggs video from previous session
setVideo('beam-003', 0, {
  url: 'https://www.youtube.com/watch?v=Nl36XsYN6IQ',
  title: 'Full Turn on Beam Drills — Tammy Biggs',
  channel: 'Tammy Biggs Gymnastics',
});

// ─── Improve all remaining search query URLs ──────────────────────────────────
// For skills with search URLs, ensure the query includes: skill name + apparatus + "gymnastics tutorial" + level info

const improvedSearches = {
  // VAULT
  'vault-001': 'https://www.youtube.com/results?search_query=front+handspring+vault+gymnastics+tutorial+technique+beginner',
  'vault-002': 'https://www.youtube.com/results?search_query=tsukahara+vault+tuck+gymnastics+tutorial+level+6',
  'vault-003': 'https://www.youtube.com/results?search_query=yurchenko+layout+vault+gymnastics+tutorial+level+7+8',
  'vault-004': 'https://www.youtube.com/results?search_query=yurchenko+full+twist+vault+gymnastics+tutorial',
  'vault-005': 'https://www.youtube.com/results?search_query=amanar+vault+2.5+twist+gymnastics+elite',
  'vault-006': 'https://www.youtube.com/results?search_query=cheng+vault+front+entry+gymnastics+elite+tutorial',
  'vault-007': 'https://www.youtube.com/results?search_query=yurchenko+pike+vault+gymnastics+tutorial+advanced',
  'vault-008': 'https://www.youtube.com/results?search_query=straddle+jump+vault+gymnastics+beginner+tutorial',
  'vault-009': 'https://www.youtube.com/results?search_query=handspring+half+twist+vault+gymnastics+level+5+6+tutorial',
  'vault-010': 'https://www.youtube.com/results?search_query=cartwheel+onto+springboard+vault+gymnastics+beginner',
  'vault-011': 'https://www.youtube.com/results?search_query=squat+on+jump+off+vault+gymnastics+level+1+2+3+beginner+tutorial',
  'vault-012': 'https://www.youtube.com/results?search_query=front+handspring+full+twist+vault+gymnastics+tutorial+level+6+7',
  'vault-013': 'https://www.youtube.com/results?search_query=yurchenko+tuck+vault+gymnastics+level+6+tutorial+round+off+entry',
  'vault-014': 'https://www.youtube.com/results?search_query=yurchenko+1.5+twist+vault+gymnastics+level+10+elite+DTY',

  // BARS
  'bars-002': 'https://www.youtube.com/results?search_query=cast+to+handstand+gymnastics+bars+tutorial+level+4+5',
  'bars-003': 'https://www.youtube.com/results?search_query=back+hip+circle+gymnastics+bars+level+3+tutorial',
  'bars-004': 'https://www.youtube.com/results?search_query=giant+swing+gymnastics+uneven+bars+tutorial+level+5+6',
  'bars-005': 'https://www.youtube.com/results?search_query=tkachev+release+gymnastics+uneven+bars+tutorial+advanced',
  'bars-006': 'https://www.youtube.com/results?search_query=handstand+pirouette+turn+gymnastics+uneven+bars+tutorial',
  'bars-007': 'https://www.youtube.com/results?search_query=gienger+release+gymnastics+bars+advanced+tutorial',
  'bars-008': 'https://www.youtube.com/results?search_query=double+back+dismount+gymnastics+bars+advanced+tutorial',
  'bars-009': 'https://www.youtube.com/results?search_query=pak+salto+gymnastics+bars+transition+high+to+low+bar+tutorial',
  'bars-010': 'https://www.youtube.com/results?search_query=shaposhnikova+gymnastics+bars+transition+low+to+high+bar+tutorial',
  'bars-011': 'https://www.youtube.com/results?search_query=clear+hip+circle+handstand+gymnastics+bars+level+6+7+tutorial',
  'bars-012': 'https://www.youtube.com/results?search_query=deltchev+release+gymnastics+bars+advanced+tutorial',
  'bars-013': 'https://www.youtube.com/results?search_query=nabieva+release+gymnastics+bars+elite+tutorial',
  'bars-014': 'https://www.youtube.com/results?search_query=mill+circle+forward+hip+circle+gymnastics+bars+level+3+tutorial',
  'bars-015': 'https://www.youtube.com/results?search_query=layout+flyaway+dismount+gymnastics+bars+level+5+6+tutorial',
  'bars-016': 'https://www.youtube.com/results?search_query=stalder+circle+gymnastics+uneven+bars+level+8+tutorial',
  'bars-018': 'https://www.youtube.com/results?search_query=underswing+dismount+gymnastics+bars+level+3+4+tutorial',
  'bars-019': 'https://www.youtube.com/results?search_query=tuck+flyaway+dismount+gymnastics+bars+level+4+tutorial',
  'bars-020': 'https://www.youtube.com/results?search_query=flyaway+half+twist+dismount+gymnastics+bars+level+6+7+tutorial',
  'bars-021': 'https://www.youtube.com/results?search_query=piked+flyaway+dismount+gymnastics+bars+level+7+8+tutorial',
  'bars-022': 'https://www.youtube.com/results?search_query=endo+circle+forward+stalder+gymnastics+bars+level+7+8+tutorial',
  'bars-023': 'https://www.youtube.com/results?search_query=toe+on+circle+handstand+gymnastics+bars+level+7+8+tutorial',

  // BEAM
  'beam-002': 'https://www.youtube.com/results?search_query=back+walkover+balance+beam+gymnastics+tutorial+level+4+5',
  'beam-004': 'https://www.youtube.com/results?search_query=back+handspring+balance+beam+gymnastics+tutorial+level+6+7',
  'beam-005': 'https://www.youtube.com/results?search_query=round+off+dismount+balance+beam+gymnastics+tutorial+level+5+6',
  'beam-006': 'https://www.youtube.com/results?search_query=back+layout+salto+balance+beam+gymnastics+tutorial+level+8+9',
  'beam-007': 'https://www.youtube.com/results?search_query=wolf+turn+balance+beam+gymnastics+tutorial+level+6+7',
  'beam-008': 'https://www.youtube.com/results?search_query=switch+ring+leap+balance+beam+gymnastics+tutorial+advanced',
  'beam-009': 'https://www.youtube.com/results?search_query=sheep+jump+balance+beam+gymnastics+tutorial+back+bend',
  'beam-010': 'https://www.youtube.com/results?search_query=aerial+cartwheel+side+aerial+balance+beam+gymnastics+tutorial+advanced',
  'beam-011': 'https://www.youtube.com/results?search_query=standing+back+tuck+dismount+balance+beam+gymnastics+tutorial',
  'beam-012': 'https://www.youtube.com/results?search_query=double+pike+dismount+balance+beam+gymnastics+elite+tutorial',
  'beam-013': 'https://www.youtube.com/results?search_query=acrobatic+series+connection+balance+beam+gymnastics+tutorial',
  'beam-014': 'https://www.youtube.com/results?search_query=forward+roll+balance+beam+gymnastics+tutorial+level+3+4',
  'beam-015': 'https://www.youtube.com/results?search_query=arabesque+scale+balance+beam+gymnastics+dance+element+tutorial',
  'beam-016': 'https://www.youtube.com/results?search_query=split+balance+beam+gymnastics+flexibility+tutorial',
  'beam-017': 'https://www.youtube.com/results?search_query=sissone+balance+beam+gymnastics+jump+series+tutorial',
  'beam-019': 'https://www.youtube.com/results?search_query=split+leap+balance+beam+gymnastics+tutorial+level+4+5',
  'beam-020': 'https://www.youtube.com/results?search_query=cat+leap+pas+de+chat+balance+beam+gymnastics+tutorial+level+3+4',
  'beam-021': 'https://www.youtube.com/results?search_query=front+aerial+walkover+balance+beam+gymnastics+tutorial+level+7+8+9',
  'beam-022': 'https://www.youtube.com/results?search_query=handstand+balance+beam+gymnastics+tutorial+level+4+required+element',
  'beam-023': 'https://www.youtube.com/results?search_query=back+tuck+back+salto+balance+beam+in+routine+series+gymnastics+level+8',
  'beam-024': 'https://www.youtube.com/results?search_query=front+walkover+balance+beam+gymnastics+tutorial+level+5+6',
  'beam-025': 'https://www.youtube.com/results?search_query=switch+leap+balance+beam+gymnastics+tutorial+level+6+7',

  // FLOOR
  'floor-002': 'https://www.youtube.com/results?search_query=back+tuck+backflip+gymnastics+floor+tutorial+level+4+5',
  'floor-003': 'https://www.youtube.com/results?search_query=back+layout+gymnastics+floor+tutorial+level+5+6+straight+body',
  'floor-005': 'https://www.youtube.com/results?search_query=switch+leap+gymnastics+floor+tutorial+level+5+6',
  'floor-006': 'https://www.youtube.com/results?search_query=straddle+jump+gymnastics+floor+dance+element+tutorial+beginner',
  'floor-007': 'https://www.youtube.com/results?search_query=triple+double+Biles+II+gymnastics+floor+elite+tutorial',
  'floor-008': 'https://www.youtube.com/results?search_query=double+back+tuck+gymnastics+floor+tutorial+advanced+level+9+10',
  'floor-009': 'https://www.youtube.com/results?search_query=full+twist+back+layout+gymnastics+floor+tutorial+level+6+7',
  'floor-010': 'https://www.youtube.com/results?search_query=fouette+turn+gymnastics+floor+dance+element+tutorial',
  'floor-011': 'https://www.youtube.com/results?search_query=wolf+turn+floor+exercise+gymnastics+tutorial+level+6+7',
  'floor-012': 'https://www.youtube.com/results?search_query=double+layout+gymnastics+floor+elite+tutorial',
  'floor-013': 'https://www.youtube.com/results?search_query=double+pike+gymnastics+floor+tutorial+advanced+level+9+10',
  'floor-014': 'https://www.youtube.com/results?search_query=back+walkover+gymnastics+floor+tutorial+level+3+4+beginner',
  'floor-015': 'https://www.youtube.com/results?search_query=front+walkover+gymnastics+floor+tutorial+level+3+4+beginner',
  'floor-016': 'https://www.youtube.com/results?search_query=front+handspring+gymnastics+floor+tutorial+level+4+5+beginner',
  'floor-017': 'https://www.youtube.com/results?search_query=tuck+jump+pike+jump+gymnastics+floor+dance+element+beginner+tutorial',
  'floor-018': 'https://www.youtube.com/results?search_query=tour+jete+half+turn+leap+gymnastics+floor+tutorial+level+6+7',
  'floor-019': 'https://www.youtube.com/results?search_query=double+arabian+salto+gymnastics+floor+tutorial+advanced+level+8+9',
  'floor-020': 'https://www.youtube.com/results?search_query=round+off+gymnastics+floor+tutorial+beginner+level+2+3+technique',
  'floor-022': 'https://www.youtube.com/results?search_query=back+layout+half+twist+gymnastics+floor+tutorial+level+6+7+8',
  'floor-024': 'https://www.youtube.com/results?search_query=handstand+gymnastics+floor+tutorial+beginner+level+1+2+3+technique',
  'floor-025': 'https://www.youtube.com/results?search_query=front+tuck+front+salto+gymnastics+floor+tutorial+level+5+6',
  'floor-026': 'https://www.youtube.com/results?search_query=back+layout+step+out+gymnastics+floor+series+connection+level+6+7',
  'floor-027': 'https://www.youtube.com/results?search_query=front+layout+punch+front+salto+gymnastics+floor+tutorial+level+7+8',
};

// Apply all improved search URLs (only if the skill still has a search URL, not overwriting confirmed direct IDs)
Object.entries(improvedSearches).forEach(([skillId, newUrl]) => {
  const skill = skills.find(s => s.id === skillId);
  if (!skill || !skill.videos[0]) return;
  const currentUrl = skill.videos[0].url;
  // Only update if it's still a search URL (don't overwrite confirmed direct watch URLs)
  if (currentUrl.includes('results?search_query=')) {
    skill.videos[0].url = newUrl;
  }
});

// Write updated file
fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));

// Summary
const direct = skills.reduce((n, s) => n + s.videos.filter(v => v.url.includes('watch?v=')).length, 0);
const search = skills.reduce((n, s) => n + s.videos.filter(v => v.url.includes('search_query=')).length, 0);
console.log('\nDone.');
console.log('Direct YouTube watch URLs:', direct);
console.log('YouTube search URLs:', search);
console.log('Total video entries:', direct + search);
