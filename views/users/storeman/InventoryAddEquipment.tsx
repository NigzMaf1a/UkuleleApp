import React, {useState, useEffect} from 'react';
import { View } from 'react-native';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import DropDown, {DropDownItem} from '../../../components/DropDown';
import DispText from '../../../components/DispText';

//styles
import componentStyles from '../../../styles/components';
import sectionStyles from '../../../styles/sections';
import viewStyles from '../../../styles/views';

//scripts
import Storeman from '../../../scripts/classes/storeman';
import Inventory from '../../../scripts/interfaces/inventory';
import date from '../../../scripts/utils/date';
import { EquipmentAvailabilty, EquipmentDescription, EquipmentCondition } from '../../../scripts/enums/equipment';

//data
import equipmentTypeArray from '../../../scripts/utils/equipment';

//auth
import storage from '../../../scripts/auth/storage';


export default function InventoryAddEquipment() {
    const [manager, setManager] = useState<Storeman>();
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<EquipmentDescription>();
    const [condition] = useState<EquipmentCondition>(EquipmentCondition.CAT1);
    const [availability] = useState<EquipmentAvailabilty>(EquipmentAvailabilty.Available);
    const [equipmentType] = useState<DropDownItem[]>(equipmentTypeArray());


    useEffect(()=>{
        ( async ()=> {
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const storeman = new Storeman(22, '');
                setManager(storeman);                
            }            
        })();
    }, []);

    const equipment:Inventory = {
        Price:price,
        Description:description,
        dCondition:condition,
        Availability:availability, 
        PurchaseDate:date()
    }

    async function addEquipment(equip:Inventory){
        await manager?.addEquipment(equip);
    }

  return (
    <ScrollScreen>
        <View style={sectionStyles.tray}>
            <DispText text={'Description'}/>
            <DropDown values={equipmentType}                    
            />
        </View>
        <Input placeholder={'Price'}
               value={String(price)}
               onChange={}
        />
    </ScrollScreen>
  )
}