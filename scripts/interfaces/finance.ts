export default interface Finance {
    customerid: number;
    name: string;
    phoneno: string;
    transactionid?: number;
    transactionname: string;
    transactiondate: Date;
    amount: number;
    transacttype: 'Deposit' | 'Payment';
    transactionstatus: Status;
    serviceid: number;
}

export enum Status {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected'
}