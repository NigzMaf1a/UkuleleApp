import { StyleSheet } from "react-native";
import { spacing } from "./spacing";
import { colors } from "./colors";
import { hp } from "./responsive";

export const containerStyles = StyleSheet.create({

  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background
  },

  screenContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },

  smallForm: {
    width: "100%",
    height: hp(40),
    justifyContent: "center",
    alignItems: "stretch",
    gap: spacing.md,
    backgroundColor: colors.background
  },

  bigForm: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "stretch",
    gap: spacing.md
  },

  formStrip: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // default when only one button
    paddingVertical: spacing.xs, // minimal extra vertical space
    paddingHorizontal: spacing.md
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
  },
  val: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm
  }

});