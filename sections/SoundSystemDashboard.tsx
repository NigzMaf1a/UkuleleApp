import React, { useEffect } from 'react';

import storage from '../scripts/auth/storage';


//components
import ScrollScreen from '../components/ScrollScreen';
import DashTray from './DashTray';
import ListItemAdv from '../components/revisited/cutting edge/ListItemAdv';
import DispText from '../components/DispText';

//interfaces
import Lending from '../scripts/interfaces/lending';

interface SoundSystemDashboardProps {
    lendings: Lending[];
}

export default function SoundSystemDashboard({ lendings }: SoundSystemDashboardProps) {

    return (
        <ScrollScreen>
            <DashTray>
                {
                    lendings.length > 0 ? lendings.map((l) => <ListItemAdv key={l.lendid}
                        rowOneData={{ label: 'Genre', text: l.genre }}
                        rowTwoData={{ label: 'Hours', text: String(l.hours) }}
                        rightSideText={String(l.lendingdate)}
                    />) : <DispText text='No unperformed lendings found' />
                }
            </DashTray>
        </ScrollScreen>
    )
}