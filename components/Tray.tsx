import React from 'react';
import { View } from 'react-native';

//styles
import { cardStyles } from '../styles/cardStyles';

interface StripProps{
    children:React.ReactNode;
}

export default function Tray({children}:StripProps) {
  return (
    <View style={cardStyles.tray}>
        {children}
    </View>
  );
} 