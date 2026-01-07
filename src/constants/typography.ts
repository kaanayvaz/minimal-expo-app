import { Platform } from 'react-native';

export const FONT_FAMILY = {
  regular: Platform.select({
    ios: 'Inter-Regular',
    android: 'Inter_400Regular',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'Inter-SemiBold',
    android: 'Inter_600SemiBold',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter_700Bold',
    default: 'System',
  }),
};

export const FONT_SIZE = {
  caption: 12,
  body: 14,
  bodyLarge: 16,
  h3: 20,
  h2: 24,
  h1: 32,
};

export const TYPOGRAPHY = {
  h1: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.h1,
    lineHeight: 40,
  },
  h2: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.h2,
    lineHeight: 32,
  },
  h3: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.h3,
    lineHeight: 28,
  },
  bodyLarge: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.bodyLarge,
    lineHeight: 24,
  },
  body: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.body,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.caption,
    lineHeight: 16,
  },
  button: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.bodyLarge,
    lineHeight: 24,
  },
};
