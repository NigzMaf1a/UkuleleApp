import React, { useState } from 'react';

//components
import Screen from '../components/Screen';
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import MyModal from '../components/MyModal';

//interfaces
import Finance from '../scripts/interfaces/finance';

interface CustomerPaymentItemProps {
    payment: Finance;
}

export default function CustomerPaymentItem({ payment }: CustomerPaymentItemProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    return (
        <>
            <Strip>
                <Tray>
                    <LabelledText label='Code' text={payment.transactionname} />
                    <LabelledText label='Amount' text={String(payment.amount)} />
                </Tray>
                <Button label='View' fun={() => toggleModal()} />
            </Strip>

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
