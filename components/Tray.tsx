import React from 'react';
import { View } from 'react-native';

//styles
import revisited_styles from './revisited/styles/styles';

interface StripProps {
  children: React.ReactNode;
}

export default function Tray({ children }: StripProps) {
  return (
    <View style={revisited_styles.left_cont}>
      {children}
    </View>
  );
} 