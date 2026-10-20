
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import type Services from '../scripts/interfaces/services'

export type AllocationStackParamList = {
    InventoryWhichAllocation: undefined
    InventoryAllocationSound: {
        service: Services
    }
    InventoryAllocationInstruments: {
        service: Services
    }
}

export type AllocationScreenProps<
    T extends keyof AllocationStackParamList
> = NativeStackScreenProps<AllocationStackParamList, T>
