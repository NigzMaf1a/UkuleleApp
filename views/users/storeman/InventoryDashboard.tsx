import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//scripts
import Storeman from "../../../scripts/classes/storeman";
import describer from "../../../scripts/utils/describer";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItem from "../../../sections/ListItem";
import ListItemWithButton from "../../../sections/ListItemwithButton";
import DispText from "../../../components/DispText";

//interfaces
import Inventory from "../../../scripts/interfaces/inventory";

export default function InventoryDashboard() {
    let [views, setViews] = useState<number>(1);
    const [equipment, setEquipment] = useState<Inventory[]>([]);

    function reset() {
        setViews(1);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const manager = new Storeman(id, key);

                const inventory = (await manager.getEquipment()).filter(i => i.Availability === 'Available');
                setEquipment(inventory);
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                <DashTray>
                    {
                        equipment.length > 0 ? equipment.map((e) => <ListItem key={e.EquipmentID}
                            rowOneData={{ label: 'ID', text: String(e.EquipmentID) }}
                            rowTwoData={{ label: 'Description', text: e.Description }}
                            rightSideText={e.dCondition}
                        />) : <DispText text="No available equipment" />
                    }
                </DashTray>
            }
        </ScrollScreen>
    );
}

