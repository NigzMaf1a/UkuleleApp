import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
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
                orders.length > 0 ? orders.map((order) => <ListItem key={order.OrderID}
                    rowOneData={{ label: 'ID', text: String(order.OrderID) }}
                    rowTwoData={{ label: 'Date', text: String(order.OrderDate.toLocaleDateString()) }}
                    rightSideText={order.OrderStatus}
                />) : <DispText text='No available orders' />
            }
        </ScrollScreen>
    );
}