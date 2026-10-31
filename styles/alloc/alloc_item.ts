import { StyleSheet } from "react-native"

import { colors } from "../colors"
import { spacing } from "../spacing"
import { scale } from "../responsive"

export const allocItemStyles = StyleSheet.create({
    body: {
        width: "100%",
        height: "30%",
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
    left_cont: {
        width: "60%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: spacing.xs
    },
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})