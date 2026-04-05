import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ApparatusCard } from '../../src/components/ApparatusCard';
import { WebContainer } from '../../src/components/WebContainer';
import { APPARATUS_LIST } from '../../src/constants/apparatus';
import { Colors } from '../../src/constants/colors';
import { ApparatusInfo } from '../../src/types';

export default function HomeScreen() {
  const router = useRouter();

  function handleApparatusPress(apparatus: ApparatusInfo) {
    router.push(`/apparatus/${apparatus.id}`);
  }

  return (
    <WebContainer>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Women's Artistic Gymnastics</Text>
        <Text style={styles.heroSubtitle}>
          Tap an apparatus to explore skills, watch tutorials, and learn what your daughter is working on.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Choose an Apparatus</Text>

      <View style={styles.grid}>
        {APPARATUS_LIST.slice(0, 2).map(a => (
          <View key={a.id} style={styles.gridCell}>
            <ApparatusCard apparatus={a} onPress={handleApparatusPress} />
          </View>
        ))}
      </View>
      <View style={styles.grid}>
        {APPARATUS_LIST.slice(2, 4).map(a => (
          <View key={a.id} style={styles.gridCell}>
            <ApparatusCard apparatus={a} onPress={handleApparatusPress} />
          </View>
        ))}
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipIcon}>💡</Text>
        <View style={styles.tipText}>
          <Text style={styles.tipTitle}>New to gymnastics?</Text>
          <Text style={styles.tipBody}>
            Each skill page explains things in plain English — no gymnastics background needed. You can also upload a video to get AI-powered feedback on your daughter's technique.
          </Text>
        </View>
      </View>
      </ScrollView>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCell: {
    flex: 1,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  tipBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
});
