import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import CustomerPenaltyItem from '../../../sections/CustomerPenaltyItem';
import DispText from '../../../components/DispText';

//interfaces
import Penalty from '../../../scripts/interfaces/penalty';

//scripts
import Customer from '../../../scripts/classes/customer';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerPenalty() {
    const[penalties, setPenalties] = useState<Penalty[]>([]);
    const[customer, setCustomer] = useState<Customer>();
    const[penaltyAmount, setPenaltyAmount] = useState<string>('');

    async function payPenaltyAmount(id:number){
        if(Number(penaltyAmount) !== 0) await customer?.payPenalty(id,Number(penaltyAmount));
    }

    useEffect(()=>{
        (async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const cust = new Customer(id, key);
                const pen = await cust.getPenaltyHistory();

                setPenalties(pen);
                setCustomer(cust);                
            }
        })();
    }, []);

  return (
    <ScrollScreen>
        {
            penalties.length > 0 ? penalties.map((p) => <CustomerPenaltyItem key={p.PenaltyID}
                                                                             penalty={p}
                                                                             amountInput={penaltyAmount}
                                                                             onAmountInputChange={}
            />) : <DispText text='No penalty records found'/>
        }
    </ScrollScreen>
  );
}