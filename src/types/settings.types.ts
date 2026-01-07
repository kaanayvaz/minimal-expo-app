export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  colorScheme: string;
  notificationsEnabled: boolean;
  morningNotificationTime: string;
  eveningNotificationTime: string;
  weekStartsOn: 0 | 1; // 0 = Pazar, 1 = Pazartesi
  isPremium: boolean;
  premiumExpiryDate?: Date;
}
