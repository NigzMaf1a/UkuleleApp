export {EquipmentDescription, EquipmentCondition, EquipmentAvailabilty}

const enum EquipmentDescription{
    Speaker = 'Speaker',
    Microphone = 'Microphone',
    CDJ = 'CDJ',
    Mixer = 'Mixer',
    Wireless = 'Wireless',
    Cable = 'Cable'
}

const enum EquipmentCondition{
    CAT1 = 'CAT1',
    CAT2 = 'CAT2',
    CAT3 = 'CAT3',
    CAT4 = 'CAT4'
}

const enum EquipmentAvailabilty{
    Available = 'Available',
    Unavailable = 'Unavailable'
}