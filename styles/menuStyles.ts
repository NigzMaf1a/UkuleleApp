import { StyleSheet } from "react-native";
import { colors } from "./colors";

const menuStyles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.surface,
    width: 260
  },
  label: {
    fontSize: 16
  },
  header: {
    backgroundColor: colors.surface
  },
  headerTitle: {
    fontWeight: "700"
  }
});

export default menuStyles;