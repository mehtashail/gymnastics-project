import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { getSkillById, getRelatedSkills } from '../../src/data';
import { DifficultyBadge } from '../../src/components/DifficultyBadge';
import { SkillCard } from '../../src/components/SkillCard';
import { Colors } from '../../src/constants/colors';
import { APPARATUS_MAP } from '../../src/constants/apparatus';
import { Skill } from '../../src/types';

export default function SkillDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const skill = getSkillById(id);

  useEffect(() => {
    if (skill) {
      navigation.setOptions({ title: skill.name });
    }
  }, [skill, navigation]);

  if (!skill) {
    return (
      <View style={styles.center}>
        <Text>Skill not found.</Text>
      </View>
    );
  }

  const apparatus = APPARATUS_MAP[skill.apparatus];
  const related = getRelatedSkills(skill);

  function handleAnalyze() {
    router.push({
      pathname: '/(tabs)/analyze',
    });
  }

  function handleRelatedSkillPress(s: Skill) {
    router.push(`/skills/${s.id}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: apparatus?.color }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>{skill.name}</Text>
            <Text style={styles.headerTechnical}>{skill.technicalName}</Text>
          </View>
          <DifficultyBadge tier={skill.difficultyTier} value={skill.difficultyValue} />
        </View>
        <Text style={styles.headerApparatus}>{apparatus?.displayName}</Text>
      </View>

      {/* Description */}
      <Section title="What is this skill?">
        <Text style={styles.description}>{skill.description}</Text>
      </Section>

      {/* Videos */}
      {skill.videos.length > 0 && (
        <Section title={`Watch It${skill.videos.length > 1 ? ' (Videos)' : ''}`}>
          {skill.videos.map((video) => {
            const isDirect = video.url.includes('watch?v=');
            const searchQuery = !isDirect
              ? decodeURIComponent(
                  video.url.split('search_query=')[1]?.replace(/\+/g, ' ') ?? ''
                )
              : null;
            return (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => Linking.openURL(video.url)}
                activeOpacity={0.7}
              >
                <View style={[styles.videoThumbPlaceholder, !isDirect && styles.videoThumbSearch]}>
                  <Text style={styles.videoPlayIcon}>{isDirect ? '▶' : '🔍'}</Text>
                </View>
                <View style={styles.videoInfo}>
                  <View style={styles.videoLabel}>
                    <Text style={styles.videoType}>
                      {video.type === 'tutorial' ? '📚 Tutorial' : video.type === 'drill' ? '🔄 Drill' : '🏆 Competition'}
                    </Text>
                    {video.channel ? <Text style={styles.videoChannel}>{video.channel}</Text> : null}
                  </View>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  {!isDirect && searchQuery ? (
                    <Text style={styles.videoSearchQuery} numberOfLines={2}>
                      Search: "{searchQuery}"
                    </Text>
                  ) : null}
                  <Text style={styles.videoOpenHint}>
                    {isDirect ? 'Watch on YouTube →' : 'Open YouTube search →'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Section>
      )}

      {/* What to Look For */}
      <Section title="What to Look For">
        <Text style={styles.sectionSubtitle}>Watch for these things when your daughter does this skill:</Text>
        {skill.whatToLookFor.map((cue, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.bulletText}>{cue}</Text>
          </View>
        ))}
      </Section>

      {/* Common Mistakes */}
      <Section title="Common Mistakes (and why they matter)">
        <Text style={styles.sectionSubtitle}>Judges notice these and take off points for them:</Text>
        {skill.commonMistakes.map((mistake, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={[styles.bullet, { color: Colors.safety }]}>⚠</Text>
            <Text style={styles.bulletText}>{mistake}</Text>
          </View>
        ))}
      </Section>

      {/* Quick Tips Checklist */}
      <Section title="Quick Tips Checklist">
        <Text style={styles.sectionSubtitle}>Use this checklist while watching her practice:</Text>
        {skill.quickTipsChecklist.map((tip, i) => (
          <View key={tip.id} style={styles.tipRow}>
            <View style={styles.tipCheck}>
              <Text style={styles.tipCheckBox}>☐</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipCue}>{tip.cue}</Text>
              <Text style={styles.tipDesc}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </Section>

      {/* Analyze CTA */}
      <TouchableOpacity
        style={[styles.analyzeCTA, { backgroundColor: apparatus?.color }]}
        onPress={handleAnalyze}
      >
        <Text style={styles.analyzeCTAText}>🎬 Analyze this skill from a video</Text>
        <Text style={styles.analyzeCTASubtext}>Upload a video and get AI-powered feedback</Text>
      </TouchableOpacity>

      {/* Related Skills */}
      {related.length > 0 && (
        <Section title="Related Skills">
          {related.map(s => (
            <SkillCard key={s.id} skill={s} onPress={handleRelatedSkillPress} />
          ))}
        </Section>
      )}
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: 40 },
  header: {
    padding: 20,
    paddingTop: 16,
    gap: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
  },
  headerTechnical: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  headerApparatus: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  section: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 23,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  bullet: {
    fontSize: 14,
    color: Colors.strength,
    marginTop: 1,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tipCheck: { paddingTop: 1 },
  tipCheckBox: { fontSize: 18, color: Colors.textMuted },
  tipContent: { flex: 1 },
  tipCue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  tipDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 },
  videoCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  videoThumbPlaceholder: {
    width: 72,
    height: 52,
    borderRadius: 6,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  videoThumbSearch: {
    backgroundColor: '#EEF2FF',
  },
  videoPlayIcon: {
    fontSize: 22,
    color: '#FF0000',
  },
  videoInfo: {
    flex: 1,
    gap: 3,
  },
  videoLabel: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  videoType: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary },
  videoChannel: { fontSize: 11, color: Colors.textMuted },
  videoTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, lineHeight: 18 },
  videoSearchQuery: { fontSize: 11, color: Colors.textMuted, lineHeight: 15, fontStyle: 'italic' },
  videoOpenHint: { fontSize: 12, color: Colors.accent, marginTop: 2 },
  analyzeCTA: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  analyzeCTAText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  analyzeCTASubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
});
