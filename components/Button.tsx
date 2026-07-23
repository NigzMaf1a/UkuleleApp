import React, { useMemo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

//scripts
import toaster from '../scripts/utils/toaster';

//styles
import { buttonStyles, clicked_button_styles } from '../styles/buttonStyles';

type Variant = 'primary' | 'secondary';

interface ButtonProps {
  label: string;
  fun: () => Promise<void> | void;
  variant?: Variant;
  isClicked?: boolean;
  setIsClicked?: (clicked: boolean) => void;
}

export default function Button({
  label,
  fun,
  variant = 'primary',
  isClicked = false,
  setIsClicked
}: ButtonProps) {

  const styles = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return {
          button: buttonStyles.secondaryButton,
          text: buttonStyles.secondaryButtonText
        };

      case 'primary':
      default:
        return {
          button: buttonStyles.primaryButton,
          text: buttonStyles.buttonText
        };
    }
  }, [variant]);

  const clickStyles = useMemo(() => ({
    button: clicked_button_styles.button,
    text: clicked_button_styles.label
  }), []);

  return (
    <TouchableOpacity
      style={isClicked ? clickStyles.button : styles.button}
      onPress={async () => {
        if (isClicked) {
          toaster('Await current process', 'info');
          return;
        }

        setIsClicked?.(true);
        await fun();
      }}
    >
      <Text
        style={isClicked ? clickStyles.text : styles.text}
      >
        {isClicked ? 'Wait...' : label}
      </Text>
    </TouchableOpacity>
  );
}