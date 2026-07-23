import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import Screen from '../../../components/Screen';
import CustomerFeedbackItem from '../../../sections/CustomerFeedbackItem';
import DispText from '../../../components/DispText';
import InputPlusButton from '../../../sections/InputPlusButton';
import FancyLoad from '../../../sections/FancyLoad';

//interfaces
import Feedback from '../../../scripts/interfaces/feedback';
import Users from '../../../scripts/interfaces/user';

//scripts
import Customer from '../../../scripts/classes/customer';
import toaster from '../../../scripts/utils/toaster';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerFeedback() {
    const [customer, setCustomer] = useState<Customer>();
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [newFeedback, setNewFeedback] = useState<string>('');
    const [user, setUser] = useState<Users>();
    const [rating] = useState<number>(4);
    const [loading, setLoading] = useState<boolean>(false);

    function validateFeedbackInput(com: string): string {
        if (com.length < 8) {
            toaster(
                'Please enter a valid comment',
                'info'
            );
            throw new Error('Invalid feedback comment');
        }
        return com;
    }

    function validateFeedback(feed: Feedback): Feedback {
        if (typeof feed.customerid !== 'number') {
            toaster('Invalid Customer ID', 'danger');
            throw Error('Customer ID must be a number');
        }
        if (typeof feed.comments !== 'string') {
            toaster('Please enter a comment to submit', 'info');
            throw Error('A feedback submission must have a comment')
        }
        if (typeof feed.name !== 'string') {
            toaster('Invalid user name', 'danger');
            throw new Error('Feedback must have a user name');
        }
        if (typeof feed.rating !== 'number') {
            toaster('Feedback must have a rating', 'info');
            throw new Error('Please submit a rating with your feedback response');
        }
        toaster('Feedback is valid', 'success');
        return feed;
    }

    async function addFeedback(feed: Feedback) {
        console.log('Feedback is about to be added');
        await customer?.addFeedback(validateFeedback(feed));
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function initialize() {
                try {
                    setLoading(true);

                    const profile = await storage.get.profile();
                    const key = await storage.get.key();

                    const id = profile?.RegID;

                    if (typeof id === 'number' && typeof key === 'string') {
                        const cust = new Customer(id, key);

                        const feed = await cust.getFeedback();
                        const thisUser = await cust.getUser();

                        if (!isActive) return;

                        setCustomer(cust);
                        setFeedback(feed);

                        if (thisUser) {
                            setUser(thisUser);
                        }
                    } else {
                        setCustomer(undefined);
                        setFeedback([]);
                        setUser(undefined);
                    }
                } catch (error) {
                    console.log('Error occurred while initializing feedback', error);

                    if (!isActive) return;

                    setCustomer(undefined);
                    setFeedback([]);
                    setUser(undefined);
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            }

            initialize();

            return () => {
                isActive = false;
            };
        }, [])
    );

    return (
        <Screen>
            <FancyLoad loading={loading} />

            <InputPlusButton
                inputPlaceholder="Enter your feedback here"
                inputValue={newFeedback}
                onInputChange={setNewFeedback}
                btnLabel="Submit"
                btnFun={async () => {
                    if (!customer) return;

                    const profile = await storage.get.profile();

                    const feed: Feedback = {
                        customerid: customer.getRegID(),
                        comments: validateFeedbackInput(newFeedback),
                        name: profile?.Name as string,
                        rating: rating as 1 | 2 | 3 | 4 | 5,
                    };

                    await addFeedback(feed);

                    // Update UI immediately
                    setFeedback(prev => [...prev, feed]);

                    // Clear input
                    setNewFeedback('');
                }}
            />

            <ScrollScreen>
                {feedback.length > 0 ? (
                    feedback.map((f) => (
                        <CustomerFeedbackItem
                            key={f.feedbackid}
                            feedback={f}
                        />
                    ))
                ) : (
                    <DispText text="No feedback found" />
                )}
            </ScrollScreen>
        </Screen>
    );
}