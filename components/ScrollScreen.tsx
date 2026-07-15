import React, { ReactNode } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";

import { containerStyles } from "../styles/containerStyles";

interface ScreenProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function ScrollScreen({
  children,
  contentContainerStyle,
}: ScreenProps) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        containerStyles.screen,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}