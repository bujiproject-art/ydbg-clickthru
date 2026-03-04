import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export function HabitDetailScreen({ route, navigation }: any) {
  const { c } = useTheme();
  const { habit, bb, color } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const doLog = () => {
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const dots = Array.from({ length: habit.freq }, (_, i) => i < habit.done);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Color header bar */}
      <View style={[styles.colorBar, { backgroundColor: color }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.bbName}>{bb}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.habitName, { color: c.textPrimary }]}>{habit.name}</Text>
        <View style={[styles.levelBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.levelText, { color }]}>{habit.level}</Text>
        </View>

        {/* Progress dots */}
        <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>This Week's Progress</Text>
        <View style={styles.dotsRow}>
          {dots.map((filled, i) => (
            <View
              key={i}
              style={[styles.dot, { backgroundColor: filled ? color : c.border }]}
            />
          ))}
        </View>
        <Text style={[styles.dotLabel, { color: c.textTertiary }]}>
          {habit.done} of {habit.freq} completed
        </Text>

        {/* Video button */}
        <Pressable style={[styles.videoBtn, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
          <Ionicons name="play-circle-outline" size={22} color={color} />
          <Text style={[styles.videoBtnText, { color: c.textPrimary }]}>Watch Tutorial</Text>
        </Pressable>

        {/* Log Deposit button */}
        <Pressable style={[styles.logBtn, { backgroundColor: c.primary }]} onPress={() => setShowModal(true)}>
          <Ionicons name="add-circle-outline" size={22} color="#FFF" />
          <Text style={styles.logBtnText}>Log Deposit</Text>
        </Pressable>
      </View>

      {/* Log Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.modal, { backgroundColor: c.surface }]}>
            <Text style={[styles.modalTitle, { color: c.textPrimary }]}>Log Deposit</Text>
            <Text style={[styles.modalHabit, { color }]}>{habit.name}</Text>

            {/* Period Toggle */}
            <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>Period</Text>
            <View style={styles.toggleRow}>
              {(['AM', 'PM'] as const).map(p => (
                <Pressable
                  key={p}
                  style={[styles.toggleBtn, period === p && { backgroundColor: c.primary }]}
                  onPress={() => setPeriod(p)}
                >
                  <Text style={[styles.toggleText, period === p && { color: '#FFF' }]}>{p}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>How did it go? (optional)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: c.surfaceAlt, color: c.textPrimary, borderColor: c.border }]}
              placeholder="Felt great today..."
              placeholderTextColor={c.textTertiary}
              multiline
            />

            <Pressable style={[styles.depositBtn, { backgroundColor: c.primary }]} onPress={doLog}>
              <Text style={styles.depositBtnText}>Make Deposit</Text>
            </Pressable>

            <Pressable onPress={() => setShowModal(false)}>
              <Text style={[styles.cancelText, { color: c.textTertiary }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Success overlay */}
      {showSuccess && (
        <View style={styles.successOverlay}>
          <View style={[styles.successCircle, { borderColor: color }]}>
            <Ionicons name="checkmark" size={60} color={color} />
          </View>
          <Text style={styles.successText}>Deposit Made!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  colorBar: { paddingTop: 54, paddingBottom: 16, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 12 },
  bbName: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  content: { padding: 20 },
  habitName: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  levelBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 24 },
  levelText: { fontSize: 13, fontWeight: '600' },
  sectionLabel: { fontSize: 13, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  dotsRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  dot: { width: 28, height: 28, borderRadius: 14 },
  dotLabel: { fontSize: 13, marginBottom: 24 },
  videoBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderRadius: 12,
    borderWidth: 1, marginBottom: 12,
  },
  videoBtnText: { fontSize: 15, fontWeight: '600' },
  logBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: 16, borderRadius: 14,
  },
  logBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  modalHabit: { fontSize: 15, fontWeight: '600', marginBottom: 20 },
  fieldLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  toggleRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  toggleBtn: {
    paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10,
    backgroundColor: '#E8E2DA',
  },
  toggleText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  input: { borderRadius: 12, padding: 14, fontSize: 15, minHeight: 60, borderWidth: 1, marginBottom: 20, textAlignVertical: 'top' },
  depositBtn: { padding: 16, borderRadius: 14, alignItems: 'center', marginBottom: 12 },
  depositBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  cancelText: { textAlign: 'center', fontSize: 15, paddingVertical: 8 },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', zIndex: 999,
  },
  successCircle: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 4,
    backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  successText: { color: '#FFF', fontSize: 24, fontWeight: '800' },
});
