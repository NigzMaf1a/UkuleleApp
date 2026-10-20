
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

import type { AllocationScreenProps } from '../../../navigation/AllocationNavigation'

export default function InventoryAllocationSound({
    route
}: AllocationScreenProps<'InventoryAllocationSound'>) {
    const [clickedEquipmentId, setClickedEquipmentId] = useState<number>(0)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const { service } = route.params
    const { loading, error, inventory } = useWhichAllocation()

    const {
        selectedEquipment,
        modEquipment,
        allocateSound
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
                ) : inventory.length > 0 ? (
                    inventory.map(item => (
                        <SoundAllocationItem
                            key={item.equipmentid}
                            rowOneData={{
                                label: 'Description',
                                text: item.description
                            }}
                            rowTwoData={{
                                label: 'Condition',
                                text: describer(
                                    item.dcondition as EquipmentCondition
                                )
                            }}
                            equipment={item}
                            selected={[...selectedEquipment]}
                            clickedEquipmentId={clickedEquipmentId}
                            setClickedEquipmentId={setClickedEquipmentId}
                            fun={modEquipment}
                        />
                    ))
                ) : (
                    <TextDisplay
                        text="No equipment found"
                        text_variant="info"
                    />
                )}
            </ScrollScreen>

            <Button
                label="allocate"
                fun={async () => allocateSound(service)}
                isClicked={btnClicked}
                setIsClicked={setBtnClicked}
            />
        </Screen>
    )
}