import React, { useState, useEffect } from 'react';

// components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemAdv from '../../../components/revisited/cutting edge/ListItemAdv';
import DispText from '../../../components/DispText';
import FancyLoad from '../../../sections/FancyLoad';

// scripts
import Storeman from '../../../scripts/classes/storeman';
import Inventory from '../../../scripts/interfaces/inventory';
import { EquipmentAvailabilty, EquipmentCondition } from '../../../scripts/enums/equipment';
import describer from '../../../scripts/utils/describer';

// auth
import storage from '../../../scripts/auth/storage';

export default function InventoryInventory() {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                setLoading(true);

                const [profile, key] = await Promise.all([
                    storage.get.profile(),
                    storage.get.key(),
                ]);

                if (
                    typeof profile?.RegID === 'number' &&
                    typeof key === 'string'
                ) {
                    const storeman = new Storeman(profile.RegID, key);

                    const equipment = await storeman.getEquipment();

                    setInventory(
                        equipment.filter(
                            e =>
                                e.availability ===
                                EquipmentAvailabilty.Available
                        )
                    );
                } else {
                    setInventory([]);
                }
            } catch (error) {
                console.error('Failed to load inventory:', error);
                setInventory([]);
            } finally {
                setLoading(false);
            }
        };

        loadInventory();
    }, []);

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />

            {!loading && (
                inventory.length > 0 ? (
                    inventory.map((i) => (
                        <ListItemAdv
                            key={i.equipmentid}
                            rowOneData={{
                                label: 'ID',
                                text: String(i.equipmentid),
                            }}
                            rowTwoData={{
                                label: 'Type',
                                text: i.description,
                            }}
                            rightSideText={describer(i.dcondition as EquipmentCondition)}
                            text_three_variant={
                                i.dcondition == EquipmentCondition.CAT1 ? 'success' :
                                    i.dcondition == EquipmentCondition.CAT2 ? 'info' :
                                        i.dcondition == EquipmentCondition.CAT3 ? 'warning' : 'danger'
                            }
                        />
                    ))
                ) : (
                    <DispText text="No equipment is available in the inventory" />
                )
            )}
        </ScrollScreen>
    );
}