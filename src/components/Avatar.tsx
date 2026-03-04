import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = ['#2D6A4F', '#E63946', '#4EA8DE', '#8B5CF6', '#F59E0B', '#10B981', '#C9A84C'];

function hashColor(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}

interface AvatarProps { initials: string; size?: number; color?: string }

export function Avatar({ initials, size = 40, color }: AvatarProps) {
  const bg = color || hashColor(initials);
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
  text: { color: '#FFF', fontWeight: '700' },
});
