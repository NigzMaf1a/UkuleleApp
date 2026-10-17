import { useState, useEffect } from 'react'

import type Inventory from '../scripts/interfaces/inventory'
import type Instrument from '../scripts/interfaces/instrument'
import type AllocatedEquipment from '../scripts/interfaces/equip_alloc'
import type AllocatedInstrument from '../scripts/interfaces/inst_alloc'

import Storeman from '../scripts/classes/storeman'
import storage from '../scripts/auth/storage'

interface Allocation {
    allocatedEquipment: Set<AllocatedEquipment>
    allocatedInstruments: Set<AllocatedInstrument>
    allocateSound: () => Promise<void>
    allocateInstruments: () => Promise<void>
    modEquipment: (equipment: Inventory) => void
    modInstruments: (instrument: Instrument) => void
}

interface AllocationConfig {
    serviceid: number
    regid: number
    equipmentEndpoint: string
    instrumentEndpoint: string
}

export default function useAllocationMethods({
    serviceid,
    regid,
    equipmentEndpoint,
    instrumentEndpoint
}: AllocationConfig): Allocation {
    const [allocatedEquipment, setAllocatedEquipment] = useState<Set<AllocatedEquipment>>(
        () => new Set()
    )

    const [allocatedInstruments, setAllocatedInstruments] = useState<Set<AllocatedInstrument>>(
        () => new Set()
    )

    const [addedEquip, setAddedEquip] = useState<Set<Inventory>>(
        () => new Set()
    )

    const [addedInst, setAddedInst] = useState<Set<Instrument>>(
        () => new Set()
    )

    const [regID, setRegID] = useState<number>(0)
    const [token, setToken] = useState<string>('')

    useEffect(() => {
        async function init() {
            const id = await storage.get.profile().then(prof => prof?.RegID) as number
            const key = await storage.get.key().then(key => key) as string

            setRegID(id)
            setToken(key)
        }

        init()
    }, [])

    const storeman = new Storeman(regID, token)

    function modEquipment(equipment: Inventory): void {
        setAddedEquip(previous => {
            const next = new Set(previous)

            const existing = [...next].find(
                item => item.equipmentid === equipment.equipmentid
            )

            if (existing) {
                next.delete(existing)
            } else {
                next.add(equipment)
            }

            return next
        })
    }

    function modInstruments(instrument: Instrument): void {
        setAddedInst(previous => {
            const next = new Set(previous)

            const existing = [...next].find(
                item => item.instrumentid === instrument.instrumentid
            )

            if (existing) {
                next.delete(existing)
            } else {
                next.add(instrument)
            }

            return next
        })
    }

    async function allocateSound(): Promise<void> {
        const selected = [...addedEquip]

        if (selected.length === 0) {
            return
        }

        if (selected.some(item => item.equipmentid === undefined)) {
            throw new Error('Every selected equipment item must have an equipmentid')
        }

        const created = await Promise.all(
            selected.map(async (equipment): Promise<void> => {

                await storeman.allocateInstrument(
                    {
                        instrumentid: equipment.equipmentid,
                        serviceid,
                        regid,
                        alloc_status: 'Pending',
                        conditionatalloc: equipment.dcondition,
                        conditionatreturn: undefined,
                        allocdate: new Date(),
                        returndate: undefined
                    }
                )
            })
        )

        setAddedEquip(previous => {
            const next = new Set(previous)

            for (const equipment of selected) {
                next.delete(equipment)
            }

            return next
        })
    }

    async function allocateInstruments(): Promise<void> {
        const selected = [...addedInst]

        if (selected.length === 0) {
            return
        }

        if (selected.some(item => item.instrumentid === undefined)) {
            throw new Error('Every selected instrument must have an instrumentid')
        }

        await Promise.all(
            selected.map(async (instrument): Promise<void> => {

                await storeman.allocateInstrument(
                    {
                        instrumentid: instrument.instrumentid,
                        serviceid,
                        regid,
                        alloc_status: 'Pending',
                        conditionatalloc: instrument.dcondition,
                        conditionatreturn: undefined,
                        allocdate: new Date(),
                        returndate: undefined
                    }
                )
            })
        )

        setAddedInst(previous => {
            const next = new Set(previous)

            for (const instrument of selected) {
                next.delete(instrument)
            }

            return next
        })
    }

    return {
        allocatedEquipment,
        allocatedInstruments,
        allocateSound,
        allocateInstruments,
        modEquipment,
        modInstruments
    }
}