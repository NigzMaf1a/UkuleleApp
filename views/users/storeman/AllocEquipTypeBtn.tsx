import React from 'react'
import { TouchableOpacity } from 'react-native'

import { inventoryAllocStyles } from '../../../styles/alloc/inventory_alloc_styles'

interface Props {
    label: string
    fun: () => void
}

export default function AllocEquipTypeBtn({ label, fun }: Props) {

    return (
        <TouchableOpacity
            style={[inventoryAllocStyles.allocEquipTypeBtn]}
            onPress={() => fun()}
        >
            {label}
        </TouchableOpacity>
    )
}