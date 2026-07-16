import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import BigForm from '../../../components/BigForm';
import FormStrip from '../../../components/FormStript';
import Button from '../../../components/Button';
import LabelledInput from '../../../sections/LabelledInput';
import { DropDownItem } from '../../../components/DropDown';
import LabelledDropdown from '../../../components/LabelledDropdown';

//scripts
import Storeman from '../../../scripts/classes/storeman';
import date from '../../../scripts/utils/date';
import toaster from '../../../scripts/utils/toaster';

//interfaces
import Inventory from '../../../scripts/interfaces/inventory';

//enums
import {
    EquipmentAvailabilty,
    EquipmentDescription,
    EquipmentCondition
} from '../../../scripts/enums/equipment';

//data
import equipmentTypeArray from '../../../scripts/utils/equipment';

//auth
import storage from '../../../scripts/auth/storage';

export default function InventoryAddEquipment() {

    const [manager, setManager] = useState<Storeman>();

    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [condition] = useState<EquipmentCondition>(
        EquipmentCondition.CAT1
    );

    const [availability] = useState<EquipmentAvailabilty>(
        EquipmentAvailabilty.Available
    );

    const [equipmentType] = useState<DropDownItem[]>(
        equipmentTypeArray()
    );

    useEffect(() => {
        (async () => {

            const id = await storage.get.profile()
                .then(prof => prof?.RegID);

            const key = await storage.get.key();

            if (typeof id === 'number' && typeof key === 'string') {

                // Replace with:
                // const storeman = new Storeman(id, key);
                const storeman = new Storeman(22, '');

                setManager(storeman);
            }

        })();
    }, []);

    /**
     * Safely convert the entered price.
     * Returns null if the value is invalid.
     */
    function typeConvertPrice(val: string): number | null {

        const parsed = Number(val.trim());

        if (
            val.trim().length === 0 ||
            Number.isNaN(parsed) ||
            parsed <= 0
        ) {
            return null;
        }

        return parsed;
    }

    async function addEquipment() {

        const parsedPrice = typeConvertPrice(price);

        if (parsedPrice === null) {
            toaster(
                'Please enter a valid price',
                'danger'
            );
            return;
        }

        if (description.trim().length === 0) {
            toaster(
                'Please select an equipment description',
                'danger'
            );
            return;
        }

        const equipment: Inventory = {
            Price: parsedPrice,
            Description: description as EquipmentDescription,
            dCondition: condition,
            Availability: availability,
            PurchaseDate: date()
        };

        await manager?.addEquipment(equipment);

        // Optional: Clear the form after a successful submission
        setPrice('');
        setDescription('');
    }

    return (
        <ScrollScreen>
            <BigForm>

                <LabelledInput
                    label="Price"
                    inputPlaceholder="Please enter a price here"
                    value={price}
                    onChange={setPrice}
                />

                <LabelledDropdown
                    label="Equipment Description"
                    values={equipmentType}
                    selectedValue={description}
                    onValueChange={setDescription}
                />

                <FormStrip>
                    <Button
                        label="Add"
                        fun={addEquipment}
                    />
                </FormStrip>

            </BigForm>
        </ScrollScreen>
    );
}