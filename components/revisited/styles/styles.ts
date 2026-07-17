import { StyleSheet } from "react-native";

//styles
import { colors } from "../../../styles/colors";
import { scale } from "../../../styles/responsive";
import { spacing } from "../../../styles/spacing";

const revisited_styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        marginBottom: spacing.sm,
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F08080",
        borderRadius: scale(12)
    },
    left_cont: {
        width: "75%",
        flexDirection: "column",
        height: "100%",
        alignItems: "center"
    },
    label_text: {},
    text_group: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: spacing.sm
    },
    text: {
        width: "100%",
        flex: 1,
        flexShrink: 1
    },
    text_info: {},
    text_danger: {},
    text_success: {},
    text_default: {},
    text_warning: {},
    text_label: {}
});

export default revisited_styles;