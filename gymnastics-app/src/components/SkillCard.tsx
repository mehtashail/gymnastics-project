import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Skill } from '../types';
import { APPARATUS_MAP } from '../constants/apparatus';
import { Colors } from '../constants/colors';
import { DifficultyBadge } from './DifficultyBadge';

interface Props {
  skill: Skill;
  onPress: (skill: Skill) => void;
}

export function SkillCard({ skill, onPress }: Props) {
  const apparatus = APPARATUS_MAP[skill.apparatus];
  const apparatusColor = apparatus?.color || Colors.primary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(skill)}
      activeOpacity={0.7}
    >
      <View style={[styles.colorBar, { backgroundColor: apparatusColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleArea}>
            <Text style={styles.name} numberOfLines={1}>{skill.name}</Text>
            <Text style={styles.technicalName}>{skill.technicalName}</Text>
          </View>
          <DifficultyBadge tier={skill.difficultyTier} value={skill.difficultyValue} compact />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {skill.description}
        </Text>
        <View style={styles.footer}>
          <View style={[styles.apparatusPill, { backgroundColor: apparatusColor + '20' }]}>
            <Text style={[styles.apparatusText, { color: apparatusColor }]}>
              {apparatus?.displayName}
            </Text>
          </View>
          {skill.videos.length > 0 && (
            <View style={styles.videoIndicator}>
              <Text style={styles.videoIndicatorText}>▶ {skill.videos.length} video{skill.videos.length > 1 ? 's' : ''}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  colorBar: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  titleArea: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  technicalName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  apparatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  apparatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  videoIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#E8F4FD',
  },
  videoIndicatorText: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '500',
  },
});
