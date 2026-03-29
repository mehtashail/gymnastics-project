import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Apparatus, DifficultyTier } from '../types';
import { Colors } from '../constants/colors';
import { APPARATUS_LIST } from '../constants/apparatus';

interface FilterChipsProps {
  selectedApparatus?: Apparatus;
  selectedTier?: DifficultyTier;
  onApparatusChange?: (a?: Apparatus) => void;
  onTierChange: (t?: DifficultyTier) => void;
}

const TIERS: DifficultyTier[] = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];

export function FilterChips({
  selectedApparatus,
  selectedTier,
  onApparatusChange,
  onTierChange,
}: FilterChipsProps) {
  return (
    <View>
      {onApparatusChange && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          <Chip
            label="All"
            active={!selectedApparatus}
            color={Colors.primary}
            onPress={() => onApparatusChange(undefined)}
          />
          {APPARATUS_LIST.map(a => (
            <Chip
              key={a.id}
              label={a.displayName}
              active={selectedApparatus === a.id}
              color={a.color}
              onPress={() => onApparatusChange(a.id)}
            />
          ))}
        </ScrollView>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <Chip
          label="All levels"
          active={!selectedTier}
          color={Colors.primary}
          onPress={() => onTierChange(undefined)}
        />
        {TIERS.map(t => (
          <Chip
            key={t}
            label={t}
            active={selectedTier === t}
            color={Colors.textSecondary}
            onPress={() => onTierChange(t)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({ label, active, color, onPress }: {
  label: string;
  active: boolean;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        active
          ? { backgroundColor: color }
          : { backgroundColor: color + '15', borderColor: color, borderWidth: 1 },
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, { color: active ? '#fff' : color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
