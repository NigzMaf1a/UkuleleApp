//enums
import { OrderStatus } from "../enums/order";
import ItemPayload from "./itemPayload";

export default interface SupplyOrder {
    supplyid: number;
    orderdate: Date;
    orderamount: number;
    orderstatus: OrderStatus;
    items: ItemPayload[];
}