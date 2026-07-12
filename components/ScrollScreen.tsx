import React, { ReactNode } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { containerStyles } from '../styles/containerStyles';

interface ScreenProps {
  children: ReactNode;
}

export default function ScrollScreen({ children }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={containerStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
    >
      <ScrollView
        style={containerStyles.screen}
        contentContainerStyle={[
          containerStyles.screenContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}