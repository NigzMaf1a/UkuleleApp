import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import React, { useMemo } from 'react';

//components
import TextDisplay from "./TextDisplay";
import LabelledTextDisplay from "./LabelledTextDisplay";

//styles
import revisited_styles from "../styles/styles";

type LabelColor = 'primary' | 'secondary';

interface ListItemAdvProps {
    rowOneData: RowOneData;
    rowTwoData: RowTwoData;
    rightSideText: string | number;
    cont_styles?: StyleProp<ViewStyle>;
}

interface RowOneData {
    text: string | number;
    label: string;
}

interface RowTwoData {
    text: string | number;
    label: string;
}

export default function ListItemAdv(
    {
        rowOneData,
        rowTwoData,
        rightSideText, cont_styles
    }: ListItemAdvProps
) {
    return (
        <View style={[
            revisited_styles.container,
            cont_styles && cont_styles
        ]}
        >
            <View style={revisited_styles.left_cont}>
                <LabelledTextDisplay label={rowOneData.label} text={rowOneData.text} />
                <LabelledTextDisplay label={rowTwoData.label} text={rowTwoData.text} />
            </View>
            <TextDisplay text={rightSideText} />
        </View>
    );
}