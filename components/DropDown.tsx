import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

export interface DropDownItem{
    label:string;
    value:string;
}

interface DropDownProps{
    values:DropDownItem[];
    selectedValue:string;
    onValueChange: (newValue: string) => void;
}

export default function DropDown({
    values,
    selectedValue,
    onValueChange
}:DropDownProps) {

  return (
    <Picker
        selectedValue={selectedValue}
        onValueChange={(val) => onValueChange(String(val))}
        style={styles.picker}
    >
        <Picker.Item
            label="Select a Value"
            value=""
        />

        {values.map((val) => (
            <Picker.Item
                key={val.value}   // better than index
                label={val.label}
                value={val.value}
            />
        ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
    picker:{},
    picker_item:{}
});