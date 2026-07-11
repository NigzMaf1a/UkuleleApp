import { StyleSheet } from "react-native"
import { scale } from "../responsive"
import { spacing } from "../spacing"
import { flexStyles } from "../flexStyles"

export const containerStyles = StyleSheet.create(
    {
      LabelledInputContainer:{
        width:"100%",
        padding:spacing.sm,
        flexDirection:flexStyles.column.flexDirection,
        justifyContent:"space-between",
        borderRadius: scale(12),
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: scale(6),
        elevation: 3
      }
    }
)