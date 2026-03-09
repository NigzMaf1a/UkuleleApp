import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AccountantMenuParamList } from "../types";

//views
import AccountantDashboard from "../../views/users/accountant/AccountantDashboard";
import PendingPayments from "../../views/users/accountant/PendingPayments";
import AccountantReport from "../../views/users/accountant/AccountantReport";

const Drawer = createDrawerNavigator<AccountantMenuParamList>();

export default function AccountantMenu(){
    return (
        <Drawer.Navigator
            screenOptions={{
            headerShown: true,
            drawerType: "slide", 
        }}        
        >
            <Drawer.Screen 
                name='Dashboard'
                component={AccountantDashboard}
            />

            <Drawer.Screen
                name = 'Payments'
                component={PendingPayments}
            />

            <Drawer.Screen
                name='Reports'
                component={AccountantReport}
            />
        </Drawer.Navigator>
    );
}