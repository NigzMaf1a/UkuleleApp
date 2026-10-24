import { useState } from "react"

import Instrument from "../scripts/interfaces/instrument"

interface ShowInstrument {
    selected: Instrument
    select: (instrument: Instrument) => void
}

export default function useShowInstrument(): ShowInstrument {
    const [selected, setSelected] = useState<Instrument | undefined>(undefined)

    function select(instrument: Instrument) {
        setSelected(instrument)
    }

    return {
        selected: selected as Instrument,
        select: select
    }
}