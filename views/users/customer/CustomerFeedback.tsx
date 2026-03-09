import React, {useEffect, useState} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import Screen from '../../../components/Screen';
import CustomerFeedbackItem from '../../../sections/CustomerFeedbackItem';
import DispText from '../../../components/DispText';
import InputPlusButton from '../../../sections/InputPlusButton';

//interfaces
import Feedback from '../../../scripts/interfaces/feedback';

//scripts
import Customer from '../../../scripts/classes/customer';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerFeedback() {
    const[customer, setCustomer] = useState<Customer>();
    const[feedback, setFeedback] = useState<Feedback[]>([]);
    const[newFeedback, setNewFeedback] = useState<string>('');

    async function addFeedback(feed:Feedback){
        await customer?.addFeedback(feed);
    }

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const cust = new Customer(id, key);
                const feed = await cust?.getFeedback();

                setCustomer(cust);
                setFeedback(feed);                
            }
        })();
    }, []);

  return (
    <Screen>
<InputPlusButton
    inputPlaceholder='Enter feedback here'
    inputValue={newFeedback}
    onInputChange={setNewFeedback}
    btnLabel='Submit'
    btnFun={async (text:string) => {

        if (!customer) return;

        const feed: Feedback = {
            CustomerID: customer.getRegID(),
            Comments: text,
        };

        await addFeedback(feed);

        // optional UI update
        setFeedback(prev => [...prev, feed]);

        // clear input
        setNewFeedback('');
    }}
/>
        <ScrollScreen>
            {
                feedback.length > 0 ?  feedback.map((f)=> <CustomerFeedbackItem key={f.FeedbackID} feedback={f}/>) : <DispText text='No feedback found'/>
            }
        </ScrollScreen>
    </Screen>
  );
}