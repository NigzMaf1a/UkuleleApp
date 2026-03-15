import { PenaltyStatus } from "../enums/penalty";
import { EquipmentCondition } from "../enums/equipment";

export default interface Penalty {
    PenaltyID?: number;
    EquipmentID: number;
    CustomerID:number;
    Description: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    dCondition: EquipmentCondition;
    Penalty: number;
    PenaltyStatus: PenaltyStatus;
}