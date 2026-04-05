import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../src/constants/colors';
import { WebContainer } from '../../src/components/WebContainer';
import { Skill, AnalysisMode } from '../../src/types';
import { allSkills } from '../../src/data';
import { APPARATUS_MAP } from '../../src/constants/apparatus';
import { useVideoAnalysis } from '../../src/hooks/useVideoAnalysis';

export default function AnalyzeScreen() {
  const router = useRouter();
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [mode, setMode] = useState<AnalysisMode | null>(null);
  const [skillPickerVisible, setSkillPickerVisible] = useState(false);
  const { status, analyze } = useVideoAnalysis();

  async function pickVideo() {
    const { status: permStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permStatus !== 'granted') {
      Alert.alert('Permission Required', 'We need photo library access to select videos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });
    if (!result.canceled && result.assets[0]) {
      setVideoUri(result.assets[0].uri);
    }
  }

  async function handleStart() {
    if (!videoUri || !selectedSkill || !mode) return;

    if (mode === 'quick_tips') {
      router.push({
        pathname: '/feedback/result',
        params: {
          mode: 'quick_tips',
          skillId: selectedSkill.id,
        },
      });
      return;
    }

    // AI Analysis
    const feedback = await analyze(videoUri, selectedSkill);
    if (feedback) {
      router.push({
        pathname: '/feedback/result',
        params: {
          mode: 'ai_analysis',
          skillId: selectedSkill.id,
          feedbackJson: JSON.stringify(feedback),
        },
      });
    } else {
      Alert.alert(
        'Analysis Failed',
        'We could not analyze this video. Would you like to use Quick Tips instead?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Use Quick Tips',
            onPress: () => {
              router.push({
                pathname: '/feedback/result',
                params: { mode: 'quick_tips', skillId: selectedSkill.id },
              });
            },
          },
        ]
      );
    }
  }

  const isLoading = status === 'uploading' || status === 'analyzing';

  return (
    <WebContainer>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        Upload a video of your daughter and get feedback on her gymnastics technique.
      </Text>

      {/* Step 1: Pick Video */}
      <StepCard
        step={1}
        title="Choose a Video"
        completed={!!videoUri}
      >
        <TouchableOpacity style={styles.videoButton} onPress={pickVideo}>
          <Text style={styles.videoButtonIcon}>{videoUri ? '✅' : '📹'}</Text>
          <Text style={styles.videoButtonText}>
            {videoUri ? 'Video selected — tap to change' : 'Pick a video from your library'}
          </Text>
        </TouchableOpacity>
        {videoUri && (
          <Text style={styles.videoHint} numberOfLines={1}>
            {videoUri.split('/').pop()}
          </Text>
        )}
      </StepCard>

      {/* Step 2: Pick Skill */}
      <StepCard step={2} title="What skill is she doing?" completed={!!selectedSkill}>
        <TouchableOpacity
          style={styles.skillSelector}
          onPress={() => setSkillPickerVisible(!skillPickerVisible)}
        >
          <Text style={styles.skillSelectorText}>
            {selectedSkill ? selectedSkill.name : 'Tap to choose a skill'}
          </Text>
          <Text style={styles.chevron}>{skillPickerVisible ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {skillPickerVisible && (
          <SkillPicker
            selected={selectedSkill}
            onSelect={skill => {
              setSelectedSkill(skill);
              setSkillPickerVisible(false);
            }}
          />
        )}
      </StepCard>

      {/* Step 3: Choose Mode */}
      <StepCard step={3} title="How do you want feedback?" completed={!!mode}>
        <TouchableOpacity
          style={[styles.modeCard, mode === 'quick_tips' && styles.modeCardSelected]}
          onPress={() => setMode('quick_tips')}
        >
          <Text style={styles.modeIcon}>⚡</Text>
          <View style={styles.modeInfo}>
            <View style={styles.modeHeader}>
              <Text style={styles.modeTitle}>Quick Tips</Text>
              <View style={styles.offlineBadge}>
                <Text style={styles.offlineBadgeText}>Offline</Text>
              </View>
            </View>
            <Text style={styles.modeBody}>
              Instant checklist from the skill database. No internet needed — works immediately.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeCard, mode === 'ai_analysis' && styles.modeCardSelected]}
          onPress={() => setMode('ai_analysis')}
        >
          <Text style={styles.modeIcon}>🤖</Text>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>AI Video Analysis</Text>
            <Text style={styles.modeBody}>
              Claude AI analyzes frames from your video and gives personalized, encouraging feedback. Takes 30-60 seconds. Requires internet.
            </Text>
          </View>
        </TouchableOpacity>
      </StepCard>

      {/* Go Button */}
      <TouchableOpacity
        style={[
          styles.goButton,
          (!videoUri || !selectedSkill || !mode || isLoading) && styles.goButtonDisabled,
        ]}
        onPress={handleStart}
        disabled={!videoUri || !selectedSkill || !mode || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.goButtonText}>
            {mode === 'quick_tips' ? '⚡ Get Quick Tips' :
             mode === 'ai_analysis' ? '🤖 Analyze with AI' : 'Get Feedback'}
          </Text>
        )}
      </TouchableOpacity>
      {isLoading && (
        <Text style={styles.analyzingText}>
          {status === 'uploading' ? 'Uploading video...' : 'AI is analyzing the video (30-60s)...'}
        </Text>
      )}
      </ScrollView>
    </WebContainer>
  );
}

function StepCard({ step, title, completed, children }: {
  step: number;
  title: string;
  completed: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepNumber, completed && styles.stepNumberDone]}>
          <Text style={styles.stepNumberText}>{completed ? '✓' : step}</Text>
        </View>
        <Text style={styles.stepTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function SkillPicker({ selected, onSelect }: {
  selected: Skill | null;
  onSelect: (skill: Skill) => void;
}) {
  return (
    <ScrollView style={styles.skillList} nestedScrollEnabled>
      {allSkills.map(skill => {
        const apparatus = APPARATUS_MAP[skill.apparatus];
        return (
          <TouchableOpacity
            key={skill.id}
            style={[styles.skillItem, selected?.id === skill.id && styles.skillItemSelected]}
            onPress={() => onSelect(skill)}
          >
            <View style={[styles.skillDot, { backgroundColor: apparatus?.color }]} />
            <View style={styles.skillItemInfo}>
              <Text style={styles.skillItemName}>{skill.name}</Text>
              <Text style={styles.skillItemSub}>{apparatus?.displayName} · {skill.difficultyTier}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  intro: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  stepCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  stepHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNumberDone: { backgroundColor: Colors.strength },
  stepNumberText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  stepTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  videoButtonIcon: { fontSize: 24 },
  videoButtonText: { fontSize: 15, color: Colors.textSecondary, flex: 1 },
  videoHint: { fontSize: 12, color: Colors.textMuted, paddingHorizontal: 4 },
  skillSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skillSelectorText: { fontSize: 15, color: Colors.textPrimary },
  chevron: { fontSize: 12, color: Colors.textSecondary },
  skillList: { maxHeight: 240, borderRadius: 8, borderWidth: 1, borderColor: Colors.border },
  skillItem: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  skillItemSelected: { backgroundColor: Colors.accent + '15' },
  skillDot: { width: 10, height: 10, borderRadius: 5 },
  skillItemInfo: { flex: 1 },
  skillItemName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  skillItemSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  modeCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  modeCardSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent + '0D',
  },
  modeIcon: { fontSize: 24, marginTop: 2 },
  modeInfo: { flex: 1 },
  modeHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  modeTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  modeBody: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  offlineBadge: { backgroundColor: Colors.strength + '20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  offlineBadgeText: { fontSize: 11, color: Colors.strength, fontWeight: '600' },
  goButton: {
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  goButtonDisabled: { backgroundColor: Colors.textMuted },
  goButtonText: { fontSize: 17, fontWeight: '700', color: Colors.white },
  analyzingText: { textAlign: 'center', fontSize: 13, color: Colors.textSecondary, marginTop: -8 },
});
