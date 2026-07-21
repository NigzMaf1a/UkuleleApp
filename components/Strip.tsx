import React from 'react';
import { View } from 'react-native';

//styles
import revisited_styles from './revisited/styles/styles';

interface StripProps {
  children: React.ReactNode;
}

export default function Strip({ children }: StripProps) {
  return (
    <View style={revisited_styles.container}>
      {children}
    </View>
  );
} 