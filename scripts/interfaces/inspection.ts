export default interface Inspection {
    EquipmentID:number;
    ServiceID:number;
    InspectionID:number;
    InspectionDate:string;
    InspectorName:string;
    dCondition: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4';
}