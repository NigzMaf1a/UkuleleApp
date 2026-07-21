import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//interfaces
import Inspection from '../scripts/interfaces/inspection';

//styles
import { buttonStyles } from '../styles/buttonStyles';


interface ButtonProps {
  label: string;
  fun: (par?: Inspection ) => Promise<void> | void;
}

export default function ButtonComplex({ label, fun }: ButtonProps) {

  return (
    <TouchableOpacity style={buttonStyles.primaryButton} onPress={() => fun()}>
      <Text style={buttonStyles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}