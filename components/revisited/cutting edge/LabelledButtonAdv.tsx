import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

//styles
import revisited_styles from '../styles/styles';

//scripts
import toaster from '../../../scripts/utils/toaster';

//interfaces and types
export type ButtonVariant = 'info' | 'success' | 'danger' | 'warning';

interface LabelledButtonAdvProps {
    variant?: ButtonVariant;
    label: string;
    onPress: () => Promise<void> | void;
    isClicked?: boolean;
    setIsClicked?: (clicked: boolean) => void;
    more_btn_styles?: StyleProp<ViewStyle>;
    more_label_styles?: StyleProp<TextStyle>;
}

export default function LabelledButtonAdv(
    {
        variant = 'info',
        label,
        onPress,
        isClicked = false,
        setIsClicked,
        more_btn_styles,
        more_label_styles
    }: LabelledButtonAdvProps
) {

    const btnStyles = useMemo(() => {
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

    const labelStyles = useMemo(() => {
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

    const clickBtnStyles = useMemo(() => [
        revisited_styles.btn,
        revisited_styles.btn_warning
    ], []);

    const clickLabelStyles = useMemo(() => [
        revisited_styles.btn_label,
        revisited_styles.btn_label_warning
    ], []);

    return (
        <TouchableOpacity
            onPress={async () => {
                if (isClicked) {
                    toaster('Await current process', 'info');
                    return;
                }

                setIsClicked?.(true);
                await onPress();
            }}
            style={
                isClicked
                    ? [...clickBtnStyles, more_btn_styles]
                    : [...btnStyles, more_btn_styles]
            }
        >
            <Text
                style={
                    isClicked
                        ? [...clickLabelStyles, more_label_styles]
                        : [...labelStyles, more_label_styles]
                }
            >
                {isClicked ? 'Wait...' : label}
            </Text>
        </TouchableOpacity>
    );
}