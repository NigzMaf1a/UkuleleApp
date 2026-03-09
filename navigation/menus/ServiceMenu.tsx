import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ServiceMenuParamList } from "../types";

//views
import ServiceManagerDashboard from "../../views/users/service manager/ServiceManagerDashboard";
import ServiceApproval from "../../views/users/service manager/ServiceApproval";
import ServiceRecords from "../../views/users/service manager/ServiceRecords";

const Drawer = createDrawerNavigator<ServiceMenuParamList>();

export default function ServiceMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={ServiceManagerDashboard}
            />

            <Drawer.Screen
                name='Services'
                component={ServiceApproval}
            />

            <Drawer.Screen
                name='Reports'
                component={ServiceRecords}
            />
        </Drawer.Navigator>
    );
}