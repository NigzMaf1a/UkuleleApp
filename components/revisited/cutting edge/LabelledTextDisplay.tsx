import { View, Text } from 'react-native'
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

//components
import TextDisplay from './TextDisplay';

//styles
import revisited_styles from '../styles/styles';
import finishingStyles from '../styles/styles_two';

//interfaces
import { TextVariant } from './TextDisplay';

interface LabelledTextDisplayProps {
    more_row_styles?: StyleProp<ViewStyle>;
    label: string;
    text: string | number;
    label_variant?: TextVariant;
    text_variant?: TextVariant;
    more_label_styles?: StyleProp<TextStyle>;
    more_text_styles?: StyleProp<TextStyle>;
}

export default function LabelledTextDisplay(
    {
        more_row_styles,
        label,
        text,
        label_variant = 'label',
        text_variant = 'default',
        more_label_styles,
        more_text_styles
    }: LabelledTextDisplayProps
) {
    return (
        <View style={[
            revisited_styles.text_group,
            more_row_styles
        ]}>
            <TextDisplay
                text={label}
                text_variant={label_variant}
                more_text_styles={[
                    revisited_styles.label,
                    more_label_styles
                ]}
            />

            <TextDisplay
                text={text}
                text_variant={text_variant}
                more_text_styles={[
                    revisited_styles.value,
                    more_text_styles
                ]}
            />
        </View>
    )
}