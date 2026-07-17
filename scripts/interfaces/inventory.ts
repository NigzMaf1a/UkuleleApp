export default interface Inventory {
    equipmentid?: number;
    price: number;
    description: 'Speaker' | 'Microphone' | 'CDJ' | 'Mixer' | 'Wireless' | 'Cable';
    purchasedate: Date;
    dcondition: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4';
    availability: 'Available' | 'Unavailable';
}