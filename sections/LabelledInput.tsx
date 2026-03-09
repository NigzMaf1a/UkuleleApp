import React from 'react';
import { View } from 'react-native';

//components
import Input from '../components/Input';
import DispText from '../components/DispText';

//styles
import { cardStyles } from '../styles/cardStyles';

interface LabelledInputProps{
    label:string;
    inputPlaceholder:string;
    placeholderTextColor?:string;
    value:string;
    onChange:(newValue: string) => void;
}

export default function LabelledInput({
    label,
    inputPlaceholder,
    placeholderTextColor,
    value,
    onChange
}:LabelledInputProps) {
  return (
    <View style={cardStyles.strip}>
        <DispText text={label}/>
        <Input placeholder={inputPlaceholder}
               placeholderTextColor={placeholderTextColor}
               value={value}
               onChange={() => onChange}
        />
    </View>
  )
}