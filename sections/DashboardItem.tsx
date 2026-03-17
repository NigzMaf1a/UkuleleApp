import React from 'react';
import { View, StyleSheet } from 'react-native';

//components
import Button from '../components/Button';
import DispText from '../components/DispText';

import { spacing } from '../styles/spacing';
import { scale } from '../styles/responsive';

export interface LabelledTextProps{
    label:string;
    text:string;
}

interface DashboardItemProps{
    btnLabel:string;
    labelledTextOne:LabelledTextProps;
    labelledTextTwo:LabelledTextProps;
}

function DashboardItemLabelledText({label, text}:LabelledTextProps){
    return(
        <View style={styles.labelledText}>
            <DispText text={label}/>
            <DispText text={text}/>
        </View>
    );
}

export default function DashboardItem({btnLabel, labelledTextOne, labelledTextTwo}:DashboardItemProps) {
  return (
    <View style={styles.container}>
        <View style={styles.view}>
            <DashboardItemLabelledText label={labelledTextOne.label} text={labelledTextOne.text}/>
            <DashboardItemLabelledText label={labelledTextTwo.label} text={labelledTextTwo.text}/>
        </View>
        <Button label={btnLabel}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: scale(12)
  },

  view: {
    width: "75%",
    flexDirection: "column",
    justifyContent: "center",
    gap: spacing.xs
  },

  labelledText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});;