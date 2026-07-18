import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItem from "../../../sections/ListItem";
import ListItemWithButton from "../../../sections/ListItemwithButton";
import DispText from "../../../components/DispText";

//scripts
import Supplier from "../../../scripts/classes/supplier";

//interfaces
import Supply from "../../../scripts/interfaces/supply";
import Order from "../../../scripts/interfaces/orders";

//enums
import { SupplyAvailable } from "../../../scripts/enums/supply";
import { OrderStatus } from "../../../scripts/enums/order";

export default function SupplierDashboard() {
    let [views, setViews] = useState<number>(1);
    const [supplies, setSupplies] = useState<Supply[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    function reset() {
        setViews(1);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const supplier = new Supplier(id, key);

                const sup = (await supplier.getSupplies()).filter(s => s.available === SupplyAvailable.Yes);
                const ord = (await supplier.getOrders()).filter(o => o.orderstatus === OrderStatus.Processing);
                setSupplies(sup);
                setOrders(ord);
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            <DashTray>
                {
                    supplies.length > 0 ? supplies.map((s) => <ListItem key={s.supplyid}
                        rowOneData={{ label: 'ID', text: String(s.supplyid) }}
                        rowTwoData={{ label: 'Type', text: s.supplytype }}
                        rightSideText={String(s.availableunits)}
                    />) : <DispText text="No supplies found" />
                }
            </DashTray>
            <DashTray>
                {
                    orders.length > 0 ? orders.map((o) => <ListItem key={o.orderid}
                        rowOneData={{ label: 'ID:', text: String(o.orderid) }}
                        rowTwoData={{ label: 'Items', text: String(o.orderstatus) }}
                        rightSideText={String(o.orderamount)}
                    />) : <DispText text="No orders found." />
                }
            </DashTray>
        </ScrollScreen>
    );
}

