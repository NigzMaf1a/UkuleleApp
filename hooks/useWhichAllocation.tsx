
import { useEffect, useState } from "react"

// types
import Services from "../scripts/interfaces/services"
import Lending from "../scripts/interfaces/lending"
import Booking from "../scripts/interfaces/booking"
import Inventory from "../scripts/interfaces/inventory"
import Instrument from "../scripts/interfaces/instrument"

// classes and utilities
import Storeman from "../scripts/classes/storeman"
import storage from "../scripts/auth/storage"

interface AllocationData {
    loading: boolean
    error: unknown
    services: Services[]
    lendings: Lending[]
    bookings: Booking[]
    inventory: Inventory[]
    instruments: Instrument[]
    selectedService: Services | undefined
    updateSelectedService: (service: Services) => void
}

export default function useWhichAllocation(): AllocationData {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(undefined)

    const [services, setServices] = useState<Services[]>([])
    const [lendings, setLendings] = useState<Lending[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [inventory, setInventory] = useState<Inventory[]>([])
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [selectedService, setSelectedService] =
        useState<Services | undefined>(undefined)

    useEffect(() => {
        let active = true

        async function init(): Promise<void> {
            try {
                setLoading(true)
                setError(undefined)

                const [token, profile] = await Promise.all([
                    storage.get.key(),
                    storage.get.profile()
                ])

                const regID = profile?.RegID

                if (!token || !regID || regID <= 0) {
                    throw new Error("No valid user session found")
                }

                const storeman = new Storeman(regID, token)

                const [
                    fetchedServices,
                    fetchedLendings,
                    fetchedBookings,
                    fetchedInventory
                ] = await Promise.all([
                    storeman.getServices(),
                    storeman.getLendings(),
                    storeman.getBookings(),
                    storeman.getEquipment()
                ])

                if (!active) return

                setServices(fetchedServices)
                setLendings(fetchedLendings)
                setBookings(fetchedBookings)
                setInventory(fetchedInventory)

                // Instrument retrieval will be added when its API is ready.
                setInstruments([])
            } catch (error: unknown) {
                if (!active) return

                setError(error)
                setServices([])
                setLendings([])
                setBookings([])
                setInventory([])
                setInstruments([])
                setSelectedService(undefined)
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

    return {
        loading,
        error,
        services,
        lendings,
        bookings,
        inventory,
        instruments,
        selectedService,
        updateSelectedService: (service: Services): void => {
            setSelectedService(service)
        }
    }
}
