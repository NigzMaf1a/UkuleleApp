import React, { useState, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

//scripts
import toaster from '../scripts/utils/toaster';

//styles
import { buttonStyles, clicked_button_styles } from '../styles/buttonStyles';

type Variant = 'primary' | 'secondary';

interface ThemeStyles {
  button: ViewStyle;
  text: TextStyle;
}

interface ClickStyles {
  button: ViewStyle;
  text: TextStyle;
}

interface ButtonProps {
  label: string;
  fun: () => Promise<void> | void;
  variant?: Variant;
  isClicked?: boolean;
  setIsClicked?: (clicked: boolean) => void;
}

export default function Button(
  {
    label,
    fun,
    variant = 'primary',
    isClicked = false,
    setIsClicked
  }: ButtonProps
) {

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

  const click_styles = useMemo((): ClickStyles => {
    return {
      button: clicked_button_styles.button,
      text: clicked_button_styles.label
    };
  }, []);

  return (
    <TouchableOpacity
      style={
        isClicked === true ? [click_styles.button] : [styles.button]
      }
      onPress={() => {
        if (isClicked === true) {
          toaster('Await current process', 'info');
        }
        setIsClicked && setIsClicked;
        fun;
      }}
    >
      <Text
        style={isClicked === true ? [click_styles.text] : [styles.text]}
      >
        {isClicked === false ? label : 'Wait...'}
      </Text>
    </TouchableOpacity>
  );
}
