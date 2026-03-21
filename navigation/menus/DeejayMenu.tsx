import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DjMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import DeejayDashboard from "../../views/users/dj/DeejayDashboard";
import DeejayPerformance from "../../views/users/dj/DeejayPerformance";
import DeejayReports from "../../views/users/dj/DeejayReports";
import DjRequestDispatch from "../../views/users/dj/RequestDispatch";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<DjMenuParamList>();

export default function DeejayMenu() {
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
              iconName = "musical-note-outline";
              break;
            case "Performances":
              iconName = "analytics-outline";
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
        component={DeejayDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Performances"
        component={DeejayPerformance}
        options={{ title: "Performances" }}
      />
      <Drawer.Screen
        name="Dispatch"
        component={DeejayPerformance}
        options={{ title: "Request Dispatch" }}
      />      
      <Drawer.Screen
        name="Reports"
        component={DeejayReports}
        options={{ title: "Reports" }}
      />
    </Drawer.Navigator>
  );
}