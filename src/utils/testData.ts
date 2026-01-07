import { Habit, Completion } from '../types/habit.types';
import { getTodayString } from './dateUtils';

// Test için örnek alışkanlıklar
export const generateTestHabits = (): Habit[] => {
  const now = new Date();
  
  return [
    {
      id: '1',
      name: 'Günde 2L Su İç',
      icon: '💧',
      color: '#3B82F6',
      createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 gün önce
      goalType: 'daily',
    },
    {
      id: '2',
      name: 'Sabah Koşusu',
      icon: '🏃',
      color: '#22C55E',
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 gün önce
      goalType: 'daily',
    },
    {
      id: '3',
      name: 'Günde 30 Sayfa Kitap Oku',
      icon: '📖',
      color: '#F59E0B',
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 gün önce
      goalType: 'daily',
    },
  ];
};

// Test için örnek tamamlamalar
export const generateTestCompletions = (): Completion[] => {
  const completions: Completion[] = [];
  const now = new Date();
  
  // Son 14 gün için rastgele completions oluştur
  for (let i = 0; i < 14; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    // Habit 1 (Su içme) - %80 tamamlama oranı
    if (Math.random() > 0.2 || i === 0) {
      completions.push({
        id: `comp-1-${dateStr}`,
        habitId: '1',
        date: dateStr,
        completed: true,
        createdAt: date,
      });
    }
    
    // Habit 2 (Koşu) - %60 tamamlama oranı (son 7 gün)
    if (i < 7 && Math.random() > 0.4) {
      completions.push({
        id: `comp-2-${dateStr}`,
        habitId: '2',
        date: dateStr,
        completed: true,
        createdAt: date,
      });
    }
    
    // Habit 3 (Kitap) - %50 tamamlama oranı (son 3 gün)
    if (i < 3 && Math.random() > 0.5) {
      completions.push({
        id: `comp-3-${dateStr}`,
        habitId: '3',
        date: dateStr,
        completed: true,
        createdAt: date,
      });
    }
  }
  
  return completions;
};
