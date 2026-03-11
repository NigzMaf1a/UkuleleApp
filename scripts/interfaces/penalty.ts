import { PenaltyStatus } from "../enums/penalty";

export default interface Penalty {
    PenaltyID?: number;
    EquipmentID: number;
    CustomerID:number;
    Description: 'Speaker' | 'Microphone' | 'Mixer' | 'CDJ' | 'Cable' | 'Wireless';
    dCondition: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4';
    Penalty: number;
    PenaltyStatus: PenaltyStatus;
}