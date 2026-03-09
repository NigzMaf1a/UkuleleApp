import EquipStatus from "../enums/allocatedEquipment";

export default interface AllocatedEquipment{
    AllocatedEquipmentID:number;
    EquipmentID:number;
    LendID:number;
    RegID:number;
    EquipStatus:EquipStatus;
}