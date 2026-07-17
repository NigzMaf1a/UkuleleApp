import { OrderStatus } from "../enums/order";

export default interface Order {
    orderid: number;
    supplyid: number;
    orderdate: Date;
    orderamount: number;
    orderstatus: OrderStatus;
}