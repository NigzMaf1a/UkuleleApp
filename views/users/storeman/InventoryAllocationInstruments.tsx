
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

import type { AllocationScreenProps } from '../../../navigation/AllocationNavigation'

export default function InventoryAllocationInstruments({
    route
}: AllocationScreenProps<'InventoryAllocationInstruments'>) {
    const [clickedInstrumentId, setClickedInstrumentId] = useState<number>(0)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const { service } = route.params
    const { loading, error, instruments } = useWhichAllocation()

    const {
        selectedInstruments,
        modInstruments,
        allocateInstruments
    } = useAllocationMethods()

    return (
        <Screen>
            <ScrollScreen>
                {loading ? (
                    <TextDisplay
                        text="Loading"
                        text_variant="info"
                    />
                ) : error ? (
                    <TextDisplay
                        text="An error occurred while loading data"
                        text_variant="danger"
                    />
                ) : instruments.length > 0 ? (
                    instruments.map(instrument => (
                        <InstrumentAllocationItem
                            key={instrument.instrumentid}
                            rowOneData={{
                                label: 'Description',
                                text: instrument.description
                            }}
                            rowTwoData={{
                                label: 'Condition',
                                text: describer(
                                    instrument.dcondition as EquipmentCondition
                                )
                            }}
                            instrument={instrument}
                            selected={[...selectedInstruments]}
                            clickedInstrumentId={clickedInstrumentId}
                            setClickedInstrumentId={setClickedInstrumentId}
                            fun={modInstruments}
                        />
                    ))
                ) : (
                    <TextDisplay
                        text="No instruments found"
                        text_variant="info"
                    />
                )}
            </ScrollScreen>

            <Button
                label="allocate"
                fun={async () => allocateInstruments(service)}
                isClicked={btnClicked}
                setIsClicked={setBtnClicked}
            />
        </Screen>
    )
}
