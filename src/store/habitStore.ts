import { create } from 'zustand';
import { Habit, Completion, HabitWithCompletions } from '../types/habit.types';
import { saveHabits, loadHabits, saveCompletions, loadCompletions } from '../services/storageService';
import { calculateStreak } from '../utils/streakCalculator';
import { getTodayString } from '../utils/dateUtils';

interface HabitStore {
  habits: Habit[];
  completions: Completion[];
  isLoading: boolean;
  
  // Actions
  loadData: () => Promise<void>;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  updateHabit: (id: string, habit: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleCompletion: (habitId: string, date?: string) => Promise<void>;
  getHabitWithCompletions: (habitId: string) => HabitWithCompletions | null;
  getAllHabitsWithCompletions: () => HabitWithCompletions[];
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  completions: [],
  isLoading: false,

  loadData: async () => {
    set({ isLoading: true });
    try {
      const [habits, completions] = await Promise.all([loadHabits(), loadCompletions()]);
      set({ habits, completions, isLoading: false });
    } catch (error) {
      console.error('Error loading data:', error);
      set({ isLoading: false });
    }
  },

  addHabit: async (habitData) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    const updatedHabits = [...get().habits, newHabit];
    set({ habits: updatedHabits });
    await saveHabits(updatedHabits);
  },

  updateHabit: async (id, habitData) => {
    const updatedHabits = get().habits.map((habit) =>
      habit.id === id ? { ...habit, ...habitData } : habit
    );
    set({ habits: updatedHabits });
    await saveHabits(updatedHabits);
  },

  deleteHabit: async (id) => {
    const updatedHabits = get().habits.filter((habit) => habit.id !== id);
    const updatedCompletions = get().completions.filter((c) => c.habitId !== id);
    
    set({ habits: updatedHabits, completions: updatedCompletions });
    await Promise.all([saveHabits(updatedHabits), saveCompletions(updatedCompletions)]);
  },

  toggleCompletion: async (habitId, date = getTodayString()) => {
    const completions = get().completions;
    const existingCompletion = completions.find(
      (c) => c.habitId === habitId && c.date === date
    );

    let updatedCompletions: Completion[];

    if (existingCompletion) {
      // Toggle existing completion
      updatedCompletions = completions.map((c) =>
        c.id === existingCompletion.id
          ? { ...c, completed: !c.completed }
          : c
      );
    } else {
      // Create new completion
      const newCompletion: Completion = {
        id: `${habitId}-${date}-${Date.now()}`,
        habitId,
        date,
        completed: true,
        createdAt: new Date(),
      };
      updatedCompletions = [...completions, newCompletion];
    }

    set({ completions: updatedCompletions });
    await saveCompletions(updatedCompletions);
  },

  getHabitWithCompletions: (habitId) => {
    const habit = get().habits.find((h) => h.id === habitId);
    if (!habit) return null;

    const habitCompletions = get().completions.filter((c) => c.habitId === habitId);
    const streaks = calculateStreak(habitCompletions);

    return {
      ...habit,
      completions: habitCompletions,
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
    };
  },

  getAllHabitsWithCompletions: () => {
    const { habits, completions } = get();
    
    return habits.map((habit) => {
      const habitCompletions = completions.filter((c) => c.habitId === habit.id);
      const streaks = calculateStreak(habitCompletions);

      return {
        ...habit,
        completions: habitCompletions,
        currentStreak: streaks.current,
        longestStreak: streaks.longest,
      };
    });
  },
}));
