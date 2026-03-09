import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SupplierMenuParamList } from "../types";

//views
import SupplierDashboard from "../../views/users/supplier/SupplierDashboard";
import SupplierAvailable from "../../views/users/supplier/SupplierAvailable";
import SupplyPendingOrders from "../../views/users/supplier/SupplyPendingOrders";
import SupplyReport from "../../views/users/supplier/SupplyReport";

const Drawer = createDrawerNavigator<SupplierMenuParamList>();

export default function SupplierMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={SupplierDashboard}
            />

            <Drawer.Screen
                name='Supplies'
                component={SupplierAvailable}
            />

            <Drawer.Screen
                name='Orders'
                component={SupplyPendingOrders}
            />

            <Drawer.Screen
                name='Reports'
                component={SupplyReport}
            />
        </Drawer.Navigator>
    );
}