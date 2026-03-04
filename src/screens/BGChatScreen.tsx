import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { bgConversation } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

export function BGChatScreen({ navigation }: any) {
  const { c } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: c.primary }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>
        <View style={styles.headerInfo}>
          <View style={styles.bgAvatar}>
            <Text style={styles.bgAvatarText}>BG</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Agent BG</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messagesWrap} showsVerticalScrollIndicator={false}>
        {bgConversation.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              msg.role === 'bg' ? styles.bgBubble : styles.playerBubble,
              {
                backgroundColor: msg.role === 'bg' ? c.surface : c.primary,
                borderColor: msg.role === 'bg' ? c.border : 'transparent',
              },
            ]}
          >
            {msg.role === 'bg' && (
              <View style={styles.bubbleAvatar}>
                <Text style={styles.bubbleAvatarText}>BG</Text>
              </View>
            )}
            <Text
              style={[
                styles.bubbleText,
                { color: msg.role === 'bg' ? c.textPrimary : '#FFF' },
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
          {['Log a habit', 'Check my score', 'What should I do today?'].map(action => (
            <Pressable key={action} style={[styles.pill, { borderColor: c.primary }]}>
              <Text style={[styles.pillText, { color: c.primary }]}>{action}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Input Bar */}
      <View style={[styles.inputBar, { backgroundColor: c.surface, borderTopColor: c.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: c.surfaceAlt, color: c.textPrimary }]}
          placeholder="Ask BG anything..."
          placeholderTextColor={c.textTertiary}
        />
        <Pressable style={styles.micBtn}>
          <Ionicons name="mic-outline" size={22} color={c.primary} />
        </Pressable>
        <Pressable style={[styles.sendBtn, { backgroundColor: c.primary }]}>
          <Ionicons name="send" size={18} color="#FFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 54, paddingBottom: 14, paddingHorizontal: 16,
  },
  backBtn: { marginRight: 12 },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bgAvatar: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  bgAvatarText: { color: '#FFF', fontWeight: '800', fontSize: 13 },
  headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#4ADE80' },
  statusText: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  messagesWrap: { padding: 16, paddingBottom: 8 },
  bubble: {
    maxWidth: '82%', padding: 14, borderRadius: 18, marginBottom: 12, borderWidth: 1,
  },
  bgBubble: {
    alignSelf: 'flex-start', borderBottomLeftRadius: 4,
  },
  playerBubble: {
    alignSelf: 'flex-end', borderBottomRightRadius: 4,
  },
  bubbleAvatar: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#2D6A4F',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  bubbleAvatarText: { color: '#FFF', fontSize: 9, fontWeight: '800' },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  quickActions: { paddingHorizontal: 12, paddingVertical: 6 },
  pillsRow: { gap: 8 },
  pill: { borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  pillText: { fontSize: 13, fontWeight: '600' },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8,
    borderTopWidth: 1, paddingBottom: 30,
  },
  input: {
    flex: 1, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15,
  },
  micBtn: { padding: 8 },
  sendBtn: {
    width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
  },
});
