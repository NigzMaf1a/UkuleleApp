import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";

// views
import AboutUs from "../views/AboutUs";
import ContacUs from "../views/ContacUs";
import Help from "../views/Help";
import Profile from "../views/Profile";

// styles
import { colors } from "../styles/colors";
import menuStyles from "../styles/menuStyles";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        headerShown: true,
        lazy: true,

        // tab styles
        tabBarStyle: menuStyles.bottomTab,
        tabBarLabelStyle: menuStyles.label,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        // header styles
        headerStyle: menuStyles.header,
        headerTitleStyle: menuStyles.headerTitle,
        headerTintColor: colors.text,

        // icons per tab
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Profile":
              iconName = "person-outline";
              break;
            case "About":
              iconName = "information-circle-outline";
              break;
            case "Contact":
              iconName = "call-outline";
              break;
            case "Help":
              iconName = "help-circle-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />

      <Tab.Screen
        name="About"
        component={AboutUs}
        options={{ title: "About Us" }}
      />

      <Tab.Screen
        name="Contact"
        component={ContacUs}
        options={{ title: "Contact Us" }}
      />

      <Tab.Screen
        name="Help"
        component={Help}
        options={{ title: "Help" }}
      />
    </Tab.Navigator>
  );
}