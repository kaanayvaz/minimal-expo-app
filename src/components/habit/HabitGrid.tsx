import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HabitWithCompletions } from '../../types/habit.types';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { getWeekDays, getDateString, getDayName, isTodayDate } from '../../utils/dateUtils';

interface HabitGridProps {
  habit: HabitWithCompletions;
  onDayPress?: (date: string) => void;
}

export default function HabitGrid({ habit, onDayPress }: HabitGridProps) {
  const weekDays = getWeekDays();

  const isDateCompleted = (date: Date): boolean => {
    const dateStr = getDateString(date);
    const completion = habit.completions.find((c) => c.date === dateStr);
    return completion?.completed || false;
  };

  const handleDayPress = (date: Date) => {
    if (onDayPress) {
      onDayPress(getDateString(date));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {weekDays.map((day, index) => {
          const isCompleted = isDateCompleted(day);
          const isToday = isTodayDate(getDateString(day));
          const dayName = getDayName(day, true);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.daySquare,
                isCompleted && styles.daySquareCompleted,
                isToday && styles.daySquareToday,
              ]}
              onPress={() => handleDayPress(day)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayText,
                  isCompleted && styles.dayTextCompleted,
                  isToday && !isCompleted && styles.dayTextToday,
                ]}
              >
                {dayName.charAt(0)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daySquare: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  daySquareCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  daySquareToday: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  dayText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  dayTextCompleted: {
    color: COLORS.white,
  },
  dayTextToday: {
    color: COLORS.primary,
  },
});
