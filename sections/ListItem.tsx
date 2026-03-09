import React from 'react';
import { View, Text } from 'react-native';

//components
import LabelledText from '../components/LabelledText';
import DispText from '../components/DispText';

//styles
import { cardStyles } from '../styles/cardStyles';
import { typography } from '../styles/typography';

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