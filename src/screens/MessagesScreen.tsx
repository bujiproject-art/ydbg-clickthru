import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Avatar } from '../components/Avatar';
import { BGFab } from '../components/BGFab';
import { messages } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

export function MessagesScreen({ navigation }: any) {
  const { c } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </Pressable>
        <Text style={[styles.title, { color: c.textPrimary }]}>Messages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {messages.map(msg => (
          <Pressable key={msg.id} style={[styles.msgRow, { borderBottomColor: c.border }]}>
            <Avatar
              initials={msg.isGroup ? 'TT' : msg.name.split(' ').map(w => w[0]).join('')}
              size={44}
              color={msg.isGroup ? '#2D6A4F' : undefined}
            />
            <View style={styles.msgInfo}>
              <View style={styles.msgTopRow}>
                <Text style={[styles.msgName, { color: c.textPrimary }]}>
                  {msg.name}
                  {msg.isGroup && <Text style={{ color: c.textTertiary, fontSize: 12 }}> (group)</Text>}
                </Text>
                <Text style={[styles.msgTime, { color: c.textTertiary }]}>{msg.time}</Text>
              </View>
              <Text style={[styles.msgPreview, { color: c.textSecondary }]} numberOfLines={1}>{msg.preview}</Text>
            </View>
            {msg.unread > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: c.primary }]}>
                <Text style={styles.unreadText}>{msg.unread}</Text>
              </View>
            )}
          </Pressable>
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
    flexDirection: 'row', alignItems: 'center', paddingTop: 54, paddingBottom: 12,
    paddingHorizontal: 16, borderBottomWidth: 1, gap: 10,
  },
  backBtn: {},
  title: { fontSize: 20, fontWeight: '800' },
  scroll: { padding: 0 },
  msgRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, gap: 12,
  },
  msgInfo: { flex: 1 },
  msgTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  msgName: { fontSize: 15, fontWeight: '600' },
  msgTime: { fontSize: 12 },
  msgPreview: { fontSize: 14, marginTop: 3 },
  unreadBadge: {
    width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center',
  },
  unreadText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
