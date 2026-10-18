import React, { useState } from 'react'
import useWhichAllocation from '../../../hooks/useWhichAllocation'
import useAllocationMethods from '../../../hooks/useAllocationMethods'

import ScrollScreen from '../../../components/ScrollScreen'
import Screen from '../../../components/Screen'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'
import InstrumentAllocationItem from '../../../sections/inventory/InstrumentAllocationItem'
import Button from '../../../components/Button'

import describer from '../../../scripts/utils/describer'
import { EquipmentCondition } from '../../../scripts/enums/equipment'

export default function InventoryAllocationInstruments() {
    const [clickedInstrumentId, setClickedInstrumentId] = useState<number>(0)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const { loading, error, instruments, selectedService } = useWhichAllocation()
    const { selectedInstruments, modInstruments, allocateInstruments } = useAllocationMethods()

    return (
        <Screen>
            <ScrollScreen>
                {
                    loading ? <TextDisplay text={'Loading'} text_variant='info' /> :
                        error ? <TextDisplay text={'An error occurred while loading data'} text_variant='danger' /> :
                            instruments.length > 0 ? instruments.map(
                                (i) => <InstrumentAllocationItem
                                    rowOneData={{ label: 'Description', text: i.description }}
                                    rowTwoData={{ label: 'Condition', text: describer(i.dcondition as EquipmentCondition) }}
                                    instrument={i}
                                    selected={[...selectedInstruments]}
                                    clickedInstrumentId={clickedInstrumentId}
                                    setClickedInstrumentId={setClickedInstrumentId}
                                    fun={modInstruments}
                                />
                            ) : <TextDisplay text={'No equipment found'} text_variant='info' />
                }
            </ScrollScreen>

            <Button
                label='allocate'
                fun={async () => await allocateInstruments(selectedService)}
                isClicked={btnClicked}
                setIsClicked={setBtnClicked}
            />
        </Screen>
    )
}