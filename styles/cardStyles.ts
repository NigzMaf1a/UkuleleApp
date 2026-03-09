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
  strip:{
    width:"100%",
    padding:spacing.sm,
    flexDirection:flexStyles.row.flexDirection,
    justifyContent:"space-between",
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 3
  },
  tray:{},
  row:{
    flexDirection:"row"
  },
  dashTray:{}
});
