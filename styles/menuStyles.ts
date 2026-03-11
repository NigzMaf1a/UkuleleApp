import { StyleSheet } from "react-native";
import { colors } from "./colors";

const menuStyles = StyleSheet.create({
  // drawer menu
  drawer: {
    backgroundColor: colors.surface,
    width: 260
  },

  // labels used in drawer + tabs
  label: {
    fontSize: 16
  },

  // header styling
  header: {
    backgroundColor: colors.surface
  },

  headerTitle: {
    fontWeight: "700"
  },

  // bottom tab navigation
  bottomTab: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60
  }
});

export default menuStyles;