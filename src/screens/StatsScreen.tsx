import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabScreenProps } from '../types/navigation.types';
import { styles } from './StatsScreen.styles';

export default function StatsScreen({ navigation }: TabScreenProps<'Stats'>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>İstatistikler</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>📊</Text>
          <Text style={styles.placeholderText}>
            İstatistikler ekranı yakında gelecek!
          </Text>
          <Text style={styles.placeholderSubtext}>
            Burada alışkanlıklarınızın detaylı{'\n'}
            analizlerini görebileceksiniz
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
