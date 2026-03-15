import { EquipmentCondition } from "../enums/equipment";

export default interface Inspection {
    EquipmentID:number;
    ServiceID:number;
    InspectionID?:number;
    InspectionDate:Date;
    InspectorName:string;
    dCondition: EquipmentCondition;
}