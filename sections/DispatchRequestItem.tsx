import React, {useState} from 'react';
import { Modal } from 'react-native';

//components
import LabelledText from '../components/LabelledText';
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import Screen from '../components/Screen';
import Button from '../components/Button';

//enums
import DispatchStatus from '../scripts/enums/dispatch';


//interfaces
import Dispatch from '../scripts/interfaces/dispatch';

interface DispatchRequestItemProps{
    item:Dispatch;
    fun:(par?:number | string) => Promise<void> | void
}

export default function DispatchRequestItem({item, fun}:DispatchRequestItemProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    function toggleModal(){
        setShowModal(prev => !prev);
    }
  return (
    <>
        <Strip>
            <Tray>
                <LabelledText label='ID' text={String(item.DispatchID)}/>
                <LabelledText label='Location' text={item.dLocation}/>
            </Tray>
            <Button label={item.Dispatched} fun={() => toggleModal()}/>
        </Strip>
        {
            showModal && <Screen>
                <LabelledText label='Dispatch ID' text={String(item.DispatchID)}/>
                <LabelledText label='Customer ID' text={String(item.CustomerID)}/>
                <LabelledText label='Name' text={String(item.Name)}/>
                <LabelledText label='Location' text={String(item.dLocation)}/>
                <LabelledText label='Service ID' text={String(item.ServiceID)}/>
                <LabelledText label='Phone' text={item.PhoneNo}/>
                <LabelledText label='Status' text={item.Dispatched}/>
                <LabelledText label='Date' text={item.DispatchDate}/>
                <Strip>
                    <Button label={'Close'} fun={() => toggleModal()}/>
                    <Button label={item.Dispatched === DispatchStatus.Pending ? 'Dispatch' : item.Dispatched === DispatchStatus.Dispatched ? 'Pack' : 'Return'} 
                            fun={fun}/>
                </Strip>
            </Screen>
        }
    </>
  );
}