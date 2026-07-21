import { View, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import React, { useMemo } from 'react';

//components
import TextDisplay from "./TextDisplay";
import LabelledTextDisplay from "./LabelledTextDisplay";
import LabelledButtonAdv from "./LabelledButtonAdv";

//styles
import revisited_styles from "../styles/styles";
import finishingStyles from "../styles/styles_two";
import { typography } from "../../../styles/typography";

//types
import { TextVariant } from "./TextDisplay";
import { ButtonVariant } from "./LabelledButtonAdv";

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
    fun: () => Promise<void> | void;
    isClicked?: boolean;
    setIsClicked?: (clicked: boolean) => void;
    buttonLabel: string;
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
    btn_variant?: ButtonVariant;
}

export default function ListItemWithButtonAdv(
    {
        rowOneData,
        rowTwoData,
        cont_styles, buttonLabel, fun,
        isClicked = false, setIsClicked,
        more_row_one_styles,
        more_label_two_styles,
        more_label_one_styles,
        more_row_two_styles,
        more_text_one_styles,
        more_text_two_styles,
        label_one_variant = 'label',
        label_two_variant = 'label',
        text_one_variant = 'default',
        text_two_variant = 'default',
        btn_variant = 'info',

    }: ListItemAdvProps
) {
    return (
        <View style={
            isClicked === true ? [revisited_styles.clicked_container] : [
                revisited_styles.container,
                cont_styles && cont_styles
            ]
        }
        >
            <View style={revisited_styles.left_cont}>
                <LabelledTextDisplay
                    label={rowOneData.label}
                    text={rowOneData.text}
                    more_row_styles={[
                        finishingStyles.row_one,
                        more_row_one_styles
                    ]}
                    more_label_styles={[
                        typography.caption,
                        more_label_one_styles
                    ]}
                    more_text_styles={[
                        typography.body,
                        more_text_one_styles
                    ]}
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
                    more_text_styles={[
                        typography.body,
                        more_text_two_styles
                    ]}
                    label_variant={label_two_variant}
                    text_variant={text_two_variant}
                />
            </View>

            <View style={revisited_styles.right_cont}>
                <LabelledButtonAdv
                    label={buttonLabel}
                    onPress={fun}
                    variant={btn_variant}
                    isClicked={isClicked}
                    setIsClicked={setIsClicked && setIsClicked}
                />
            </View>
        </View>
    );
}