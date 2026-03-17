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

interface ListItemProps{
    rowOneData:Row;
    rowTwoData:Row;
    rightSideText:string;
}

export default function ListItem({rowOneData, rowTwoData, rightSideText}:ListItemProps) {
  return (
    <View style={cardStyles.strip}>
        <View style={cardStyles.tray}>
            <LabelledText label={rowOneData.label}
                          text={rowOneData.text}
            />

            <LabelledText label={rowTwoData.label}
                          text={rowTwoData.text}
            />
        </View>
        <DispText text={rightSideText}/>
    </View>
  );
}


const cardStyles = StyleSheet.create({
  // main row container
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

  // left-side vertical stack
  tray: {
    width: "75%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: spacing.xs
  }
});