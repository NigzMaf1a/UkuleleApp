//enums
import { OrderStatus } from "../enums/order";
import ItemPayload from "./itemPayload";

export default interface  SupplyOrder{
    SupplyID:number;
    OrderDate:Date;
    OrderAmount:number;
    OrderStatus:OrderStatus;
    items:ItemPayload[];
}