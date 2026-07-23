import React from 'react';
import { View, TextInputProps } from 'react-native';

import Input from '../components/Input';
import DispText from '../components/DispText';

import { containerStyles } from '../styles/containerStyles';
import { colors } from '../styles/colors';

interface LabelledInputProps {
  label: string;
  inputPlaceholder: string;
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

export default function LabelledInput({
  label,
  inputPlaceholder,
  value,
  onChange,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  returnKeyType,
  onSubmitEditing,
  maxLength
}: LabelledInputProps) {
  return (
    <View style={[containerStyles.labelledInputContainer, { backgroundColor: colors.background }]}>
      <DispText text={label} variant="caption" textColor={colors.theme} />
      <Input
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />
    </View>
  );
}
