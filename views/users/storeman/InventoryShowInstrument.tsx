import useShowInstrument from "../../../hooks/useShowInstrument"

import ScrollScreen from "../../../components/ScrollScreen"
import LabelledText from "../../../components/LabelledText"

import describer from "../../../scripts/utils/describer"
import { EquipmentCondition } from "../../../scripts/enums/equipment"

export default function InventoryShowInstrument() {
    const { selected } = useShowInstrument()

    return (
        <ScrollScreen>
            <LabelledText
                label="Id"
                text={String(selected.instrumentid)}
            />

            <LabelledText
                label="Description"
                text={selected.description}
            />

            <LabelledText
                label="Condition"
                text={describer(selected.dcondition as EquipmentCondition)}
            />

            <LabelledText
                label="Price"
                text={`ksh ${String(selected.price)}`}
            />

            <LabelledText
                label="Id"
                text={String(selected.purchasedate)}
            />

        </ScrollScreen>
    )
}