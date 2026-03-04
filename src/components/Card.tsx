import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  borderLeftColor?: string;
}

export function Card({ children, style, borderLeftColor }: CardProps) {
  const { c } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: c.surface, borderColor: c.border },
        borderLeftColor ? { borderLeftWidth: 4, borderLeftColor } : undefined,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
});
