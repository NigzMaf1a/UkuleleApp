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
    const [serviceId, setServiceId] = useState<number>(0);
    const [payments, setPayments] = useState<Finance[]>([]);
    const [pendingServices, setPendingServices] = useState<Services[]>([]);
    const [selectedService, setSelectedService] = useState<Services | undefined>();
    const [paymentRequest, setPaymentRequest] = useState<Finance>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [code, setCode] = useState<string>('');

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    function validateServiceId(id: number): number {
        if (id !== null && id !== undefined && id > 0) {
            return id;
        } else {
            toaster('Invalid service ID. Please try again.', 'danger');
            throw new Error('Invalid Service ID');
        }
    }

    function validateTransactionCode(cd: string): string {
        if (cd.length > 10) {
            toaster('A valid transaction code must be at least ten characters', 'info');
        }
        return cd.toUpperCase();
    }

    async function filterServices() {
        if (customer) {
            const services = await customer.getCustomerServices();
            setPendingServices(services.filter(s => s.PaymentStatus === PaymentStatus.NotPaid));
        }
    }

    async function getUser() {
        if (customer) {
            const thisUser = await customer.getUser();
            if (thisUser !== undefined) {
                setUser(thisUser);
            }
        }
    }

    useEffect(() => {
        setShowModal(false);
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const cust = new Customer(id, key);
                const finances = await cust?.getPaymentHistory();

                setCustomer(cust);
                setPayments(finances);
                await filterServices();
                await getUser();
            }
        })();
    }, [pendingServices]);

    function payload(): Finance {
        return {
            CustomerID: user?.RegID as number,
            Name: user?.Name as string,
            PhoneNo: user?.PhoneNo as string,
            TransactionName: validateTransactionCode(code),
            TransactionDate: date(),
            Amount: stringToNumber(amount),
            TransactType: 'Payment',
            TransactionStatus: Status.Pending,
            ServiceID: validateServiceId(serviceId)
        };
    }

    function mountModal(id: number) {
        setServiceId(id);
        toggleModal();
    }

    function unmountModal() {
        setServiceId(0);
        setSelectedService(undefined);
        toggleModal();
    }

    function findSelectedService(): Services | undefined {
        if (pendingServices !== undefined && serviceId > 0) {
            return pendingServices.find(p => p.ServiceID === serviceId);
        }
    }

    async function initiatePaymentRequest() {
        if (customer && paymentRequest !== undefined) {
            await customer.makePayment(paymentRequest);
            pendingServices.pop();
        }
    }

    useEffect(() => {
        setPaymentRequest(payload());
        if (findSelectedService() !== undefined) {
            setSelectedService(findSelectedService());
        }
    }, [serviceId, pendingServices]);

    return (
        <ScrollScreen>
            <DashTray>
                {pendingServices.length > 0 ? (
                    pendingServices.map((s) => (
                        <ListItemWithButton
                            key={s.ServiceID}
                            rowOneData={{ label: 'Service Type', text: s.ServiceType }}
                            rowTwoData={{ label: 'Amount', text: String(s.Cost) }}
                            buttonLabel='Pay'
                            fun={() => mountModal(s.ServiceID as number)}
                        />
                    ))
                ) : (
                    <DispText text='No unpaid services found' />
                )}
            </DashTray>
            <DashTray>
                {payments.length > 0 ? (
                    payments.map((p) => (
                        <CustomerPaymentItem key={p.TransactionID} payment={p} />
                    ))
                ) : (
                    <DispText text='No payment records found' />
                )}
            </DashTray>

            <MyModal
                visible={showModal}
                onClose={() => unmountModal()}
                title='Make Payment'
                footer={
                    <FormStrip>
                        <Button
                            label='Pay'
                            fun={async () => await initiatePaymentRequest()}
                        />
                        <Button
                            label='Close'
                            fun={() => unmountModal()}
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
                        inputPlaceholder='Enter your transaction code here'
                        value={amount}
                        onChange={setAmount}
                    />
                </SmallForm>
            </MyModal>
        </ScrollScreen>
    );
}