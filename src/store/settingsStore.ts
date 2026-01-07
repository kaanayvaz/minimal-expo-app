import { create } from 'zustand';
import { UserSettings } from '../types/settings.types';
import { saveSettings, loadSettings } from '../services/storageService';

interface SettingsStore extends UserSettings {
  isLoading: boolean;
  
  // Actions
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  togglePremium: (isPremium: boolean) => Promise<void>;
  setOnboardingCompleted: () => Promise<void>;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  colorScheme: 'blue',
  notificationsEnabled: true,
  morningNotificationTime: '09:00',
  eveningNotificationTime: '20:00',
  weekStartsOn: 1, // Pazartesi
  isPremium: false,
  onboardingCompleted: false,
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...DEFAULT_SETTINGS,
  isLoading: false,

  loadSettings: async () => {
    set({ isLoading: true });
    try {
      const settings = await loadSettings();
      if (settings) {
        set({ ...settings, isLoading: false });
      } else {
        set({ ...DEFAULT_SETTINGS, isLoading: false });
        await saveSettings(DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      set({ isLoading: false });
    }
  },

  updateSettings: async (newSettings) => {
    const currentSettings = get();
    const updatedSettings: UserSettings = {
      theme: currentSettings.theme,
      colorScheme: currentSettings.colorScheme,
      notificationsEnabled: currentSettings.notificationsEnabled,
      morningNotificationTime: currentSettings.morningNotificationTime,
      eveningNotificationTime: currentSettings.eveningNotificationTime,
      weekStartsOn: currentSettings.weekStartsOn,
      isPremium: currentSettings.isPremium,
      premiumExpiryDate: currentSettings.premiumExpiryDate,
      ...newSettings,
    };
    
    set(updatedSettings);
    await saveSettings(updatedSettings);
  },

  togglePremium: async (isPremium) => {
    const settings = get();
    const updatedSettings: UserSettings = {
      ...settings,
      isPremium,
      premiumExpiryDate: isPremium ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : undefined,
    };
    
    set(updatedSettings);
    await saveSettings(updatedSettings);
  },

  setOnboardingCompleted: async () => {
    const settings = get();
    const updatedSettings: UserSettings = {
      ...settings,
      onboardingCompleted: true,
    };
    
    set(updatedSettings);
    await saveSettings(updatedSettings);
  },
}));
