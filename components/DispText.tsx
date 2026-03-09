import React, {useState} from 'react';
import { StyleSheet, Text } from 'react-native';

import { typography } from '../styles/typography';

interface DispTextProps{
  text: string;
  textColor?:string;
}

const styles = StyleSheet.create({});

export default function DispText({text, textColor}:DispTextProps) {
  return (
    <Text style={[typography.h1.fontSize]}>
      {text}
    </Text>
  );
}