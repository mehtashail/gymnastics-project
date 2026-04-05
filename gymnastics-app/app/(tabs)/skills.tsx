import React from 'react';
import { View, FlatList, StyleSheet, TextInput, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SkillCard } from '../../src/components/SkillCard';
import { FilterChips } from '../../src/components/FilterChips';
import { WebContainer } from '../../src/components/WebContainer';
import { useSkills } from '../../src/hooks/useSkills';
import { Colors } from '../../src/constants/colors';
import { Skill } from '../../src/types';

export default function SkillsScreen() {
  const router = useRouter();
  const {
    skills,
    query,
    setQuery,
    selectedApparatus,
    setSelectedApparatus,
    selectedTier,
    setSelectedTier,
  } = useSkills();

  function handleSkillPress(skill: Skill) {
    router.push(`/skills/${skill.id}`);
  }

  return (
    <WebContainer>
      <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search skills (e.g. cartwheel, kip, backflip)..."
          placeholderTextColor={Colors.textMuted}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FilterChips
        selectedApparatus={selectedApparatus}
        selectedTier={selectedTier}
        onApparatusChange={setSelectedApparatus}
        onTierChange={setSelectedTier}
      />

      <FlatList
        data={skills}
        keyExtractor={s => s.id}
        renderItem={({ item }) => (
          <SkillCard skill={item} onPress={handleSkillPress} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🤸</Text>
            <Text style={styles.emptyTitle}>No skills found</Text>
            <Text style={styles.emptyBody}>Try a different search term or remove some filters.</Text>
          </View>
        }
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {skills.length} skill{skills.length !== 1 ? 's' : ''}
          </Text>
        }
      />
      </View>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 16,
    marginBottom: 4,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  list: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  resultCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 4,
    fontWeight: '500',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptyBody: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
