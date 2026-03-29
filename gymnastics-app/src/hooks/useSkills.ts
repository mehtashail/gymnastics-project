import { useState, useMemo } from 'react';
import { Apparatus, DifficultyTier, Skill } from '../types';
import { filterSkills } from '../data';
import { useDebounce } from './useDebounce';

export function useSkills(initialApparatus?: Apparatus) {
  const [query, setQuery] = useState('');
  const [selectedApparatus, setSelectedApparatus] = useState<Apparatus | undefined>(initialApparatus);
  const [selectedTier, setSelectedTier] = useState<DifficultyTier | undefined>();

  const debouncedQuery = useDebounce(query, 250);

  const skills = useMemo<Skill[]>(() => {
    return filterSkills({
      apparatus: selectedApparatus,
      tier: selectedTier,
      query: debouncedQuery,
    });
  }, [selectedApparatus, selectedTier, debouncedQuery]);

  return {
    skills,
    query,
    setQuery,
    selectedApparatus,
    setSelectedApparatus,
    selectedTier,
    setSelectedTier,
  };
}
