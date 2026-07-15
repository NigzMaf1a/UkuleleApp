import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

import { scale, moderateScale } from '../styles/responsive';
import { colors } from '../styles/colors';

export interface DropDownItem {
    label: string;
    value: string | number;
}

interface DropDownProps {
    values: DropDownItem[];
    selectedValue: string;
    onValueChange: (newValue: string) => void;
    placeholder?: string;
    enabled?: boolean;
}

export default function DropDown({
    values,
    selectedValue,
    onValueChange,
    placeholder = "Select a Value",
    enabled = true
}: DropDownProps) {
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(val) => onValueChange(String(val))}
            style={styles.picker}
            mode="dropdown"
            enabled={enabled}
            dropdownIconColor={colors.textSecondary}
        >
            <Picker.Item
                label={placeholder}
                value=""
                color={colors.textSecondary}
            />

            {values.map((val) => (
                <Picker.Item
                    key={String(val.value)}
                    label={val.label}
                    value={String(val.value)}
                    color={colors.text}
                />
            ))}
        </Picker>
    );
}

const styles = StyleSheet.create({
    picker: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: scale(8),
        color: colors.text,
        fontSize: moderateScale(16)
    }
});
