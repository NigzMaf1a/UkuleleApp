import { OrderStatus } from "../enums/order";

export default interface Order {
    OrderID: number;
    SupplyID: number;
    OrderDate: Date;
    OrderAmount: number;
    OrderStatus: OrderStatus;
}