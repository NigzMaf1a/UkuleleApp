import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';

//interfaces
import Supply from '../../../scripts/interfaces/supply';
import { SupplyAvailable } from '../../../scripts/enums/supply';

//scripts
import Supplier from '../../../scripts/classes/supplier';

//auth
import storage from '../../../scripts/auth/storage';


export default function SupplierAvailable() {
    const [supplies, setSupplies] = useState<Supply[]>([]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regid);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const supplier = new Supplier(id, key);
                const sup = await supplier.getSupplies();
                setSupplies(sup.filter(s => s.available === SupplyAvailable.Yes));
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                supplies.length > 0 ? supplies.map((sup) => <ListItem key={sup.supplyid}
                    rowOneData={{ label: 'Type', text: sup.supplytype }}
                    rowTwoData={{ label: 'Price', text: String(sup.price) }}
                    rightSideText={String(sup.availableunits)}
                />) : <DispText text='No available supplies' />
            }
        </ScrollScreen>
    )
}