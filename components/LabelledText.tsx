import React from 'react';
import { View, StyleSheet } from 'react-native';

import DispText from './DispText';

import { spacing } from '../styles/spacing';
import { colors } from '../styles/colors';

interface LabelledTextProps {
  label: string;
  text: string;
}

export default function LabelledText({ label, text }: LabelledTextProps) {
  return (
    <View style={styles.labelledText}>
      <DispText
        text={label}
        variant="caption"
        textColor={colors.textSecondary}
        numberOfLines={1}
      />
      <View style={styles.valueContainer}>
        <DispText
          text={text}
          variant="body"
          textAlign="right"
          numberOfLines={2}
        />
      </View>
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
  },
  valueContainer: {
    flexShrink: 1
  }
});
