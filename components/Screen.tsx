import React, { ReactNode } from 'react';
import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//styles
import { containerStyles } from '../styles/containerStyles';

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        containerStyles.screen,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      {children}
    </View>
  );
}
