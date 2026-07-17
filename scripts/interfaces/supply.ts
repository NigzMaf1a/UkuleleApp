import { SupplyAvailable } from "../enums/supply";
import { EquipmentDescription } from "../enums/equipment";

export default interface Supply {
    supplyid: number;
    price: number;
    suppliername: string;
    supplydate: string;
    phoneno: string;
    supplytype: EquipmentDescription;
    available: SupplyAvailable;
    availableunits: number;
    supplystatus: 'Delivered' | 'Undelivered';
}