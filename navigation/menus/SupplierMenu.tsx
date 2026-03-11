import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SupplierMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import SupplierDashboard from "../../views/users/supplier/SupplierDashboard";
import SupplierAvailable from "../../views/users/supplier/SupplierAvailable";
import SupplyPendingOrders from "../../views/users/supplier/SupplyPendingOrders";
import SupplyReport from "../../views/users/supplier/SupplyReport";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<SupplierMenuParamList>();

export default function SupplierMenu() {
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

        // icons
        drawerIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "home-outline";
              break;
            case "Supplies":
              iconName = "cube-outline";
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
        component={SupplierDashboard}
        options={{ title: "Dashboard" }}
      />

      <Drawer.Screen
        name="Supplies"
        component={SupplierAvailable}
        options={{ title: "Available Supplies" }}
      />

      <Drawer.Screen
        name="Orders"
        component={SupplyPendingOrders}
        options={{ title: "Pending Orders" }}
      />

      <Drawer.Screen
        name="Reports"
        component={SupplyReport}
        options={{ title: "Supply Reports" }}
      />
    </Drawer.Navigator>
  );
}