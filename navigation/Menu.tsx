//Menus
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

type RegType = 'Customer' | 'Band';

interface MenuProps{
    regType:RegType;
}

export default function Menu(){}