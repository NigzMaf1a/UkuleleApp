import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AccountantMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import AccountantDashboard from "../../views/users/accountant/AccountantDashboard";
import PendingPayments from "../../views/users/accountant/PendingPayments";
import AccountantReport from "../../views/users/accountant/AccountantReport";
import AccountantPayOrder from "../../views/users/accountant/AccountantPayOrder";
import AccountantPenalties from "../../views/users/accountant/AccountantPenalties";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<AccountantMenuParamList>();

export default function AccountantMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: true,
        lazy: true,
        drawerType: "slide",

        // modular drawer styles
        drawerStyle: menuStyles.drawer,
        drawerLabelStyle: menuStyles.label,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,

        // modular header styles
        headerStyle: menuStyles.header,
        headerTitleStyle: menuStyles.headerTitle,
        headerTintColor: colors.text,

        // icons per route
        drawerIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "grid-outline";
              break;
            case "Payments":
              iconName = "card-outline";
              break;
            case "Penalties":
              iconName = "alert-circle-outline";
              break;
            case "Orders":
              iconName = "cart-outline";
              break;
            case "Reports":
              iconName = "stats-chart-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={AccountantDashboard}
        options={{ title: "Dashboard" }}
      />

      <Drawer.Screen
        name="Payments"
        component={PendingPayments}
        options={{ title: "Pending Payments" }}
      />

      <Drawer.Screen
        name='Penalties'
        component={AccountantPenalties}
        options={{ title: "Verify Penalties" }}
      />

      <Drawer.Screen
        name='Orders'
        component={AccountantPayOrder}
        options={{ title: "Order Payment" }}
      />

      <Drawer.Screen
        name="Reports"
        component={AccountantReport}
        options={{ title: "Financial Reports" }}
      />
    </Drawer.Navigator>
  );
}