
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

// Components
import ScrollScreen from '../../../components/ScrollScreen'
import MyModal from '../../../components/MyModal'
import DispText from '../../../components/DispText'
import DashTray from '../../../sections/DashTray'
import CustomerPaymentItem from '../../../sections/CustomerPaymentItem'
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv'
import SmallForm from '../../../components/SmallForm'
import LabelledInput from '../../../sections/LabelledInput'
import FormStrip from '../../../components/FormStript'
import LabelledButtonAdv from '../../../components/revisited/cutting edge/LabelledButtonAdv'
import DashLabel from '../../../components/revisited/cutting edge/DashLabel'
import FancyLoad from '../../../sections/FancyLoad'

// Interfaces
import Finance, { Status } from '../../../scripts/interfaces/finance'
import Services from '../../../scripts/interfaces/services'
import Users from '../../../scripts/interfaces/user'

// Scripts
import Customer from '../../../scripts/classes/customer'
import date from '../../../scripts/utils/date'
import toaster from '../../../scripts/utils/toaster'
import stringToNumber from '../../../scripts/utils/stringToNumber'

// Enums
import { PaymentStatus } from '../../../scripts/enums/services'

// Auth
import storage from '../../../scripts/auth/storage'

export default function CustomerPayment() {

    const [customer, setCustomer] = useState<Customer>()
    const [user, setUser] = useState<Users>()

    const [serviceId, setServiceId] = useState(0)
    const [payments, setPayments] = useState<Finance[]>([])
    const [pendingServices, setPendingServices] = useState<Services[]>([])
    const [selectedService, setSelectedService] = useState<Services>()

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const [amount, setAmount] = useState('')
    const [code, setCode] = useState('')

    const [showLabelOne, setShowLabelOne] = useState(false)
    const [showLabelTwo, setShowLabelTwo] = useState(false)

    const [listBtnClicked, setListBtnClicked] = useState(false)
    const [modalBtnClicked, setModalBtnClicked] = useState(false)

    useFocusEffect(
        useCallback(() => {

            let isActive = true
            let timeout: ReturnType<typeof setTimeout>

            async function initialize() {

                try {

                    setLoading(true)

                    const [key, profile] = await Promise.all([
                        storage.get.key(),
                        storage.get.profile()
                    ])

                    const id = profile?.RegID

                    if (
                        typeof key !== 'string' ||
                        typeof id !== 'number'
                    ) {
                        throw new Error('Unable to retrieve customer credentials')
                    }

                    const currentCustomer = new Customer(id, key)

                    const [
                        currentUser,
                        services,
                        history
                    ] = await Promise.all([
                        currentCustomer.getUser(),
                        currentCustomer.getCustomerServices(),
                        currentCustomer.getPaymentHistory()
                    ])

                    if (!isActive) return

                    if (!currentUser) {
                        throw new Error('Unable to retrieve customer information')
                    }

                    const unpaidServices = services.filter(
                        service => service.paymentstatus === PaymentStatus.NotPaid
                    )

                    setCustomer(currentCustomer)
                    setUser(currentUser)

                    setPendingServices(unpaidServices)
                    setPayments(history)

                    setShowLabelOne(unpaidServices.length > 0)
                    setShowLabelTwo(history.length > 0)

                    timeout = setTimeout(() => {

                        if (!isActive) return

                        setShowLabelOne(false)
                        setShowLabelTwo(false)

                    }, 3000)

                } catch (error) {

                    console.error(
                        'Error occurred while initializing payments:',
                        error
                    )

                    if (isActive) {

                        setCustomer(undefined)
                        setUser(undefined)

                        setPendingServices([])
                        setPayments([])

                        setShowLabelOne(false)
                        setShowLabelTwo(false)

                        toaster(
                            'Unable to initialize payment information. Please try again.',
                            'danger'
                        )

                    }

                } finally {

                    if (isActive) {
                        setLoading(false)
                    }

                }

            }

            void initialize()

            return () => {

                isActive = false

                if (timeout) {
                    clearTimeout(timeout)
                }

            }

        }, [])
    )

    function validateServiceId(id: number): number {

        if (Number.isInteger(id) && id > 0) {
            return id
        }

        toaster(
            'Invalid service ID. Please try again.',
            'danger'
        )

        throw new Error('Invalid Service ID')
    }

    function validateTransactionCode(cd: string): string {

        const transactionCode = cd.trim()

        if (transactionCode.length < 10) {

            toaster(
                'A valid transaction code must be at least 10 characters.',
                'danger'
            )

            throw new Error('Invalid transaction code')
        }

        return transactionCode.toUpperCase()
    }

    async function filterServices(cust: Customer) {

        const services = await cust.getCustomerServices()

        const unpaidServices = services.filter(
            service => service.paymentstatus === PaymentStatus.NotPaid
        )

        setPendingServices(unpaidServices)

        return unpaidServices
    }

    async function refreshPayments(cust: Customer) {

        const history = await cust.getPaymentHistory()

        setPayments(history)

        return history
    }

    function mountModal(id: number) {

        const validId = validateServiceId(id)

        const service = pendingServices.find(
            s => s.serviceid === validId
        )

        if (!service) {

            toaster(
                'Unable to find the selected unpaid service.',
                'danger'
            )

            return
        }

        setServiceId(validId)
        setSelectedService(service)

        setAmount(String(service.cost ?? ''))
        setCode('')

        setModalBtnClicked(false)
        setShowModal(true)

    }

    function unmountModal() {

        setShowModal(false)

        setServiceId(0)
        setSelectedService(undefined)

        setAmount('')
        setCode('')

        setListBtnClicked(false)
        setModalBtnClicked(false)

    }

    async function initiatePaymentRequest() {

        if (modalBtnClicked) return

        setModalBtnClicked(true)

        try {

            if (!customer || !user) {

                toaster(
                    'Unable to initialize payment. Please try again.',
                    'danger'
                )

                return
            }

            if (!selectedService) {

                toaster(
                    'Please select a service before making payment.',
                    'danger'
                )

                return
            }

            const validServiceId = validateServiceId(serviceId)

            const parsedAmount = stringToNumber(amount)

            if (
                parsedAmount === null ||
                !Number.isFinite(parsedAmount) ||
                parsedAmount <= 0
            ) {

                toaster(
                    'Please enter a valid payment amount.',
                    'danger'
                )

                return
            }

            const transactionCode = validateTransactionCode(code)

            if (typeof user.regid !== 'number') {

                toaster(
                    'Unable to identify the customer account.',
                    'danger'
                )

                return
            }

            const request: Finance = {

                customerid: user.regid,

                name: user.name,

                phoneno: user.phoneno,

                transactionname: transactionCode,

                transactiondate: date(),

                amount: parsedAmount,

                transacttype: 'Payment',

                transactionstatus: 'Pending' as Status,

                serviceid: validServiceId

            }

            await customer.makePayment(request)

            unmountModal()

            toaster(
                'Payment submitted successfully.',
                'success'
            )

            try {

                await Promise.all([
                    filterServices(customer),
                    refreshPayments(customer)
                ])

            } catch (refreshError) {

                console.error(
                    'Payment submitted, but refreshing payment information failed:',
                    refreshError
                )

                toaster(
                    'Payment submitted. Please refresh to update your payment records.',
                    'danger'
                )

            }

        } catch (error) {

            console.error(
                'Error occurred while submitting payment:',
                error
            )

            toaster(
                'Unable to submit payment. Please verify your details and try again.',
                'danger'
            )

        } finally {

            setModalBtnClicked(false)

        }

    }

    return (

        <ScrollScreen>

            <FancyLoad loading={loading} />

            <DashTray>

                {
                    showLabelOne &&

                    <DashLabel
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

                                btn_variant='info'

                                label_one_variant='info'

                                label_two_variant='info'

                                isClicked={listBtnClicked}

                                setIsClicked={setListBtnClicked}

                            />

                        ))

                        :

                        <DispText
                            text='No unpaid services found'
                            textAlign='center'
                        />

                }

            </DashTray>

            <DashTray>

                {
                    showLabelTwo &&

                    <DashLabel
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
                            textAlign='center'
                            textColor='info'
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

                            setIsClicked={setModalBtnClicked}

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

    )

}
