import React from 'react'
import useWhichAllocation from '../../../hooks/useWhichAllocation'

import ScrollScreen from '../../../components/ScrollScreen'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv'

export default function InventoryAllocationInstruments() {
    const { loading, error, instruments } = useWhichAllocation()

    return (
        <ScrollScreen>
            {
                loading ? <TextDisplay text={'Loading'} text_variant='info' /> :
                    error ? <TextDisplay text={'An error occurred while loading data'} text_variant='danger' /> :
                        instruments.length > 0 ? instruments.map(
                            (i) => <ListItemWithButtonAdv
                                rowOneData={{ label: '', text: i.description }}
                                rowTwoData={{ label: '', text: i.description }}
                            />
                        ) : <TextDisplay text={'No equipment found'} text_variant='info' />
            }
        </ScrollScreen>
    )
}