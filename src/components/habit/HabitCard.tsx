import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { HabitWithCompletions } from '../../types/habit.types';
import Card from '../ui/Card';
import HabitGrid from './HabitGrid';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { getWeeklyCompletion } from '../../utils/streakCalculator';

interface HabitCardProps {
  habit: HabitWithCompletions;
  onToggle: (habitId: string) => void;
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function HabitCard({
  habit,
  onToggle,
  onPress,
  onLongPress,
}: HabitCardProps) {
  const weeklyCompletion = getWeeklyCompletion(habit.completions);

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggle(habit.id);
  };

  const handleLongPress = () => {
    if (onLongPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onLongPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={handleLongPress}
      activeOpacity={0.9}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>{habit.icon}</Text>
            <Text style={styles.habitName}>{habit.name}</Text>
          </View>
          
          <View style={styles.rightSection}>
            {habit.currentStreak > 0 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>
                  {habit.currentStreak} 🔥
                </Text>
              </View>
            )}
          </View>
        </View>

        <HabitGrid habit={habit} onDayPress={handleToggle} />

        <View style={styles.footer}>
          <Text style={styles.weeklyText}>
            Bu hafta: {weeklyCompletion.completed}/{weeklyCompletion.total} gün{' '}
            {weeklyCompletion.completed >= 5 && '✅'}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  habitName: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.text.primary,
    flex: 1,
  },
  streakBadge: {
    backgroundColor: COLORS.gray50,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  streakText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  footer: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  weeklyText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
  },
});
