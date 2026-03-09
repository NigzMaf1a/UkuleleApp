import DispatchStatus from "../enums/dispatch";

export default interface Dispatch {
    DispatchID: number;
    CustomerID: number;
    Name: string;
    dLocation: string;
    ServiceID: number;
    PhoneNo: string;
    Dispatched: DispatchStatus;
    DispatchDate: string;
}