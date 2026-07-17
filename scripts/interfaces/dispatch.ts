import DispatchStatus from "../enums/dispatch";

export default interface Dispatch {
    dispatchid: number;
    customerid: number;
    name: string;
    dlocation: string;
    serviceid: number;
    phoneno: string;
    dispatched: DispatchStatus;
    dispatchdate: string;
}