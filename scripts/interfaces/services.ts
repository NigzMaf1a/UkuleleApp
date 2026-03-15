import { PaymentStatus } from "../enums/services";
export default interface Services {
    ServiceID?: number;
    CustomerID: number;
    Genre: 'Reggae' | 'Rhumba' | 'Zilizopendwa' | 'Benga' | 'Soul' | 'RnB';
    Cost: number;
    Hours: number;
    ServiceType:'Lending' | 'Booking';
    ServiceStatus: 'Approved' | 'Pending';
    PaymentStatus?: PaymentStatus;
}