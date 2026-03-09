import React, { ReactNode } from 'react';
import { View, StyleSheet } from "react-native";

//styles
import { containerStyles } from '../styles/containerStyles';

interface ScreenProps{
    children:ReactNode;
}


export default function Screen({children}:ScreenProps) {
  return (
    <View style={containerStyles.screen}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 40,
    backgroundColor: "#f7f7f7",
  }
});