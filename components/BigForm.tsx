import React from 'react';
import { View } from 'react-native';

//styles
import { containerStyles } from '../styles/containerStyles';

interface SmallFormProps{
  children:React.ReactNode; 
}

export default function BigForm({children}:SmallFormProps) {
  return (
    <View style={containerStyles.bigForm}>
      {children}
    </View>
  );
} 