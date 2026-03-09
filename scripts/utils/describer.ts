//enums
import { EquipmentCondition } from "../enums/equipment";

export default function describer(val:EquipmentCondition):string{
    switch(val){
        case EquipmentCondition.CAT1:
            return 'In condition';
        case EquipmentCondition.CAT2:
            return 'Slightly damaged';
        case EquipmentCondition.CAT3:
            return 'Critically damaged';
        default:
            return 'Must be replaced';
    }
}