export default interface Instrument {
    instrumentid?: number;
    price: number;
    description: 'Guitar' | 'Piano' | 'Violin' | 'Ukulele';
    purchasedate: Date;
    dcondition: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4';
    availability: 'Available' | 'Unavailable';
}