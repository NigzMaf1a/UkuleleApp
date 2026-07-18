//enums
import { EquipmentDescription } from "../enums/equipment";

export default interface ItemPayload {
    supplytype: EquipmentDescription;
    quantity: number;
}