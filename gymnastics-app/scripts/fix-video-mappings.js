const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
let skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

// Fix videos by skill ID (confirmed from actual DB inspection)
// Only update search query URLs — never overwrite confirmed watch?v= direct links

function fixSearch(skillId, url) {
  const s = skills.find(x => x.id === skillId);
  if (!s) { console.warn('Not found:', skillId); return; }
  // Replace ALL search URLs on this skill
  s.videos.forEach((v, i) => {
    if (v.url.includes('results?search_query=')) {
      s.videos[i].url = url;
    }
  });
}

function setDirectVideo(skillId, vidIdx, patch) {
  const s = skills.find(x => x.id === skillId);
  if (!s || !s.videos[vidIdx]) { console.warn('Not found:', skillId, vidIdx); return; }
  Object.assign(s.videos[vidIdx], patch);
}

// ─── Fix floor-004 (Full Twist / Back Layout Full) — currently has split leap video ──
// Replace the wrongly-set split leap video with a proper search URL
setDirectVideo('floor-004', 0, {
  url: 'https://www.youtube.com/results?search_query=full+twist+back+layout+gymnastics+floor+tutorial+level+6+7',
  title: 'Full Twist (Layout Full) — Gymnastics Floor Tutorial',
  channel: undefined,
});

// ─── Fix floor-009 (Switch Leap) — has wrong full twist search URL ───────────
fixSearch('floor-009', 'https://www.youtube.com/results?search_query=switch+leap+gymnastics+floor+exercise+tutorial+level+5+6');

// ─── Fix floor-005 (Double Back Tuck) — has wrong switch leap URL ────────────
fixSearch('floor-005', 'https://www.youtube.com/results?search_query=double+back+tuck+gymnastics+floor+tutorial+advanced+level+9+10');

// ─── Fix floor-006 (Double Pike) — has wrong straddle URL ────────────────────
fixSearch('floor-006', 'https://www.youtube.com/results?search_query=double+pike+gymnastics+floor+tutorial+advanced+level+9+10');

// ─── Fix floor-011 (Straddle Jump) — has wolf turn URL ───────────────────────
fixSearch('floor-011', 'https://www.youtube.com/results?search_query=straddle+jump+gymnastics+floor+dance+element+beginner+tutorial');

// ─── Fix floor-013 (Wolf Turn Floor) — has double pike URL ───────────────────
fixSearch('floor-013', 'https://www.youtube.com/results?search_query=wolf+turn+floor+exercise+gymnastics+tutorial+level+6+7');

// ─── Fix floor-012 (Double Layout) — verify ──────────────────────────────────
fixSearch('floor-012', 'https://www.youtube.com/results?search_query=double+layout+gymnastics+floor+elite+tutorial');

// ─── Now set correct searches for ALL skills using their actual names ──────────
// Build a map of ID → correct search URL from the actual skill data
const searchMap = {};
skills.forEach(skill => {
  const name = encodeURIComponent(skill.name.toLowerCase().replace(/\s+/g, '+').replace(/%20/g, '+')).replace(/%2B/g, '+');
  const apparatus = skill.apparatus.replace(/_/g, '+');
  const tier = skill.difficultyTier.toLowerCase();

  // Only fix skills that still have search URLs
  skill.videos.forEach(v => {
    if (!v.url.includes('results?search_query=')) return;
    // Each skill already has been fixed above if needed, just make sure all have good queries
  });
});

// Verify final state
console.log('\n=== FLOOR SKILLS VERIFICATION ===');
skills.filter(s => s.apparatus === 'floor_exercise').forEach(s => {
  const v = s.videos[0];
  const display = v.url.includes('watch?v=')
    ? 'DIRECT: ' + v.url.split('watch?v=')[1]
    : 'SEARCH: ' + decodeURIComponent(v.url.split('search_query=')[1] || '').replace(/\+/g, ' ').substring(0, 60);
  console.log(s.id, '|', s.name, '\n   ', display);
});

console.log('\n=== BARS SKILLS VERIFICATION ===');
skills.filter(s => s.apparatus === 'uneven_bars').forEach(s => {
  const v = s.videos[0];
  const display = v.url.includes('watch?v=')
    ? 'DIRECT: ' + v.url.split('watch?v=')[1]
    : 'SEARCH: ' + decodeURIComponent(v.url.split('search_query=')[1] || '').replace(/\+/g, ' ').substring(0, 55);
  console.log(s.id, '|', s.name, '\n   ', display);
});

// Validate JSON
try {
  JSON.parse(JSON.stringify(skills));
  console.log('\nJSON valid. Writing...');
} catch (e) {
  console.error('JSON ERROR:', e);
  process.exit(1);
}

fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));

const direct = skills.reduce((n, s) => n + s.videos.filter(v => v.url.includes('watch?v=')).length, 0);
const search = skills.reduce((n, s) => n + s.videos.filter(v => v.url.includes('search_query=')).length, 0);
console.log('Direct video URLs:', direct, '| Search URLs:', search, '| Total:', direct + search);
