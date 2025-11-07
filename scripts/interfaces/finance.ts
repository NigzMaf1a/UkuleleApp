export default interface Finance {
    CustomerID: number;
    Name: string;
    PhoneNo: string;
    TransactionID: number;
    TransactionName:string;
    TransactionDate: string;
    Amount: number;
    TransactType:'Deposit' | 'Payment';
    ServiceID:number;
}