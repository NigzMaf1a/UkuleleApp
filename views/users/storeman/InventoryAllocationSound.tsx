import React from 'react'
import useWhichAllocation from '../../../hooks/useWhichAllocation'

import ScrollScreen from '../../../components/ScrollScreen'
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'

export default function InventoryAllocationSound() {

    const { loading, error, inventory } = useWhichAllocation()

    return (
        <ScrollScreen>
            {
                loading ? <TextDisplay text={'Loading'} text_variant='info' /> :
                    error ? <TextDisplay text={'An error occurred while loading data'} text_variant='danger' /> :
                        inventory.length > 0 ? inventory.map(
                            (i) => <ListItemWithButtonAdv />
                        ) : <TextDisplay text={'No equipment found'} text_variant='info' />
            }
        </ScrollScreen>
    )
}