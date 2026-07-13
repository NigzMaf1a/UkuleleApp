import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';
import DashTray from '../../../sections/DashTray';
import MyModal from '../../../components/MyModal';
import BigForm from '../../../components/BigForm';
import SmallForm from '../../../components/SmallForm';
import LabelledInput from '../../../sections/LabelledInput';
import LabelledText from '../../../components/LabelledText';
import FormStrip from '../../../components/FormStript';
import Button from '../../../components/Button';

//interfaces
import Penalty from '../../../scripts/interfaces/penalty';

//enums
import { PenaltyStatus } from '../../../scripts/enums/penalty';
import { EquipmentCondition } from '../../../scripts/enums/equipment';

//scripts
import Customer from '../../../scripts/classes/customer';
import describer from '../../../scripts/utils/describer';
import stringToNumber from '../../../scripts/utils/stringToNumber';
import toaster from '../../../scripts/utils/toaster';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerPenalty() {
    const [penalties, setPenalties] = useState<Penalty[]>([]);
    const [customer, setCustomer] = useState<Customer>();
    const [penaltyAmount, setPenaltyAmount] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalTwo, setShowModalTwo] = useState<boolean>(false);
    const [selectedPenaltyId, setSelectedPenaltyId] = useState<number>(0);
    const [selectedPenalty, setSelectedPenalty] = useState<Penalty | undefined>();
    const [code, setCode] = useState<string>('');

    // Derived states computed on render when penalties updates
    const paid = penalties.filter(p => p.PenaltyStatus === PenaltyStatus.Paid || p.PenaltyStatus === PenaltyStatus.Processing);
    const unpaid = penalties.filter(p => p.PenaltyStatus === PenaltyStatus.NotPaid);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const cust = new Customer(id, key);
                const pen = await cust.getPenaltyHistory();

                setPenalties(pen);
                setCustomer(cust);
            }
        })();
    }, []);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    function toggleModalTwo() {
        setShowModalTwo(prev => !prev);
    }

    function mountModal(id: number) {
        setSelectedPenaltyId(id);
        toggleModal();
    }

    function mountModalTwo(id: number) {
        setSelectedPenaltyId(id);
        toggleModalTwo();
    }

    function unMountModal() {
        setSelectedPenaltyId(0);
        toggleModal();
    }

    function unMountModalTwo() {
        setSelectedPenaltyId(0);
        toggleModalTwo();
    }

    function payload(): { id: number, code: string, amount: number } {
        return {
            id: selectedPenalty?.PenaltyID as number,
            code: code,
            amount: stringToNumber(penaltyAmount)
        };
    }

    function selectedRecordFinder(): Penalty | undefined {
        if (penalties !== undefined && penalties.length > 0 && typeof selectedPenaltyId === 'number' && selectedPenaltyId > 0) {
            return penalties.find(p => p.PenaltyID === selectedPenaltyId);
        }
        return undefined;
    }

    async function initiatePaymentRequest() {
        try {
            let mzigo = payload();
            await customer?.payPenalty(mzigo.id, mzigo.code, mzigo.amount);
            unMountModal();
        } catch (error) {
            toaster(`Error ${error} occurred`, 'info');
        }
    }

    useEffect(() => {
        setSelectedPenalty(selectedRecordFinder());
    }, [selectedPenaltyId, penalties]);

    return (
        <ScrollScreen>
            <DashTray>
                {unpaid.length > 0 ? (
                    unpaid.map((u) => (
                        <ListItemWithButton
                            key={u.PenaltyID}
                            rowOneData={{ label: 'ID', text: String(u.PenaltyID) }}
                            rowTwoData={{ label: 'Amount', text: String(u.Penalty) }}
                            buttonLabel='Pay'
                            fun={() => mountModal(u.PenaltyID as number)}
                        />
                    ))
                ) : (
                    <DispText text='No penalty records found' />
                )}
            </DashTray>
            <DashTray>
                {paid.length > 0 ? (
                    paid.map((p) => (
                        <ListItemWithButton
                            key={p.PenaltyID}
                            rowOneData={{ label: 'ID', text: String(p.PenaltyID) }}
                            rowTwoData={{ label: 'Amount', text: String(p.Penalty) }}
                            buttonLabel='View'
                            fun={() => mountModalTwo(p.PenaltyID as number)}
                        />
                    ))
                ) : (
                    <DispText text='No paid penalties found' />
                )}
            </DashTray>

            {/* Pay Penalty Modal */}
            <MyModal
                visible={showModal}
                onClose={() => unMountModal()}
                title='Pay Penalty'
                footer={
                    <FormStrip>
                        <Button
                            label='Close'
                            fun={() => unMountModal()}
                        />
                        <Button
                            label='Pay'
                            fun={async () => await initiatePaymentRequest()}
                        />
                    </FormStrip>
                }
            >
                <SmallForm>
                    <LabelledInput
                        label='Transaction Code'
                        inputPlaceholder='Please enter your transaction code here'
                        value={code}
                        onChange={setCode}
                    />

                    <LabelledInput
                        label='Amount'
                        inputPlaceholder='Enter the transaction amount here'
                        value={penaltyAmount}
                        onChange={setPenaltyAmount}
                    />
                </SmallForm>
            </MyModal>

            {/* View Penalty Modal */}
            <MyModal
                visible={showModalTwo}
                onClose={() => unMountModalTwo()}
                title='View Penalty'
                footer={
                    <FormStrip>
                        <Button
                            label='Close'
                            fun={() => unMountModalTwo()}
                        />
                    </FormStrip>
                }
            >
                <BigForm>
                    <LabelledText
                        label='Penalty ID'
                        text={String(selectedPenalty?.PenaltyID ?? '')}
                    />
                    <LabelledText
                        label='Equipment ID'
                        text={String(selectedPenalty?.EquipmentID ?? '')}
                    />
                    <LabelledText
                        label='Description'
                        text={String(selectedPenalty?.Description ?? '')}
                    />
                    <LabelledText
                        label='Condition'
                        text={String(selectedPenalty ? describer(selectedPenalty.dCondition as EquipmentCondition) : '')}
                    />
                    <LabelledText
                        label='Penalty Amount'
                        text={String(selectedPenalty?.Penalty ?? '')}
                    />
                    <LabelledText
                        label='Penalty Status'
                        text={String(selectedPenalty?.PenaltyStatus ?? '')}
                    />
                </BigForm>
            </MyModal>
        </ScrollScreen>
    );
}