import { SupplyAvailable } from "../enums/supply";
import { EquipmentDescription } from "../enums/equipment";

export default interface Supply{
    SupplyID:number;
    Price:number;
    SupplierName:string;
    SupplyDate:string;
    PhoneNo:string;
    SupplyType:EquipmentDescription;
    Available:SupplyAvailable;
    AvailableUnits:number;
    SupplyStatus:'Delivered' | 'Undelivered';
}