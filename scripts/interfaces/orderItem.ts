import { EquipmentDescription } from "../enums/equipment";

export default interface OrderItem {
    orderitemid: number;
    orderid: number;
    supplytype: EquipmentDescription;
    quantity: number;
}