import { StyleSheet } from "react-native";
import { scale, moderateScale } from "./responsive";
import { colors } from "./colors";

export const buttonStyles = StyleSheet.create({

  primaryButton: {

    width: "100%",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },

  secondaryButton: {
    width: "100%",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
    fontWeight: "600"
  },

  secondaryButtonText: {
    fontSize: moderateScale(16),
    color: colors.primary,
    fontWeight: "600"
  }

});