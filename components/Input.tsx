import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { inputStyles } from '../styles/inputStyles';
import { colors } from '../styles/colors';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  maxLength?: number;
}

export default function Input({
  placeholder,
  value,
  onChange,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoComplete = 'off',
  returnKeyType = 'done',
  onSubmitEditing,
  maxLength
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[inputStyles.input, isFocused && inputStyles.inputFocused]}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      value={value}
      onChangeText={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      maxLength={maxLength}
    />
  );
}
