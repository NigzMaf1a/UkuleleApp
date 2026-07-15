import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../views/Login";
import Registration from "../views/Register";

type RegType =
    | "Customer"
    | "Band"
    | "Accountant"
    | "DJ"
    | "Dispatch"
    | "Inspector"
    | "Mcee"
    | "Service"
    | "Store"
    | "Supplier";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthStackProps {
    setRole: (role: RegType | null) => void;
}

export default function AuthStack({ setRole }: AuthStackProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {() => <Login setRole={setRole} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
                {() => <Registration />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
