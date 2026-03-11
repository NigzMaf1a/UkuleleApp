import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import LabelledInput from '../../../sections/LabelledInput';
import DispText from '../../../components/DispText';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import Button from '../../../components/Button';

//scripts
import Inspector from '../../../scripts/classes/inspector';

//interfaces
import AllocatedEquipment from '../../../scripts/interfaces/allocatedEquipment';

//auth
import storage from '../../../scripts/auth/storage';

export default function InspectorInspection() {
  const [allocated, setAllocated] = useState<AllocatedEquipment[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal(){
    setShowModal(prev => !prev);
  }

  useEffect(()=>{
    ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
              const inspector = new Inspector(id, key);
              const lendEquipment = await inspector.getAllAllocatedEquipment();

              setAllocated(lendEquipment);
            }
    })();
  }, [])
  return (
    <ScrollScreen>
      {
        allocated.length > 0 ? allocated.map((a) => <ListItemWithButton key={a.AllocatedEquipmentID}
                                                                        rowOneData={{label:'Equip ID', text:String(a.EquipmentID) }}
                                                                        rowTwoData={{label:'Lend ID', text:String(a.LendID)}}
                                                                        buttonLabel='View'
                                                                        fun={() => toggleModal()}
        />) : <DispText text='No allocated equipment found'/>
      }
      {
        showModal && 
      }
    </ScrollScreen>
  );
}