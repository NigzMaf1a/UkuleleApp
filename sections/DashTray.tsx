import React from 'react';
import { View } from 'react-native';


//styles
import { cardStyles } from '../styles/cardStyles';

//interfaces
interface DashTrayProps{
    children:React.ReactNode;
}

export default function DashTray({children}:DashTrayProps) {
  return (
    <View style={cardStyles.dashTray}>
        {children}
    </View>
  );
}