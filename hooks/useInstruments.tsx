import { useState, useEffect } from "react"
import Instrument from "../scripts/interfaces/instrument"

import Storeman from "../scripts/classes/storeman"
import storage from "../scripts/auth/storage"

interface InstrumentData {
    instruments: Instrument[]
    updateInstrument: (instrument: Instrument) => Promise<void>
    addInstrument: (instrument: Instrument) => Promise<void>
}

export default function useInstruments(): InstrumentData {
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const [storeman, setStoreman] = useState<Storeman | undefined>()

    useEffect(() => {
        async function init() {
            try {
                setLoading(true)
                const [key, id] = await Promise.all([
                    storage.get.key().then(k => {
                        return k as string
                    }),
                    storage.get.profile().then((p) => {
                        return p?.RegID as number
                    })
                ])

                const s = new Storeman(id, key)

                    setStoreman(s)
            } catch (error) { } finally {
                setLoading(false)
            }
        }

        void init()
    }, [])

    return {
        instruments: instruments,
        updateInstrument: async function (instrument: Instrument) {

        },
        addInstrument: async function (instrument: Instrument) { }
    }
}