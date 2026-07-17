import { Genre } from "../enums/services";

export default interface Lending {
    lendid: number;
    equipmentid: number;
    genre: Genre;
    lendingdate: number;
    cost: number;
    hours: number;
    serviceid: number;
    lendingstatus: 'Done' | 'Yet';
    performed: 'Yes' | 'No';
}

