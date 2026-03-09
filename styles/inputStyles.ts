import { StyleSheet } from "react-native";
import { scale, moderateScale } from "./responsive";
import { colors } from "./colors";

export const inputStyles = StyleSheet.create({

  input: {

    width: "100%",

    paddingVertical: scale(12),

    paddingHorizontal: scale(14),

    borderRadius: scale(8),

    borderWidth: 1,

    borderColor: colors.border,

    fontSize: moderateScale(16),

    backgroundColor: "#FFFFFF"
  },

  inputFocused: {

    borderColor: colors.primary
  }

});
