import React, {useState} from 'react';
import { Modal } from 'react-native';

//components
import Screen from '../components/Screen';
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import Button from '../components/Button';
import LabelledText from '../components/LabelledText';
import ButtonComplex from '../components/ButtonComplex';
import LabelledDropdown from '../components/LabelledDropdown';

//interfaces
import Inspection from '../scripts/interfaces/inspection';
import AllocatedEquipment from '../scripts/interfaces/allocatedEquipment';
import { DropDownItem } from '../components/DropDown';

//enums
import { EquipmentCondition } from '../scripts/enums/equipment';

//data
import { equipmentConditionArray } from '../scripts/utils/equipment';

interface InspectionItemProps{
    item:AllocatedEquipment;
    selectedValue:EquipmentCondition;
    fun:(insp?:Inspection) => Promise<void> | void
}


export default function InspectionItem({item, fun, selectedValue}:InspectionItemProps) {
    const[showModal, setShowModal] = useState<boolean>(false);
    const [values] = useState<DropDownItem[]>(equipmentConditionArray());

    function toggleModal(){
        setShowModal(prev => !prev);
    }

  return (
    <>
        <Strip>
            <Tray>
                <LabelledText label='ID' text={String(item.AllocatedEquipmentID)}/>
                <LabelledText label='Status' text={item.EquipStatus}/>
            </Tray>
            <Button label='Inspect' fun={() => toggleModal()}/>
        </Strip>
        {
            showModal && <Modal>
                <Screen>
                    <LabelledDropdown label='Condition' values={values}/>
                    <Strip>
                        <Button label='Close' fun={() => toggleModal()}/>
                        <ButtonComplex label='Inspect' fun={fun}/>
                    </Strip>
                </Screen>
            </Modal>
        }
    </>
  );
} 