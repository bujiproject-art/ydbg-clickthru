import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { currentPlayer } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

function StatBox({ label, value, emoji, c }: { label: string; value: string | number; emoji?: string; c: any }) {
  return (
    <View style={[styles.statBox, { backgroundColor: c.surfaceAlt }]}>
      <Text style={[styles.statValue, { color: c.textPrimary }]}>{emoji ? `${emoji} ` : ''}{value}</Text>
      <Text style={[styles.statLabel, { color: c.textSecondary }]}>{label}</Text>
    </View>
  );
}

export function ProfileScreen() {
  const { c, isDark, toggleDark } = useTheme();
  const nav = useNavigation<any>();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar initials={currentPlayer.initials} size={80} color={c.primary} />
          <Text style={[styles.name, { color: c.textPrimary }]}>{currentPlayer.name}</Text>
          <View style={[styles.levelBadge, { backgroundColor: c.primaryLight + '20' }]}>
            <Text style={[styles.levelText, { color: c.primary }]}>{currentPlayer.level}</Text>
          </View>
          <Text style={[styles.memberSince, { color: c.textTertiary }]}>
            Member since {currentPlayer.memberSince} · {currentPlayer.tier}
          </Text>
        </View>

        {/* PC Score */}
        <Card>
          <View style={styles.pcScoreCenter}>
            <View style={[styles.pcCircle, { borderColor: c.primary }]}>
              <Text style={[styles.pcValue, { color: c.primary }]}>{currentPlayer.pcScore}</Text>
            </View>
            <Text style={[styles.pcLabel, { color: c.textPrimary }]}>Principal Centeredness</Text>
            <Text style={[styles.pcSub, { color: c.textTertiary }]}>Your ONE master score</Text>
          </View>
          <View style={styles.subScores}>
            <View style={styles.subScore}>
              <Text style={[styles.subValue, { color: c.textPrimary }]}>{currentPlayer.trustScore}</Text>
              <Text style={[styles.subLabel, { color: c.textTertiary }]}>Trust</Text>
            </View>
            <View style={[styles.subDivider, { backgroundColor: c.border }]} />
            <View style={styles.subScore}>
              <Text style={[styles.subValue, { color: c.textPrimary }]}>68</Text>
              <Text style={[styles.subLabel, { color: c.textTertiary }]}>Horsepower</Text>
            </View>
            <View style={[styles.subDivider, { backgroundColor: c.border }]} />
            <View style={styles.subScore}>
              <Text style={[styles.subValue, { color: c.textPrimary }]}>71</Text>
              <Text style={[styles.subLabel, { color: c.textTertiary }]}>Calibration</Text>
            </View>
          </View>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatBox label="Say/Do Ratio" value={`${currentPlayer.sayDoRatio}%`} c={c} />
          <StatBox label="Current Streak" value={currentPlayer.currentStreak} emoji="🔥" c={c} />
          <StatBox label="Longest Streak" value={currentPlayer.longestStreak} emoji="🏆" c={c} />
          <StatBox label="Hours Played" value={currentPlayer.hoursPlayed} c={c} />
          <StatBox label="Total Deposits" value={currentPlayer.totalDeposits} c={c} />
          <StatBox label="Trust Coins" value={currentPlayer.trustCoins} emoji="🪙" c={c} />
        </View>

        {/* Settings */}
        <Card>
          <View style={styles.settingRow}>
            <Ionicons name={isDark ? 'moon' : 'moon-outline'} size={20} color={c.textPrimary} />
            <Text style={[styles.settingText, { color: c.textPrimary }]}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleDark}
              trackColor={{ false: c.border, true: c.primaryLight }}
              thumbColor={isDark ? c.primary : '#FFF'}
            />
          </View>
        </Card>

        {/* Coach Dashboard button */}
        <Pressable
          style={[styles.coachBtn, { backgroundColor: c.gold }]}
          onPress={() => nav.navigate('CoachDashboard')}
        >
          <Ionicons name="school-outline" size={20} color="#FFF" />
          <Text style={styles.coachBtnText}>View as Coach</Text>
        </Pressable>

        {/* Tagline */}
        <Text style={[styles.tagline, { color: c.textTertiary }]}>
          "Make EverYDay YourDay"
        </Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingTop: 60 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 24, fontWeight: '800', marginTop: 12 },
  levelBadge: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 12, marginTop: 6 },
  levelText: { fontSize: 13, fontWeight: '700' },
  memberSince: { fontSize: 13, marginTop: 6 },
  pcScoreCenter: { alignItems: 'center', marginBottom: 16 },
  pcCircle: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 5,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  pcValue: { fontSize: 36, fontWeight: '900' },
  pcLabel: { fontSize: 16, fontWeight: '700' },
  pcSub: { fontSize: 12, marginTop: 2 },
  subScores: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E8E2DA' },
  subScore: { alignItems: 'center' },
  subValue: { fontSize: 20, fontWeight: '700' },
  subLabel: { fontSize: 11, marginTop: 2 },
  subDivider: { width: 1, height: 36 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 12 },
  statBox: { width: '48%' as any, borderRadius: 12, padding: 14, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingText: { flex: 1, fontSize: 16, fontWeight: '500' },
  coachBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: 16, borderRadius: 14, marginTop: 12,
  },
  coachBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  tagline: { textAlign: 'center', fontStyle: 'italic', fontSize: 14, marginTop: 24 },
});
