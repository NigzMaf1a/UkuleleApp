import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MceeMenuParamList } from "../types";

//views
import MceeDashboard from "../../views/users/mcee/MceeDashboard";
import MceeApprovePerformance from "../../views/users/mcee/MceeApprovePerformance";
import MceeReport from "../../views/users/mcee/MceeReport";

const Drawer = createDrawerNavigator<MceeMenuParamList>();

export default function MceeMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={MceeDashboard}
            />

            <Drawer.Screen
                name='Performances'
                component={MceeApprovePerformance}
            />

            <Drawer.Screen
                name='Reports'
                component={MceeReport}
            />
        </Drawer.Navigator>
    );
}