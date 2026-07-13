import React from 'react';
import { View, StyleSheet } from 'react-native';

//components
import DispText from './DispText';

//styles
import { spacing } from '../styles/spacing';
import { colors } from '../styles/colors';

interface LabelledTextProps {
  label: string;
  text: string;
}

export default function LabelledText({ label, text }: LabelledTextProps) {
  return (
    <View style={styles.labelledText}>
      <DispText text={label} variant='caption' textColor={colors.textCaption} />
      <DispText text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  labelledText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.xs
  }
});