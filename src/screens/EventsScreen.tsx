import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { BGFab } from '../components/BGFab';
import { events } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

export function EventsScreen({ navigation }: any) {
  const { c } = useTheme();
  const [tab, setTab] = useState('Upcoming');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </Pressable>
        <Text style={[styles.title, { color: c.textPrimary }]}>Events</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: c.border }]}>
        {['Upcoming', 'Invited', 'Past'].map(t => (
          <Pressable key={t} style={[styles.tab, tab === t && { borderBottomColor: c.primary, borderBottomWidth: 2 }]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, { color: tab === t ? c.primary : c.textTertiary }]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {events.map(event => (
          <Card key={event.id} borderLeftColor={event.bbColor}>
            <Text style={[styles.eventName, { color: c.textPrimary }]}>{event.name}</Text>
            <View style={styles.eventMeta}>
              <Ionicons name="calendar-outline" size={14} color={c.textTertiary} />
              <Text style={[styles.eventDate, { color: c.textSecondary }]}>{event.date}</Text>
            </View>
            <View style={styles.eventMeta}>
              <Ionicons name="people-outline" size={14} color={c.textTertiary} />
              <Text style={[styles.eventDate, { color: c.textSecondary }]}>{event.players} players RSVP'd</Text>
            </View>
            <View style={styles.eventFooter}>
              <View style={[styles.bbTag, { backgroundColor: event.bbColor + '20' }]}>
                <Text style={[styles.bbTagText, { color: event.bbColor }]}>{event.bb}</Text>
              </View>
              <Pressable style={[styles.rsvpBtn, { backgroundColor: c.primary }]}>
                <Text style={styles.rsvpText}>RSVP</Text>
              </Pressable>
            </View>
          </Card>
        ))}

        {tab !== 'Upcoming' && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar" size={48} color={c.textTertiary} />
            <Text style={[styles.emptyText, { color: c.textTertiary }]}>No {tab.toLowerCase()} events</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Create Event FAB */}
      <Pressable style={[styles.createFab, { backgroundColor: c.warmOrange }]}>
        <Ionicons name="add" size={28} color="#FFF" />
      </Pressable>

      <BGFab />
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
  tabs: { flexDirection: 'row', borderBottomWidth: 1, paddingHorizontal: 16 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabText: { fontSize: 14, fontWeight: '600' },
  scroll: { padding: 16 },
  eventName: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  eventMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  eventDate: { fontSize: 13 },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  bbTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  bbTagText: { fontSize: 11, fontWeight: '700' },
  rsvpBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  rsvpText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 15 },
  createFab: {
    position: 'absolute', bottom: 150, right: 20, width: 50, height: 50, borderRadius: 25,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 6,
  },
});
