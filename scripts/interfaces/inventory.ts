export default interface Inventory {
    EquipmentID?:number;
    Price:number;
    Description: 'Speaker' | 'Microphone' | 'CDJ' | 'Mixer' | 'Wireless' | 'Cable';
    PurchaseDate: Date;
    dCondition: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4';
    Availability: 'Available' | 'Unavailable';
}