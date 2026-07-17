import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import MyModal from '../../../components/MyModal';
import SmallForm from '../../../components/SmallForm';
import FormStrip from '../../../components/FormStript';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import DispText from '../../../components/DispText';
import LabelledDropdown from '../../../components/LabelledDropdown';
import Button from '../../../components/Button';
import LabelledInput from '../../../sections/LabelledInput';

//scripts
import Inspector from '../../../scripts/classes/inspector';
import describer from '../../../scripts/utils/describer';
import stringToNumber from '../../../scripts/utils/stringToNumber';
import { equipmentConditionArray } from '../../../scripts/utils/equipment';
import toaster from '../../../scripts/utils/toaster';

//auth
import storage from '../../../scripts/auth/storage';

//interfaces
import Inspection from '../../../scripts/interfaces/inspection';
import Penalty from '../../../scripts/interfaces/penalty';
import { DropDownItem } from '../../../components/DropDown';

//enum
import {
  EquipmentCondition,
  EquipmentDescription
} from '../../../scripts/enums/equipment';

import { PenaltyStatus } from '../../../scripts/enums/penalty';

interface PenaltyData {
  equipment_id: number;
  customer_id: number;
  description: EquipmentDescription;
}

export default function InspectorPenalties() {

  const [dropdownvalues] = useState<DropDownItem[]>(equipmentConditionArray());

  const [inspections, setInspections] = useState<Inspection[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [inspector, setInspector] = useState<Inspector>();

  const [itemData, setItemData] = useState<PenaltyData>();

  const [selectedInspectionId, setSelectedInspectionId] = useState<number>(0);

  const [condition, setCondition] = useState<string>('');

  const [penalty, setPenalty] = useState<string>('');

  useEffect(() => {
    (async () => {

      const id = await storage.get.profile()
        .then(prof => prof?.regid);

      const key = await storage.get.key();

      if (typeof id === 'number' && typeof key === 'string') {

        const man = new Inspector(id, key);

        const insp = await man.getAllInspections();

        setInspections(insp);

        setInspector(man);
      }

    })();
  }, []);

  useEffect(() => {
    (async () => {

      const data = await equipmentData(selectedInspectionId);

      if (data) {
        setItemData(data);
      }

    })();
  }, [selectedInspectionId]);

  function toggleModal() {
    setShowModal(prev => !prev);
  }

  function mountModal(id: number) {
    setSelectedInspectionId(id);
    toggleModal();
  }

  function unmountModal() {
    setSelectedInspectionId(0);
    setPenalty('');
    setCondition('');
    setItemData(undefined);
    toggleModal();
  }

  async function equipmentData(
    inspection_id: number
  ): Promise<PenaltyData | undefined> {

    if (!inspector) return;

    const inventory = await inspector.getAllEquipment();

    const equipAlloc = await inspector.getAllAllocatedEquipment();

    const inspection = inspections.find(
      i => i.inspectionid === inspection_id
    );

    if (!inspection) return;

    const equipId = inspection.equipmentid;

    const allocation = equipAlloc.find(
      e => e.EquipmentID === equipId
    );

    const equipment = inventory.find(
      e => e.equipmentid === equipId
    );

    if (!allocation || !equipment) return;

    return {
      equipment_id: equipId,
      customer_id: allocation.RegID,
      description: equipment.description as EquipmentDescription
    };
  }

  async function penalize() {

    if (!inspector) {
      toaster("Inspector not initialized", "danger");
      return;
    }

    if (!itemData) {
      toaster("Unable to retrieve equipment information", "danger");
      return;
    }

    if (!condition) {
      toaster("Please select the equipment condition", "danger");
      return;
    }

    const penaltyAmount = stringToNumber(penalty);

    if (penaltyAmount === null) {
      toaster("Please enter a valid penalty amount", "danger");
      return;
    }

    const penaltyObj: Penalty = {
      equipmentid: itemData.equipment_id,
      customerid: itemData.customer_id,
      description: itemData.description,
      dcondition: condition as EquipmentCondition,
      penalty: penaltyAmount,
      penaltystatus: PenaltyStatus.NotPaid
    };

    await inspector.penalizeDamage(penaltyObj);

    unmountModal();
  }

  return (
    <ScrollScreen>

      {
        inspections.length > 0 ? (

          inspections.map(i => (

            <ListItemWithButton
              key={i.inspectionid}
              rowOneData={{
                label: 'Inspection ID',
                text: String(i.inspectionid)
              }}
              rowTwoData={{
                label: 'Condition',
                text: describer(i.dcondition)
              }}
              buttonLabel='Penalize'
              fun={() => mountModal(i.inspectionid as number)}
            />

          ))

        ) : (

          <DispText text='No inspections found' />

        )
      }

      <MyModal
        visible={showModal}
        onClose={unmountModal}
        title='Penalize'
        footer={
          <FormStrip>

            <Button
              label='Cancel'
              fun={unmountModal}
            />

            <Button
              label='Penalize'
              fun={penalize}
            />

          </FormStrip>
        }
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