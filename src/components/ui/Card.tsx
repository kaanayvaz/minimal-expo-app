import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING, BORDER_RADIUS, ELEVATION } from '../../constants/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: keyof typeof ELEVATION;
}

export default function Card({ children, style, elevation = 'small' }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          elevation: ELEVATION[elevation],
          shadowOpacity: ELEVATION[elevation] / 10,
          shadowRadius: ELEVATION[elevation] * 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
