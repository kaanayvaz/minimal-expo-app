import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING, BORDER_RADIUS } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.small,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size
    if (size === 'small') {
      baseStyle.paddingVertical = SPACING.xs;
      baseStyle.paddingHorizontal = SPACING.md;
    } else if (size === 'large') {
      baseStyle.paddingVertical = SPACING.md;
      baseStyle.paddingHorizontal = SPACING.xl;
    } else {
      baseStyle.paddingVertical = SPACING.sm;
      baseStyle.paddingHorizontal = SPACING.lg;
    }

    // Variant
    if (variant === 'primary') {
      baseStyle.backgroundColor = disabled ? COLORS.gray200 : COLORS.primary;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = disabled ? COLORS.gray100 : COLORS.gray200;
    } else if (variant === 'outline') {
      baseStyle.backgroundColor = 'transparent';
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = disabled ? COLORS.gray200 : COLORS.primary;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...TYPOGRAPHY.button,
      fontSize: size === 'small' ? 14 : 16,
    };

    if (variant === 'primary') {
      baseStyle.color = disabled ? COLORS.gray400 : COLORS.white;
    } else if (variant === 'secondary') {
      baseStyle.color = disabled ? COLORS.gray400 : COLORS.gray900;
    } else if (variant === 'outline') {
      baseStyle.color = disabled ? COLORS.gray400 : COLORS.primary;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
