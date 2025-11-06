export default interface Lending{
    LendID:number;
    EquipmentID: number;
    LendingDate:number;
    Cost: number;
    Hours: number;
    ServiceID:number;
    LendingStatus: 'Done' | 'Yet';
    Performed: 'Yes' | 'No';
}