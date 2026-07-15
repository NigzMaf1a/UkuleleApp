import React from "react";
import { View, StyleSheet } from "react-native";

// Menus
import AccountantMenu from "./menus/AccountantMenu";
import BandMenu from "./menus/BandMenu";
import CustomerMenu from "./menus/CustomerMenu";
import DeejayMenu from "./menus/DeejayMenu";
import DispatchMenu from "./menus/DispatchMenu";
import InspectorMenu from "./menus/InspectorMenu";
import MceeMenu from "./menus/MceeMenu";
import ServiceMenu from "./menus/ServiceMenu";
import StoreMenu from "./menus/StoreMenu";
import SupplierMenu from "./menus/SupplierMenu";
import BottomNav from "./BottomNav";

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

interface MenuProps {
  regType: RegType;
}

export default function Menu({ regType }: MenuProps) {

  // Map role → menu component
  const menuMap: Record<RegType, React.ComponentType> = {
    Customer: CustomerMenu,
    Band: BandMenu,
    Accountant: AccountantMenu,
    DJ: DeejayMenu,
    Dispatch: DispatchMenu,
    Inspector: InspectorMenu,
    Mcee: MceeMenu,
    Service: ServiceMenu,
    Store: StoreMenu,
    Supplier: SupplierMenu
  };

  const DrawerMenu = menuMap[regType];

  return (
    <View style={styles.container}>
      {/* Drawer Navigation */}
      <View style={styles.drawer}>
        <DrawerMenu />
      </View>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawer: {
    flex: 1
  }
});