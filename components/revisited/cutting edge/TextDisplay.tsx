import React, { useMemo } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

// styles
import revisited_styles from '../styles/styles';

export type TextVariant =
    | 'default'
    | 'info'
    | 'success'
    | 'danger'
    | 'warning'
    | 'label';

interface TextDisplayProps {
    text_variant?: TextVariant;
    more_text_styles?: StyleProp<TextStyle>;
    text: string | number;
}

export default function TextDisplay({
    text_variant = 'default',
    more_text_styles,
    text,
}: TextDisplayProps) {
    const textStyle = useMemo(() => {
        switch (text_variant) {
            case 'danger':
                return [
                    revisited_styles.text_default,
                    revisited_styles.text_danger,
                    more_text_styles,
                ];

            case 'info':
                return [
                    revisited_styles.text_default,
                    revisited_styles.text_info,
                    more_text_styles,
                ];

            case 'success':
                return [
                    revisited_styles.text_default,
                    revisited_styles.text_success,
                    more_text_styles,
                ];

            case 'warning':
                return [
                    revisited_styles.text_default,
                    revisited_styles.text_warning,
                    more_text_styles,
                ];

            case 'label':
                return [
                    revisited_styles.text_default,
                    revisited_styles.text_label,
                    more_text_styles,
                ];

            case 'default':
            default:
                return [
                    revisited_styles.text_default,
                    more_text_styles,
                ];
        }
    }, [text_variant, more_text_styles]);

    return (
        <Text style={textStyle}>
            {text}
        </Text>
    );
}