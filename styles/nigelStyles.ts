import { StyleSheet } from "react-native";
import { scale, verticalScale } from "./responsive";
import { spacing } from "./spacing";
import { colors } from "./colors";

const nigelStyles = StyleSheet.create({

  contentBox: {
    width: "100%",
    padding: spacing.md,
    gap: spacing.sm,
    minHeight: verticalScale(60),
    maxHeight: verticalScale(320),
    backgroundColor: colors.surface,
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: colors.border,
    overflow: "hidden"
  },

  // container that limits width but allows horizontal scroll
  scrollableTextContainer: {
    width: scale(220),        // fixed readable width
  },

  // text that should not wrap
  scrollableText: {
    color: colors.text,
    fontSize: scale(14),
  }

});

export default nigelStyles;