export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: Date;
  goalType: 'daily' | 'weekly' | 'custom';
  goalValue?: number; // haftada X gün
  customDays?: number[]; // 0-6 (Pazar-Cumartesi)
  notificationTime?: string; // "09:00"
  category?: string; // Premium
}

export interface Completion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  note?: string; // Premium
  photoUri?: string; // Premium
  createdAt: Date;
}

export interface HabitWithCompletions extends Habit {
  completions: Completion[];
  currentStreak: number;
  longestStreak: number;
}
