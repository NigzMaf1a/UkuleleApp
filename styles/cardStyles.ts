import { StyleSheet } from "react-native";
import { scale } from "./responsive";
import { spacing } from "./spacing";
import { colors } from "./colors";
import { flexStyles } from "./flexStyles";

export const cardStyles = StyleSheet.create({

  card: {
    width: "100%",
    padding: spacing.md,
    borderRadius: scale(12),
    backgroundColor: colors.surface,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 3
  },
  strip: {
    width: "100%",
    padding: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: scale(12),
    backgroundColor: colors.background,
    elevation: 3
  },
  tray: {
    width: "75%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: spacing.xs
  },
  row: {
    flexDirection: "row"
  },
  dashTray: {
    width: "100%",
    flexDirection: "column",
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: scale(14),
    gap: spacing.sm
  }
});
