import React, {ReactNode} from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { containerStyles } from '../styles/containerStyles';

interface ScreenProps{
    children:ReactNode;
}

export default function ScrollScreen({children}:ScreenProps) {
  return (
    <ScrollView style={containerStyles.screen}>
        {children}
    </ScrollView>
  );
}