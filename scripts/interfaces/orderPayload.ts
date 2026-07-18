import { EquipmentDescription } from "../enums/equipment";

interface OrderItemPayload {
    supplytype: EquipmentDescription;
    quantity: number;
}