import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import OrderListItem from '../../../sections/OrderListItem';
import DispText from '../../../components/DispText';

//interfaces
import Supply from '../../../scripts/interfaces/supply';
import Order from '../../../scripts/interfaces/orders';
import { OrderStatus } from '../../../scripts/enums/order';

//scripts
import Supplier from '../../../scripts/classes/supplier';

//auth
import storage from '../../../scripts/auth/storage';

export default function SupplyPendingOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [thisSupplier, setThisSupplier] = useState<Supplier>();

  useEffect(()=>{
    ( async ()=>{
      const id = await storage.get.profile().then(prof => prof?.regID);
      const key = await storage.get.key().then(key => key);
      if(typeof id === 'number' && typeof key === 'string' ){
        const supplier = new Supplier(id, key);
        const sup = await supplier?.getSupplies();
        const ord = await supplier?.getOrders();        
        setThisSupplier(supplier);
        setSupplies(sup);
        setOrders(ord.filter(o => o.OrderStatus === OrderStatus.Processing));        
      }                  
    })();
  }, []);

  async function haulOrder(id:number){
    await thisSupplier?.updateOrder(id);
  }

  return (
    <ScrollScreen>
      {
        orders.length > 0 ? orders.map((o) => <OrderListItem key={o.OrderID} order={o} supplies={supplies} fun={() => haulOrder(o.OrderID)}/>) : <DispText text='No pending orders found'/>
      }
    </ScrollScreen>
  );
}