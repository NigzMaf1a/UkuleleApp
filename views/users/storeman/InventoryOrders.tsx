import React, {useState, useEffect} from 'react';

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

    useEffect(()=>{
        (async ()=> {
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const manager = new Storeman(id, key);
                const thisOrders = await manager?.getOrders();
                const thisSupplies = await manager?.getSupplies();

                setStoreman(manager);
                setOrders(thisOrders.filter(o => o.OrderStatus === OrderStatus.Hauled));
                setSupplies(thisSupplies);                
            }                    
        })();
    }, []);

    async function markSupplyDelivered(id:number){
        await storeman?.updateOrder(id);
    }

  return (
    <ScrollScreen>
        {
            orders.length > 0 ? orders.map((o) => <OrderListItem key={o.OrderID} order={o} supplies={supplies} fun={() => markSupplyDelivered(o.OrderID)}/>) : <DispText text='No hauled supplies found'/>
        }
    </ScrollScreen>
  );
}