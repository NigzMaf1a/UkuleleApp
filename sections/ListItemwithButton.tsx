import React from 'react';
import { View } from 'react-native';

//components
import DispText from '../components/DispText';
import Button from '../components/Button';

//styles
import { cardStyles } from '../styles/cardStyles';

export interface Row{
  label:string;
  text:string;
}

interface ItemProps{
  buttonLabel:string;
  rowOneData:Row;
  rowTwoData:Row;
  fun:(par?:string | number) => Promise<void>
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