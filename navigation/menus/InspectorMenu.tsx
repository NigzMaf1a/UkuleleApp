import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { InspectorMenuParamList } from "../types";

//views
import InspectorDashboard from "../../views/users/inspector/InspectorDashboard";
import InspectorInspection from "../../views/users/inspector/InspectorInspection";
import InspectorReport from "../../views/users/inspector/InspectorReport";

const Drawer = createDrawerNavigator<InspectorMenuParamList>();

export default function InspectorMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={InspectorDashboard}
            />

            <Drawer.Screen
                name='Inspections'
                component={InspectorInspection}
            />

            <Drawer.Screen
                name='Reports'
                component={InspectorReport}
            />
        </Drawer.Navigator>
    );
}