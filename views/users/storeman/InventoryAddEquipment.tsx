import React, {useState, useEffect} from 'react';
import { View } from 'react-native';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import BigForm from '../../../components/BigForm';
import FormStrip from '../../../components/FormStript';
import Button from '../../../components/Button';
import LabelledInput from '../../../sections/LabelledInput';
import {DropDownItem} from '../../../components/DropDown';
import LabelledDropdown from '../../../components/LabelledDropdown';

//styles


//scripts
import Storeman from '../../../scripts/classes/storeman';
import date from '../../../scripts/utils/date';
import toaster from '../../../scripts/utils/toaster';

//interfaces
import Inventory from '../../../scripts/interfaces/inventory';

//enums
import { EquipmentAvailabilty, EquipmentDescription, EquipmentCondition } from '../../../scripts/enums/equipment';

//data
import equipmentTypeArray from '../../../scripts/utils/equipment';

//auth
import storage from '../../../scripts/auth/storage';


export default function InventoryAddEquipment() {
    const [manager, setManager] = useState<Storeman>();
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
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

    function typeConvertPrice(val:string):number{
        if(val !== null){
            const price = Number(val);
            if(typeof price === 'number' && price !== 0){
                return price;
            }
        }
        toaster('Please enter a valid price', 'danger');
        throw new Error('Please enter a valid number');
    }

    const equipment:Inventory = {
        Price:typeConvertPrice(price),
        Description:description as EquipmentDescription,
        dCondition:condition,
        Availability:availability, 
        PurchaseDate:date()
    }

    async function addEquipment(equip:Inventory){
        await manager?.addEquipment(equip);
    }

  return (
    <ScrollScreen>
        <BigForm>
            <LabelledInput
                label='Price'
                inputPlaceholder='Please enter a price here'
                value={price}
                onChange={setPrice}
            />

            <LabelledDropdown
                label='Equipment Description'
                values={equipmentType}
                selectedValue={description}
                onValueChange={setDescription}
            />

            <FormStrip>
                <Button
                    label='Add'
                    fun={() => addEquipment(equipment)}
                />
            </FormStrip>
        </BigForm>
    </ScrollScreen>
  )
}