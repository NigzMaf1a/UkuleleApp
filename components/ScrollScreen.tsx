import React, { ReactNode } from "react";
import { ScrollView, StyleProp, View, TextStyle } from "react-native";

//components
import Input from "./Input";

//styles
import { containerStyles } from "../styles/containerStyles";
import searchStyles from "./revisited/styles/scrollScreenSearch";

interface ScreenProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<TextStyle>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  query?: string;
  setQuery?: (text: string) => void;
}

export default function ScrollScreen({
  children,
  contentContainerStyle,
  showSearch = false,
  searchPlaceholder = "Search...",
  query = "",
  setQuery,
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
      {showSearch && setQuery && (
        <Input
          value={query}
          onChange={setQuery}
          placeholder={searchPlaceholder}
          style={{
            marginBottom: 30,
            borderWidth: 2,
          }}
        />
      )}

      {children}
    </ScrollView>
  );
}