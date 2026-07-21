import { StyleSheet, StyleProp, TextStyle, ViewStyle, View, Text } from "react-native";
import { useMemo } from "react";

//styles
import revisited_styles from "../styles/styles";
import { colors } from "../../../styles/colors";

const dash_styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        backgroundColor: colors.white
    },
    head: {
        fontSize: 43
    },
    head_two: {},
    text_defaults: {},
    text_danger: {},
    text_info: {},
    text_warn: {},
    text_success: {},
    text_ether: {}

});

//types
type Variant = 'head' | 'head_two';
type TextColor = 'info' | 'warn' | 'success' | 'danger' | 'ether';

interface DashLabelProps {
    text: string;
    variant?: Variant;
    text_color?: TextColor;
}

interface Styles {
    cont_styles: StyleProp<ViewStyle>;
    text_styles: StyleProp<TextStyle>;
}

export default function DashLabel(
    {
        text,
        variant = 'head',
        text_color = 'ether'
    }: DashLabelProps
) {
    const styles = useMemo((): Styles => {
        let head = [];

        if (variant === 'head_two') {
            head.push(dash_styles.head_two);
        } else head.push(dash_styles.head);

        switch (text_color) {
            case 'danger':
                head.push(dash_styles.text_defaults);
                head.push(dash_styles.text_danger);
            case 'info':
                head.push(dash_styles.text_defaults);
                head.push(dash_styles.text_info);
            case 'success':
                head.push(dash_styles.text_defaults);
                head.push(dash_styles.text_success);
            case 'warn':
                head.push(dash_styles.text_defaults);
                head.push(dash_styles.text_warn);
            case 'ether':
            default:
                head.push(dash_styles.text_defaults);
                head.push(dash_styles.text_ether);
        }

        return {
            cont_styles: dash_styles.container,
            text_styles: head
        };

    }, [variant, text_color]);

    return (
        <View style={[styles.cont_styles]}>
            <Text style={styles.text_styles}>
                {text}
            </Text>
        </View>
    );
}