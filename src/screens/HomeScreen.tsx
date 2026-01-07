import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabScreenProps } from '../types/navigation.types';
import { useHabitStore } from '../store/habitStore';
import AddHabitModal from '../components/habit/AddHabitModal';
import { COLORS } from '../constants/colors';
import { formatDate } from '../utils/dateUtils';
import { calculateStreak } from '../utils/streakCalculator';
import { MOTIVATION_MESSAGES } from '../constants/icons';
import { styles } from './HomeScreen.styles';

export default function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const { habits, completions, isLoading, loadData, toggleCompletion, deleteHabit, addHabit } = useHabitStore();
  const [motivationMessage, setMotivationMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // TÜM HOOKS loading kontrolünden ÖNCE tanımlanmali!
  
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

  // Aylık istatistikler
  const monthlyStats = useMemo(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    const monthlyCompletions = completions.filter(c => {
      const compDate = new Date(c.date);
      return compDate >= firstDayOfMonth && c.completed;
    });
    
    const totalPossible = habits.length * daysInMonth;
    const successRate = totalPossible > 0 ? Math.round((monthlyCompletions.length / totalPossible) * 100) : 0;
    
    // En uzun streak hesapla
    const allStreaks = habits.map(h => {
      const habitComps = completions.filter(c => c.habitId === h.id);
      return calculateStreak(habitComps);
    });
    const longestStreak = Math.max(...allStreaks.map(s => s.current), 0);
    
    return { successRate, longestStreak };
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
    setModalVisible(true);
  };

  const handleCreateHabit = async (name: string, icon: string, color: string) => {
    await addHabit({
      name,
      icon,
      color,
      goalType: 'daily',
    });
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.secondary} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.todayLabel}>BUGÜN</Text>
        <View style={styles.headerRow}>
          <Text style={styles.dateText}>{formatDate(new Date())}</Text>
          <TouchableOpacity onPress={handleAddHabit} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Aylık Başarı Kartı */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Aylık Başarı</Text>
            <Text style={styles.statValue}>{monthlyStats.successRate}%</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Zincir</Text>
            <Text style={styles.statValue}>{monthlyStats.longestStreak} Gün</Text>
          </View>
        </View>

        {/* Alışkanlık Listesi */}
        {habitsWithCompletions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={styles.emptyTitle}>Henüz alışkanlık yok</Text>
            <Text style={styles.emptySubtitle}>
              İlk alışkanlığını eklemek için{'\n'}yukarıdaki + butonuna bas
            </Text>
          </View>
        ) : (
          habitsWithCompletions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.habitCard}
              onLongPress={() => handleLongPress(item.id, item.name)}
              activeOpacity={0.7}
            >
              <View style={styles.habitHeader}>
                <View style={styles.habitLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <Text style={styles.habitIcon}>{item.icon}</Text>
                  </View>
                  <View style={styles.habitInfo}>
                    <Text style={styles.habitName}>{item.name}</Text>
                    <Text style={styles.habitGoal}>Her gün</Text>
                  </View>
                </View>
                <View style={styles.habitRight}>
                  <Text style={[styles.habitStreak, { color: item.color }]}>
                    {item.currentStreak}
                  </Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleLongPress(item.id, item.name)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.deleteButtonIcon}>×</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Haftalık Grid */}
              <View style={styles.weekGridContainer}>
                <View style={styles.weekGrid}>
                  {Array.from({ length: 14 }).map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (13 - index));
                    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    const isCompleted = item.completions.some(c => c.date === dateStr && c.completed);
                    const isToday = index === 13;
                    
                    return (
                      <View key={index} style={styles.gridItemWrapper}>
                        <TouchableOpacity
                          style={[
                            styles.gridSquare,
                            isCompleted ? { backgroundColor: item.color } : styles.gridSquareEmpty,
                            isToday && styles.gridSquareToday,
                          ]}
                          onPress={() => {
                            // Gelecekte: Geçmiş günleri düzenleme özelliği
                            if (isToday) {
                              handleToggleCompletion(item.id);
                            }
                          }}
                        />
                        {isToday && <Text style={styles.todayIndicator}>Bugün</Text>}
                      </View>
                    );
                  })}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      
      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleCreateHabit}
      />
    </SafeAreaView>
  );
}
