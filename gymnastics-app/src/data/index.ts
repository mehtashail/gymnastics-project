import skillsData from './skills.json';
import { Skill, Apparatus, DifficultyTier } from '../types';

export const allSkills: Skill[] = skillsData as Skill[];

export function getSkillsByApparatus(apparatus: Apparatus): Skill[] {
  return allSkills.filter(s => s.apparatus === apparatus);
}

export function getSkillById(id: string): Skill | undefined {
  return allSkills.find(s => s.id === id);
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase().trim();
  if (!q) return allSkills;
  return allSkills.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.technicalName.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q))
  );
}

export function filterSkills(opts: {
  apparatus?: Apparatus;
  tier?: DifficultyTier;
  query?: string;
}): Skill[] {
  let result = allSkills;
  if (opts.apparatus) result = result.filter(s => s.apparatus === opts.apparatus);
  if (opts.tier) result = result.filter(s => s.difficultyTier === opts.tier);
  if (opts.query) {
    const q = opts.query.toLowerCase().trim();
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.technicalName.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  return result;
}

export function getRelatedSkills(skill: Skill): Skill[] {
  return skill.relatedSkillIds
    .map(id => getSkillById(id))
    .filter((s): s is Skill => s !== undefined);
}
