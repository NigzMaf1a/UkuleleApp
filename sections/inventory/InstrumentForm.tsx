import React, { useState } from 'react'
import useSoundAndInstruments from '../../hooks/useSoundAndInstruments'

//styles
import { colors } from '../../styles/colors'

//components
import SmallForm from '../../components/SmallForm'
import DispText from '../../components/DispText'
import LabelledInput from '../LabelledInput'
import Button from '../../components/Button'

//types
import Instrument from '../../scripts/interfaces/instrument'

//scripts
import toaster from '../../scripts/utils/toaster'

export default function InstrumentForm() {
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [condition, setCondition] = useState<string>('')

    const { addInstrument } = useSoundAndInstruments()

    async function submit() {
        if (!price.trim() || isNaN(Number(price))) {
            toaster('Please enter a valid price', 'warn')
        }

        if (!description.trim()) {
            toaster('Please select a valid description', 'warn')
        }

        if (!condition.trim()) {
            toaster('Please select a valid description', 'warn')
        }

        const instrument: Instrument = {
            price: Number(price),
            description: description as 'Guitar' | 'Piano' | 'Violin' | 'Ukulele',
            purchasedate: new Date(),
            dcondition: condition as 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4',
            availability: 'Available'
        }

        await addInstrument(instrument)
    }

    return (
        <SmallForm>
            <DispText
                text="Add Instrument"
                variant="h2"
                textColor={colors.theme}
                textAlign="center"
            />

            <LabelledInput
                label="Price"
                inputPlaceholder="Enter price here"
                value={price}
                onChange={setPrice}
                autoCapitalize="none"
            />

            <LabelledInput
                label="Description"
                inputPlaceholder="Enter description here"
                value={description}
                onChange={setDescription}
                autoCapitalize="none"
            />

            <LabelledInput
                label="Condition"
                inputPlaceholder="Enter condition here"
                value={condition}
                onChange={setCondition}
                autoCapitalize="none"
            />

            <Button
                label='submit'
                fun={async () => await submit()}
            />
        </SmallForm>
    )
}
