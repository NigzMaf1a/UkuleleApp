import React from 'react';
import { View } from 'react-native';

//components
import DropDown from './DropDown';
import DispText from './DispText';

//scripts
import { DropDownItem } from './DropDown';

import { containerStyles } from '../styles/containerStyles';

interface LabelledDropdownProps{
    label:string;
    values:DropDownItem[];
    selectedValue:string;
    onValueChange: (newValue: string) => void;
}

export default function LabelledDropdown({label, values, selectedValue, onValueChange}:LabelledDropdownProps){
    return (
        <View style={containerStyles.val}>
            <DispText text={label}/>
            <DropDown values={values}
                      selectedValue={selectedValue}
                      onValueChange={onValueChange}
            />
        </View>
    );
}