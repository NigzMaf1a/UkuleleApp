import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';
import FancyLoad from '../../../sections/FancyLoad';

//interfaces
import Finance, { Status } from '../../../scripts/interfaces/finance';
import Accountant from '../../../scripts/classes/accountant';

//auth
import storage from '../../../scripts/auth/storage';

export default function PendingPayments() {

    const [pendingPayments, setPendingPayments] = useState<Finance[]>([]);
    const [accountant, setAccountant] = useState<Accountant>();
    const [loading, setLoading] = useState<boolean>(false);

    async function loadPendingPayments(acc: Accountant) {
        const finances = await acc.getAllFinanceRecords();

        setPendingPayments(
            finances.filter(
                f => f.transactionstatus === Status.Pending
            )
        );
    }

    async function approvePayment(id: number) {

        if (!accountant) return;

        await accountant.approvePayment(id);

        await loadPendingPayments(accountant);
    }

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile()
                    .then(prof => prof?.RegID);

                const key = await storage.get.key();

                if (typeof id === 'number' && typeof key === 'string') {

                    const acc = new Accountant(id, key);

                    setAccountant(acc);

                    await loadPendingPayments(acc);
                }
            } catch (error) {
                console.log('Error occured while initializing payments', error);
            } finally {
                setLoading(false);
            }
        }
        initialize();
    }, []);

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />
            {
                pendingPayments.length > 0 ?

                    pendingPayments.map((p) => (

                        <ListItemWithButtonAdv
                            key={p.transactionid}
                            buttonLabel="Approve"
                            rowOneData={{
                                label: 'Code',
                                text: p.transactionname
                            }}
                            rowTwoData={{
                                label: 'Amount',
                                text: String(p.amount)
                            }}
                            fun={() => approvePayment(p.transactionid as number)}
                            btn_variant='success'
                        />

                    ))

                    :

                    <DispText text="No Pending Payments" />
            }
        </ScrollScreen>
    );
}