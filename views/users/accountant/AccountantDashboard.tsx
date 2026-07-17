import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItem from "../../../sections/ListItem";
import ListItemWithButton from "../../../sections/ListItemwithButton";
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

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const acc = new Accountant(id, key);
                setAccountant(acc);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!accountant) return;

            const pay = await accountant.getAllFinanceRecords();
            const serv = await accountant.getAllServices();

            setPayments(
                pay.filter(p => p.transactionstatus === Status.Pending)
            );

            setServices(
                serv.filter(s => s.paymentstatus === PaymentStatus.NotPaid)
            );
        })();
    }, [accountant]);

    return (
        <ScrollScreen>

            <DashTray>
                {
                    payments.length > 0 && payments.map((p) => <ListItem key={p.transactionid}
                        rowOneData={{ label: 'Code', text: p.transactionname }}
                        rowTwoData={{ label: 'Date', text: String(p.transactiondate) }}
                        rightSideText={String(p.amount)}
                    />)
                }
            </DashTray>
        </ScrollScreen>
    );
}

