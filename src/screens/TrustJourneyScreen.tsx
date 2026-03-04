import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { BGFab } from '../components/BGFab';
import { trustJourney, currentPlayer } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

const bricColors: Record<string, string> = {
  Believability: '#4EA8DE',
  Reliability: '#2D6A4F',
  Integrity: '#C9A84C',
  Consistency: '#E07A3A',
  'All BRICs': '#8B5CF6',
};

export function TrustJourneyScreen() {
  const { c } = useTheme();
  const completed = trustJourney.milestones.filter(m => m.done).length;
  const total = trustJourney.milestones.length;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Text style={[styles.title, { color: c.textPrimary }]}>Trust Journey</Text>
        <Text style={[styles.subtitle, { color: c.textSecondary }]}>Level {trustJourney.currentLevel} of {trustJourney.totalLevels}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Vehicle + Road */}
        <View style={[styles.roadCard, { backgroundColor: c.primary }]}>
          <View style={styles.roadTrack}>
            <View style={styles.roadLine} />
            {/* Vehicle */}
            <View style={[styles.vehicle, { left: `${trustJourney.vehiclePosition * 100}%` as any }]}>
              <Text style={styles.vehicleIcon}>🚗</Text>
            </View>
            {/* Level markers */}
            {[0, 10, 30, 60, 100].map((pos, i) => (
              <View key={i} style={[styles.marker, { left: `${pos}%` as any }]}>
                <View style={[styles.markerDot, pos <= 14 ? styles.markerDone : styles.markerPending]} />
              </View>
            ))}
          </View>
          <View style={styles.roadLabels}>
            <Text style={styles.roadLabel}>1</Text>
            <Text style={styles.roadLabel}>10</Text>
            <Text style={styles.roadLabel}>30</Text>
            <Text style={styles.roadLabel}>60</Text>
            <Text style={styles.roadLabel}>100</Text>
          </View>
          <Text style={styles.phaseText}>{trustJourney.phase}: {trustJourney.phaseTheme}</Text>
        </View>

        {/* Phase progression */}
        <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>Phases</Text>
        {trustJourney.phases.map(phase => (
          <Card key={phase.name} style={phase.current ? { borderColor: c.primary, borderWidth: 2 } : undefined}>
            <View style={styles.phaseRow}>
              <View style={[styles.bricDot, { backgroundColor: bricColors[phase.bric] }]} />
              <View style={styles.phaseInfo}>
                <Text style={[styles.phaseName, { color: c.textPrimary }]}>
                  {phase.name} <Text style={[styles.phaseLevels, { color: c.textTertiary }]}>Levels {phase.levels}</Text>
                </Text>
                <Text style={[styles.phaseTheme, { color: c.textSecondary }]}>{phase.theme}</Text>
              </View>
              {phase.current && (
                <View style={[styles.currentBadge, { backgroundColor: c.primary }]}>
                  <Text style={styles.currentBadgeText}>NOW</Text>
                </View>
              )}
            </View>
          </Card>
        ))}

        {/* Milestones */}
        <View style={styles.milestoneHeader}>
          <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>Level 14 Milestones</Text>
          <Text style={[styles.milestoneCount, { color: c.textSecondary }]}>{completed}/{total}</Text>
        </View>

        {trustJourney.milestones.map((ms, i) => (
          <Card key={i}>
            <View style={styles.msRow}>
              {ms.done ? (
                <Ionicons name="checkmark-circle" size={24} color="#16A34A" />
              ) : (
                <Ionicons name="ellipse-outline" size={24} color={c.textTertiary} />
              )}
              <View style={styles.msInfo}>
                <Text style={[styles.msName, { color: c.textPrimary }, ms.done && styles.msDone]}>{ms.name}</Text>
                <View style={styles.msMetaRow}>
                  <View style={[styles.bricTag, { backgroundColor: (bricColors[ms.bric] || '#999') + '20' }]}>
                    <Text style={[styles.bricTagText, { color: bricColors[ms.bric] || '#999' }]}>{ms.bric}</Text>
                  </View>
                  <Text style={[styles.coinText, { color: c.gold }]}>🪙 {ms.coins}</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}

        {/* Trust Coins */}
        <View style={[styles.coinsCard, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
          <Text style={styles.coinsIcon}>🪙</Text>
          <Text style={[styles.coinsValue, { color: c.gold }]}>{currentPlayer.trustCoins.toLocaleString()}</Text>
          <Text style={[styles.coinsLabel, { color: c.textSecondary }]}>Trust Coins</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BGFab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 54, paddingBottom: 12, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  scroll: { padding: 16 },
  roadCard: { borderRadius: 16, padding: 20, marginBottom: 20 },
  roadTrack: { height: 40, justifyContent: 'center', marginBottom: 4 },
  roadLine: { position: 'absolute', left: 0, right: 0, height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2 },
  vehicle: { position: 'absolute', top: 0, marginLeft: -14 },
  vehicleIcon: { fontSize: 28 },
  marker: { position: 'absolute', top: 12, marginLeft: -5 },
  markerDot: { width: 10, height: 10, borderRadius: 5 },
  markerDone: { backgroundColor: '#4ADE80' },
  markerPending: { backgroundColor: 'rgba(255,255,255,0.4)' },
  roadLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  roadLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' },
  phaseText: { color: '#FFF', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  phaseRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bricDot: { width: 12, height: 12, borderRadius: 6 },
  phaseInfo: { flex: 1 },
  phaseName: { fontSize: 15, fontWeight: '600' },
  phaseLevels: { fontSize: 12, fontWeight: '400' },
  phaseTheme: { fontSize: 13, marginTop: 2, fontStyle: 'italic' },
  currentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  currentBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  milestoneHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  milestoneCount: { fontSize: 15, fontWeight: '600' },
  msRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  msInfo: { flex: 1 },
  msName: { fontSize: 14, fontWeight: '500' },
  msDone: { textDecorationLine: 'line-through', opacity: 0.6 },
  msMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  bricTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  bricTagText: { fontSize: 11, fontWeight: '700' },
  coinText: { fontSize: 12, fontWeight: '600' },
  coinsCard: {
    borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, marginTop: 12,
  },
  coinsIcon: { fontSize: 36, marginBottom: 4 },
  coinsValue: { fontSize: 32, fontWeight: '900' },
  coinsLabel: { fontSize: 14, marginTop: 2 },
});
