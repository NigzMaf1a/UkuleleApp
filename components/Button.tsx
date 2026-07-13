import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { buttonStyles } from '../styles/buttonStyles';
import { colors } from '../styles/colors';

interface ButtonProps {
  label: string;
  fun: () => Promise<void> | void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ label, fun, variant = 'primary', disabled = false }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = disabled || isLoading;

  const handlePress = async () => {
    if (isDisabled) return;
    try {
      setIsLoading(true);
      await fun();
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = variant === 'primary' ? buttonStyles.primaryButton : buttonStyles.secondaryButton;
  const textStyle = variant === 'primary' ? buttonStyles.buttonText : buttonStyles.buttonTextSecondary;

  return (
    <TouchableOpacity
      style={[buttonStyle, isDisabled && buttonStyles.disabledButton]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.primary} />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}