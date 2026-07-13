import React from 'react';
import { View } from 'react-native';

//styles
import { cardStyles } from '../styles/cardStyles';

interface StripProps {
  children: React.ReactNode;
}

export default function Strip({ children }: StripProps) {
  return (
    <View style={cardStyles.strip}>
      {children}
    </View>
  );
} 