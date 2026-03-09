import { EquipmentCondition } from "../enums/equipment";

export default interface Inspection {
    EquipmentID:number;
    ServiceID:number;
    InspectionID:number;
    InspectionDate:string;
    InspectorName:string;
    dCondition: EquipmentCondition;
}