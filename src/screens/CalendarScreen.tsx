import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabScreenProps } from '../types/navigation.types';
import { styles } from './CalendarScreen.styles';

export default function CalendarScreen({ navigation }: TabScreenProps<'Calendar'>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Takvim</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>📅</Text>
          <Text style={styles.placeholderText}>
            Takvim ekranı yakında gelecek!
          </Text>
          <Text style={styles.placeholderSubtext}>
            Burada aylık görünümde{'\n'}
            alışkanlıklarınızı takip edebileceksiniz
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
