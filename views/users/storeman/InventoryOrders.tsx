import React, { useState, useEffect, useMemo } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import OrderListItem from '../../../sections/OrderListItem';
import DispText from '../../../components/DispText';

//interfaces
import Order from '../../../scripts/interfaces/orders';
import Supply from '../../../scripts/interfaces/supply';

//scripts
import Storeman from '../../../scripts/classes/storeman';

//enums
import { OrderStatus } from '../../../scripts/enums/order';

//auth
import storage from '../../../scripts/auth/storage';

export default function InventoryOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [supplies, setSupplies] = useState<Supply[]>([]);
    const [storeman, setStoreman] = useState<Storeman>();
    const [query, setQuery] = useState<string>('')

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const manager = new Storeman(id, key);
                const thisOrders = await manager?.getOrders();
                const thisSupplies = await manager?.getSupplies();

                setStoreman(manager);
                setOrders(thisOrders.filter(o => o.orderstatus === OrderStatus.Hauled));
                setSupplies(thisSupplies);
            }
        })();
    }, []);

    async function markSupplyDelivered(id: number) {
        await storeman?.updateOrder(id);
    }

    const queriedOrders: Order[] = useMemo(() => {
        const processedQuery = query.trim().toLowerCase()

        if (!processedQuery) {
            return orders
        }

        return orders.filter(o => Object.values(o).includes(processedQuery))

    }, [query, orders])

    return (
        <ScrollScreen
            showSearch={orders.length > 5}
            query={query}
            setQuery={setQuery}
        >
            {
                queriedOrders.length > 0 ? queriedOrders.map((o) => <OrderListItem key={o.orderid} order={o} supplies={supplies} fun={() => markSupplyDelivered(o.orderid)} />) : <DispText text='No hauled supplies found' />
            }
        </ScrollScreen>
    );
}