
import { useState, useEffect, useCallback } from "react"
import apiFetch from "../scripts/utils/apiFetch"

import type Instrument from "../scripts/interfaces/instrument"
import type Inventory from "../scripts/interfaces/inventory"
import AllocatedEquipment, {
    AllocatedEquipmentPatch
} from "../scripts/interfaces/equip_alloc"
import AllocatedInstrument, {
    AllocatedInstrumentPatch
} from "../scripts/interfaces/inst_alloc"

type EquipmentPayload = Omit<Inventory, "equipmentid">
type InstrumentPayload = Omit<Instrument, "instrumentid">

type AllocatedEquipmentPayload = Omit<
    AllocatedEquipment,
    "allocequipid"
> & {
    lendid?: number | null
    conditionatreturn?: AllocatedEquipment["conditionatreturn"] | null
    returndate?: Date | null
}

type AllocatedInstrumentPayload = Omit<
    AllocatedInstrument,
    "allocinstid"
> & {
    lendid?: number | null
    conditionatreturn?: AllocatedInstrument["conditionatreturn"] | null
    returndate?: Date | null
}

interface SoundAndInstrumentData {
    loading: boolean
    error: unknown
    instruments: Instrument[]
    equipment: Inventory[]
    allocatedEquipment: AllocatedEquipment[]
    allocatedInstrument: AllocatedInstrument[]
    addEquipment: (data: EquipmentPayload) => Promise<void>
    addInstrument: (data: InstrumentPayload) => Promise<void>
    addAllocatedInstrument: (
        data: AllocatedInstrumentPayload
    ) => Promise<void>
    addAllocatedEquipment: (
        data: AllocatedEquipmentPayload
    ) => Promise<void>
    updateEquipment: (
        id: number,
        data: EquipmentPayload
    ) => Promise<void>
    updateInstrument: (
        id: number,
        data: InstrumentPayload
    ) => Promise<void>
    updateAllocatedInstrument: (
        id: number,
        data: AllocatedInstrumentPatch
    ) => Promise<void>
    updateAllocatedEquipment: (
        id: number,
        data: AllocatedEquipmentPatch
    ) => Promise<void>
}

const routes = {
    equipment: {
        getAll: "inventory/get",
        add: "inventory/add",
        update: (id: number) => `inventory/put/${id}`
    },
    instruments: {
        getAll: "instrument/get",
        add: "instrument/add",
        update: (id: number) => `instrument/put/${id}`
    },
    allocatedEquipment: {
        getAll: "allocatedequipment/get",
        add: "allocatedequipment/add",
        update: (id: number) => `allocatedequipment/patch/${id}`
    },
    allocatedInstrument: {
        getAll: "allocatedinstrument/get",
        add: "allocatedinstrument/add",
        update: (id: number) => `allocatedinstrument/patch/${id}`
    }
} as const

function toDate(value: Date | string): Date {
    return value instanceof Date ? value : new Date(value)
}

function normalizeInventory(item: Inventory): Inventory {
    return {
        ...item,
        purchasedate: toDate(item.purchasedate)
    }
}

function normalizeInstrument(item: Instrument): Instrument {
    return {
        ...item,
        purchasedate: toDate(item.purchasedate)
    }
}

function normalizeAllocatedEquipment(
    item: AllocatedEquipment
): AllocatedEquipment {
    return {
        ...item,
        allocdate: toDate(item.allocdate),
        conditionatreturn: item.conditionatreturn ?? undefined,
        returndate: item.returndate == null
            ? undefined
            : toDate(item.returndate)
    }
}

function normalizeAllocatedInstrument(
    item: AllocatedInstrument
): AllocatedInstrument {
    return {
        ...item,
        allocdate: toDate(item.allocdate),
        conditionatreturn: item.conditionatreturn ?? undefined,
        returndate: item.returndate == null
            ? undefined
            : toDate(item.returndate)
    }
}

export default function useSoundAndInstruments(): SoundAndInstrumentData {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [equipment, setEquipment] = useState<Inventory[]>([])
    const [allocatedEquipment, setAllocatedEquipment] =
        useState<AllocatedEquipment[]>([])
    const [allocatedInstrument, setAllocatedInstrument] =
        useState<AllocatedInstrument[]>([])

    const loadEquipment = useCallback(async (): Promise<void> => {
        const data = await apiFetch<Inventory[]>(routes.equipment.getAll)
        setEquipment(data.map(normalizeInventory))
    }, [])

    const loadInstruments = useCallback(async (): Promise<void> => {
        const data = await apiFetch<Instrument[]>(routes.instruments.getAll)
        setInstruments(data.map(normalizeInstrument))
    }, [])

    const loadAllocatedEquipment = useCallback(async (): Promise<void> => {
        const data = await apiFetch<AllocatedEquipment[]>(
            routes.allocatedEquipment.getAll
        )
        setAllocatedEquipment(data.map(normalizeAllocatedEquipment))
    }, [])

    const loadAllocatedInstruments = useCallback(async (): Promise<void> => {
        const data = await apiFetch<AllocatedInstrument[]>(
            routes.allocatedInstrument.getAll
        )
        setAllocatedInstrument(data.map(normalizeAllocatedInstrument))
    }, [])

    const refreshAll = useCallback(async (): Promise<void> => {
        setLoading(true)
        setError(null)

        try {
            await Promise.all([
                loadEquipment(),
                loadInstruments(),
                loadAllocatedEquipment(),
                loadAllocatedInstruments()
            ])
        } catch (err: unknown) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [
        loadEquipment,
        loadInstruments,
        loadAllocatedEquipment,
        loadAllocatedInstruments
    ])

    useEffect(() => {
        void refreshAll()
    }, [refreshAll])

    const executeMutation = useCallback(
        async (
            endpoint: string,
            method: "POST" | "PUT" | "PATCH",
            data: unknown,
            refresh: () => Promise<void>
        ): Promise<void> => {
            setLoading(true)
            setError(null)

            try {
                await apiFetch<unknown>(endpoint, {
                    method,
                    body: JSON.stringify(data)
                })

                await refresh()
            } catch (err: unknown) {
                setError(err)
                throw err
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const addEquipment = useCallback(
        (data: EquipmentPayload): Promise<void> =>
            executeMutation(
                routes.equipment.add,
                "POST",
                data,
                loadEquipment
            ),
        [executeMutation, loadEquipment]
    )

    const addInstrument = useCallback(
        (data: InstrumentPayload): Promise<void> =>
            executeMutation(
                routes.instruments.add,
                "POST",
                data,
                loadInstruments
            ),
        [executeMutation, loadInstruments]
    )

    const addAllocatedEquipment = useCallback(
        (data: AllocatedEquipmentPayload): Promise<void> =>
            executeMutation(
                routes.allocatedEquipment.add,
                "POST",
                data,
                async () => {
                    await Promise.all([
                        loadAllocatedEquipment(),
                        loadEquipment()
                    ])
                }
            ),
        [executeMutation, loadAllocatedEquipment, loadEquipment]
    )

    const addAllocatedInstrument = useCallback(
        (data: AllocatedInstrumentPayload): Promise<void> =>
            executeMutation(
                routes.allocatedInstrument.add,
                "POST",
                data,
                async () => {
                    await Promise.all([
                        loadAllocatedInstruments(),
                        loadInstruments()
                    ])
                }
            ),
        [executeMutation, loadAllocatedInstruments, loadInstruments]
    )

    const updateEquipment = useCallback(
        (id: number, data: EquipmentPayload): Promise<void> =>
            executeMutation(
                routes.equipment.update(id),
                "PUT",
                data,
                loadEquipment
            ),
        [executeMutation, loadEquipment]
    )

    const updateInstrument = useCallback(
        (id: number, data: InstrumentPayload): Promise<void> =>
            executeMutation(
                routes.instruments.update(id),
                "PUT",
                data,
                loadInstruments
            ),
        [executeMutation, loadInstruments]
    )

    const updateAllocatedEquipment = useCallback(
        (id: number, data: AllocatedEquipmentPatch): Promise<void> =>
            executeMutation(
                routes.allocatedEquipment.update(id),
                "PATCH",
                data,
                async () => {
                    await Promise.all([
                        loadAllocatedEquipment(),
                        loadEquipment()
                    ])
                }
            ),
        [executeMutation, loadAllocatedEquipment, loadEquipment]
    )

    const updateAllocatedInstrument = useCallback(
        (id: number, data: AllocatedInstrumentPatch): Promise<void> =>
            executeMutation(
                routes.allocatedInstrument.update(id),
                "PATCH",
                data,
                async () => {
                    await Promise.all([
                        loadAllocatedInstruments(),
                        loadInstruments()
                    ])
                }
            ),
        [executeMutation, loadAllocatedInstruments, loadInstruments]
    )

    return {
        loading,
        error,
        instruments,
        equipment,
        allocatedEquipment,
        allocatedInstrument,
        addEquipment,
        addInstrument,
        addAllocatedInstrument,
        addAllocatedEquipment,
        updateEquipment,
        updateInstrument,
        updateAllocatedInstrument,
        updateAllocatedEquipment
    }
}
