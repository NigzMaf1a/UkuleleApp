import React, { ReactNode } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";

//components
import Input from "./Input";

//styles
import { containerStyles } from "../styles/containerStyles";

interface ScreenProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
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
        <View>
          <Input
            value={query}
            onChange={setQuery}
            placeholder={searchPlaceholder}
          />
        </View>
      )}

      {children}
    </ScrollView>
  );
}