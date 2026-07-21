import React, { useState } from 'react';
import { View } from 'react-native';

//components
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import MyModal from '../components/MyModal';
import ListItemWithButtonAdv from '../components/revisited/cutting edge/ListItemWithButtonAdv';

//interfaces
import Finance from '../scripts/interfaces/finance';

//styles
import revisited_styles from '../components/revisited/styles/styles';

interface CustomerPaymentItemProps {
    payment: Finance;
}

export default function CustomerPaymentItem({ payment }: CustomerPaymentItemProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [btnClicked, setBtnClicked] = useState<boolean>(false);

    function toggleModal() {
        if (btnClicked === true) setBtnClicked(false);
        setShowModal(prev => !prev);
    }

    return (
        <>
            <ListItemWithButtonAdv
                rowOneData={{ label: 'Code', text: payment.transactionname }}
                rowTwoData={{ label: 'Amount', text: String(payment.amount) }}
                buttonLabel='view'
                fun={() => toggleModal()}
                btn_variant='info'
                isClicked={btnClicked}
                setIsClicked={() => setBtnClicked(true)}
            />

            <MyModal
                visible={showModal}
                onClose={toggleModal}
                title='Payment Details'
                footer={
                    <Strip>
                        <Button label='Close' fun={() => toggleModal()} />
                    </Strip>
                }
            >
                <LabelledText label='Service ID' text={String(payment.serviceid)} />
                <LabelledText label='Transaction ID' text={String(payment.transactionid)} />
                <LabelledText label='Transaction Code' text={payment.transactionname} />
                <LabelledText label='Date' text={String(payment.transactiondate)} />
                <LabelledText label='Amount' text={String(payment.amount)} />
                <LabelledText label='Status' text={payment.transactionstatus} />
            </MyModal>
        </>
    );
}
