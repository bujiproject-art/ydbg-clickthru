import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { coachData } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

export function CoachDashboardScreen({ navigation }: any) {
  const { c } = useTheme();
  const avgSayDo = (coachData.players.reduce((s, p) => s + p.sayDo, 0) / coachData.players.length).toFixed(1);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </Pressable>
        <Text style={[styles.title, { color: c.textPrimary }]}>Coach's Corner</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        <View style={[styles.welcomeCard, { backgroundColor: c.gold }]}>
          <Avatar initials={coachData.coachInitials} size={48} color="#1B4332" />
          <View style={styles.welcomeInfo}>
            <Text style={styles.welcomeName}>Welcome, {coachData.coachName.split(' ')[0]}</Text>
            <Text style={styles.welcomeSub}>{coachData.totalPlayers} players · {coachData.activeGameDays} active GameDays</Text>
          </View>
        </View>

        {/* Team Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.statValue, { color: c.primary }]}>{avgSayDo}%</Text>
            <Text style={[styles.statLabel, { color: c.textSecondary }]}>Team Avg Say/Do</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.statValue, { color: c.gold }]}>{coachData.activeGameDays}</Text>
            <Text style={[styles.statLabel, { color: c.textSecondary }]}>Active GameDays</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          {[
            { label: 'Assign Video', icon: 'videocam-outline' },
            { label: 'Send Note', icon: 'create-outline' },
            { label: 'Schedule Session', icon: 'calendar-outline' },
          ].map(action => (
            <Pressable key={action.label} style={[styles.actionBtn, { backgroundColor: c.surfaceAlt }]}>
              <Ionicons name={action.icon as any} size={20} color={c.primary} />
              <Text style={[styles.actionLabel, { color: c.textPrimary }]}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Player Roster */}
        <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>Player Roster</Text>
        {coachData.players.map(player => (
          <Card key={player.name}>
            <View style={styles.playerRow}>
              <Avatar initials={player.initials} size={40} />
              <View style={styles.playerInfo}>
                <Text style={[styles.playerName, { color: c.textPrimary }]}>{player.name}</Text>
                <View style={styles.playerMeta}>
                  <View style={[styles.levelTag, { backgroundColor: c.surfaceAlt }]}>
                    <Text style={[styles.levelTagText, { color: c.textSecondary }]}>{player.level}</Text>
                  </View>
                  <Text style={[styles.streakText, { color: c.textTertiary }]}>🔥 {player.streak}</Text>
                </View>
              </View>
              <View style={styles.playerRight}>
                <Text style={[styles.sayDoValue, { color: c.textPrimary }]}>{player.sayDo}%</Text>
                <View style={styles.trendRow}>
                  <Ionicons
                    name={player.trend === 'up' ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={player.trend === 'up' ? '#16A34A' : '#DC2626'}
                  />
                </View>
              </View>
            </View>
          </Card>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 54, paddingBottom: 12,
    paddingHorizontal: 16, borderBottomWidth: 1, gap: 10,
  },
  backBtn: {},
  title: { fontSize: 20, fontWeight: '800' },
  scroll: { padding: 16 },
  welcomeCard: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, gap: 14, marginBottom: 16,
  },
  welcomeInfo: {},
  welcomeName: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  welcomeSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1 },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 4 },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  actionBtn: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4 },
  actionLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 15, fontWeight: '600' },
  playerMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 3 },
  levelTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  levelTagText: { fontSize: 11, fontWeight: '600' },
  streakText: { fontSize: 12 },
  playerRight: { alignItems: 'flex-end' },
  sayDoValue: { fontSize: 18, fontWeight: '700' },
  trendRow: { marginTop: 2 },
});
