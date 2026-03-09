import React, {useState} from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

//styles
import { buttonStyles } from '../styles/buttonStyles';


interface ButtonProps{
    label:string;
    fun:() => Promise<void> | void;
}

export default function Button({label, fun}:ButtonProps) {
  return (
    <TouchableOpacity
        style={buttonStyles.primaryButton}
        onPress={fun}
    >
        <Text style={buttonStyles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}