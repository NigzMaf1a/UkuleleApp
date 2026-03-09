import React from 'react';
import { View, StyleSheet } from 'react-native';

//components
import Button from '../components/Button';
import DispText from '../components/DispText';

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
    container:{},
    view:{},
    labelledText:{}
});