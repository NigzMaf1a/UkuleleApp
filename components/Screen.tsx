import React, { ReactNode } from 'react';
import { View } from "react-native";

//styles
import { containerStyles } from '../styles/containerStyles';

interface ScreenProps {
  children: ReactNode;
}


export default function Screen({ children }: ScreenProps) {
  return (
    <View style={containerStyles.screen}>
      {children}
    </View>
  );
}