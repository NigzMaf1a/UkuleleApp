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
                    <LabelledText label='Code' text={payment.TransactionName} />
                    <LabelledText label='Amount' text={String(payment.Amount)} />
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
                <LabelledText label='Service ID' text={String(payment.ServiceID)} />
                <LabelledText label='Transaction ID' text={String(payment.TransactionID)} />
                <LabelledText label='Transaction Code' text={payment.TransactionName} />
                <LabelledText label='Date' text={String(payment.TransactionDate)} />
                <LabelledText label='Amount' text={String(payment.Amount)} />
                <LabelledText label='Status' text={payment.TransactionStatus} />
            </MyModal>
        </>
    );
}
