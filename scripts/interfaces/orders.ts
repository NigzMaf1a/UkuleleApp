import { OrderStatus } from "../enums/order";

export default interface Order {
    OrderID: number;
    SupplyID: number;
    OrderDate: Date;
    OrderItems: number;
    OrderAmount: number;
    TotalAmount: number;
    OrderStatus: OrderStatus;
}