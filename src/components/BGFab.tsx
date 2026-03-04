import React, { useEffect, useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

export function BGFab() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ]),
    ).start();
  }, [pulse]);

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale: pulse }] }]}>
      <Pressable
        style={[styles.fab, { backgroundColor: c.primary }]}
        onPress={() => nav.navigate('BGChat')}
      >
        <Text style={styles.label}>BG</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', bottom: 90, right: 20, zIndex: 100 },
  fab: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 8,
  },
  label: { color: '#FFF', fontWeight: '800', fontSize: 16 },
});
