import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BandMenuParamList } from "../types";

//views
import BandDashboard from "../../views/users/band/BandDashboard";
import ApproveBookings from "../../views/users/band/ApproveBookings";
import BookingReports from "../../views/users/band/BookingReports";

const Drawer = createDrawerNavigator<BandMenuParamList>();

export default function BandMenu(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Dashboard'
                component={BandDashboard}
            />

            <Drawer.Screen
                name='Bookings'
                component={ApproveBookings}
            />

            <Drawer.Screen
                name='Reports'
                component={BookingReports}
            />
        </Drawer.Navigator>
    );
}