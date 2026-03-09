import React, {useEffect, useState} from 'react';
import { View } from 'react-native';

//components
import ScrollScreen from '../components/ScrollScreen';
import ListItem from './ListItem';
import ListItemWithButton from './ListItemwithButton';
import DispText from '../components/DispText';

//styles
import { cardStyles } from '../styles/cardStyles';



function DashboardSection(){
    return (
        <View style={cardStyles.card}></View>
    );
}



export default function Dashboard() {
  return (
    <div>Dashboard</div>
  );
}