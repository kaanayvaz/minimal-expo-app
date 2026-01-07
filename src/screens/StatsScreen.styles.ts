import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
  },
  content: {
    flexGrow: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  placeholderText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  placeholderSubtext: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
