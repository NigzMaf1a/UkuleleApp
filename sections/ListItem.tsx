import React from 'react';
import { View, Text } from 'react-native';

//components
import LabelledText from '../components/LabelledText';
import DispText from '../components/DispText';

//styles
import { typography } from '../styles/typography';
import { StyleSheet } from "react-native";
import { scale } from '../styles/responsive';
import { spacing } from '../styles/spacing';
import { colors } from '../styles/colors';

//interfaces
import { Row } from './ListItemwithButton';

interface ListItemProps {
  rowOneData: Row;
  rowTwoData: Row;
  rightSideText: string;
}

export default function ListItem({ rowOneData, rowTwoData, rightSideText }: ListItemProps) {
  return (
    <View style={cardStyles.strip}>
      <View style={cardStyles.tray}>
        <LabelledText label={rowOneData.label} text={rowOneData.text} />

        <LabelledText label={rowTwoData.label} text={rowTwoData.text} />
      </View>
      <DispText text={rightSideText} textColor={colors.rightSideText} />
    </View>
  );
}


const cardStyles = StyleSheet.create({
  strip: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: scale(12),
    backgroundColor: colors.surface,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(6),

    elevation: 3,

    marginBottom: spacing.md
  },

  tray: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: spacing.xs
  }

});