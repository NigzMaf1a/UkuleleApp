import React, {useEffect, useState} from 'react';

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
    const[contacts, setContacts] = useState<Contact>();

    useEffect(()=>{
        (async ()=>{
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            
            if(typeof id === 'number' && typeof key === 'string' ) {
                const user = new User(id, key);
                const contact = await user?.getContact();

                setContacts(contact[contact.length - 1]);
            }
        })();
    }, []);
  return (
    <ScrollScreen>
        <LabelledText label='P.O Box' text={String(contacts?.PoBox)}/>
        <LabelledText label='Phone' text={String(contacts?.PhoneNo)}/>
        <LabelledText label='Email' text={String(contacts?.EmailAddress)}/>
        <LabelledText label='Facebook' text={String(contacts?.Facebook)}/>
        <LabelledText label='Instagram' text={String(contacts?.Instagram)}/>
    </ScrollScreen>
  );
}