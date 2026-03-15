export default interface Finance {
    CustomerID: number;
    Name: string;
    PhoneNo: string;
    TransactionID?: number;
    TransactionName:string;
    TransactionDate: Date;
    Amount: number;
    TransactType:'Deposit' | 'Payment';
    TransactionStatus:Status;
    ServiceID:number;
}

export enum Status{
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected'
}