import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BandMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import BandDashboard from "../../views/users/band/BandDashboard";
import ApproveBookings from "../../views/users/band/ApproveBookings";
import BookingReports from "../../views/users/band/BookingReports";
import BandRequestDispatch from "../../views/users/band/RequestDispatch";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<BandMenuParamList>();

export default function BandMenu() {
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
              iconName = "musical-notes-outline";
              break;
            case "Bookings":
              iconName = "checkmark-done-outline";
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
        component={BandDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Bookings"
        component={ApproveBookings}
        options={{ title: "Approve Bookings" }}
      />
      <Drawer.Screen
        name="Dispatch"
        component={BandRequestDispatch}
        options={{ title: "Request Dispatch" }}
      />
      <Drawer.Screen
        name="Reports"
        component={BookingReports}
        options={{ title: "Booking Reports" }}
      />
    </Drawer.Navigator>
  );
}