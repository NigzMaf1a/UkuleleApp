export default interface Supply{
    SupplyID:number;
    Price:number;
    SupplierName:string;
    SupplyDate:string;
    PhoneNo:string;
    SupplyStatus:'Delivered' | 'Undelivered';
}