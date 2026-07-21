import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import ListItemWithButtonAdv from '../components/revisited/cutting edge/ListItemWithButtonAdv';
import DispText from '../components/DispText';

//scripts
import User from '../scripts/classes/user';
import toaster from '../scripts/utils/toaster';

//interfaces
import Lending from '../scripts/interfaces/lending';

//auth
import storage from '../scripts/auth/storage';

export default function SoundSystemApproveLending() {
    const [user, setUser] = useState<User>();
    const [lendings, setLendings] = useState<Lending[]>([]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const acc = new User(id, key);
                const lend = await acc.soundSystemGetLending();

                setUser(acc);
                setLendings(lend);
            }
        })();
    }, []);

    async function markPerformed(id: number) {
        if (user) {
            await user.soundSystemApproveLending(id);
        }
    }
    return (
        <ScrollScreen>
            {
                lendings.length > 0 ? lendings.map((g) => <ListItemWithButtonAdv
                    key={g.lendid}
                    rowOneData={{ label: 'ID', text: String(g.lendid) }}
                    rowTwoData={{ label: 'Genre', text: String(g.genre) }}
                    buttonLabel='Approve'
                    fun={async () => await markPerformed(g.lendid)}
                />) : <DispText text='No available lendings' />
            }
        </ScrollScreen>
    )
}
