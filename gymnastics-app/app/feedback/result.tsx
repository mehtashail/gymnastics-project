import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getSkillById } from '../../src/data';
import { Colors } from '../../src/constants/colors';
import { APPARATUS_MAP } from '../../src/constants/apparatus';
import { AIFeedback, AIFeedbackItem } from '../../src/types';

export default function FeedbackResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    mode: string;
    skillId: string;
    feedbackJson?: string;
  }>();

  const skill = getSkillById(params.skillId);
  const isAI = params.mode === 'ai_analysis';
  const feedback: AIFeedback | null = params.feedbackJson
    ? JSON.parse(params.feedbackJson)
    : null;

  if (!skill) {
    return (
      <View style={styles.center}>
        <Text>Skill not found.</Text>
      </View>
    );
  }

  const apparatus = APPARATUS_MAP[skill.apparatus];

  if (!isAI || !feedback) {
    // Quick Tips mode
    return <QuickTipsView skill={skill} apparatusColor={apparatus?.color} onBack={() => router.back()} />;
  }

  return <AIFeedbackView feedback={feedback} skill={skill} apparatusColor={apparatus?.color} onBack={() => router.back()} />;
}

function QuickTipsView({ skill, apparatusColor, onBack }: any) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.skillBanner, { backgroundColor: apparatusColor }]}>
        <Text style={styles.bannerLabel}>Quick Tips for</Text>
        <Text style={styles.bannerSkill}>{skill.name}</Text>
        <View style={styles.offlinePill}>
          <Text style={styles.offlinePillText}>⚡ Offline • Instant</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Watch for these things while she practices:</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {
            width: `${skill.quickTipsChecklist.length ? (checkedCount / skill.quickTipsChecklist.length) * 100 : 0}%`,
            backgroundColor: apparatusColor,
          }]} />
        </View>
        <Text style={styles.progressText}>{checkedCount} / {skill.quickTipsChecklist.length} checked</Text>

        {skill.quickTipsChecklist.map((tip: any) => (
          <TouchableOpacity
            key={tip.id}
            style={[styles.tipRow, checked[tip.id] && styles.tipRowChecked]}
            onPress={() => toggle(tip.id)}
          >
            <Text style={[styles.checkbox, checked[tip.id] && styles.checkboxChecked]}>
              {checked[tip.id] ? '✅' : '☐'}
            </Text>
            <View style={styles.tipContent}>
              <Text style={[styles.tipCue, checked[tip.id] && styles.tipCueChecked]}>{tip.cue}</Text>
              <Text style={styles.tipDesc}>{tip.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Common mistakes to watch for:</Text>
        {skill.commonMistakes.map((m: string, i: number) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bulletWarning}>⚠</Text>
            <Text style={styles.bulletText}>{m}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Analyze</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function AIFeedbackView({ feedback, skill, apparatusColor, onBack }: any) {
  const strengths = feedback.items.filter((i: AIFeedbackItem) => i.category === 'strength');
  const needsWork = feedback.items.filter((i: AIFeedbackItem) => i.category === 'needs_work');
  const safety = feedback.items.filter((i: AIFeedbackItem) => i.category === 'safety');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.skillBanner, { backgroundColor: apparatusColor }]}>
        <Text style={styles.bannerLabel}>AI Analysis for</Text>
        <Text style={styles.bannerSkill}>{skill.name}</Text>
        <Text style={styles.bannerFrames}>Analyzed {feedback.analyzedFrameCount} frames from your video</Text>
      </View>

      {/* Overall impression */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overall Impression</Text>
        <Text style={styles.overallText}>{feedback.overallImpression}</Text>
      </View>

      {/* Encouragement */}
      <View style={[styles.card, styles.encouragementCard]}>
        <Text style={styles.encouragementText}>🌟 {feedback.encouragement}</Text>
      </View>

      {/* Strengths */}
      {strengths.length > 0 && (
        <FeedbackSection
          title="What She's Doing Well"
          items={strengths}
          color={Colors.strength}
          icon="💚"
        />
      )}

      {/* Needs Work */}
      {needsWork.length > 0 && (
        <FeedbackSection
          title="Areas to Work On"
          items={needsWork}
          color={Colors.needs_work}
          icon="🟡"
        />
      )}

      {/* Safety */}
      {safety.length > 0 && (
        <FeedbackSection
          title="Safety Notes"
          items={safety}
          color={Colors.safety}
          icon="🔴"
        />
      )}

      {/* Next Steps */}
      {feedback.nextSteps.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next Steps to Improve</Text>
          {feedback.nextSteps.map((step: string, i: number) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletStep}>{i + 1}.</Text>
              <Text style={styles.bulletText}>{step}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Disclaimer */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>⚠️ {feedback.disclaimer}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Analyze Another Video</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function FeedbackSection({ title, items, color, icon }: {
  title: string;
  items: AIFeedbackItem[];
  color: string;
  icon: string;
}) {
  return (
    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: color }]}>
      <Text style={[styles.cardTitle, { color }]}>{icon} {title}</Text>
      {items.map((item, i) => (
        <View key={i} style={styles.feedbackItem}>
          <Text style={styles.feedbackItemTitle}>{item.title}</Text>
          <Text style={styles.feedbackItemDesc}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: 40, gap: 12 },
  skillBanner: { padding: 20, gap: 4 },
  bannerLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  bannerSkill: { fontSize: 22, fontWeight: '800', color: Colors.white },
  bannerFrames: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  offlinePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 4,
  },
  offlinePillText: { fontSize: 12, color: Colors.white, fontWeight: '600' },
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 3 },
  progressText: { fontSize: 12, color: Colors.textSecondary, textAlign: 'right' },
  tipRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'flex-start',
  },
  tipRowChecked: { opacity: 0.6 },
  checkbox: { fontSize: 20, color: Colors.textMuted },
  checkboxChecked: { color: Colors.strength },
  tipContent: { flex: 1 },
  tipCue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  tipCueChecked: { textDecorationLine: 'line-through' },
  tipDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 },
  bulletRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  bulletWarning: { fontSize: 14, color: Colors.safety, marginTop: 1 },
  bulletStep: { fontSize: 14, fontWeight: '700', color: Colors.accent, marginTop: 1 },
  bulletText: { flex: 1, fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  overallText: { fontSize: 15, color: Colors.textSecondary, lineHeight: 23 },
  encouragementCard: { backgroundColor: '#FFF9E6' },
  encouragementText: { fontSize: 15, color: '#7D6008', lineHeight: 22, fontWeight: '500' },
  feedbackItem: { paddingVertical: 4, gap: 3 },
  feedbackItemTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  feedbackItemDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  disclaimerBox: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 10,
  },
  disclaimerText: { fontSize: 12, color: '#856404', lineHeight: 18 },
  backButton: {
    marginHorizontal: 16,
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  backButtonText: { fontSize: 15, color: Colors.accent, fontWeight: '600' },
});
