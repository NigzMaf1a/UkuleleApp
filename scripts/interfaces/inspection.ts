import { EquipmentCondition } from "../enums/equipment";

export default interface Inspection {
    equipmentid: number;
    serviceid: number;
    inspectionid?: number;
    inspectiondate: Date;
    inspectorname: string;
    dcondition: EquipmentCondition;
}