import React, { ReactNode, useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

//styles
import { inputStyles } from '../styles/inputStyles';

interface InputProps {
  placeholder: string;
  placeholderTextColor?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export default function Input({ placeholder, placeholderTextColor, value, onChange }: InputProps) {

  return (
    <TextInput
      style={inputStyles.input}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChange}
    />
  );
}