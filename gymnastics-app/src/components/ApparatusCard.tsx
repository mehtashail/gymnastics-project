import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ApparatusInfo } from '../types';
import { Colors } from '../constants/colors';
import { allSkills } from '../data';

interface Props {
  apparatus: ApparatusInfo;
  onPress: (apparatus: ApparatusInfo) => void;
}

export function ApparatusCard({ apparatus, onPress }: Props) {
  const skillCount = allSkills.filter(s => s.apparatus === apparatus.id).length;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: apparatus.color }]}
      onPress={() => onPress(apparatus)}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>
          {apparatus.id === 'vault' ? '🏃' :
           apparatus.id === 'uneven_bars' ? '🤸' :
           apparatus.id === 'balance_beam' ? '⚖️' : '🎵'}
        </Text>
        <Text style={styles.name}>{apparatus.displayName}</Text>
        <Text style={styles.count}>{skillCount} skills</Text>
        <Text style={styles.description} numberOfLines={3}>
          {apparatus.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    minHeight: 160,
  },
  content: {
    padding: 16,
    flex: 1,
    gap: 4,
  },
  icon: {
    fontSize: 28,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  count: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 17,
  },
});
