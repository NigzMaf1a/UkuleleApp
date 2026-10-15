import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import TextDisplay from '../components/revisited/cutting edge/TextDisplay'

import { allocItemStyles } from '../styles/alloc/alloc_item'

//types
import type Inventory from '../scripts/interfaces/inventory'
import type AllocatedEquipment from '../scripts/interfaces/equip_alloc'

interface Props {
    item: Inventory
    alloc_fun: (item: Inventory) => void
}

function AllocItem({ item, alloc_fun }: Props) {

    return (
        <View style={[allocItemStyles.body]}>
            <View style={[allocItemStyles.left_cont]}>

                <View style={[allocItemStyles.row]}>
                    <TextDisplay text_variant='info' text={'Equip Type'} />
                    <TextDisplay text={item.description} />
                </View>


                <View style={[allocItemStyles.row]}>
                    <TextDisplay text_variant='info' text={'Condition'} />
                    <TextDisplay text={item.dcondition} />
                </View>
            </View>

            <View style={[allocItemStyles.right_cont]}>
                <TouchableOpacity style={[allocItemStyles.btn]} onPress={() => alloc_fun(item)}>allocate</TouchableOpacity>
            </View>
        </View>
    )
}

export default AllocItem
