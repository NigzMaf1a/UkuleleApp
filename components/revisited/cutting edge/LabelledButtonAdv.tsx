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

interface ClickStyles {
    btn_styles: StyleProp<ViewStyle>;
    label_styles: StyleProp<TextStyle>;
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

    const click_styles = useMemo((): ClickStyles => {
        let btn = [];
        let label = [];

        btn.push(revisited_styles.btn);
        label.push(revisited_styles.btn_label);
        btn.push(revisited_styles.btn_warning);
        label.push(revisited_styles.btn_label_warning);

        return {
            btn_styles: btn,
            label_styles: label
        };
    }, [isClicked]);

    return (
        <TouchableOpacity
            onPress={() => {
                if (isClicked === true) {
                    toaster('Await current process', 'info');
                    return;
                }
                setIsClicked && setIsClicked;
                onPress;
            }}
            style={isClicked === true ? [click_styles.btn_styles] : [
                btn_styles,
                more_btn_styles
            ]}
        >
            <Text
                style={
                    isClicked === true ? [click_styles.label_styles] : [
                        label_styles,
                        more_label_styles
                    ]
                }
            >
                {isClicked === false ? label : 'Wait....'}
            </Text>
        </TouchableOpacity>
    )
}