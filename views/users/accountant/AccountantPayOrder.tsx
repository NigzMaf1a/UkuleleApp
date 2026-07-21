import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';
import SmallForm from '../../../components/SmallForm';
import MyModal from '../../../components/MyModal';
import LabelledInput from '../../../sections/LabelledInput';
import FormStrip from '../../../components/FormStript';
import Button from '../../../components/Button';
import FancyLoad from '../../../sections/FancyLoad';

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
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const acc = new Accountant(id, key);
                    const ord = await acc.getOrders();

                    setAccountant(acc);
                    setOrders(ord);
                } else setOrders([]);
            } catch (error) {
                console.log('Error occurred while initializing', error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }

        initialize();
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
            orderid: id,
            paymentcode: paymentCode,
            paymentdate: date(),
            amount: money
        };

        if (accountant) {
            await accountant.makeOrderPayment(payment);
            await accountant.changeOrderStatus(id);
        } else return;
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
            <FancyLoad loading={loading} />
            {orders.length > 0 ? (
                orders.map((o) => (
                    <ListItemWithButtonAdv
                        key={o.orderid}
                        rowOneData={{ label: 'ID', text: String(o.orderid) }}
                        rowTwoData={{ label: 'Amount', text: String(o.orderamount) }}
                        buttonLabel='Pay'
                        fun={() => triggerModal(o.orderid)}
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