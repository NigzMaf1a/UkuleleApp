export default interface AllocatedEquipment {
    allocequipid?: number
    equipmentid?: number
    serviceid: number
    regid: number
    alloc_status: 'Pending' | 'Allocated' | 'Cancelled'
    conditionatalloc: 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4'
    allocdate: Date
    returndate: Date
}