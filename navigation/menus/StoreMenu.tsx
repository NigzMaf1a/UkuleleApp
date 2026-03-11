import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StoreMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import InventoryDashboard from "../../views/users/storeman/InventoryDashboard";
import InventoryAddEquipment from "../../views/users/storeman/InventoryAddEquipment";
import InventoryInventory from "../../views/users/storeman/InventoryInventory";
import InventorySupplies from "../../views/users/storeman/InventorySupplies";
import InventoryOrders from "../../views/users/storeman/InventoryOrders";
import InventoryReport from "../../views/users/storeman/InventoryReport";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<StoreMenuParamList>();

export default function StoreMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: true,
        lazy: true,
        drawerType: "slide",

        // drawer styles
        drawerStyle: menuStyles.drawer,
        drawerLabelStyle: menuStyles.label,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,

        // header styles
        headerStyle: menuStyles.header,
        headerTitleStyle: menuStyles.headerTitle,
        headerTintColor: colors.text,

        // route icons
        drawerIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "home-outline";
              break;
            case "Add":
              iconName = "add-circle-outline";
              break;
            case "Inventory":
              iconName = "cube-outline";
              break;
            case "Supplies":
              iconName = "layers-outline";
              break;
            case "Orders":
              iconName = "cart-outline";
              break;
            case "Reports":
              iconName = "bar-chart-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={InventoryDashboard}
        options={{ title: "Dashboard" }}
      />

      <Drawer.Screen
        name="Add"
        component={InventoryAddEquipment}
        options={{ title: "Add Equipment" }}
      />

      <Drawer.Screen
        name="Inventory"
        component={InventoryInventory}
        options={{ title: "Inventory" }}
      />

      <Drawer.Screen
        name="Supplies"
        component={InventorySupplies}
        options={{ title: "Supplies" }}
      />

      <Drawer.Screen
        name="Orders"
        component={InventoryOrders}
        options={{ title: "Orders" }}
      />

      <Drawer.Screen
        name="Reports"
        component={InventoryReport}
        options={{ title: "Inventory Reports" }}
      />
    </Drawer.Navigator>
  );
}