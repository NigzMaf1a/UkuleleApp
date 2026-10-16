import React, { useState } from 'react'
import { View } from 'react-native'

//hooks
import useWhichAllocation from '../../../hooks/useWhichAllocation'

import ScrollScreen from '../../../components/ScrollScreen'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv'

export default function InventoryWhichAllocation() {

    const { loading, error, services } = useWhichAllocation()

    function toggleAllocation() {

    }

    return (
        <ScrollScreen>
            {
                loading ? <TextDisplay text={'Loading'} text_variant='info' /> :
                    error ? <TextDisplay text={'An error occurred while loading service requests'} text_variant='danger' /> :
                        services.length > 0 ? services.map(
                            (s) => <ListItemWithButtonAdv
                                rowOneData={{ label: 'Service type', text: s.servicetype }}
                                rowTwoData={{ label: 'Service Id', text: s.serviceid as number }}
                                buttonLabel='allocate'
                                fun={toggleAllocation}
                            />
                        ) : <TextDisplay text={'No service requests found'} text_variant='info' />
            }
        </ScrollScreen>
    )
}
