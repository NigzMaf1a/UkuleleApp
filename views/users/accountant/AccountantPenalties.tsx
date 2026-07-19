import React, { useEffect, useState } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';

//interfaces
import Penalty from '../../../scripts/interfaces/penalty';
import { PenaltyPayment } from '../../../scripts/interfaces/penaltyPayment';

//enums
import { PenaltyStatus } from '../../../scripts/enums/penalty';

//scripts
import Accountant from '../../../scripts/classes/accountant';

//auth
import storage from '../../../scripts/auth/storage';

export default function AccountantPenalties() {
    const [penalties, setPenalties] = useState<Penalty[]>([]);
    const [payments, setPayments] = useState<PenaltyPayment[]>([]);
    const [accountant, setAccountant] = useState<Accountant>();

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const acc = new Accountant(id, key);
                const pen = (await acc.getPenalties()).filter(p => p.penaltystatus === PenaltyStatus.Processing);
                const pay = await acc.getPenaltyPayments();

                setAccountant(acc);
                setPenalties(pen);
                setPayments(pay);
            }
        })();
    }, []);

    function returnCode(id: number): string {
        if (payments.length > 0) {
            const match = payments.find(p => p.penaltyid === id)?.paymentcode;
            if (typeof match === 'string') return match;
        }
        return '';
    }
    return (
        <ScrollScreen>
            {
                penalties.length > 0 ? penalties.map((p) => <ListItemWithButtonAdv key={p.penaltyid}
                    rowOneData={{ label: 'Pay Code', text: returnCode(Number(p.penaltyid)) }}
                    rowTwoData={{ label: 'Amount', text: String(p.penalty) }}
                    buttonLabel='Approve'
                    fun={() => accountant?.approvePenaltyPayment(Number(p.penaltyid))}
                />) : <DispText text='No pending penalty payments found' />
            }
        </ScrollScreen>
    );
}
