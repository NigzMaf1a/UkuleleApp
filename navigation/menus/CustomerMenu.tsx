import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomerMenuParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

// views
import CustomerDashboard from "../../views/users/customer/CustomerDashboard";
import CustomerServices from "../../views/users/customer/CustomerServices";
import CustomerPayment from "../../views/users/customer/CustomerPayment";
import CustomerPenalty from "../../views/users/customer/CustomerPenalty";
import CustomerFeedback from "../../views/users/customer/CustomerFeedback";
import CustomerReports from "../../views/users/customer/CustomerReports";

// styles
import { colors } from "../../styles/colors";
import menuStyles from "../../styles/menuStyles";

const Drawer = createDrawerNavigator<CustomerMenuParamList>();

export default function CustomerMenu() {
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
              iconName = "list-outline";
              break;
            case "Payments":
              iconName = "card-outline";
              break;
            case "Penalty":
              iconName = "alert-circle-outline";
              break;
            case "Feedback":
              iconName = "chatbubbles-outline";
              break;
            case "Report":
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
        component={CustomerDashboard}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen
        name="Services"
        component={CustomerServices}
        options={{ title: "Services" }}
      />
      <Drawer.Screen
        name="Payments"
        component={CustomerPayment}
        options={{ title: "Payments" }}
      />
      <Drawer.Screen
        name="Penalty"
        component={CustomerPenalty}
        options={{ title: "Penalties" }}
      />
      <Drawer.Screen
        name="Feedback"
        component={CustomerFeedback}
        options={{ title: "Feedback" }}
      />
      <Drawer.Screen
        name="Report"
        component={CustomerReports}
        options={{ title: "Reports" }}
      />
    </Drawer.Navigator>
  );
}