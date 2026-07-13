import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { InspectorMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import InspectorDashboard from "../../views/users/inspector/InspectorDashboard";
import InspectorInspection from "../../views/users/inspector/InspectorInspection";
import InspectorReport from "../../views/users/inspector/InspectorReport";
import InspectorPenalties from "../../views/users/inspector/InspectorPenalties";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<InspectorMenuParamList>();

export default function InspectorMenu() {
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
            case "Inspections":
              iconName = "eye-outline";
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
        component={InspectorDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Inspections"
        component={InspectorInspection}
        options={{ title: "Inspections" }}
      />
      <Drawer.Screen
        name="Penalties"
        component={InspectorPenalties}
        options={{ title: "Penalties" }}
      />
      <Drawer.Screen
        name="Reports"
        component={InspectorReport}
        options={{ title: "Reports" }}
      />
    </Drawer.Navigator>
  );
}