import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import Onboarding from './src/components/ui/Onboarding';
import { useHabitStore } from './src/store/habitStore';
import { useSettingsStore } from './src/store/settingsStore';
import { COLORS } from './src/constants/colors';

// Splash screen'i başlangıçta göster
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const loadHabits = useHabitStore((state) => state.loadData);
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const onboardingCompleted = useSettingsStore((state) => state.onboardingCompleted);
  const setOnboardingCompleted = useSettingsStore((state) => state.setOnboardingCompleted);

  // Font yükleme
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Verileri yükle
        await Promise.all([loadHabits(), loadSettings()]);
      } catch (e) {
        console.warn('Error loading data:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Onboarding tamamlanmamışsa göster
  if (!onboardingCompleted) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Onboarding onComplete={setOnboardingCompleted} />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
