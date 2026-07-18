import { View, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import React, { useMemo } from 'react';

//components
import TextDisplay from "./TextDisplay";
import LabelledTextDisplay from "./LabelledTextDisplay";

//styles
import revisited_styles from "../styles/styles";
import finishingStyles from "../styles/styles_two";

//types
import { TextVariant } from "./TextDisplay";

interface RowOneData {
    text: string | number;
    label: string;
}

interface RowTwoData {
    text: string | number;
    label: string;
}

interface ListItemAdvProps {
    rowOneData: RowOneData;
    rowTwoData: RowTwoData;
    rightSideText: string | number;
    cont_styles?: StyleProp<ViewStyle>;
    more_row_one_styles?: StyleProp<ViewStyle>;
    more_row_two_styles?: StyleProp<ViewStyle>;
    more_label_one_styles?: StyleProp<TextStyle>;
    more_text_one_styles?: StyleProp<TextStyle>;
    more_label_two_styles?: StyleProp<TextStyle>;
    more_text_two_styles?: StyleProp<TextStyle>;
    more_text_three_styles?: StyleProp<TextStyle>;
    label_one_variant?: TextVariant;
    label_two_variant?: TextVariant;
    text_one_variant?: TextVariant;
    text_two_variant?: TextVariant;
    text_three_variant?: TextVariant;
}

export default function ListItemAdv(
    {
        rowOneData,
        rowTwoData,
        rightSideText, cont_styles,
        more_row_one_styles,
        more_label_two_styles,
        more_label_one_styles,
        more_row_two_styles,
        more_text_one_styles,
        more_text_two_styles,
        more_text_three_styles,
        label_one_variant = 'label',
        label_two_variant = 'label',
        text_one_variant = 'default',
        text_two_variant = 'default',
        text_three_variant = 'default',

    }: ListItemAdvProps
) {
    return (
        <View style={[
            revisited_styles.container,
            cont_styles && cont_styles
        ]}
        >
            <View style={revisited_styles.left_cont}>
                <LabelledTextDisplay
                    label={rowOneData.label}
                    text={rowOneData.text}
                    more_row_styles={[
                        finishingStyles.row_one,
                        more_row_one_styles
                    ]}
                    more_label_styles={more_label_one_styles}
                    more_text_styles={more_text_one_styles}
                    label_variant={label_one_variant}
                    text_variant={text_one_variant}
                />

                <LabelledTextDisplay
                    label={rowTwoData.label}
                    text={rowTwoData.text}
                    more_row_styles={[
                        finishingStyles.row_two,
                        more_row_two_styles
                    ]}
                    more_label_styles={more_label_two_styles}
                    more_text_styles={more_text_two_styles}
                    label_variant={label_two_variant}
                    text_variant={text_two_variant}
                />
            </View>

            <View style={revisited_styles.right_cont}>
                <TextDisplay
                    text={rightSideText}
                    more_text_styles={[
                        revisited_styles.right_side_text,
                        more_text_three_styles
                    ]}
                    text_variant={text_three_variant}
                />
            </View>
        </View>
    );
}