import { StyleSheet } from "react-native";
import { scale } from "./responsive";
import { spacing } from "./spacing";

export const containerStyles = StyleSheet.create({
    labelledInputContainer: {
        width: "100%",
        padding: spacing.sm,
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: scale(12),
        elevation: 3
    }
});
