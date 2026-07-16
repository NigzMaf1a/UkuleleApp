import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";

import ScrollScreen from "../components/ScrollScreen";
import Button from "../components/Button";


interface LogoutProps {
    logOut: () => Promise<void>;
}

export default function Logout({
    logOut,
}: LogoutProps) {

    return (
        <ScrollScreen
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button
                label="Log Out"
                fun={logOut}
            />
        </ScrollScreen>
    );
}