import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

//styles
import { buttonStyles } from '../styles/buttonStyles';
import { Theme } from '@react-navigation/native';

type Variant = 'primary' | 'secondary';

interface ThemeStyles {
  button: ViewStyle;
  text: TextStyle;
}

interface ButtonProps {
  label: string;
  fun: () => Promise<void> | void;
  variant?: Variant;
}

export default function Button({ label, fun, variant = 'primary' }: ButtonProps) {

  function getStyles(): StyleSheet.NamedStyles<ThemeStyles> {
    switch (variant) {
      case 'secondary':
        return StyleSheet.create({
          button: buttonStyles.secondaryButton,
          text: buttonStyles.secondaryButtonText
        });
      case 'primary':
      default:
        return StyleSheet.create({
          button: buttonStyles.primaryButton,
          text: buttonStyles.buttonText
        });
    }
  }


  const styles = getStyles();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={fun}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}
