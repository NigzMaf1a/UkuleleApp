import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DispatchMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import DispatchDashboard from "../../views/users/dispatchman/DispatchDashboard";
import DispatchRequests from "../../views/users/dispatchman/DispatchRequests";
import DispatchReturnRequests from "../../views/users/dispatchman/DispatchReturnRequests";
import DispatchReport from "../../views/users/dispatchman/DispatchReport";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<DispatchMenuParamList>();

export default function DispatchMenu() {
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
            case "Dispatch":
              iconName = "rocket-outline";
              break;
            case "Return":
              iconName = "return-up-back-outline";
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
        component={DispatchDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Dispatch"
        component={DispatchRequests}
        options={{ title: "Dispatch Requests" }}
      />
      <Drawer.Screen
        name="Return"
        component={DispatchReturnRequests}
        options={{ title: "Return Requests" }}
      />
      <Drawer.Screen
        name="Reports"
        component={DispatchReport}
        options={{ title: "Reports" }}
      />
    </Drawer.Navigator>
  );
}