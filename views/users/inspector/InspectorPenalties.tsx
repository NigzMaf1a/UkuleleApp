import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import MyModal from '../../../components/MyModal';
import SmallForm from '../../../components/SmallForm';
import FormStrip from '../../../components/FormStript';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import DispText from '../../../components/DispText';
import LabelledDropdown from '../../../components/LabelledDropdown';
import Button from '../../../components/Button';

//scripts
import Inspector from '../../../scripts/classes/inspector';
import describer from '../../../scripts/utils/describer';
import stringToNumber from '../../../scripts/utils/stringToNumber';
import { equipmentConditionArray } from '../../../scripts/utils/equipment';

//auth
import storage from '../../../scripts/auth/storage';

//interfaces
import Inspection from '../../../scripts/interfaces/inspection';
import Penalty from '../../../scripts/interfaces/penalty';
import Services from '../../../scripts/interfaces/services';
import Lending from '../../../scripts/interfaces/lending';
import { DropDownItem } from '../../../components/DropDown';

//enum
import { EquipmentCondition } from '../../../scripts/enums/equipment';
import { EquipmentDescription } from '../../../scripts/enums/equipment';
import { PenaltyStatus } from '../../../scripts/enums/penalty';
import LabelledInput from '../../../sections/LabelledInput';

interface PenaltyData{
  equipment_id:number,
  customer_id:number,
  description:EquipmentDescription
}

export default function InspectorPenalties() {
  const [dropdownvalues] = useState<DropDownItem[]>(equipmentConditionArray());
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inspector, setInspector] = useState<Inspector>();
  const [itemData, setItemData] = useState<PenaltyData | undefined>();
  const [selectedInspectionId, setSelectedInspectionId] = useState<number>(0);
  const [condition, setCondition] = useState<string>('');
  const [penalty, setPenalty] = useState<string>('');

    useEffect(() =>{
        ( async ()=> {
                const id = await storage.get.profile().then(prof => prof?.regID);
                const key = await storage.get.key().then(key => key);
                if(typeof id === 'number' && typeof key === 'string' ){
                    const man = new Inspector(id, key);
                    const insp = await man.getAllInspections();

                    setInspections(insp);
                    setInspector(man);
                }        
        })();
    }, []);
    
    useEffect(()=>{
      ( async ()=>{
        const data = await equipmentData(selectedInspectionId);

        if(typeof data !== 'undefined') setItemData(data);
      })();
    }, [selectedInspectionId]);

    function toggleModal(){
      setShowModal(prev => !prev);
    }

    function mountModal(id:number){
      setSelectedInspectionId(id);
    }

    function unmountModal(){
      setSelectedInspectionId(0);
    }

    async function equipmentData(inspection_id:number):Promise<PenaltyData | undefined>{
      if(inspector){
        const inventory = await inspector.getAllEquipment();
        const equip_alloc = await inspector.getAllAllocatedEquipment();

        if(inspections){
          const equip_id = inspections.find(i => i.InspectionID === inspection_id)?.EquipmentID;
          if(typeof equip_id === 'number'){
            const alloc = equip_alloc.find(e => e.EquipmentID === equip_id);
            const equip_desc = inventory.find(i => i.EquipmentID === equip_id)?.Description;
            if(typeof alloc !== 'undefined'){
              const cust_id = alloc.RegID;
              if(typeof cust_id === 'number' && typeof equip_desc !== 'undefined') return {
                equipment_id:equip_id,
                customer_id:cust_id,
                description:equip_desc as EquipmentDescription
              }
            }
          }
        }
      }
    }

    function penaltyPayload():Penalty{
      return {
        EquipmentID:itemData?.equipment_id as number,
        CustomerID:itemData?.customer_id as number,
        Description:itemData?.description as EquipmentDescription,
        dCondition: condition as EquipmentCondition,
        Penalty:stringToNumber(penalty),
        PenaltyStatus:PenaltyStatus.Processing
      }
    }
  return (
    <ScrollScreen>
      {
        inspections.length > 0 ? inspections.map((i) => <ListItemWithButton
                key={i.InspectionID}
                rowOneData={{label:'Inspection ID', text:String(i.InspectionID)}}
                rowTwoData={{label:'Condition', text:describer(i.dCondition)}}
                buttonLabel='Penalize'
                fun={() => mountModal(i.InspectionID as number)}
        />) : <DispText text='No inspections found'/>
      }
      <MyModal
          visible = {showModal}
          onClose={() => unmountModal()}
          title='Penalize'
      >
        <SmallForm>
          <LabelledDropdown
              label='Condition'
              values={dropdownvalues}
              selectedValue={condition}
              onValueChange={setCondition}
          />

          <LabelledInput
              label='Penalty Amount'
              inputPlaceholder='Please enter the penalty amount here'
              value={penalty}
              onChange={setPenalty}
          />
        </SmallForm>
      </MyModal>
    </ScrollScreen>
  );
} 