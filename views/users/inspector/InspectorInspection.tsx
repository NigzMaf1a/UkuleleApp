import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import MyModal from '../../../components/MyModal';
import LabelledInput from '../../../sections/LabelledInput';
import DispText from '../../../components/DispText';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';
import Button from '../../../components/Button';
import BigForm from '../../../components/BigForm';
import FormStrip from '../../../components/FormStript';
import LabelledDropdown from '../../../components/LabelledDropdown';
import LabelledText from '../../../components/LabelledText';

//scripts
import Inspector from '../../../scripts/classes/inspector';
import date from '../../../scripts/utils/date';
import equipmentDescription from '../../../scripts/utils/equipmentDescription';
import toaster from '../../../scripts/utils/toaster';

//interfaces
import AllocatedEquipment from '../../../scripts/interfaces/allocatedEquipment';
import Inspection from '../../../scripts/interfaces/inspection';
import Inventory from '../../../scripts/interfaces/inventory';
import Services from '../../../scripts/interfaces/services';
import Lending from '../../../scripts/interfaces/lending';
import { DropDownItem } from '../../../components/DropDown';

//enums
import { EquipmentCondition } from '../../../scripts/enums/equipment';

//auth
import storage from '../../../scripts/auth/storage';

export default function InspectorInspection() {
  const [description] = useState<DropDownItem[]>(equipmentDescription());
  const [name, setName] = useState<string>('');
  const [inspector, setInspector] = useState<Inspector>();
  const [allocated, setAllocated] = useState<AllocatedEquipment[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<AllocatedEquipment | undefined>();
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [condition, setCondition] = useState<string>('');
  const [currentEquip, setCurrentEquip] = useState<Inventory>();

  useEffect(() => {
    (async () => {
      const id = await storage.get.profile().then(prof => prof?.RegID);
      const key = await storage.get.key().then(key => key);
      if (typeof id === 'number' && typeof key === 'string') {
        const insp = new Inspector(id, key);
        const n = await insp.getUser().then(i => i?.name);
        const lendEquipment = await insp.getAllAllocatedEquipment();
        const equip = await insp.getAllEquipment();
        const served = await insp.getAllServices();

        setAllocated(lendEquipment);
        setInspector(insp);
        setInventory(equip);
        setServices(served);

        if (typeof n === 'string') {
          setName(n);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const equip = getEquipmentData(selectedItem?.allocatedequipmentid as number);
    if (typeof equip !== 'undefined') setCurrentEquip(equip);
  }, [selectedItem]);

  function toggleModal() {
    setShowModal(prev => !prev);
  }

  function mountModal(e: AllocatedEquipment) {
    setSelectedItem(e);
    toggleModal();
  }

  function unmountModal() {
    setSelectedItem(undefined);
    toggleModal();
    setCondition('');
  }

  function inspectionPayload(): Inspection {
    return {
      equipmentid: selectedItem?.equipmentid as number,
      serviceid: getServiceId(selectedItem?.allocatedequipmentid as number) as number,
      inspectiondate: date(),
      inspectorname: name,
      dcondition: condition as EquipmentCondition
    };
  }

  function getEquipmentData(allocation_id: number): Inventory | undefined {
    if (typeof inventory !== 'undefined' && typeof allocated !== 'undefined') {
      const equip_id = allocated.find(a => a.allocatedequipmentid === allocation_id)?.equipmentid;
      if (typeof equip_id === 'number') {
        const equipment = inventory.find(i => i.equipmentid === equip_id);
        if (typeof equipment !== 'undefined') return equipment;
      }
    }
  }

  function getServiceId(allocation_id: number): number | undefined {
    if (typeof lendings !== 'undefined' && typeof allocated !== 'undefined') {
      const lend_id = allocated.find(a => a.allocatedequipmentid === allocation_id)?.lendid;
      if (typeof lend_id === 'number') {
        const service_id = lendings.find(l => l.lendid === lend_id)?.serviceid;
        if (typeof service_id === 'number') return service_id;
      }
    }
  }

  async function inspectEquipmentItem(id: number) {
    if (inspector) {
      await inspector.markAllocatedEquipmentInspected(id);
      await inspector.addInspection(inspectionPayload());
    }
  }

  return (
    <ScrollScreen>
      {allocated.length > 0 ? (
        allocated.map((a) => (
          <ListItemWithButtonAdv
            key={a.allocatedequipmentid}
            rowOneData={{ label: 'Equip ID', text: String(a.equipmentid) }}
            rowTwoData={{ label: 'Lend ID', text: String(a.lendid) }}
            buttonLabel='View'
            fun={() => mountModal(a)}
          />
        ))
      ) : (
        <DispText text='No allocated equipment found' />
      )}

      <MyModal
        visible={showModal}
        onClose={() => unmountModal()}
        title='Inspect'
        footer={
          <FormStrip>
            <Button
              label='Close'
              fun={() => unmountModal()}
            />
            <Button
              label='Inspect'
              fun={async () => await inspectEquipmentItem(selectedItem?.allocatedequipmentid as number)}
            />
          </FormStrip>
        }
      >
        <BigForm>
          <LabelledText
            label='Equip Id'
            text={String(currentEquip?.equipmentid ?? '')}
          />

          <LabelledText
            label='Description'
            text={(currentEquip?.description as string) ?? ''}
          />

          <LabelledDropdown
            label='Condition'
            values={description}
            selectedValue={condition}
            onValueChange={setCondition}
          />
        </BigForm>
      </MyModal>
    </ScrollScreen>
  );
}