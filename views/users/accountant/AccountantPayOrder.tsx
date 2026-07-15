import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import SmallForm from '../../../components/SmallForm';
import MyModal from '../../../components/MyModal';
import LabelledInput from '../../../sections/LabelledInput';
import FormStrip from '../../../components/FormStript';
import Button from '../../../components/Button';

//interfaces
import Order from '../../../scripts/interfaces/orders';
import OrderPayment from '../../../scripts/interfaces/orderPayment';

//scripts
import Accountant from '../../../scripts/classes/accountant';
import date from '../../../scripts/utils/date';
import toaster from '../../../scripts/utils/toaster';

//auth
import storage from '../../../scripts/auth/storage';

export default function AccountantPayOrder() {
    const [accountant, setAccountant] = useState<Accountant>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [paymentCode, setPaymentCode] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [paymentId, setPaymentId] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const acc = new Accountant(id, key);
                const ord = await acc.getOrders();

                setAccountant(acc);
                setOrders(ord);
            }
        })();
    }, []);

    async function makePayment(id: number) {
        const money = Number(amount);
        if (typeof money !== 'number' || money === 0) {
            toaster('Please enter a valid amount', 'warn');
            return;
        }
        if (paymentCode.length !== 10) {
            toaster('Please enter a valid payment code', 'warn');
            return;
        }
        const payment: OrderPayment = {
            OrderID: id,
            PaymentCode: paymentCode,
            PaymentDate: date(),
            Amount: money
        };
        if (accountant) {
            await accountant.makeOrderPayment(payment);
            await accountant.changeOrderStatus(id);
        }
    }

    function setId(id: number) {
        if (paymentId > 0) {
            setPaymentId(0);
        } else {
            if (typeof id !== 'undefined') {
                if (typeof id === 'number' && id > 0) {
                    setPaymentId(id);
                }
            }
        }
    }

    function triggerModal(id: number) {
        setId(id);
        setShowModal(true);
    }

    function closeModal() {
        setPaymentId(0);
        setShowModal(false);
    }

    return (
        <ScrollScreen>
            {orders.length > 0 ? (
                orders.map((o) => (
                    <ListItemWithButton
                        key={o.OrderID}
                        rowOneData={{ label: 'ID', text: String(o.OrderID) }}
                        rowTwoData={{ label: 'Amount', text: String(o.OrderAmount) }}
                        buttonLabel='Pay'
                        fun={() => triggerModal(o.OrderID)}
                    />
                ))
            ) : (
                <DispText text='No unpaid orders found' />
            )}

            <MyModal
                visible={showModal}
                onClose={closeModal}
                title="Make Order Payment"
                footer={
                    <FormStrip>
                        <Button
                            label='Close'
                            fun={closeModal}
                        />
                        <Button
                            label='Pay'
                            fun={() => makePayment(paymentId)}
                        />
                    </FormStrip>
                }
            >
                <SmallForm>
                    <LabelledInput
                        label='Payment Code'
                        inputPlaceholder='Please enter a payment code here'
                        value={paymentCode}
                        onChange={setPaymentCode}
                    />

                    <LabelledInput
                        label='Amount'
                        inputPlaceholder='Enter an amount here'
                        value={amount}
                        onChange={setAmount}
                    />
                </SmallForm>
            </MyModal>
        </ScrollScreen>
    );
}