import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SkillCard } from '../../src/components/SkillCard';
import { FilterChips } from '../../src/components/FilterChips';
import { useSkills } from '../../src/hooks/useSkills';
import { Colors } from '../../src/constants/colors';
import { APPARATUS_MAP } from '../../src/constants/apparatus';
import { Apparatus, Skill } from '../../src/types';

export default function ApparatusScreen() {
  const { apparatus } = useLocalSearchParams<{ apparatus: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const apparatusInfo = APPARATUS_MAP[apparatus as Apparatus];

  const {
    skills,
    selectedTier,
    setSelectedTier,
  } = useSkills(apparatus as Apparatus);

  useEffect(() => {
    if (apparatusInfo) {
      navigation.setOptions({ title: apparatusInfo.displayName });
    }
  }, [apparatusInfo, navigation]);

  function handleSkillPress(skill: Skill) {
    router.push(`/skills/${skill.id}`);
  }

  if (!apparatusInfo) {
    return (
      <View style={styles.center}>
        <Text>Apparatus not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.hero, { backgroundColor: apparatusInfo.color }]}>
        <Text style={styles.heroTitle}>{apparatusInfo.displayName}</Text>
        <Text style={styles.heroDesc}>{apparatusInfo.description}</Text>
      </View>

      <FilterChips
        selectedTier={selectedTier}
        onTierChange={setSelectedTier}
      />

      <FlatList
        data={skills}
        keyExtractor={s => s.id}
        renderItem={({ item }) => (
          <SkillCard skill={item} onPress={handleSkillPress} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.count}>{skills.length} skills</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No skills match this filter.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: {
    padding: 20,
    paddingTop: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  list: { paddingTop: 8, paddingBottom: 24 },
  count: {
    fontSize: 12,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 4,
    fontWeight: '500',
  },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 15, color: Colors.textSecondary },
});
