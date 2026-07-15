import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButton from '../../../sections/ListItemwithButton';

//interfaces
import Finance, { Status } from '../../../scripts/interfaces/finance';
import Accountant from '../../../scripts/classes/accountant';

//auth
import storage from '../../../scripts/auth/storage';

export default function PendingPayments() {

    const [pendingPayments, setPendingPayments] = useState<Finance[]>([]);
    const [accountant, setAccountant] = useState<Accountant>()

    async function approvePayment(id: number) {
        await accountant?.approvePayment(id);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const acc = new Accountant(id, key);
                setAccountant(acc);
                const finances = await acc.getAllFinanceRecords();
                setPendingPayments(finances.filter(f => f.TransactionStatus === Status.Pending));
            }
        })();
    }, []);

    useEffect(() => { }, []);

    return (
        <ScrollScreen>
            <DispText text={'Remove This'} />
            {
                pendingPayments.length > 0 ? pendingPayments.map((p, idx) => <ListItemWithButton key={idx}
                    buttonLabel='Approve'
                    rowOneData={{ label: 'Code', text: p.TransactionName }}
                    rowTwoData={{ label: 'Amount', text: String(p.Amount) }}
                    fun={() => approvePayment(p.TransactionID as number)}
                />) : <DispText text='No Pending Payments' />
            }
        </ScrollScreen>
    );
}