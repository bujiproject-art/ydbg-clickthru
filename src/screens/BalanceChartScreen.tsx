import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { BGFab } from '../components/BGFab';
import { balanceChart, currentPlayer } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

function ProgressBar({ done, total, color }: { done: number; total: number; color: string }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: color }]} />
    </View>
  );
}

export function BalanceChartScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalDone = balanceChart.reduce((s, b) => s + b.habits.reduce((s2, h) => s2 + h.done, 0), 0);
  const totalFreq = balanceChart.reduce((s, b) => s + b.habits.reduce((s2, h) => s2 + h.freq, 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Text style={[styles.title, { color: c.textPrimary }]}>My Balance Chart</Text>
        <Text style={[styles.week, { color: c.textSecondary }]}>Week of Mar 3</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* BALANCE acrostic banner */}
        <View style={styles.balanceBanner}>
          {balanceChart.map(b => (
            <View key={b.bb} style={[styles.letterCircle, { backgroundColor: b.color }]}>
              <Text style={styles.letterText}>{b.letter}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.balanceLabel, { color: c.textTertiary }]}>B . A . L . A . N . C . E</Text>

        {/* Building Blocks */}
        {balanceChart.map(block => {
          const blockDone = block.habits.reduce((s, h) => s + h.done, 0);
          const blockTotal = block.habits.reduce((s, h) => s + h.freq, 0);
          const pct = blockTotal > 0 ? Math.round((blockDone / blockTotal) * 100) : 0;
          const isExpanded = expanded === block.bb;

          return (
            <Pressable key={block.bb} onPress={() => setExpanded(isExpanded ? null : block.bb)}>
              <Card borderLeftColor={block.color}>
                <View style={styles.blockHeader}>
                  <View style={styles.blockNameRow}>
                    <Text style={[styles.blockLetter, { color: block.color }]}>{block.letter}</Text>
                    <Text style={[styles.blockName, { color: c.textPrimary }]}>{block.bb.slice(1)}</Text>
                  </View>
                  <View style={styles.blockRight}>
                    <Text style={[styles.blockPct, { color: pct >= 80 ? '#16A34A' : pct >= 50 ? '#F59E0B' : c.textSecondary }]}>
                      {pct}%
                    </Text>
                    <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={c.textTertiary} />
                  </View>
                </View>

                <ProgressBar done={blockDone} total={blockTotal} color={block.color} />

                {isExpanded && (
                  <View style={styles.habitList}>
                    {block.habits.map((habit, i) => (
                      <Pressable
                        key={i}
                        style={[styles.habitRow, { borderTopColor: c.border }]}
                        onPress={() => nav.navigate('HabitDetail', { habit, bb: block.bb, color: block.color })}
                      >
                        <View style={styles.habitInfo}>
                          <Text style={[styles.habitName, { color: c.textPrimary }]}>{habit.name}</Text>
                          <Text style={[styles.habitMeta, { color: c.textTertiary }]}>
                            {habit.level} · {habit.done}/{habit.freq} this week
                          </Text>
                        </View>
                        {habit.done >= habit.freq ? (
                          <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
                        ) : (
                          <Text style={[styles.habitProgress, { color: c.textSecondary }]}>{habit.done}/{habit.freq}</Text>
                        )}
                      </Pressable>
                    ))}
                  </View>
                )}
              </Card>
            </Pressable>
          );
        })}

        {/* Say/Do Gauge */}
        <View style={[styles.gaugeCard, { backgroundColor: c.surface, borderColor: c.border }]}>
          <View style={styles.gaugeCircle}>
            <Text style={[styles.gaugeValue, { color: c.primary }]}>{currentPlayer.sayDoRatio}%</Text>
          </View>
          <Text style={[styles.gaugeLabel, { color: c.textPrimary }]}>Say/Do Ratio</Text>
          <Text style={[styles.gaugeSub, { color: c.textTertiary }]}>Promises Kept / Promises Made</Text>
          <View style={styles.quickStats}>
            <Text style={[styles.quickStat, { color: c.textSecondary }]}>
              Deposits: {totalDone}/{totalFreq} this week
            </Text>
            <Text style={[styles.quickStat, { color: c.textSecondary }]}>
              Streak: {currentPlayer.currentStreak} days
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BGFab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20, paddingTop: 54, paddingBottom: 12, borderBottomWidth: 1,
  },
  title: { fontSize: 22, fontWeight: '800' },
  week: { fontSize: 13, marginTop: 2 },
  scroll: { padding: 16 },
  balanceBanner: {
    flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 6, marginTop: 4,
  },
  letterCircle: {
    width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
  },
  letterText: { color: '#FFF', fontWeight: '900', fontSize: 18 },
  balanceLabel: { textAlign: 'center', fontSize: 11, letterSpacing: 4, marginBottom: 16, fontWeight: '600' },
  blockHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  blockNameRow: { flexDirection: 'row', alignItems: 'baseline' },
  blockLetter: { fontSize: 22, fontWeight: '900' },
  blockName: { fontSize: 15, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  blockRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  blockPct: { fontSize: 15, fontWeight: '700' },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: '#E8E2DA', overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  habitList: { marginTop: 10 },
  habitRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, borderTopWidth: 1,
  },
  habitInfo: { flex: 1 },
  habitName: { fontSize: 14, fontWeight: '500' },
  habitMeta: { fontSize: 12, marginTop: 2 },
  habitProgress: { fontSize: 14, fontWeight: '600' },
  gaugeCard: {
    borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, marginTop: 8,
  },
  gaugeCircle: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 6,
    borderColor: '#2D6A4F', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  gaugeValue: { fontSize: 28, fontWeight: '900' },
  gaugeLabel: { fontSize: 17, fontWeight: '700' },
  gaugeSub: { fontSize: 12, marginTop: 2 },
  quickStats: { flexDirection: 'row', gap: 20, marginTop: 14 },
  quickStat: { fontSize: 13 },
});
