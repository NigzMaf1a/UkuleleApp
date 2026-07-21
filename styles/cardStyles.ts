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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: scale(12),
    backgroundColor: colors.surface,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(6),

    elevation: 3,

    marginBottom: spacing.md
  },
  input_plus_btn: {
    width: "100%",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: scale(12),
    backgroundColor: colors.surface,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(6),

    elevation: 3,

    marginBottom: spacing.md
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
    gap: spacing.sm,
    backgroundColor: colors.surface,
    elevation: 3
  }
});
