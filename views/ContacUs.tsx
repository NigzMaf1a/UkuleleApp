import React, { useEffect, useState } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import LabelledText from '../components/LabelledText';

//interfaces
import Contact from '../scripts/interfaces/contact';

//scripts
import User from '../scripts/classes/user';

//auth
import storage from '../scripts/auth/storage';

export default function ContacUs() {
    const [contacts, setContacts] = useState<Contact>();

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile()
                .then(prof => prof?.RegID);

            const key = await storage.get.key();

            if (typeof id === 'number' && typeof key === 'string') {
                const user = new User(id, key);

                const contact = await user?.getContact();

                console.log("Contact response:", contact);

                if (contact) {
                    console.log("Email:", contact.emailaddress);
                    console.log("Facebook:", contact.facebook);

                    setContacts(contact);
                }
            }
        })();
    }, []);

    // Runs whenever contacts state updates
    useEffect(() => {
        if (contacts) {
            console.log("Updated contacts state:", contacts);
            console.log("Email:", contacts.emailaddress);
            console.log("Facebook:", contacts.facebook);
        }
    }, [contacts]);

    return (
        <ScrollScreen>
            <LabelledText
                label='P.O Box'
                text={contacts?.pobox ?? ''}
            />

            <LabelledText
                label='Phone'
                text={contacts?.phoneno ?? ''}
            />

            <LabelledText
                label='Email'
                text={contacts?.emailaddress ?? ''}
            />

            <LabelledText
                label='Facebook'
                text={contacts?.facebook ?? ''}
            />

            <LabelledText
                label='Instagram'
                text={contacts?.instagram ?? ''}
            />
        </ScrollScreen>
    );
}