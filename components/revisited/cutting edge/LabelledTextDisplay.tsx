import { View, Text } from 'react-native'
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

//components
import TextDisplay from './TextDisplay';

//styles
import revisited_styles from '../styles/styles';

interface LabelledTextDisplayProps {
    more_row_styles?: StyleProp<ViewStyle>;
    label: string;
    text: string | number;
}

export default function LabelledTextDisplay(
    {
        more_row_styles,
        label,
        text
    }: LabelledTextDisplayProps
) {
    return (
        <View
            style={[
                revisited_styles.text_group,
                more_row_styles
            ]}
        >
            <TextDisplay text={label} />
            <TextDisplay text={text} />
        </View>
    )
}