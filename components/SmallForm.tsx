import React from 'react';
import { View } from 'react-native';

//styles
import { containerStyles } from '../styles/containerStyles';

interface SmallFormProps{
  children:React.ReactNode; 
}

export default function SmallForm({children}:SmallFormProps) {
  return (
    <View style={containerStyles.smallForm}>
      {children}
    </View>
  );
} 