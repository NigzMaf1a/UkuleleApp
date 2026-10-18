import React, { useState } from 'react'
import useWhichAllocation from '../../../hooks/useWhichAllocation'
import useAllocationMethods from '../../../hooks/useAllocationMethods'

import ScrollScreen from '../../../components/ScrollScreen'
import Screen from '../../../components/Screen'
import SoundAllocationItem from '../../../sections/inventory/SoundAllocationItem'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'
import Button from '../../../components/Button'

import describer from '../../../scripts/utils/describer'
import { EquipmentCondition } from '../../../scripts/enums/equipment'

export default function InventoryAllocationSound() {

    const [clickedEquipmentId, setClickedEquipmentId] = useState<number>(0)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const { loading, error, inventory, selectedService } = useWhichAllocation()
    const { selectedEquipment, modEquipment, allocateInstruments } = useAllocationMethods()

    return (
        <Screen>
            <ScrollScreen>
                {
                    loading ? <TextDisplay text={'Loading'} text_variant='info' /> :
                        error ? <TextDisplay text={'An error occurred while loading data'} text_variant='danger' /> :
                            inventory.length > 0 ? inventory.map(
                                (i) => <SoundAllocationItem
                                    rowOneData={{ label: 'Description', text: i.description }}
                                    rowTwoData={{ label: 'Condition', text: describer(i.dcondition as EquipmentCondition) }}
                                    equipment={i}
                                    selected={[...selectedEquipment]}
                                    clickedEquipmentId={clickedEquipmentId}
                                    setClickedEquipmentId={setClickedEquipmentId}
                                    fun={modEquipment}
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