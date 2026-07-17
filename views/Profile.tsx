import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

//components
import ScrollScreen from "../components/ScrollScreen";
import DashTray from '../sections/DashTray';
import LabelledText from '../components/LabelledText';
import ImageCont from '../sections/Image';

//scripts
import User from '../scripts/classes/user';

//styles
import profileStyles from '../styles/profileStyles';

//auth
import storage from '../scripts/auth/storage';

//interfaces
import Users from '../scripts/interfaces/user';


export default function Profile() {
    const [user, setUser] = useState<User>();
    const [reg, setReg] = useState<Users>();

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regid);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const us = new User(id, key);
                const thisUser = await us.getUser();
                setUser(us);
                setReg(thisUser);
                console.log(reg);
            }
        })();
    }, []);
    return (
        <ScrollScreen>
            <ImageCont />
            <DashTray>
                <LabelledText
                    label='Name'
                    text={reg?.name as string}
                />
                <LabelledText
                    label='Phone'
                    text={reg?.phoneno as string}
                />
                <LabelledText
                    label='Email'
                    text={reg?.email as string}
                />
                <LabelledText
                    label='Reg Type'
                    text={reg?.regtype as string}
                />
            </DashTray>
        </ScrollScreen>
    );
}