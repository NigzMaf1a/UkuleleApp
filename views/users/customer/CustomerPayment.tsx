import React, { useState, useEffect, useMemo } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import MyModal from '../../../components/MyModal';
import CustomerPaymentItem from '../../../sections/CustomerPaymentItem';
import DispText from '../../../components/DispText';
import DashTray from '../../../sections/DashTray';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';
import SmallForm from '../../../components/SmallForm';
import LabelledInput from '../../../sections/LabelledInput';
import FormStrip from '../../../components/FormStript';
import LabelledButtonAdv from '../../../components/revisited/cutting edge/LabelledButtonAdv';
import DashLabel from '../../../components/revisited/cutting edge/DashLabel';
import FancyLoad from '../../../sections/FancyLoad';

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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState('');
    const [code, setCode] = useState('');
    const [showLabelOne, setShowLabelOne] = useState<boolean>(false);
    const [showLabelTwo, setShowLabelTwo] = useState<boolean>(false);
    const [listBtnClicked, setListBtnClicked] = useState<boolean>(false);
    const [modalBtnClicked, setModalBtnClicked] = useState<boolean>(false);


    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const [key, id] = await Promise.all([
                    storage.get.key(),
                    storage.get.profile().then(prof => prof?.RegID)
                ]);

                if (
                    typeof key === 'string' &&
                    typeof id === 'number'
                ) {
                    const c = new Customer(id, key);
                    setCustomer(c);
                }

                if (!customer) return;

                await filterServices(customer);
            } catch (error) {
                console.log('Error occurred while initializing payments');
                setPendingServices([]);
            } finally {
                setLoading(false);
                !loading && pendingServices.length > 0 && setShowLabelOne(true);
                !loading && payments.length > 0 && setShowLabelTwo(true);

                setTimeout(() => {
                    showLabelOne && setShowLabelOne(false);
                    showLabelTwo && setShowLabelTwo(false);
                }, 5000);
            }
        }

        initialize();
    }, []);

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
                s => s.paymentstatus === PaymentStatus.NotPaid
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
        async function initialize() { }

        initialize();
    }, []);

    function mountModal(id: number) {

        setServiceId(id);

        const service = pendingServices.find(
            s => s.serviceid === id
        );

        setSelectedService(service);

        toggleModal();
    }

    function unmountModal() {
        setServiceId(0);
        setSelectedService(undefined);
        setAmount('');
        setCode('');
        setListBtnClicked(false);
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
                validateTransactionCode(code as string);

        } catch {

            return;
        }

        const request: Finance = {

            customerid: user.regid as number,

            name: user.name,

            phoneno: user.phoneno,

            transactionname: transactionCode,

            transactiondate: date(),

            amount: parsedAmount,

            transacttype: 'Payment',

            transactionstatus: "Pending" as Status,

            serviceid: validateServiceId(serviceId)

        };

        await customer.makePayment(request);

        await filterServices(customer);

        const history =
            await customer.getPaymentHistory();

        setPayments(history);
        setModalBtnClicked(false);
        unmountModal();
    }

    return (

        <ScrollScreen>
            <FancyLoad loading={loading} />

            <DashTray>
                {
                    showLabelOne && <DashLabel
                        text='Unpaid Services'
                        text_color='warn'
                    />
                }

                {
                    pendingServices.length > 0 ?

                        pendingServices.map(s => (

                            <ListItemWithButtonAdv
                                key={s.serviceid}
                                rowOneData={{
                                    label: 'Service Type',
                                    text: s.servicetype
                                }}
                                rowTwoData={{
                                    label: 'Amount',
                                    text: String(s.cost)
                                }}
                                buttonLabel='Pay'
                                fun={() => mountModal(s.serviceid as number)}
                                btn_variant='success'
                                isClicked={listBtnClicked}
                                setIsClicked={() => setListBtnClicked(true)}
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
                    showLabelTwo && <DashLabel
                        text='Current Payments'
                        text_color='success'
                    />
                }

                {
                    payments.length > 0 ?

                        payments.map(p => (

                            <CustomerPaymentItem
                                key={p.transactionid}
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

                        <LabelledButtonAdv
                            label='Pay'
                            onPress={initiatePaymentRequest}
                            variant='success'
                            isClicked={modalBtnClicked}
                            setIsClicked={() => setModalBtnClicked(true)}
                        />

                        <LabelledButtonAdv
                            label='Close'
                            onPress={unmountModal}
                            variant='danger'
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