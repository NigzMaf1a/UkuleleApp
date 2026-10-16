import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { allocItemStyles } from '../../styles/alloc/alloc_item'

interface Props { }

export default function InstrumentAllocationItem({ }: Props) {

    return (
        <View style={[allocItemStyles.body]}>
            <View style={[allocItemStyles.left_cont]}>
                <View style={[allocItemStyles.row]}></View>

                <View style={[allocItemStyles.row]}></View>
            </View>

            <View style={[allocItemStyles.right_cont]}>
                <TouchableOpacity style={[allocItemStyles.btn]}></TouchableOpacity>
            </View>
        </View>
    )
}