import skills00 from './skills-data-00.json';
import skills01 from './skills-data-01.json';
import skills02 from './skills-data-02.json';
import skills03 from './skills-data-03.json';
import skills04 from './skills-data-04.json';
import skills05 from './skills-data-05.json';
import skills06 from './skills-data-06.json';
import skills07 from './skills-data-07.json';
import skills08 from './skills-data-08.json';
import skills09 from './skills-data-09.json';
import skills10 from './skills-data-10.json';
import skills11 from './skills-data-11.json';
import skills12 from './skills-data-12.json';
import skills13 from './skills-data-13.json';
import { Skill, Apparatus, DifficultyTier } from '../types';

export const allSkills: Skill[] = [
  ...(skills00 as unknown as Skill[]),
  ...(skills01 as unknown as Skill[]),
  ...(skills02 as unknown as Skill[]),
  ...(skills03 as unknown as Skill[]),
  ...(skills04 as unknown as Skill[]),
  ...(skills05 as unknown as Skill[]),
  ...(skills06 as unknown as Skill[]),
  ...(skills07 as unknown as Skill[]),
  ...(skills08 as unknown as Skill[]),
  ...(skills09 as unknown as Skill[]),
  ...(skills10 as unknown as Skill[]),
  ...(skills11 as unknown as Skill[]),
  ...(skills12 as unknown as Skill[]),
  ...(skills13 as unknown as Skill[]),
];

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
