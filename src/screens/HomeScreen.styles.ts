import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';

export const styles = StyleSheet.create({
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background.secondary,
  },
  todayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  habitCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  habitIcon: {
    fontSize: 24,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  habitGoal: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  habitRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  habitStreak: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  deleteButtonIcon: {
    fontSize: 32,
    color: COLORS.text.secondary,
    fontWeight: '300',
    lineHeight: 32,
  },
  weekGridContainer: {
    marginTop: SPACING.xs,
  },
  weekGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItemWrapper: {
    alignItems: 'center',
  },
  gridSquare: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  gridSquareEmpty: {
    backgroundColor: COLORS.gray200,
  },
  gridSquareToday: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  todayIndicator: {
    fontSize: 9,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    paddingVertical: SPACING.xl * 2,
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
