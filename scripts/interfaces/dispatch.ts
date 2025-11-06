export default interface Dispatch {
    DispatchID: number;
    CustomerID: number;
    Name: string;
    dLocation: string;
    ServiceID: number;
    PhoneNo: string;
    Dispatched: 'Yes' | 'No';
    DispatchDate: string;
}