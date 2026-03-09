import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StoreMenuParamList } from "../types";

//views
import InventoryDashboard from "../../views/users/storeman/InventoryDashboard";
import InventoryAddEquipment from "../../views/users/storeman/InventoryAddEquipment";
import InventoryInventory from "../../views/users/storeman/InventoryInventory";
import InventorySupplies from "../../views/users/storeman/InventorySupplies";
import InventoryOrders from "../../views/users/storeman/InventoryOrders";
import InventoryReport from "../../views/users/storeman/InventoryReport";

const Drawer = createDrawerNavigator<StoreMenuParamList>();

export default function StoreMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={InventoryDashboard}
            />

            <Drawer.Screen
                name='Add'
                component={InventoryAddEquipment}
            />

            <Drawer.Screen
                name='Inventory'
                component={InventoryInventory}
            />

            <Drawer.Screen
                name='Supplies'
                component={InventorySupplies}
            />

            <Drawer.Screen
                name='Orders'
                component={InventoryOrders}
            />

            <Drawer.Screen
                name='Reports'
                component={InventoryReport}
            />
        </Drawer.Navigator>
    );
}