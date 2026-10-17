import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import TextDisplay from '../../components/revisited/cutting edge/TextDisplay'

import { allocItemStyles } from '../../styles/alloc/alloc_item'
import Instrument from '../../scripts/interfaces/instrument'

interface Row {
    label: string
    text: string | number
}

interface Props {
    rowOneData: Row
    rowTwoData: Row
    instrument: Instrument
    selected: Instrument[]
    clickedInstrumentId: number
    setClickedInstrumentId: (id: number) => void
    fun: (instrument: Instrument) => void
}

export default function InstrumentAllocationItem({ rowOneData, rowTwoData, instrument, selected, clickedInstrumentId, setClickedInstrumentId, fun }: Props) {
    const clicked = clickedInstrumentId === instrument.instrumentid as number
    const itemSelected: boolean = selected.includes(instrument)
    const label: string = !itemSelected ? 'add' : 'remove'

    return (
        <View
            style={[allocItemStyles.body]}
            onFocus={() => setClickedInstrumentId(instrument.instrumentid as number)}
        >
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
                <TouchableOpacity
                    style={[allocItemStyles.btn]}
                    onPress={() => {
                        fun(instrument)
                    }}
                >
                    {label}
                </TouchableOpacity>
            </View>
        </View>
    )
}