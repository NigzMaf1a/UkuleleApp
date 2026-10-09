import React from 'react'

//components
import ScrollScreen from '../../../components/ScrollScreen'
import AllocEquipBtnCont from '../../../sections/AllocEquipBtnCont'
import AllocEquipBody from '../../../sections/AllocEquipBody'
import Button from '../../../components/Button'
import AllocEquipTypeBtn from './AllocEquipTypeBtn'

export default function InventoryAllocate() {

    function allocate() { }

    return (
        <ScrollScreen>
            <AllocEquipBtnCont>
                <AllocEquipTypeBtn label='Mixers' />
                <AllocEquipTypeBtn label='Speakers' />
                <AllocEquipTypeBtn label='Mics' />
                <AllocEquipTypeBtn label='Cables' />
                <AllocEquipTypeBtn label='Wireless' />
                <AllocEquipTypeBtn label='CDJs' />
            </AllocEquipBtnCont>

            <AllocEquipBody>Pree Mih G!</AllocEquipBody>

            <Button label='Allocate' fun={() => allocate()} />
        </ScrollScreen>
    )
}