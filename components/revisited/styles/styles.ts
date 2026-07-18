import { StyleSheet } from "react-native";

//styles
import { colors } from "../../../styles/colors";
import { scale } from "../../../styles/responsive";
import { spacing } from "../../../styles/spacing";
import { typography } from "../../../styles/typography";

const revisited_styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        marginBottom: spacing.sm,
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: scale(12)
    },
    left_cont: {
        width: "75%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 12,
        gap: 8,
    },
    right_cont: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    label_text: {},
    text_group: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: spacing.sm
    },
    text: {
        flex: 1,
        flexShrink: 1
    },
    text_info: {
        color: colors.primary
    },
    text_danger: {
        color: colors.danger
    },
    text_success: {
        color: colors.success
    },
    text_default: {
        color: colors.default
    },
    text_warning: {
        color: colors.warn
    },
    text_label: {
        color: colors.textCaption
    },
    label: {
        width: 50,
        marginRight: 10,
    },

    value: {
        flex: 1,
    },
    right_side_text: {
        width: 70
    },
    btn: {
        height: 10,
        width: 30
    },
    btn_label: {},
    btn_info: {},
    btn_success: {},
    btn_danger: {},
    btn_warning: {},
    btn_label_info: {},
    btn_label_success: {},
    btn_label_danger: {},
    btn_label_warning: {}
});

export default revisited_styles;