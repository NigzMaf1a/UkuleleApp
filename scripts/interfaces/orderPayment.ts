export default interface OrderPayment{
    OrderPayID?: number;
    OrderID:number;
    PaymentCode:string;
    PaymentDate:Date;
    Amount:number;
}