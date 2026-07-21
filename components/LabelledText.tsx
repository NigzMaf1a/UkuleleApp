import React, { useMemo } from 'react';
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
  const styling = useMemo(() => {
    let current;
    if (text?.length > 20) {
      current = [
        styles.common,
        styles.column
      ];
      return current
    } else {
      current = [
        styles.common,
        styles.row
      ];
      return current;
    }
  }, [text])
  return (
    <View style={styling}>
      <DispText text={label} variant='caption' textColor={colors.textCaption} />
      <DispText text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  common: {
    justifyContent: "space-between",
    width: "100%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  column: {
    flexDirection: "column"
  }
});