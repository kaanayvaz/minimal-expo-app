import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, Completion } from '../types/habit.types';
import { UserSettings } from '../types/settings.types';

const KEYS = {
  HABITS: '@habits',
  COMPLETIONS: '@completions',
  SETTINGS: '@settings',
};

// Habits
export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(KEYS.HABITS, jsonValue);
  } catch (error) {
    console.error('Error saving habits:', error);
    throw error;
  }
};

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.HABITS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

// Completions
export const saveCompletions = async (completions: Completion[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(completions);
    await AsyncStorage.setItem(KEYS.COMPLETIONS, jsonValue);
  } catch (error) {
    console.error('Error saving completions:', error);
    throw error;
  }
};

export const loadCompletions = async (): Promise<Completion[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.COMPLETIONS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading completions:', error);
    return [];
  }
};

// Settings
export const saveSettings = async (settings: UserSettings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(KEYS.SETTINGS, jsonValue);
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

export const loadSettings = async (): Promise<UserSettings | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.SETTINGS);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([KEYS.HABITS, KEYS.COMPLETIONS, KEYS.SETTINGS]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
