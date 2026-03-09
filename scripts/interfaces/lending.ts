import { Genre } from "../enums/services";

export default interface Lending{
    LendID:number;
    EquipmentID: number;
    Genre:Genre;
    LendingDate:number;
    Cost: number;
    Hours: number;
    ServiceID:number;
    LendingStatus: 'Done' | 'Yet';
    Performed: 'Yes' | 'No';
}

