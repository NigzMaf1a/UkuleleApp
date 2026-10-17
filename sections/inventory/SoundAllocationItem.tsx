import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import TextDisplay from '../../components/revisited/cutting edge/TextDisplay'

import { allocItemStyles } from '../../styles/alloc/alloc_item'
import Inventory from '../../scripts/interfaces/inventory'

interface Row {
    label: string
    text: string | number
}

interface Props {
    rowOneData: Row
    rowTwoData: Row
    equipment: Inventory
    selected: Inventory[]
    clickedEquipmentId: number
    fun: (equipment: Inventory) => void
}

export default function SoundAllocationItem({ rowOneData, rowTwoData, selected, equipment, clickedEquipmentId, fun }: Props) {
    const clicked = clickedEquipmentId === equipment.equipmentid as number
    const itemSelected: boolean = selected.includes(equipment)
    const label: string = !itemSelected ? 'add' : 'remove'

    return (
        <View style={[allocItemStyles.body]}>
            <View style={[allocItemStyles.left_cont]}>
                <View style={[allocItemStyles.row]}>
                    <TextDisplay text={rowOneData.label} />
                    <TextDisplay text={rowOneData.text} />
                </View>

                <View style={[allocItemStyles.row]}>
                    <TextDisplay text={rowTwoData.label} />
                    <TextDisplay text={rowTwoData.text} />
                </View>
            </View>

            <View
                style={[allocItemStyles.right_cont]}
            >
                <TouchableOpacity
                    style={[allocItemStyles.btn]}
                    onPress={() => {
                        fun(equipment)
                    }}
                >
                    {label}
                </TouchableOpacity>
            </View>
        </View>
    )
}