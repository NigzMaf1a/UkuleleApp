import { useState, useEffect } from "react"

import AllocatedEquipment, { AllocatedEquipmentPatch } from "../scripts/interfaces/equip_alloc"
import AllocatedInstrument, { AllocatedInstrumentPatch } from "../scripts/interfaces/inst_alloc"

import Storeman from "../scripts/classes/storeman"
import storage from "../scripts/auth/storage"

interface AllocationItems {
    loading: boolean
    error: unknown
    allocatedEquipment: AllocatedEquipment[]
    allocatedInstruments: AllocatedInstrument[]
    patchEquipment: (id: number, patch: AllocatedEquipmentPatch) => Promise<boolean>
    patchInstrument: (id: number, patch: AllocatedInstrumentPatch) => Promise<boolean>
}

export default function useAllocatedItems(): AllocationItems {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown>(undefined)
    const [allocatedInstruments, setAllocatedInstruments] = useState<AllocatedInstrument[]>([])
    const [allocatedEquipment, setAllocatedEquipment] = useState<AllocatedEquipment[]>([])

    useEffect(() => {
        let active = true

        async function init() {
            try {
                setLoading(true)
                setError(undefined)

                const id = await storage.get.profile().then(prof => prof?.RegID) as number
                const key = await storage.get.key().then(key => key) as string

                if (id == null || !key) {
                    throw new Error("Storeman session is unavailable")
                }

                const storeman = new Storeman(Number(id), String(key))

                const [equipment, instruments] = await Promise.all([
                    storeman.getAllocatedEquipment(),
                    storeman.getAllocatedInstruments()
                ])

                if (active) {
                    setAllocatedEquipment(equipment)
                    setAllocatedInstruments(instruments)
                }
            } catch (error) {
                if (active) {
                    setError(error)
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        void init()

        return () => {
            active = false
        }
    }, [])

    async function patchEquipment(
        id: number,
        patch: AllocatedEquipmentPatch
    ): Promise<boolean> {
        try {
            const id = await storage.get.profile().then(prof => prof?.RegID) as number
            const key = await storage.get.key().then(key => key) as string


            const storeman = new Storeman(Number(id), String(key))

            await storeman.patchAllocatedEquipmentStatus(id, patch)

            const equipment = await storeman.getAllocatedEquipment()
            setAllocatedEquipment(equipment)

            setError(undefined)

            return true
        } catch (error) {
            setError(error)
            return false
        }
    }

    async function patchInstrument(
        id: number,
        patch: AllocatedInstrumentPatch
    ): Promise<boolean> {
        try {
            const id = await storage.get.profile().then(prof => prof?.RegID) as number
            const key = await storage.get.key().then(key => key) as string

            const storeman = new Storeman(Number(id), String(key))

            await storeman.patchAllocatedInstrumentStatus(id, patch)

            const instruments = await storeman.getAllocatedInstruments()
            setAllocatedInstruments(instruments)

            setError(undefined)

            return true
        } catch (error) {
            setError(error)
            return false
        }
    }

    return {
        loading,
        error,
        allocatedEquipment,
        allocatedInstruments,
        patchEquipment,
        patchInstrument
    }
}