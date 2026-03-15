import { StyleSheet } from "react-native";
import { spacing } from "./spacing";

export const containerStyles = StyleSheet.create({

  screen: {
    flexGrow: 1,
    width: "100%",
    minHeight: "100%",    
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },

  smallForm:{},

  bigForm:{},

  formStrip:{},

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