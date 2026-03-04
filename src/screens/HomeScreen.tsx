import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { BGFab } from '../components/BGFab';
import { currentPlayer, feedPosts } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

export function HomeScreen() {
  const { c } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Text style={[styles.logo, { color: c.primary }]}>YDBG</Text>
        <View style={styles.bellWrap}>
          <Ionicons name="notifications-outline" size={24} color={c.textPrimary} />
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={[styles.greetingCard, { backgroundColor: c.primary }]}>
          <Text style={styles.greetingText}>Good morning, {currentPlayer.name.split(' ')[0]}!</Text>
          <View style={styles.greetingStats}>
            <Text style={styles.greetingStat}>Say/Do: {currentPlayer.sayDoRatio}%</Text>
            <Text style={styles.greetingStat}>  |  </Text>
            <Text style={styles.greetingStat}>12-day streak</Text>
          </View>
        </View>

        {/* Feed */}
        {feedPosts.map(post => (
          <Card
            key={post.id}
            borderLeftColor={post.bbColor || undefined}
            style={post.type === 'magical_moment' ? { borderColor: '#C9A84C', borderWidth: 1.5 } : undefined}
          >
            <View style={styles.postHeader}>
              <Avatar initials={post.initials} size={36} />
              <View style={styles.postMeta}>
                <Text style={[styles.postName, { color: c.textPrimary }]}>{post.player}</Text>
                <Text style={[styles.postTime, { color: c.textTertiary }]}>{post.time}</Text>
              </View>
              {post.bb ? (
                <View style={[styles.bbTag, { backgroundColor: post.bbColor + '20' }]}>
                  <Text style={[styles.bbTagText, { color: post.bbColor }]}>{post.bb}</Text>
                </View>
              ) : null}
            </View>

            <Text style={[styles.postText, { color: c.textPrimary }]}>
              {post.type === 'magical_moment' ? '\u2728 ' : ''}
              {post.type === 'streak' ? '\uD83D\uDD25 ' : ''}
              {post.text}
            </Text>

            <View style={styles.postActions}>
              <Pressable style={styles.actionBtn}>
                <Ionicons name="heart-outline" size={18} color={c.textSecondary} />
                <Text style={[styles.actionText, { color: c.textSecondary }]}>{post.likes}</Text>
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={16} color={c.textSecondary} />
                <Text style={[styles.actionText, { color: c.textSecondary }]}>{post.comments}</Text>
              </Pressable>
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
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 54, paddingBottom: 12, borderBottomWidth: 1,
  },
  logo: { fontSize: 24, fontWeight: '900', letterSpacing: 2 },
  bellWrap: { position: 'relative' },
  badge: {
    position: 'absolute', top: -4, right: -6, backgroundColor: '#E63946',
    width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  scroll: { padding: 16 },
  greetingCard: {
    borderRadius: 16, padding: 20, marginBottom: 20,
  },
  greetingText: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  greetingStats: { flexDirection: 'row', marginTop: 6 },
  greetingStat: { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '500' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  postMeta: { marginLeft: 10, flex: 1 },
  postName: { fontWeight: '600', fontSize: 15 },
  postTime: { fontSize: 12, marginTop: 1 },
  bbTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  bbTagText: { fontSize: 10, fontWeight: '700' },
  postText: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
  postActions: { flexDirection: 'row', gap: 20 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 13 },
});
