import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomerMenuParamList } from "../types";

//views
import CustomerDashboard from "../../views/users/customer/CustomerDashboard";
import CustomerServices from "../../views/users/customer/CustomerServices";
import CustomerPayment from "../../views/users/customer/CustomerPayment";
import CustomerPenalty from "../../views/users/customer/CustomerPenalty";
import CustomerFeedback from "../../views/users/customer/CustomerFeedback";
import CustomerReports from "../../views/users/customer/CustomerReports";

const Drawer = createDrawerNavigator<CustomerMenuParamList>();

export default function CustomerMenu(){
    <Drawer.Navigator>
        <Drawer.Screen
            name='Dashboard'
            component={CustomerDashboard}
        />

        <Drawer.Screen
            name='Services'
            component={CustomerServices}
        />

        <Drawer.Screen
            name='Payments'
            component={CustomerPayment}
        />

        <Drawer.Screen
            name='Penalty'
            component={CustomerPenalty}
        />

        <Drawer.Screen
            name='Feedback'
            component={CustomerFeedback}
        />

        <Drawer.Screen
            name='Report'
            component={CustomerReports}
        />
    </Drawer.Navigator>
}