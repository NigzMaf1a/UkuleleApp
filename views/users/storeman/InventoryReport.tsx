import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';


//scripts
import Storeman from '../../../scripts/classes/storeman';
import Inventory from '../../../scripts/interfaces/inventory';
import { EquipmentAvailabilty } from '../../../scripts/enums/equipment';

//auth
import storage from '../../../scripts/auth/storage';

export default function InventoryReport() {
    const [inventory, setInventory] = useState<Inventory[]>([]);

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const storeman = new Storeman(id, key);
                const equipment = await storeman?.getEquipment();
                setInventory(equipment.filter(e => e.Availability === EquipmentAvailabilty.Unavailable));                
            }
        })();
    }, []);

  return (
    <ScrollScreen>
        {
            inventory.length > 0 ? inventory.map((i) => <ListItem key={i.EquipmentID}
                                                                  rowOneData={{label:'ID', text:String(i.EquipmentID)}}
                                                                  rowTwoData={{label:'Type', text:i.Description}}
                                                                  rightSideText={i.Availability}
            />) : <DispText text='No equipment has been lent'/>
        }
    </ScrollScreen>
  );
}