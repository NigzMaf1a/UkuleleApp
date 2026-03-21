import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MceeMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import MceeDashboard from "../../views/users/mcee/MceeDashboard";
import MceeApprovePerformance from "../../views/users/mcee/MceeApprovePerformance";
import MceeReport from "../../views/users/mcee/MceeReport";
import MceeRequestDispatch from "../../views/users/mcee/RequestDispatch";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<MceeMenuParamList>();

export default function MceeMenu() {
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
              iconName = "home-outline";
              break;
            case "Performances":
              iconName = "mic-outline";
              break;
            case "Dispatch":
              iconName = "rocket-outline";
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
        component={MceeDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Performances"
        component={MceeApprovePerformance}
        options={{ title: "Approve Performances" }}
      />
      <Drawer.Screen
        name="Dispatch"
        component={MceeRequestDispatch}
        options={{ title: "Dispatch" }}
      />      
      <Drawer.Screen
        name="Reports"
        component={MceeReport}
        options={{ title: "Reports" }}
      />
    </Drawer.Navigator>
  );
}