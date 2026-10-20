
import React from 'react'

import useWhichAllocation from '../../../hooks/useWhichAllocation'

import ScrollScreen from '../../../components/ScrollScreen'
import TextDisplay from '../../../components/revisited/cutting edge/TextDisplay'
import WhichAllocationItem from '../../../sections/inventory/WhichAllocationItem'

import type Services from '../../../scripts/interfaces/services'

import type { AllocationScreenProps } from '../../../navigation/AllocationNavigation'

export default function InventoryWhichAllocation({
    navigation
}: AllocationScreenProps<'InventoryWhichAllocation'>) {
    const { loading, error, services } = useWhichAllocation()

    function toggleAllocation(service: Services): void {
        switch (service.servicetype) {
            case 'Lending':
                navigation.navigate('InventoryAllocationSound', { service })
                break

            case 'Booking':
                navigation.navigate('InventoryAllocationInstruments', { service })
                break
        }
    }

    return (
        <ScrollScreen>
            {loading ? (
                <TextDisplay
                    text="Loading"
                    text_variant="info"
                />
            ) : error ? (
                <TextDisplay
                    text="An error occurred while loading service requests"
                    text_variant="danger"
                />
            ) : services.length > 0 ? (
                services.map(service => (
                    <WhichAllocationItem
                        key={service.serviceid}
                        rowOneData={{
                            label: 'Service type',
                            text: service.servicetype
                        }}
                        rowTwoData={{
                            label: 'Service Id',
                            text: service.serviceid ?? 'N/A'
                        }}
                        btnLabel="allocate"
                        service={service}
                        fun={toggleAllocation}
                    />
                ))
            ) : (
                <TextDisplay
                    text="No service requests found"
                    text_variant="info"
                />
            )}
        </ScrollScreen>
    )
}
