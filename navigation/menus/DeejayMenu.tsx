import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DjMenuParamList } from "../types";

//views
import DeejayDashboard from "../../views/users/dj/DeejayDashboard";
import DeejayPerformance from "../../views/users/dj/DeejayPerformance";
import DeejayReports from "../../views/users/dj/DeejayReports";

const Drawer = createDrawerNavigator<DjMenuParamList>();

export default function DeejayMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={DeejayDashboard}
            />

            <Drawer.Screen
                name='Performances'
                component={DeejayPerformance}
            />

            <Drawer.Screen
                name='Reports'
                component={DeejayReports}
            />
        </Drawer.Navigator>
    );
}