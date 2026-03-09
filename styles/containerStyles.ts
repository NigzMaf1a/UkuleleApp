import { StyleSheet } from "react-native";
import { spacing } from "./spacing";

export const containerStyles = StyleSheet.create({

  screen: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }

});