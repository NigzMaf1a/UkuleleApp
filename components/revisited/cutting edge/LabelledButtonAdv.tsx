import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

//styles
import revisited_styles from '../styles/styles';

//interfaces and types
export type ButtonVariant = 'info' | 'success' | 'danger' | 'warning';

interface LabelledButtonAdvProps {
    variant?: ButtonVariant;
    label: string;
    onPress: () => Promise<void> | void;
    more_btn_styles?: StyleProp<ViewStyle>;
    more_label_styles?: StyleProp<TextStyle>;
}

export default function LabelledButtonAdv(
    {
        variant = 'info',
        label,
        onPress,
        more_btn_styles,
        more_label_styles
    }: LabelledButtonAdvProps
) {
    const btn_styles = useMemo(() => {
        switch (variant) {
            case 'danger':
                return [
                    revisited_styles.btn,
                    revisited_styles.btn_danger
                ];
            case 'success':
                return [
                    revisited_styles.btn,
                    revisited_styles.btn_success
                ];
            case 'warning':
                return [
                    revisited_styles.btn,
                    revisited_styles.btn_warning
                ];
            case 'info':
            default:
                return [
                    revisited_styles.btn,
                    revisited_styles.btn_info
                ];
        }
    }, [variant]);

    const label_styles = useMemo(() => {
        switch (variant) {
            case 'danger':
                return [
                    revisited_styles.btn_label,
                    revisited_styles.btn_label_danger
                ];
            case 'success':
                return [
                    revisited_styles.btn_label,
                    revisited_styles.btn_label_success
                ];
            case 'warning':
                return [
                    revisited_styles.btn_label,
                    revisited_styles.btn_label_warning
                ];
            case 'info':
            default:
                return [
                    revisited_styles.btn_label,
                    revisited_styles.btn_label_info
                ];
        }
    }, [variant]);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                btn_styles,
                more_btn_styles
            ]}
        >
            <Text
                style={[
                    label_styles,
                    more_label_styles
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}