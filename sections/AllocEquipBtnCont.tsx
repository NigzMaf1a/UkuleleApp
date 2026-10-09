import React from 'react'
import { View } from 'react-native'

interface Props {
    children: React.ReactNode
}

export default function AllocEquipBtnCont({ children }: Props) {
    return (
        <View>
            {children}
        </View>
    )
}