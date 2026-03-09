import React from 'react';
import { View } from 'react-native';

//components
import DispText from './DispText';

//styles
import componentStyles from '../styles/components';

interface LabelledTextProps{
    label:string;
    text:string;
}

export default function LabelledText({label, text}:LabelledTextProps) {
  return (
    <View style={componentStyles.labelledTextContainer}>
        <DispText text={label}/>
        <DispText text={text}/>
    </View>
  );
}