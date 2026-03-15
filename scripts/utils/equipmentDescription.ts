import { DropDownItem } from "../../components/DropDown";
import { EquipmentCondition } from "../enums/equipment";
import describer from "./describer";

export default function equipmentDescription():DropDownItem[]{
    return [
        {
            label:describer(EquipmentCondition.CAT1),
            value:EquipmentCondition.CAT1
        },
        {
            label:describer(EquipmentCondition.CAT2),
            value:EquipmentCondition.CAT2
        },
        {
            label:describer(EquipmentCondition.CAT3),
            value:EquipmentCondition.CAT3
        },
        {
            label:describer(EquipmentCondition.CAT4),
            value:EquipmentCondition.CAT4
        }                        
    ];
}