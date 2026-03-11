import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ServiceMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import ServiceManagerDashboard from "../../views/users/service manager/ServiceManagerDashboard";
import ServiceApproval from "../../views/users/service manager/ServiceApproval";
import ServiceRecords from "../../views/users/service manager/ServiceRecords";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<ServiceMenuParamList>();

export default function ServiceMenu() {
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
            case "Services":
              iconName = "construct-outline";
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
        component={ServiceManagerDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Services"
        component={ServiceApproval}
        options={{ title: "Service Approvals" }}
      />
      <Drawer.Screen
        name="Reports"
        component={ServiceRecords}
        options={{ title: "Service Reports" }}
      />
    </Drawer.Navigator>
  );
}