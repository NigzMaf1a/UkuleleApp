import EquipStatus from "../enums/allocatedEquipment";

export default interface AllocatedEquipment {
    allocatedequipmentid: number;
    equipmentid: number;
    lendid: number;
    regid: number;
    equipstatus: EquipStatus;
}