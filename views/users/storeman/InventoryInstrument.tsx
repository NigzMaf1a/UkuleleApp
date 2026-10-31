import { useState } from "react"

import useSoundAndInstruments from "../../../hooks/useSoundAndInstruments"
import useShowInstrument from "../../../hooks/useShowInstrument"

import { View, TouchableOpacity } from "react-native"

//components
import Screen from "../../../components/Screen"
import ScrollScreen from "../../../components/ScrollScreen"
import TextDisplay from "../../../components/revisited/cutting edge/TextDisplay"
import ListItemWithButtonAdv from "../../../components/revisited/cutting edge/ListItemWithButtonAdv"
import InstrumentForm from "../../../sections/inventory/InstrumentForm"

//styles
import toggleScreenStyles from "../../../styles/inventory/toggle_screen"

import Instrument from "../../../scripts/interfaces/instrument"

type CurrentScreen = 'add' | 'view'

export default function InventoryInstrument() {
    const [screen, setScreen] = useState<CurrentScreen>('view')

    const { instruments, loading, error } = useSoundAndInstruments()
    const { select } = useShowInstrument()

    function toggleScreen(screen: CurrentScreen) {
        setScreen(screen)
    }



    return (
        <Screen>
            <View style={[toggleScreenStyles.container]}>
                <TouchableOpacity
                    onPress={() => toggleScreen('view')}
                    style={[
                        toggleScreenStyles.btn,
                        screen === 'view' ? toggleScreenStyles.clicked : toggleScreenStyles.notClicked
                    ]}
                >
                    view
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => toggleScreen('add')}
                    style={[
                        toggleScreenStyles.btn,
                        screen === 'add' ? toggleScreenStyles.clicked : toggleScreenStyles.notClicked
                    ]}
                >
                    add
                </TouchableOpacity>
            </View>

            <ScrollScreen contentContainerStyle={[
                screen === 'add' && { justifyContent: "center" }
            ]}>
                {
                    screen === 'view' ? loading ? <TextDisplay text={'Loading'} /> :
                        error ? <TextDisplay text={'An error occurred please try again'} /> :
                            instruments.length > 0 ? instruments.map(
                                (i) =>
                                    <ListItemWithButtonAdv
                                        rowOneData={{ label: 'Instrument ID', text: i.instrumentid as number }}
                                        rowTwoData={{ label: 'Description', text: i.description }}
                                        buttonLabel="view"
                                        fun={() => {
                                            select(i)
                                        }}
                                    />
                            ) : <TextDisplay text={'No instruments found'} /> :
                        <InstrumentForm />
                }
            </ScrollScreen>
        </Screen>
    )
}