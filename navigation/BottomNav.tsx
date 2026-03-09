import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./types";

//views
import AboutUs from '../views/AboutUs';
import ContacUs from '../views/ContacUs';
import Help from '../views/Help';
import Profile from '../views/Profile';


const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name="Profile" 
            component={Profile}
        />
        <Tab.Screen 
            name='About' 
            component={AboutUs}
        />
        <Tab.Screen
            name='Contact'
            component={ContacUs}
        />
        <Tab.Screen 
            name='Help'
            component={Help}
        />
    </Tab.Navigator>
  );
}