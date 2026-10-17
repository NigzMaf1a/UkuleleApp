import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import TextDisplay from '../../components/revisited/cutting edge/TextDisplay'

//styles
import { allocItemStyles } from '../../styles/alloc/alloc_item'

//types
import Services from '../../scripts/interfaces/services'

interface Row {
    label: string
    text: string | number
}

interface Props {
    rowOneData: Row
    rowTwoData: Row
    btnLabel: string
    service: Services
    fun: (service: Services) => void
}

export default function WhichAllocationItem({ rowOneData, rowTwoData, btnLabel, service, fun }: Props) {

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

            <View style={[allocItemStyles.right_cont]}>
                <TouchableOpacity style={[allocItemStyles.btn]} onPress={() => fun(service)}>
                    {btnLabel}
                </TouchableOpacity>
            </View>
        </View>
    )
}