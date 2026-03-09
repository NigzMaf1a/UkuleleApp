import { Genre } from "../enums/services";

export default interface Booking {
    BookingID: number;
    Genre: Genre;
    BookingDate: number;
    Cost: number;
    Hours: number;
    ServiceID: number;
    BookStatus: 'Tick' | 'Untick';
    Performed: 'Yes' | 'No';
}