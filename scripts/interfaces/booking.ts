import { Genre } from "../enums/services";

export default interface Booking {
    bookingid: number;
    genre: Genre;
    bookingdate: number;
    cost: number;
    hours: number;
    serviceid: number;
    bookstatus: 'Tick' | 'Untick';
    performed: 'Yes' | 'No';
}