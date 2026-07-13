import { StyleSheet } from "react-native";
import { spacing } from "./spacing";
import { colors } from "./colors";
import { hp } from "./responsive";

export const containerStyles = StyleSheet.create({

  // Outer ScrollView wrapper — use with `style` prop
  screen: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background
  },

  // Inner scrollable content — use with `contentContainerStyle` prop
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
    height: hp(70),
    justifyContent: "center",
    alignItems: "stretch",
    gap: spacing.md
  },

  formStrip: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // overridden dynamically by FormStrip.tsx based on child count
    gap: spacing.sm,
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