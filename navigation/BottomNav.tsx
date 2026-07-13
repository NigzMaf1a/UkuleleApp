import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "./types";

// views
import AboutUs from "../views/AboutUs";
import ContactUs from "../views/ContacUs";
import Help from "../views/Help";
import Profile from "../views/Profile";

// styles
import { colors } from "../styles/colors";
import menuStyles from "../styles/menuStyles";

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface BottomNavProps {
  DrawerMenu: React.ComponentType;
}

export default function BottomNav({ DrawerMenu }: BottomNavProps) {
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        // "Menu" is the Drawer — it manages its own header, so suppress the Tab's here
        headerShown: route.name !== "Menu",
        lazy: true,

        tabBarStyle: menuStyles.bottomTab,
        tabBarLabelStyle: menuStyles.label,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        headerStyle: menuStyles.header,
        headerTitleStyle: menuStyles.headerTitle,
        headerTintColor: colors.text,

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Menu":
              iconName = "menu-outline";
              break;
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
        }
      })}
    >
      <Tab.Screen name="Menu" component={DrawerMenu} options={{ title: "Menu" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
      <Tab.Screen name="About" component={AboutUs} options={{ title: "About Us" }} />
      <Tab.Screen name="Contact" component={ContactUs} options={{ title: "Contact Us" }} />
      <Tab.Screen name="Help" component={Help} options={{ title: "Help" }} />
    </Tab.Navigator>
  );
}
