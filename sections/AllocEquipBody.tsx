import React from 'react'
import { View } from 'react-native'

import { inventoryAllocStyles } from '../styles/alloc/inventory_alloc_styles'

interface Props {
    children: React.ReactNode
}

function AllocEquipBody({ children }: Props) {

    return (
        <View style={[
            inventoryAllocStyles.allocEquipBody
        ]}>
            {children}
        </View>
    )
}

export default AllocEquipBody
