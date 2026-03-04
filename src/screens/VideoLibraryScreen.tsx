import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { BGFab } from '../components/BGFab';
import { habitVideos, buildingBlocks } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

export function VideoLibraryScreen({ navigation }: any) {
  const { c } = useTheme();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? habitVideos
    : habitVideos.filter(v => v.bb === filter);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </Pressable>
        <Text style={[styles.title, { color: c.textPrimary }]}>Habit Video Library</Text>
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <Pressable
          style={[styles.filterTab, filter === 'All' && { backgroundColor: c.primary }]}
          onPress={() => setFilter('All')}
        >
          <Text style={[styles.filterText, filter === 'All' && { color: '#FFF' }]}>All</Text>
        </Pressable>
        {buildingBlocks.map(bb => (
          <Pressable
            key={bb.id}
            style={[
              styles.filterTab,
              { borderColor: bb.color },
              filter === bb.name && { backgroundColor: bb.color },
            ]}
            onPress={() => setFilter(bb.name)}
          >
            <Text style={[styles.filterText, filter === bb.name && { color: '#FFF' }, filter !== bb.name && { color: bb.color }]}>
              {bb.letter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {/* Scholar progress */}
        <View style={[styles.progressBar, { backgroundColor: c.surfaceAlt }]}>
          <Text style={[styles.progressText, { color: c.textSecondary }]}>Scholar Progress: 8/100 videos watched</Text>
          <View style={[styles.progressTrack, { backgroundColor: c.border }]}>
            <View style={[styles.progressFill, { backgroundColor: c.primary, width: '8%' as any }]} />
          </View>
        </View>

        <View style={styles.videoGrid}>
          {filtered.map((video, i) => (
            <View key={i} style={[styles.videoCard, { backgroundColor: c.surface, borderColor: c.border }]}>
              {/* Thumbnail */}
              <View style={[styles.thumbnail, { backgroundColor: video.bbColor + '30' }]}>
                <Ionicons name="play-circle" size={40} color={video.bbColor} />
              </View>
              {/* Info */}
              <View style={styles.videoInfo}>
                <Text style={[styles.videoName, { color: c.textPrimary }]} numberOfLines={2}>{video.name}</Text>
                <View style={styles.videoMeta}>
                  <View style={[styles.bbMini, { backgroundColor: video.bbColor + '20' }]}>
                    <Text style={[styles.bbMiniText, { color: video.bbColor }]}>{video.bb}</Text>
                  </View>
                  <Text style={[styles.duration, { color: c.textTertiary }]}>{video.duration}</Text>
                </View>
              </View>
            </View>
          ))}
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
    flexDirection: 'row', alignItems: 'center', paddingTop: 54, paddingBottom: 12,
    paddingHorizontal: 16, borderBottomWidth: 1, gap: 10,
  },
  backBtn: {},
  title: { fontSize: 20, fontWeight: '800' },
  filterRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterTab: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, borderWidth: 1.5,
    borderColor: '#CCC',
  },
  filterText: { fontSize: 13, fontWeight: '700', color: '#6B7280' },
  grid: { padding: 16 },
  progressBar: { borderRadius: 12, padding: 12, marginBottom: 16 },
  progressText: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  videoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  videoCard: { width: '47%' as any, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  thumbnail: { height: 100, alignItems: 'center', justifyContent: 'center' },
  videoInfo: { padding: 10 },
  videoName: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  videoMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bbMini: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  bbMiniText: { fontSize: 9, fontWeight: '700' },
  duration: { fontSize: 11 },
});
