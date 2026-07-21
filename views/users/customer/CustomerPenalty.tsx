import React, { useState, useEffect, useMemo } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';
import DispText from '../../../components/DispText';
import DashTray from '../../../sections/DashTray';
import MyModal from '../../../components/MyModal';
import BigForm from '../../../components/BigForm';
import SmallForm from '../../../components/SmallForm';
import LabelledInput from '../../../sections/LabelledInput';
import LabelledText from '../../../components/LabelledText';
import FormStrip from '../../../components/FormStript';
import Button from '../../../components/Button';
import DashLabel from '../../../components/revisited/cutting edge/DashLabel';
import FancyLoad from '../../../sections/FancyLoad';
import LabelledButtonAdv from '../../../components/revisited/cutting edge/LabelledButtonAdv';

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

    const [penaltyAmount, setPenaltyAmount] = useState('');
    const [code, setCode] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showModalTwo, setShowModalTwo] = useState(false);

    const [selectedPenaltyId, setSelectedPenaltyId] = useState(0);
    const [selectedPenalty, setSelectedPenalty] = useState<Penalty>();

    const [loading, setLoading] = useState<boolean>(false);
    const [showLabelOne, setShowLabelOne] = useState<boolean>(false);
    const [showLabelTwo, setShowLabelTwo] = useState<boolean>(false);

    const [listItemOneClicked, setListItemOneClicked] = useState<boolean>(false);
    const [listItemTwoClicked, setListItemTwoClicked] = useState<boolean>(false);
    const [modalOneBtnClicked, setModalOneBtnClicked] = useState<boolean>(false);


    const paid = useMemo(
        () => penalties.filter(
            p =>
                p.penaltystatus === PenaltyStatus.Paid ||
                p.penaltystatus === PenaltyStatus.Processing
        ),
        [penalties]
    );

    const unpaid = useMemo(
        () => penalties.filter(
            p => p.penaltystatus === PenaltyStatus.NotPaid
        ),
        [penalties]
    );

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);

                const [id, key] = await Promise.all([
                    storage.get.profile().then(prof => prof?.RegID),
                    storage.get.key()
                ]);

                if (typeof id === 'number' && typeof key === 'string') {

                    const cust = new Customer(id, key);

                    const pen = await cust.getPenaltyHistory();

                    setPenalties(pen);

                    setCustomer(cust);
                } else setPenalties([]);

            } catch (error) {
                console.log('Error occurred while initializing the penalty screen', error);;
                setPenalties([]);
            } finally {
                setLoading(false);
                !loading && unpaid.length > 0 && setShowLabelOne(true);
                !loading && paid.length > 0 && setShowLabelTwo(true);

                setTimeout(() => {
                    showLabelOne && setShowLabelOne(false);
                    showLabelTwo && setShowLabelTwo(false);
                }, 3000);
            }
        }

        initialize();
    }, []);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    function toggleModalTwo() {
        setShowModalTwo(prev => !prev);
    }

    function mountModal(id: number) {
        setSelectedPenaltyId(id);
        setListItemOneClicked(false);
        toggleModal();
    }

    function mountModalTwo(id: number) {
        setSelectedPenaltyId(id);
        toggleModalTwo();
    }

    function unMountModal() {
        setSelectedPenaltyId(0);
        setPenaltyAmount('');
        setCode('');
        toggleModal();
    }

    function unMountModalTwo() {
        setSelectedPenaltyId(0);
        toggleModalTwo();
    }

    function selectedRecordFinder(): Penalty | undefined {

        if (selectedPenaltyId <= 0) {
            return undefined;
        }

        return penalties.find(
            p => p.penaltyid === selectedPenaltyId
        );
    }

    useEffect(() => {
        setSelectedPenalty(selectedRecordFinder());
    }, [selectedPenaltyId, penalties]);

    async function initiatePaymentRequest() {

        if (!selectedPenalty) {
            toaster("No penalty selected", "danger");
            return;
        }

        if (code.trim().length === 0) {
            toaster("Please enter the transaction code", "danger");
            return;
        }

        const amount = stringToNumber(penaltyAmount);

        if (amount === null) {
            toaster("Please enter a valid amount", "danger");
            return;
        }

        try {

            await customer?.payPenalty(
                selectedPenalty.penaltyid as number,
                code,
                amount
            );

            setModalOneBtnClicked(false);
            unMountModal();

        } catch (error) {

            toaster(
                `Error ${error} occurred`,
                "danger"
            );

        }
    }

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />

            <DashTray>
                {
                    showLabelOne && <DashLabel
                        text='Unpaid Penalties'
                        text_color='danger'
                    />
                }

                {
                    unpaid.length > 0 ?

                        unpaid.map(u => (

                            <ListItemWithButtonAdv
                                key={u.penaltyid}
                                rowOneData={{
                                    label: 'ID',
                                    text: String(u.penaltyid)
                                }}
                                rowTwoData={{
                                    label: 'Amount',
                                    text: String(u.penalty)
                                }}
                                buttonLabel='Pay'
                                fun={() => mountModal(u.penaltyid as number)}
                                isClicked={listItemOneClicked}
                                setIsClicked={() => setListItemOneClicked(true)}
                            />

                        ))

                        :

                        <DispText text='No penalty records found' />

                }

            </DashTray>

            <DashTray>
                {
                    showLabelOne && <DashLabel
                        text='Paid Penalties'
                        text_color='success'
                    />
                }

                {
                    paid.length > 0 ?

                        paid.map(p => (

                            <ListItemWithButtonAdv
                                key={p.penaltyid}
                                rowOneData={{
                                    label: 'ID',
                                    text: String(p.penaltyid)
                                }}
                                rowTwoData={{
                                    label: 'Amount',
                                    text: String(p.penalty)
                                }}
                                buttonLabel='View'
                                fun={() => mountModalTwo(p.penaltyid as number)}
                                isClicked={listItemTwoClicked}
                                setIsClicked={() => setListItemTwoClicked(true)}
                            />

                        ))

                        :

                        <DispText text='No paid penalties found' />

                }

            </DashTray>

            <MyModal
                visible={showModal}
                onClose={unMountModal}
                title='Pay Penalty'
                footer={
                    <>

                        <LabelledButtonAdv
                            label='Close'
                            onPress={unMountModal}
                            variant='danger'
                        />

                        <LabelledButtonAdv
                            label='Pay'
                            onPress={initiatePaymentRequest}
                            variant='success'
                            isClicked={modalOneBtnClicked}
                            setIsClicked={() => setModalOneBtnClicked(true)}
                        />

                    </>
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

            <MyModal
                visible={showModalTwo}
                onClose={unMountModalTwo}
                title='View Penalty'
                footer={
                    <>

                        <LabelledButtonAdv
                            label='Close'
                            onPress={unMountModalTwo}
                            variant='info'
                        />

                    </>
                }
            >

                <BigForm>

                    <LabelledText
                        label='Penalty ID'
                        text={String(selectedPenalty?.penaltyid ?? '')}
                    />

                    <LabelledText
                        label='Equipment ID'
                        text={String(selectedPenalty?.equipmentid ?? '')}
                    />

                    <LabelledText
                        label='Description'
                        text={String(selectedPenalty?.description ?? '')}
                    />

                    <LabelledText
                        label='Condition'
                        text={
                            selectedPenalty
                                ? describer(selectedPenalty.dcondition as EquipmentCondition)
                                : ''
                        }
                    />

                    <LabelledText
                        label='Penalty Amount'
                        text={String(selectedPenalty?.penalty ?? '')}
                    />

                    <LabelledText
                        label='Penalty Status'
                        text={String(selectedPenalty?.penaltystatus ?? '')}
                    />

                </BigForm>

            </MyModal>

        </ScrollScreen>
    );
}