import React from "react";
import { Text, StyleSheet } from "react-native";
import { typography } from "../styles/typography";

interface DispTextProps {
  text: string;
  textColor?: string;
}

export default function DispText({ text, textColor }: DispTextProps) {
  return (
    <Text
        style={[
          typography.h3,
          { textAlignVertical: "center" },
          textColor && { color: textColor },
        ]}
    >
      {text}
    </Text>
  );
}