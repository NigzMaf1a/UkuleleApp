import React from 'react';
import { View } from 'react-native';

//styles
import { containerStyles } from '../styles/containerStyles';

interface BigFormProps {
  children: React.ReactNode;
}

export default function BigForm({ children }: BigFormProps) {
  return (
    <View style={containerStyles.bigForm}>
      {children}
    </View>
  );
} 