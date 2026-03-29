export const Colors = {
  // Apparatus brand colors
  vault: '#FF6B6B',         // coral
  uneven_bars: '#9B59B6',   // purple
  balance_beam: '#1ABC9C',  // teal
  floor_exercise: '#F39C12', // gold

  // Difficulty tier colors
  beginner: '#27AE60',      // green
  intermediate: '#F39C12',  // amber
  advanced: '#E74C3C',      // red
  elite: '#8E44AD',         // purple

  // Feedback category colors
  strength: '#27AE60',
  needs_work: '#F39C12',
  safety: '#E74C3C',

  // UI
  primary: '#2C3E50',
  primaryLight: '#3D5166',
  accent: '#3498DB',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  textMuted: '#BDC3C7',
  white: '#FFFFFF',
  black: '#000000',

  // Difficulty value letter colors (Code of Points)
  diffA: '#27AE60',
  diffB: '#2ECC71',
  diffC: '#F39C12',
  diffD: '#E67E22',
  diffE: '#E74C3C',
  diffF: '#C0392B',
  diffG: '#8E44AD',
};

export const DifficultyColors: Record<string, string> = {
  A: Colors.diffA,
  B: Colors.diffB,
  C: Colors.diffC,
  D: Colors.diffD,
  E: Colors.diffE,
  F: Colors.diffF,
  G: Colors.diffG,
};

export const TierColors: Record<string, string> = {
  Beginner: Colors.beginner,
  Intermediate: Colors.intermediate,
  Advanced: Colors.advanced,
  Elite: Colors.elite,
};
