import React from 'react'
import { TouchableOpacity } from 'react-native'

interface Props {
    label: string
    fun: () => void
}

export default function AllocEquipTypeBtn({ label, fun }: Props) {

    return (
        <TouchableOpacity onPress={() => fun()}>
            {label}
        </TouchableOpacity>
    )
}