import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabScreenProps } from '../types/navigation.types';
import { styles } from './SettingsScreen.styles';

export default function SettingsScreen({ navigation }: TabScreenProps<'Settings'>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ayarlar</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>⚙️</Text>
          <Text style={styles.placeholderText}>
            Ayarlar ekranı yakında gelecek!
          </Text>
          <Text style={styles.placeholderSubtext}>
            Burada tema, bildirim ve diğer{'\n'}
            ayarları yapılandırabileceksiniz
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
