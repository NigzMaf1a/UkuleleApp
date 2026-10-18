import React, { useState } from 'react'
import useWhichAllocation from '../../../hooks/useWhichAllocation'
import useAllocationMethods from '../../../hooks/useAllocationMethods'

import ScrollScreen from '../../../components/ScrollScreen'
import Screen from '../../../components/Screen'
import SoundAllocationItem from '../../../sections/inventory/SoundAllocationItem'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'

import describer from '../../../scripts/utils/describer'
import { EquipmentCondition } from '../../../scripts/enums/equipment'

export default function InventoryAllocationSound() {

    const [clickedEquipmentId, setClickedEquipmentId] = useState<number>(0)

    const { loading, error, inventory } = useWhichAllocation()
    const { selectedEquipment, modEquipment } = useAllocationMethods()

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
        </Screen>
    )
}