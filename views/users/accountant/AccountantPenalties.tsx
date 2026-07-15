import React, { useEffect, useState } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButton from '../../../sections/ListItemwithButton';

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
                const pen = (await acc.getPenalties()).filter(p => p.PenaltyStatus === PenaltyStatus.Processing);
                const pay = await acc.getPenaltyPayments();

                setAccountant(acc);
                setPenalties(pen);
                setPayments(pay);
            }
        })();
    }, []);

    function returnCode(id: number): string {
        if (payments.length > 0) {
            const match = payments.find(p => p.PenaltyID === id)?.PaymentCode;
            if (typeof match === 'string') return match;
        }
        return '';
    }
    return (
        <ScrollScreen>
            {
                penalties.length > 0 ? penalties.map((p) => <ListItemWithButton key={p.PenaltyID}
                    rowOneData={{ label: 'Pay Code', text: returnCode(Number(p.PenaltyID)) }}
                    rowTwoData={{ label: 'Amount', text: String(p.Penalty) }}
                    buttonLabel='Approve'
                    fun={() => accountant?.approvePenaltyPayment(Number(p.PenaltyID))}
                />) : <DispText text='No pending penalty payments found' />
            }
        </ScrollScreen>
    );
}
