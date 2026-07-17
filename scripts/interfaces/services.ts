import { PaymentStatus } from "../enums/services";
export default interface Services {
    serviceid?: number;
    customerid: number;
    genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    cost: number;
    hours: number;
    servicetype: 'Lending' | 'Booking';
    servicestatus: 'Approved' | 'Pending';
    paymentstatus?: PaymentStatus;
}