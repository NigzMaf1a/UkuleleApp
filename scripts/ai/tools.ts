import RegType from "../enums/regType";
import { Tool } from "./toolTypes";

export const tools: Tool[] = [

    //-----------------------
    // GENERAL
    //-----------------------

    {
        id: "profile",
        screen: "Profile",
        title: "Profile",
        description: "View or edit your profile.",
        keywords: [
            "profile",
            "account",
            "my account",
            "edit profile"
        ],
        roles: Object.values(RegType)
    },

    {
        id: "help",
        screen: "Help",
        title: "Help",
        description: "Open the help assistant.",
        keywords: [
            "help",
            "support",
            "assistant"
        ],
        roles: Object.values(RegType)
    },

    {
        id: "contact",
        screen: "Contact",
        title: "Contact",
        description: "Contact customer support.",
        keywords: [
            "contact",
            "phone",
            "email",
            "support"
        ],
        roles: Object.values(RegType)
    },

    //-----------------------
    // CUSTOMER
    //-----------------------

    {
        id: "services",
        screen: "Services",
        title: "Services",
        description: "Browse available services.",
        keywords: [
            "services",
            "hire band",
            "hire dj",
            "hire mcee",
            "booking"
        ],
        roles: [RegType.Customer]
    },

    {
        id: "payments",
        screen: "Payments",
        title: "Payments",
        description: "View and pay invoices.",
        keywords: [
            "payments",
            "invoice",
            "pay",
            "balance"
        ],
        roles: [
            RegType.Customer,
            RegType.Accountant
        ]
    },

    //-----------------------
    // BAND
    //-----------------------

    {
        id: "bookings",
        screen: "Bookings",
        title: "Bookings",
        description: "View assigned bookings.",
        keywords: [
            "bookings",
            "jobs",
            "events"
        ],
        roles: [RegType.Band]
    },

    //-----------------------
    // STORE
    //-----------------------

    {
        id: "inventory",
        screen: "Inventory",
        title: "Inventory",
        description: "Manage inventory.",
        keywords: [
            "inventory",
            "stock",
            "equipment"
        ],
        roles: [RegType.Storeman]
    },

    {
        id: "supplies",
        screen: "Supplies",
        title: "Supplies",
        description: "Manage supplies.",
        keywords: [
            "supplies",
            "deliveries"
        ],
        roles: [
            RegType.Storeman,
            RegType.Supplier
        ]
    },

    //-----------------------
    // REPORTS
    //-----------------------

    {
        id: "reports",
        screen: "Reports",
        title: "Reports",
        description: "View reports.",
        keywords: [
            "reports",
            "analytics",
            "statistics"
        ],
        roles: [
            RegType.Accountant,
            RegType.Band,
            RegType.Customer,
            RegType.Dispatchman,
            RegType.DJ,
            RegType.Inspector,
            RegType.Mcee,
            RegType.ServiceManager,
            RegType.Storeman,
            RegType.Supplier
        ]
    }

];