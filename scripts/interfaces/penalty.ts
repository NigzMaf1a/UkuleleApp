import { PenaltyStatus } from "../enums/penalty";
import { EquipmentCondition } from "../enums/equipment";

export default interface Penalty {
    penaltyid?: number;
    equipmentid: number;
    customerid: number;
    description: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    dcondition: EquipmentCondition;
    penalty: number;
    penaltystatus: PenaltyStatus;
}