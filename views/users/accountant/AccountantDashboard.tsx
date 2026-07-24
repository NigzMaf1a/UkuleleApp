import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

//auth
import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItemAdv from "../../../components/revisited/cutting edge/ListItemAdv";
import DashLabel from "../../../components/revisited/cutting edge/DashLabel";
import FancyLoad from "../../../sections/FancyLoad";
import DispText from "../../../components/DispText";

//interfaces
import Finance from "../../../scripts/interfaces/finance";
import Services from "../../../scripts/interfaces/services";

//scripts
import Accountant from "../../../scripts/classes/accountant";

//enums
import { Status } from "../../../scripts/interfaces/finance";
import { PaymentStatus } from "../../../scripts/enums/services";

export default function AccountantDashboard() {
    const [accountant, setAccountant] = useState<Accountant>();
    const [payments, setPayments] = useState<Finance[]>([]);
    const [services, setServices] = useState<Services[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [displayLabel, setDisplayLabel] = useState<boolean>(false);

    useFocusEffect(useCallback(() => {
        let timeout: ReturnType<typeof setTimeout>;

        async function initialize() {
            try {
                setLoading(true);

                const [id, key] = await Promise.all([
                    storage.get.profile().then(prof => prof?.RegID),
                    storage.get.key()
                ]);

                if (
                    typeof id === 'number' &&
                    typeof key === 'string'
                ) {
                    const acc = new Accountant(id, key);
                    setAccountant(acc);

                    if (!accountant) return;

                    const pay = await accountant.getAllFinanceRecords();
                    const serv = await accountant.getAllServices();

                    setPayments(
                        pay.filter(p => p.transactionstatus === Status.Pending)
                    );

                    setServices(
                        serv.filter(s => s.paymentstatus === PaymentStatus.NotPaid)
                    );

                    setDisplayLabel(payments.length > 0);

                    timeout = setTimeout(() => setDisplayLabel(false), 3000);

                } else {
                    setPayments([]);
                    setServices([]);
                    setDisplayLabel(false);
                }
            } catch (err) {
                console.error('Failed to load inventory:', err);
                setPayments([]);
                setServices([]);
            } finally {
                setLoading(false);
            }
        }

        initialize();

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, []));

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />

            <DashTray>
                {
                    displayLabel && <DashLabel
                        text="Current Transactions"
                        text_color="info"
                    />
                }

                {
                    payments.length > 0 ? payments.map((p) => <ListItemAdv key={p.transactionid}
                        rowOneData={{ label: 'Code', text: p.transactionname }}
                        rowTwoData={{ label: 'Date', text: String(p.transactiondate) }}
                        rightSideText={String(p.amount)}
                    />) :
                        <DispText
                            text="No pending payments found"
                            textAlign="center"
                            textColor="info"
                        />
                }
            </DashTray>
        </ScrollScreen>
    );
}

