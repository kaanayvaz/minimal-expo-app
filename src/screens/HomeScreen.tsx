import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { TabScreenProps } from '../types/navigation.types';
import { useHabitStore } from '../store/habitStore';
import HabitCard from '../components/habit/HabitCard';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { formatDate } from '../utils/dateUtils';
import { calculateStreak } from '../utils/streakCalculator';
import { MOTIVATION_MESSAGES } from '../constants/icons';

export default function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const { habits, completions, isLoading, loadData, toggleCompletion, deleteHabit } = useHabitStore();
  const [motivationMessage, setMotivationMessage] = useState('');

  // useMemo ile sonsuz döngüyü engelleyelim
  const habitsWithCompletions = useMemo(() => {
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
  }, [habits, completions]);

  useEffect(() => {
    loadData();
    // Random motivasyon mesajı seç
    const randomMessage = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
    setMotivationMessage(randomMessage);
  }, []);

  const handleToggleCompletion = (habitId: string) => {
    toggleCompletion(habitId);
  };

  const handleLongPress = (habitId: string, habitName: string) => {
    Alert.alert(
      'Alışkanlık İşlemleri',
      habitName,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Emin misiniz?',
              'Bu alışkanlığı ve tüm geçmişini silmek istediğinizden emin misiniz?',
              [
                { text: 'Hayır', style: 'cancel' },
                {
                  text: 'Evet, Sil',
                  style: 'destructive',
                  onPress: () => deleteHabit(habitId),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleAddHabit = () => {
    // TODO: Navigate to Add Habit screen
    Alert.alert('Yakında', 'Alışkanlık ekleme ekranı çok yakında!');
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.header}>
        <Text style={styles.dateText}>{formatDate(new Date())}</Text>
        <Text style={styles.motivationText}>{motivationMessage}</Text>
      </View>

      {habitsWithCompletions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyTitle}>Henüz alışkanlık yok</Text>
          <Text style={styles.emptySubtitle}>
            İlk alışkanlığını eklemek için{'\n'}aşağıdaki + butonuna bas
          </Text>
        </View>
      ) : (
        <FlatList
          data={habitsWithCompletions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HabitCard
              habit={item}
              onToggle={handleToggleCompletion}
              onLongPress={() => handleLongPress(item.id, item.name)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FloatingActionButton onPress={handleAddHabit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  dateText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  motivationText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
  },
  listContent: {
    padding: SPACING.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
