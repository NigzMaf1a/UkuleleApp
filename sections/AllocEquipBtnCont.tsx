import React from 'react'
import { View } from 'react-native'

import { inventoryAllocStyles } from '../styles/alloc/inventory_alloc_styles'

interface Props {
    children: React.ReactNode
}

export default function AllocEquipBtnCont({ children }: Props) {
    return (
        <View style={[
            inventoryAllocStyles.allocEquipBtnCont
        ]}>
            {children}
        </View>
    )
}