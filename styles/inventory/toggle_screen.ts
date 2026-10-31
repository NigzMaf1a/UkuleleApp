import { StyleSheet } from "react-native"

import { colors } from "../colors"
import { spacing } from "../spacing"
import { scale } from "../responsive"

const toggleScreenStyles = StyleSheet.create({
    container: {
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
    btn: {
        height: "100%",
        width: "50%",
        borderRadius: scale(12)
    },
    clicked: {
        color: colors.surface,
        backgroundColor: colors.info
    },
    notClicked: {
        color: colors.info,
        backgroundColor: colors.surface
    }
})

export default toggleScreenStyles