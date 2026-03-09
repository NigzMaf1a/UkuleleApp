import { DropDownItem } from "../../components/DropDown";
import { EquipmentDescription } from "../enums/equipment";
import { EquipmentCondition } from "../enums/equipment";
import describer from "./describer";

export default function equipmentTypeArray():DropDownItem[]{
    return [
        {
            label:'Speaker',
            value:EquipmentDescription.Speaker
        },
        {
            label:'Microphone',
            value:EquipmentDescription.Microphone
        },
        {
            label:'Mixer',
            value:EquipmentDescription.Mixer
        },
        {
            label:'CDJ',
            value:EquipmentDescription.CDJ
        },
        {
            label:'Cable',
            value:EquipmentDescription.Cable
        },
        {
            label:'Wireless',
            value:EquipmentDescription.Wireless
        }
    ];
}


export function equipmentConditionArray():DropDownItem[]{
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