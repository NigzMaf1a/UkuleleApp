import React from 'react';
import { View } from 'react-native';

//components
import DispText from '../components/DispText';
import Button from '../components/Button';

//styles
import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { scale } from "../styles/responsive";
import { typography } from "../styles/typography";

const cardStyles = StyleSheet.create({
  // Main horizontal container: tray + button
  strip: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: scale(12),
    backgroundColor: colors.surface,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 3,
    marginBottom: spacing.md
  },

  // Left-side vertical stack
  tray: {
    width: "75%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: spacing.xs
  },

  // Horizontal row for label + value
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  // Optional: style for text inside row (if you want to override DispText)
  rowLabel: {
    ...typography.body,
    color: colors.text
  },

  rowValue: {
    ...typography.body,
    color: colors.textSecondary
  }
});

export interface Row{
  label:string;
  text:string;
}

interface ItemProps{
  buttonLabel:string;
  rowOneData:Row;
  rowTwoData:Row;
  fun:(par?:string | number) => Promise<void> | void;
}

export default function ListItemWithButton({buttonLabel, rowOneData, rowTwoData, fun}:ItemProps) {
  return (
    <View style={cardStyles.strip}>
      <View style={cardStyles.tray}>
        <View style={cardStyles.row}>
          <DispText text={rowOneData.label}/>
          <DispText text={rowOneData.text}/>
        </View>
        <View style={cardStyles.row}>
          <DispText text={rowTwoData.label}/>
          <DispText text={rowTwoData.text}/>
        </View>
      </View>
      <Button label={buttonLabel} fun={fun}/>
    </View>
  )
}