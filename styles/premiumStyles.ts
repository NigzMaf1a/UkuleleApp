import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { scale } from "./responsive";

const premium_button_styles = StyleSheet.create({
    common: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: scale(14)
    },
    list: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: scale(7),
        height: 10,
        width: 30
    },
    primary: {
        backgroundColor: colors.primary,
        borderRadius: scale(8)
    },
    secondary: {
        backgroundColor: colors.white,
        borderRadius: scale(8),
        borderColor: colors.primary,
        borderWidth: 1
    },
    primary_text: {},
    secondary_text: {},
});

export default premium_button_styles;