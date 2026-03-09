import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import CustomerPaymentItem from '../../../sections/CustomerPaymentItem';
import DispText from '../../../components/DispText';

//interfaces
import Finance from '../../../scripts/interfaces/finance';

//scripts
import Customer from '../../../scripts/classes/customer';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerPayment() {
    const[payments, setPayments] = useState<Finance[]>([]);

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const customer = new Customer(id, key);
                const finances = await customer?.getPaymentHistory();

                setPayments(finances);                
            }                    
        })();
    }, []);
  return (
    <ScrollScreen>
        {
            payments.length > 0 ? payments.map((p) => <CustomerPaymentItem key={p.TransactionID} payment={p}/>) : <DispText text='No payment records found'/>
        }
    </ScrollScreen>
  )
}