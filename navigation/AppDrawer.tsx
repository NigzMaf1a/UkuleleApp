// navigation/AppDrawer.tsx

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// types
import {
    RootDrawerParamList,
    DrawerScreenConfig,
} from "./types";

// enum
import RegType from "../scripts/enums/regTypeTwo";

// config
import { roleScreens } from "./roleScreens";

// styles
import menuStyles from "../styles/menuStyles";
import { colors } from "../styles/colors";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

interface AppDrawerProps {
    regType: Exclude<RegType, RegType.Admin>;
    logOut: () => Promise<void>;
}

export default function AppDrawer({
    regType,
    logOut,
}: AppDrawerProps): React.JSX.Element {

    const screens: DrawerScreenConfig[] = roleScreens[regType];

    console.log(
        screens.map(s => s.name)
    );

    return (
        <Drawer.Navigator
            initialRouteName={screens[0].name}
            screenOptions={{
                headerShown: true,
                lazy: true,
                drawerType: "slide",

                // Drawer
                drawerStyle: menuStyles.drawer,
                drawerLabelStyle: menuStyles.label,
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.textSecondary,

                // Header
                headerStyle: menuStyles.header,
                headerTitleStyle: menuStyles.headerTitle,
                headerTintColor: colors.text,
            }}
        >
            {screens.map((screen: DrawerScreenConfig) => (
                <Drawer.Screen
                    key={screen.name}
                    name={screen.name}
                    options={{
                        title: screen.title,
                        drawerIcon: ({ color, size }) => (
                            <Ionicons
                                name={screen.icon as keyof typeof Ionicons.glyphMap}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                >
                    {(props) => {
                        if (screen.name === "Logout") {
                            const Component = screen.component;

                            return (
                                <Component
                                    {...props}
                                    logOut={logOut}
                                />
                            );
                        }

                        const Component = screen.component;

                        return <Component {...props} />;
                    }}
                </Drawer.Screen>
            ))}
        </Drawer.Navigator>
    );
}