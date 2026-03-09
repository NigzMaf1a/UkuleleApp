import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DispatchMenuParamList } from "../types";

//views
import DispatchDashboard from "../../views/users/dispatchman/DispatchDashboard";
import DispatchRequests from "../../views/users/dispatchman/DispatchRequests";
import DispatchReturnRequests from "../../views/users/dispatchman/DispatchReturnRequests";
import DispatchReport from "../../views/users/dispatchman/DispatchReport";

const Drawer = createDrawerNavigator<DispatchMenuParamList>();

export default function DispatchMenu(){
    <Drawer.Navigator>
        <Drawer.Screen
            name='Dashboard'
            component={DispatchDashboard}
        />

        <Drawer.Screen
            name='Dispatch'
            component={DispatchRequests}
        />

        <Drawer.Screen
            name='Return'
            component={DispatchReturnRequests}
        />

        <Drawer.Screen
            name='Reports'
            component={DispatchReport}
        />
    </Drawer.Navigator>
}