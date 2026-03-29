export type Apparatus = 'vault' | 'uneven_bars' | 'balance_beam' | 'floor_exercise';

export type DifficultyValue = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export type DifficultyTier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';

export interface QuickTip {
  id: string;
  cue: string;          // e.g. "Arms are straight"
  description: string;  // plain English explanation
}

export interface SkillVideo {
  id: string;
  title: string;
  url: string;  // Direct YouTube watch URL or YouTube search URL
  type: 'tutorial' | 'competition' | 'drill';
  channel?: string;
}

export interface Skill {
  id: string;
  name: string;             // Parent-friendly: "Cartwheel on Beam"
  technicalName: string;    // Official: "Cartwheel"
  apparatus: Apparatus;
  discipline: 'WAG';
  difficultyValue: DifficultyValue;
  difficultyTier: DifficultyTier;
  description: string;           // 2-4 sentences for parents
  whatToLookFor: string[];       // 3-5 parent-friendly cues
  commonMistakes: string[];      // 3-5 explained in plain English
  quickTipsChecklist: QuickTip[];
  relatedSkillIds: string[];
  videos: SkillVideo[];
  tags: string[];
}

export type AIFeedbackCategory = 'strength' | 'needs_work' | 'safety';

export interface AIFeedbackItem {
  category: AIFeedbackCategory;
  title: string;
  description: string;
}

export interface AIFeedback {
  overallImpression: string;
  items: AIFeedbackItem[];
  nextSteps: string[];
  encouragement: string;
  disclaimer: string;
  analyzedFrameCount: number;
}

export type AnalysisMode = 'quick_tips' | 'ai_analysis';

export interface AnalysisRequest {
  skillId: string;
  videoUri: string;
}

export interface ApparatusInfo {
  id: Apparatus;
  name: string;
  displayName: string;
  color: string;
  icon: string;
  description: string;
}
