import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { BGFab } from '../components/BGFab';
import { buildingBlocks } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

const trendingTags = ['#MorningRoutine', '#SayDoRatio', '#BalanceChart', '#TrustJourney', '#MagicalMoment'];

export function DiscoverScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Text style={[styles.title, { color: c.textPrimary }]}>Discover</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
          <Ionicons name="search" size={18} color={c.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: c.textPrimary }]}
            placeholder="Search players, hashtags..."
            placeholderTextColor={c.textTertiary}
          />
        </View>

        {/* Trending */}
        <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>Trending</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsRow}>
          {trendingTags.map(tag => (
            <Pressable key={tag} style={[styles.tag, { backgroundColor: c.primary + '15' }]}>
              <Text style={[styles.tagText, { color: c.primary }]}>{tag}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Quick Links */}
        <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>Explore</Text>
        <View style={styles.linkGrid}>
          <Pressable style={[styles.linkCard, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => nav.navigate('VideoLibrary')}>
            <Ionicons name="videocam" size={28} color={c.primary} />
            <Text style={[styles.linkLabel, { color: c.textPrimary }]}>Video Library</Text>
          </Pressable>
          <Pressable style={[styles.linkCard, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => nav.navigate('Events')}>
            <Ionicons name="calendar" size={28} color={c.warmOrange} />
            <Text style={[styles.linkLabel, { color: c.textPrimary }]}>Events</Text>
          </Pressable>
          <Pressable style={[styles.linkCard, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => nav.navigate('Messages')}>
            <Ionicons name="chatbubbles" size={28} color={c.primaryLight} />
            <Text style={[styles.linkLabel, { color: c.textPrimary }]}>Messages</Text>
          </Pressable>
          <Pressable style={[styles.linkCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Ionicons name="people" size={28} color={c.gold} />
            <Text style={[styles.linkLabel, { color: c.textPrimary }]}>Trust Tribe</Text>
          </Pressable>
        </View>

        {/* Building Blocks browse */}
        <Text style={[styles.sectionTitle, { color: c.textPrimary }]}>Building Blocks</Text>
        {buildingBlocks.map(bb => (
          <Card key={bb.id} borderLeftColor={bb.color}>
            <View style={styles.bbRow}>
              <View style={[styles.bbCircle, { backgroundColor: bb.color }]}>
                <Text style={styles.bbLetter}>{bb.letter}</Text>
              </View>
              <View style={styles.bbInfo}>
                <Text style={[styles.bbName, { color: c.textPrimary }]}>{bb.name}</Text>
                <Text style={[styles.bbDimension, { color: c.textTertiary }]}>{bb.dimension}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={c.textTertiary} />
            </View>
          </Card>
        ))}

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
  scroll: { padding: 16 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  tagsRow: { gap: 8, marginBottom: 20 },
  tag: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16 },
  tagText: { fontSize: 13, fontWeight: '600' },
  linkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  linkCard: {
    width: '47%' as any, borderRadius: 14, padding: 20, alignItems: 'center',
    borderWidth: 1, gap: 8,
  },
  linkLabel: { fontSize: 14, fontWeight: '600' },
  bbRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bbCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  bbLetter: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  bbInfo: { flex: 1 },
  bbName: { fontSize: 15, fontWeight: '600' },
  bbDimension: { fontSize: 12, marginTop: 1 },
});
