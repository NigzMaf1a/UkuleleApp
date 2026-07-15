import React, { useEffect, useState } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import Screen from '../../../components/Screen';
import CustomerFeedbackItem from '../../../sections/CustomerFeedbackItem';
import DispText from '../../../components/DispText';
import InputPlusButton from '../../../sections/InputPlusButton';

//interfaces
import Feedback from '../../../scripts/interfaces/feedback';
import Users from '../../../scripts/interfaces/user';

//scripts
import Customer from '../../../scripts/classes/customer';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerFeedback() {
    const [customer, setCustomer] = useState<Customer>();
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [newFeedback, setNewFeedback] = useState<string>('');
    const [user, setUser] = useState<Users>();
    const [rating] = useState<number>(4);

    async function addFeedback(feed: Feedback) {
        await customer?.addFeedback(feed);
    }

    async function getCurrentUser() {
        if (customer) {
            const thisUser = await customer.getUser();
            if (thisUser !== undefined) {
                setUser(thisUser);
            }
        }
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const cust = new Customer(id, key);
                const feed = await cust?.getFeedback();

                setCustomer(cust);
                setFeedback(feed);
                await getCurrentUser();
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
                btnFun={async () => {

                    if (!customer) return;

                    const feed: Feedback = {
                        CustomerID: customer.getRegID(),
                        Comments: newFeedback,
                        Name: user?.Name as string,
                        Rating: rating as 1 | 2 | 3 | 4 | 5
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
                    feedback.length > 0 ? feedback.map((f) => <CustomerFeedbackItem key={f.FeedbackID} feedback={f} />) : <DispText text='No feedback found' />
                }
            </ScrollScreen>
        </Screen>
    );
}