export default interface Booking {
    BookingID: number;
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    BookingDate: number;
    Cost: number;
    Hours: number;
    ServiceID: number;
    BookingStatus: 'Done' | 'Yet';
}