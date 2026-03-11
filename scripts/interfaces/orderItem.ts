import { EquipmentDescription } from "../enums/equipment";

export default interface OrderItem{
    OrderItemID: number;
    OrderID: number;
    SupplyType: EquipmentDescription;
    Quantity:number;
}