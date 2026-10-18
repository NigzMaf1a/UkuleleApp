import { useEffect, useState } from "react"

//types
import Services from "../scripts/interfaces/services"
import Lending from "../scripts/interfaces/lending"
import Booking from "../scripts/interfaces/booking"
import Inventory from "../scripts/interfaces/inventory"
import Instrument from "../scripts/interfaces/instrument"

interface AllocationData {
    loading: boolean
    error: unknown
    services: Services[]
    lendings: Lending[]
    bookings: Booking[]
    inventory: Inventory[]
    instruments: Instrument[]
    selectedService: Services
    updateSelectedService: (service: Services) => void
}

export default function useWhichAllocation(): AllocationData {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown>()
    const [services, setServices] = useState<Services[]>([])
    const [lendings, setLendings] = useState<Lending[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [inventory, setInventory] = useState<Inventory[]>([])
    const [instrument, setInstrument] = useState<Instrument[]>([])
    const [selectedService, setSelectedService] = useState<Services>()

    useEffect(() => {
        async function init() {
            try {
                setLoading(true)

            } catch (error) {
                setError(error)
                setServices([])
                setLendings([])
                setBookings([])
                setInventory([])
                setInstrument([])
            } finally {
                setLoading(false)
                return
            }
        }

        init()
    }, [])

    return {
        loading: loading,
        error: error,
        services: services,
        lendings: lendings,
        bookings: bookings,
        inventory: inventory,
        instruments: instrument,
        selectedService: selectedService as Services,
        updateSelectedService: function (service: Services) {
            setSelectedService(service)
        }
    }
}