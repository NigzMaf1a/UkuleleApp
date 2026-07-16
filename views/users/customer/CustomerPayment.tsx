import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import MyModal from '../../../components/MyModal';
import CustomerPaymentItem from '../../../sections/CustomerPaymentItem';
import DispText from '../../../components/DispText';
import DashTray from '../../../sections/DashTray';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import SmallForm from '../../../components/SmallForm';
import LabelledInput from '../../../sections/LabelledInput';
import Button from '../../../components/Button';
import FormStrip from '../../../components/FormStript';

//interfaces
import Finance, { Status } from '../../../scripts/interfaces/finance';
import Services from '../../../scripts/interfaces/services';
import Users from '../../../scripts/interfaces/user';

//scripts
import Customer from '../../../scripts/classes/customer';
import date from '../../../scripts/utils/date';
import toaster from '../../../scripts/utils/toaster';
import stringToNumber from '../../../scripts/utils/stringToNumber';

//enums
import { PaymentStatus } from '../../../scripts/enums/services';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerPayment() {

    const [customer, setCustomer] = useState<Customer>();
    const [user, setUser] = useState<Users>();

    const [serviceId, setServiceId] = useState(0);

    const [payments, setPayments] = useState<Finance[]>([]);
    const [pendingServices, setPendingServices] = useState<Services[]>([]);

    const [selectedService, setSelectedService] = useState<Services>();

    const [showModal, setShowModal] = useState(false);

    const [amount, setAmount] = useState('');
    const [code, setCode] = useState('');

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    function validateServiceId(id: number): number {

        if (id > 0) {
            return id;
        }

        toaster(
            'Invalid service ID. Please try again.',
            'danger'
        );

        throw new Error('Invalid Service ID');
    }

    function validateTransactionCode(cd: string): string {

        if (cd.trim().length < 10) {

            toaster(
                'A valid transaction code must be at least 10 characters.',
                'danger'
            );

            throw new Error('Invalid transaction code');
        }

        return cd.toUpperCase();
    }

    async function filterServices(cust: Customer) {

        const services = await cust.getCustomerServices();

        setPendingServices(
            services.filter(
                s => s.PaymentStatus === PaymentStatus.NotPaid
            )
        );
    }

    async function getUser(cust: Customer) {

        const thisUser = await cust.getUser();

        if (thisUser) {
            setUser(thisUser);
        }
    }

    useEffect(() => {

        (async () => {

            const id = await storage.get.profile()
                .then(prof => prof?.RegID);

            const key = await storage.get.key();

            if (typeof id === 'number' && typeof key === 'string') {

                const cust = new Customer(id, key);

                const history =
                    await cust.getPaymentHistory();

                setCustomer(cust);

                setPayments(history);

                await filterServices(cust);

                await getUser(cust);
            }

        })();

    }, []);

    function mountModal(id: number) {

        setServiceId(id);

        const service = pendingServices.find(
            s => s.ServiceID === id
        );

        setSelectedService(service);

        toggleModal();
    }

    function unmountModal() {

        setServiceId(0);

        setSelectedService(undefined);

        setAmount('');

        setCode('');

        toggleModal();
    }

    async function initiatePaymentRequest() {

        if (!customer || !user) {
            toaster(
                'Unable to initialize payment.',
                'danger'
            );
            return;
        }

        const parsedAmount = stringToNumber(amount);

        if (parsedAmount === null) {

            toaster(
                'Please enter a valid amount.',
                'danger'
            );

            return;
        }

        let transactionCode: string;

        try {

            transactionCode =
                validateTransactionCode(code);

        } catch {

            return;
        }

        const request: Finance = {

            CustomerID: user.RegID as number,

            Name: user.Name,

            PhoneNo: user.PhoneNo,

            TransactionName: transactionCode,

            TransactionDate: date(),

            Amount: parsedAmount,

            TransactType: 'Payment',

            TransactionStatus: Status.Pending,

            ServiceID: validateServiceId(serviceId)

        };

        await customer.makePayment(request);

        await filterServices(customer);

        const history =
            await customer.getPaymentHistory();

        setPayments(history);

        unmountModal();
    }

    return (

        <ScrollScreen>

            <DashTray>

                {
                    pendingServices.length > 0 ?

                        pendingServices.map(s => (

                            <ListItemWithButton
                                key={s.ServiceID}
                                rowOneData={{
                                    label: 'Service Type',
                                    text: s.ServiceType
                                }}
                                rowTwoData={{
                                    label: 'Amount',
                                    text: String(s.Cost)
                                }}
                                buttonLabel='Pay'
                                fun={() => mountModal(s.ServiceID as number)}
                            />

                        ))

                        :

                        <DispText
                            text='No unpaid services found'
                        />

                }

            </DashTray>

            <DashTray>

                {
                    payments.length > 0 ?

                        payments.map(p => (

                            <CustomerPaymentItem
                                key={p.TransactionID}
                                payment={p}
                            />

                        ))

                        :

                        <DispText
                            text='No payment records found'
                        />

                }

            </DashTray>

            <MyModal
                visible={showModal}
                onClose={unmountModal}
                title='Make Payment'
                footer={
                    <FormStrip>

                        <Button
                            label='Pay'
                            fun={initiatePaymentRequest}
                        />

                        <Button
                            label='Close'
                            fun={unmountModal}
                        />

                    </FormStrip>
                }
            >

                <SmallForm>

                    <LabelledInput
                        label='Transaction Code'
                        inputPlaceholder='Enter your transaction code here'
                        value={code}
                        onChange={setCode}
                    />

                    <LabelledInput
                        label='Amount'
                        inputPlaceholder='Enter the payment amount here'
                        value={amount}
                        onChange={setAmount}
                    />

                </SmallForm>

            </MyModal>

        </ScrollScreen>

    );
}