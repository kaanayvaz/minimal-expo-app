import { Completion } from '../types/habit.types';
import { getDateString, parseDateString } from './dateUtils';

export const calculateStreak = (completions: Completion[]): { current: number; longest: number } => {
  if (completions.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Tamamlanan günleri tarihe göre sırala (yeniden eskiye)
  const completedDates = completions
    .filter((c) => c.completed)
    .map((c) => c.date)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (completedDates.length === 0) {
    return { current: 0, longest: 0 };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = getDateString(new Date());
  const yesterday = getDateString(new Date(Date.now() - 86400000));

  // Mevcut streak hesaplama
  if (completedDates[0] === today || completedDates[0] === yesterday) {
    currentStreak = 1;
    let expectedDate = new Date(completedDates[0]);

    for (let i = 1; i < completedDates.length; i++) {
      expectedDate = new Date(expectedDate.getTime() - 86400000);
      const expectedDateStr = getDateString(expectedDate);

      if (completedDates[i] === expectedDateStr) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // En uzun streak hesaplama
  tempStreak = 1;
  longestStreak = 1;

  for (let i = 1; i < completedDates.length; i++) {
    const currentDate = parseDateString(completedDates[i]);
    const prevDate = parseDateString(completedDates[i - 1]);
    const dayDiff = Math.round((prevDate.getTime() - currentDate.getTime()) / 86400000);

    if (dayDiff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  return { current: currentStreak, longest: longestStreak };
};

export const getWeeklyCompletion = (completions: Completion[]): { completed: number; total: number } => {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1); // Pazartesi
  weekStart.setHours(0, 0, 0, 0);

  const completedThisWeek = completions.filter((c) => {
    const completionDate = parseDateString(c.date);
    return c.completed && completionDate >= weekStart;
  });

  return {
    completed: completedThisWeek.length,
    total: 7,
  };
};
