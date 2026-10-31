
import React, { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"

// Auth
import storage from "../../../scripts/auth/storage"

// Components
import ScrollScreen from "../../../components/ScrollScreen"
import DashTray from "../../../sections/DashTray"
import ListItemAdv from "../../../components/revisited/cutting edge/ListItemAdv"
import DashLabel from "../../../components/revisited/cutting edge/DashLabel"
import FancyLoad from "../../../sections/FancyLoad"
import DispText from "../../../components/DispText"

// Interfaces
import Finance from "../../../scripts/interfaces/finance"
import Services from "../../../scripts/interfaces/services"

// Scripts
import Accountant from "../../../scripts/classes/accountant"

// Enums
import { Status } from "../../../scripts/interfaces/finance"
import { PaymentStatus } from "../../../scripts/enums/services"

export default function AccountantDashboard() {

    const [accountant, setAccountant] = useState<Accountant>()
    const [payments, setPayments] = useState<Finance[]>([])
    const [services, setServices] = useState<Services[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [displayLabel, setDisplayLabel] = useState<boolean>(false)

    useFocusEffect(
        useCallback(() => {

            let isActive = true
            let timeout: ReturnType<typeof setTimeout>

            async function initialize() {

                try {

                    setLoading(true)

                    const [profile, key] = await Promise.all([
                        storage.get.profile(),
                        storage.get.key()
                    ])

                    const id = profile?.RegID

                    if (
                        typeof id === 'number' &&
                        typeof key === 'string'
                    ) {

                        const acc = new Accountant(id, key)

                        const [pay, serv] = await Promise.all([
                            acc.getAllFinanceRecords(),
                            acc.getAllServices()
                        ])

                        if (!isActive) return

                        const pendingPayments = pay.filter(
                            p => p.transactionstatus === Status.Pending
                        )

                        const unpaidServices = serv.filter(
                            s => s.paymentstatus === PaymentStatus.NotPaid
                        )

                        setAccountant(acc)

                        setPayments(pendingPayments)
                        setServices(unpaidServices)

                        setDisplayLabel(pendingPayments.length > 0)

                        timeout = setTimeout(() => {

                            if (!isActive) return

                            setDisplayLabel(false)

                        }, 3000)

                    } else {

                        if (!isActive) return

                        setAccountant(undefined)
                        setPayments([])
                        setServices([])
                        setDisplayLabel(false)

                    }

                } catch (err) {

                    console.error(
                        'Failed to load accountant dashboard:',
                        err
                    )

                    if (!isActive) return

                    setPayments([])
                    setServices([])
                    setDisplayLabel(false)

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

    return (

        <ScrollScreen>

            <FancyLoad loading={loading} />

            <DashTray>

                {
                    displayLabel &&

                    <DashLabel
                        text="Current Transactions"
                        text_color="info"
                    />
                }

                {
                    payments.length > 0 ?

                        payments.map(p => (

                            <ListItemAdv

                                key={p.transactionid}

                                rowOneData={{
                                    label: 'Code',
                                    text: p.transactionname
                                }}

                                rowTwoData={{
                                    label: 'Date',
                                    text: String(p.transactiondate)
                                }}

                                rightSideText={String(p.amount)}

                            />

                        ))

                        :

                        <DispText
                            text="No pending payments found"
                            textAlign="center"
                            textColor="info"
                        />

                }

            </DashTray>

        </ScrollScreen>

    )

}
