import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export function SkeletonLoader({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8,
  style 
}: SkeletonLoaderProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function HabitCardSkeleton() {
  return (
    <View style={styles.habitCard}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <SkeletonLoader width={48} height={48} borderRadius={12} />
          <View style={styles.nameSection}>
            <SkeletonLoader width={140} height={16} />
            <View style={{ height: 4 }} />
            <SkeletonLoader width={80} height={12} />
          </View>
        </View>
        <SkeletonLoader width={40} height={40} borderRadius={20} />
      </View>

      {/* Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {Array.from({ length: 14 }).map((_, index) => (
            <SkeletonLoader key={index} width={28} height={28} borderRadius={6} />
          ))}
        </View>
      </View>
    </View>
  );
}

export function StatsCardSkeleton() {
  return (
    <View style={styles.statsCard}>
      <View style={styles.statItem}>
        <SkeletonLoader width={80} height={14} />
        <View style={{ height: 8 }} />
        <SkeletonLoader width={60} height={32} />
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <SkeletonLoader width={80} height={14} />
        <View style={{ height: 8 }} />
        <SkeletonLoader width={60} height={32} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: COLORS.gray200,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameSection: {
    marginLeft: SPACING.md,
  },
  gridContainer: {
    marginTop: SPACING.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
});
