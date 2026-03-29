import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DifficultyTier, DifficultyValue } from '../types';
import { DifficultyColors, TierColors } from '../constants/colors';

interface Props {
  tier: DifficultyTier;
  value: DifficultyValue;
  compact?: boolean;
}

export function DifficultyBadge({ tier, value, compact = false }: Props) {
  const tierColor = TierColors[tier] || '#999';
  const valueColor = DifficultyColors[value] || '#999';

  if (compact) {
    return (
      <View style={[styles.compactBadge, { backgroundColor: tierColor }]}>
        <Text style={styles.compactText}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
        <Text style={styles.tierText}>{tier}</Text>
      </View>
      <View style={[styles.valueBadge, { backgroundColor: valueColor }]}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tierBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tierText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  valueBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  compactBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
