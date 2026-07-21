import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemAdv from '../../../components/revisited/cutting edge/ListItemAdv';
import DispText from '../../../components/DispText';

//interfaces
import Order from '../../../scripts/interfaces/orders';

//scripts
import Supplier from '../../../scripts/classes/supplier';

//auth
import storage from '../../../scripts/auth/storage';

export default function SupplyReport() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const supplier = new Supplier(22, '');
                const cur_orders = await supplier.getOrders();
                setOrders(cur_orders);
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                orders.length > 0 ? orders.map((order) => <ListItemAdv key={order.orderid}
                    rowOneData={{ label: 'ID', text: String(order.orderid) }}
                    rowTwoData={{ label: 'Date', text: String(order.orderdate.toLocaleDateString()) }}
                    rightSideText={order.orderstatus}
                />) : <DispText text='No available orders' />
            }
        </ScrollScreen>
    );
}