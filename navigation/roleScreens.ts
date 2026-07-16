import RegType from "../scripts/enums/regTypeTwo";
import { DrawerScreenConfig, RoleDrawerConfig } from "./types";

// Shared screens

import Profile from "../views/Profile";
import AboutUs from "../views/AboutUs";
import ContactUs from "../views/ContacUs";
import Help from "../views/Help";
import Logout from "../views/Logout";

import CustomerDashboard from "../views/users/customer/CustomerDashboard";
import CustomerServices from "../views/users/customer/CustomerServices";
import CustomerPayment from "../views/users/customer/CustomerPayment";
import CustomerPenalty from "../views/users/customer/CustomerPenalty";
import CustomerFeedback from "../views/users/customer/CustomerFeedback";
import CustomerReports from "../views/users/customer/CustomerReports";

// --------------------
// Accountant
// --------------------

import AccountantDashboard from "../views/users/accountant/AccountantDashboard";
import PendingPayments from "../views/users/accountant/PendingPayments";
import AccountantPayOrder from "../views/users/accountant/AccountantPayOrder";
import AccountantPenalties from "../views/users/accountant/AccountantPenalties";
import AccountantReport from "../views/users/accountant/AccountantReport";

// --------------------
// Band
// --------------------

import BandDashboard from "../views/users/band/BandDashboard";
import ApproveBookings from "../views/users/band/ApproveBookings";
import BandRequestDispatch from "../views/users/band/RequestDispatch";
import BookingReports from "../views/users/band/BookingReports";

// --------------------
// DJ
// --------------------

import DeejayDashboard from "../views/users/dj/DeejayDashboard";
import DeejayPerformance from "../views/users/dj/DeejayPerformance";
import DjRequestDispatch from "../views/users/dj/RequestDispatch";
import DeejayReports from "../views/users/dj/DeejayReports";

// --------------------
// Dispatchman
// --------------------

import DispatchDashboard from "../views/users/dispatchman/DispatchDashboard";
import DispatchRequests from "../views/users/dispatchman/DispatchRequests";
import DispatchReturnRequests from "../views/users/dispatchman/DispatchReturnRequests";
import DispatchReport from "../views/users/dispatchman/DispatchReport";

// --------------------
// Inspector
// --------------------

import InspectorDashboard from "../views/users/inspector/InspectorDashboard";
import InspectorInspection from "../views/users/inspector/InspectorInspection";
import InspectorPenalties from "../views/users/inspector/InspectorPenalties";
import InspectorReport from "../views/users/inspector/InspectorReport";

// --------------------
// Mcee
// --------------------

import MceeDashboard from "../views/users/mcee/MceeDashboard";
import MceeApprovePerformance from "../views/users/mcee/MceeApprovePerformance";
import MceeRequestDispatch from "../views/users/mcee/RequestDispatch";
import MceeReport from "../views/users/mcee/MceeReport";

// --------------------
// Service
// --------------------

import ServiceManagerDashboard from "../views/users/service manager/ServiceManagerDashboard";
import ServiceApproval from "../views/users/service manager/ServiceApproval";
import ServiceRecords from "../views/users/service manager/ServiceRecords";

// --------------------
// Storeman
// --------------------

import InventoryDashboard from "../views/users/storeman/InventoryDashboard";
import InventoryAddEquipment from "../views/users/storeman/InventoryAddEquipment";
import InventoryInventory from "../views/users/storeman/InventoryInventory";
import InventorySupplies from "../views/users/storeman/InventorySupplies";
import InventoryOrders from "../views/users/storeman/InventoryOrders";
import InventoryReport from "../views/users/storeman/InventoryReport";

// --------------------
// Supplier
// --------------------

import SupplierDashboard from "../views/users/supplier/SupplierDashboard";
import SupplierAvailable from "../views/users/supplier/SupplierAvailable";
import SupplyPendingOrders from "../views/users/supplier/SupplyPendingOrders";
import SupplyReport from "../views/users/supplier/SupplyReport";

const commonScreens: DrawerScreenConfig[] = [
    {
        name: "Profile",
        title: "Profile",
        icon: "person-outline",
        component: Profile
    },
    {
        name: "About",
        title: "About Us",
        icon: "information-circle-outline",
        component: AboutUs
    },
    {
        name: "Contact",
        title: "Contact Us",
        icon: "call-outline",
        component: ContactUs
    },
    {
        name: "Help",
        title: "Help",
        icon: "help-circle-outline",
        component: Help
    }
];

export const roleScreens: RoleDrawerConfig = {

    [RegType.Customer]: [

        {
            name: "CustomerDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: CustomerDashboard
        },
        {
            name: "CustomerServices",
            title: "Services",
            icon: "construct-outline",
            component: CustomerServices
        },
        {
            name: "CustomerPayments",
            title: "Payments",
            icon: "card-outline",
            component: CustomerPayment
        },
        {
            name: "CustomerPenalty",
            title: "Penalty",
            icon: "alert-circle-outline",
            component: CustomerPenalty
        },
        {
            name: "CustomerFeedback",
            title: "Feedback",
            icon: "chatbubble-outline",
            component: CustomerFeedback
        },
        {
            name: "CustomerReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: CustomerReports
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Accountant]: [

        {
            name: "AccountantDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: AccountantDashboard
        },
        {
            name: "AccountantPayments",
            title: "Pending Payments",
            icon: "card-outline",
            component: PendingPayments
        },
        {
            name: "AccountantPenalties",
            title: "Verify Penalties",
            icon: "alert-circle-outline",
            component: AccountantPenalties
        },
        {
            name: "AccountantOrders",
            title: "Order Payment",
            icon: "cart-outline",
            component: AccountantPayOrder
        },
        {
            name: "AccountantReports",
            title: "Financial Reports",
            icon: "stats-chart-outline",
            component: AccountantReport
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Band]: [

        {
            name: "BandDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: BandDashboard
        },
        {
            name: "BandBookings",
            title: "Bookings",
            icon: "calendar-outline",
            component: ApproveBookings
        },
        {
            name: "BandDispatch",
            title: "Dispatch",
            icon: "car-outline",
            component: BandRequestDispatch
        },
        {
            name: "BandReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: BookingReports
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.DJ]: [

        {
            name: "DJDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: DeejayDashboard
        },
        {
            name: "DJPerformances",
            title: "Performances",
            icon: "musical-notes-outline",
            component: DeejayPerformance
        },
        {
            name: "DJDispatch",
            title: "Dispatch",
            icon: "car-outline",
            component: DjRequestDispatch
        },
        {
            name: "DJReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: DeejayReports
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Dispatchman]: [

        {
            name: "DispatchDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: DispatchDashboard
        },
        {
            name: "DispatchRequests",
            title: "Dispatch Requests",
            icon: "car-outline",
            component: DispatchRequests
        },
        {
            name: "DispatchReturns",
            title: "Return Requests",
            icon: "return-up-back-outline",
            component: DispatchReturnRequests
        },
        {
            name: "DispatchReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: DispatchReport
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Inspector]: [

        {
            name: "InspectorDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: InspectorDashboard
        },
        {
            name: "InspectorInspections",
            title: "Inspections",
            icon: "search-outline",
            component: InspectorInspection
        },
        {
            name: "InspectorPenalties",
            title: "Penalties",
            icon: "alert-circle-outline",
            component: InspectorPenalties
        },
        {
            name: "InspectorReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: InspectorReport
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Mcee]: [

        {
            name: "MceeDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: MceeDashboard
        },
        {
            name: "MceePerformances",
            title: "Performances",
            icon: "mic-outline",
            component: MceeApprovePerformance
        },
        {
            name: "MceeDispatch",
            title: "Dispatch",
            icon: "car-outline",
            component: MceeRequestDispatch
        },
        {
            name: "MceeReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: MceeReport
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.ServiceManager]: [

        {
            name: "ServiceDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: ServiceManagerDashboard
        },
        {
            name: "ServiceApprovals",
            title: "Service Approvals",
            icon: "checkmark-circle-outline",
            component: ServiceApproval
        },
        {
            name: "ServiceReports",
            title: "Service Records",
            icon: "stats-chart-outline",
            component: ServiceRecords
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Storeman]: [

        {
            name: "StoreDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: InventoryDashboard
        },
        {
            name: "StoreAddEquipment",
            title: "Add Equipment",
            icon: "add-circle-outline",
            component: InventoryAddEquipment
        },
        {
            name: "StoreInventory",
            title: "Inventory",
            icon: "cube-outline",
            component: InventoryInventory
        },
        {
            name: "StoreSupplies",
            title: "Supplies",
            icon: "albums-outline",
            component: InventorySupplies
        },
        {
            name: "StoreOrders",
            title: "Orders",
            icon: "cart-outline",
            component: InventoryOrders
        },
        {
            name: "StoreReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: InventoryReport
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ],

    [RegType.Supplier]: [

        {
            name: "SupplierDashboard",
            title: "Dashboard",
            icon: "grid-outline",
            component: SupplierDashboard
        },
        {
            name: "SupplierSupplies",
            title: "Available Supplies",
            icon: "cube-outline",
            component: SupplierAvailable
        },
        {
            name: "SupplierOrders",
            title: "Pending Orders",
            icon: "cart-outline",
            component: SupplyPendingOrders
        },
        {
            name: "SupplierReports",
            title: "Reports",
            icon: "stats-chart-outline",
            component: SupplyReport
        },
        {
            name: "Logout",
            title: "Log Out",
            icon: "log-out-outline",
            component: Logout,
        },

        ...commonScreens
    ]
};