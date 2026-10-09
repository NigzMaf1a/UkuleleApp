import React from 'react'
import { View } from 'react-native'

interface Props {
    children: React.ReactNode
}

function AllocEquipBody({ children }: Props) {

    return (
        <View>
            {children}
        </View>
    )
}

export default AllocEquipBody
