
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type { AllocationStackParamList } from '../../../navigation/AllocationNavigation'

import InventoryWhichAllocation from './InventoryWhichAllocation'
import InventoryAllocationSound from './InventoryAllocationSound'
import InventoryAllocationInstruments from './InventoryAllocationInstruments'

const Stack = createNativeStackNavigator<AllocationStackParamList>()

export default function InventoryAllocationFlow() {
    return (
        <Stack.Navigator
            initialRouteName="InventoryWhichAllocation"
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="InventoryWhichAllocation"
                component={InventoryWhichAllocation}
                options={{
                    title: 'Select Service'
                }}
            />

            <Stack.Screen
                name="InventoryAllocationSound"
                component={InventoryAllocationSound}
                options={{
                    title: 'Allocate Equipment'
                }}
            />

            <Stack.Screen
                name="InventoryAllocationInstruments"
                component={InventoryAllocationInstruments}
                options={{
                    title: 'Allocate Instruments'
                }}
            />
        </Stack.Navigator>
    )
}
