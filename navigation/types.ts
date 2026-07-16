// navigation/types.ts

import type { ComponentType } from "react";
import RegType from "../scripts/enums/regTypeTwo";


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};


// --------------------------------------
// ROOT DRAWER
// --------------------------------------

export type RootDrawerParamList = {

  // Shared screens
  Profile: undefined;
  About: undefined;
  Contact: undefined;
  Help: undefined;
  Logout: undefined;


  // Customer
  CustomerDashboard: undefined;
  CustomerServices: undefined;
  CustomerPayments: undefined;
  CustomerPenalty: undefined;
  CustomerFeedback: undefined;
  CustomerReports: undefined;


  // Accountant
  AccountantDashboard: undefined;
  AccountantPayments: undefined;
  AccountantPenalties: undefined;
  AccountantOrders: undefined;
  AccountantReports: undefined;


  // Band
  BandDashboard: undefined;
  BandBookings: undefined;
  BandDispatch: undefined;
  BandReports: undefined;


  // DJ
  DJDashboard: undefined;
  DJPerformances: undefined;
  DJDispatch: undefined;
  DJReports: undefined;


  // Dispatch
  DispatchDashboard: undefined;
  DispatchRequests: undefined;
  DispatchReturns: undefined;
  DispatchReports: undefined;


  // Inspector
  InspectorDashboard: undefined;
  InspectorInspections: undefined;
  InspectorPenalties: undefined;
  InspectorReports: undefined;


  // Mcee
  MceeDashboard: undefined;
  MceePerformances: undefined;
  MceeDispatch: undefined;
  MceeReports: undefined;


  // Service
  ServiceDashboard: undefined;
  ServiceApprovals: undefined;
  ServiceReports: undefined;


  // Storeman
  StoreDashboard: undefined;
  StoreAddEquipment: undefined;
  StoreInventory: undefined;
  StoreSupplies: undefined;
  StoreOrders: undefined;
  StoreReports: undefined;


  // Supplier
  SupplierDashboard: undefined;
  SupplierSupplies: undefined;
  SupplierOrders: undefined;
  SupplierReports: undefined;
};


// --------------------------------------
// Drawer configuration
// --------------------------------------

export interface DrawerScreenConfig {

  name: keyof RootDrawerParamList;

  title: string;

  icon: keyof typeof import("@expo/vector-icons").Ionicons.glyphMap;

  component: ComponentType<any>;
}


// --------------------------------------
// Role configuration
// --------------------------------------

export type RoleDrawerConfig = {

  [key in Exclude<RegType, RegType.Admin>]: DrawerScreenConfig[];

};