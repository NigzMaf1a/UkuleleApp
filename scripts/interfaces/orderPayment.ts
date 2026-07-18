export default interface OrderPayment {
    orderpayid?: number;
    orderid: number;
    paymentcode: string;
    paymentdate: Date;
    amount: number;
}