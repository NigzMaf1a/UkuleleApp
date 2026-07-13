import React from "react";
import { Text, TextStyle } from "react-native";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";

interface DispTextProps {
  text: string;
  variant?: keyof typeof typography;
  textColor?: string;
  textAlign?: TextStyle["textAlign"];
  numberOfLines?: number;
  onClick?: () => void;
}

export default function DispText({
  text,
  variant = "body",
  textColor,
  textAlign,
  numberOfLines,
  onClick
}: DispTextProps) {
  return (
    <Text
      style={[
        typography[variant],
        { color: textColor ?? colors.text },
        textAlign && { textAlign },
      ]}
      numberOfLines={numberOfLines}
      maxFontSizeMultiplier={1.5}
      onPress={onClick}
    >
      {text}
    </Text>
  );
}