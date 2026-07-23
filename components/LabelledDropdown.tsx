import React from 'react';
import { View } from 'react-native';

import DropDown, { DropDownItem } from './DropDown';
import DispText from './DispText';

import { containerStyles } from '../styles/containerStyles';
import { colors } from '../styles/colors';

interface LabelledDropdownProps {
    label: string;
    values: DropDownItem[];
    selectedValue: string;
    onValueChange: (newValue: string) => void;
    placeholder?: string;
    enabled?: boolean;
}

export default function LabelledDropdown({
    label,
    values,
    selectedValue,
    onValueChange,
    placeholder,
    enabled
}: LabelledDropdownProps) {
    return (
        <View style={containerStyles.val}>
            <DispText text={label} variant="caption" textColor={colors.theme} />
            <DropDown
                values={values}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                placeholder={placeholder}
                enabled={enabled}
            />
        </View>
    );
}
