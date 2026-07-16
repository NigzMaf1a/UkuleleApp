import React, { useEffect } from 'react';

import storage from '../scripts/auth/storage';


//components
import ScrollScreen from '../components/ScrollScreen';
import DashTray from './DashTray';
import ListItem from './ListItem';
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
                    lendings.length > 0 ? lendings.map((l) => <ListItem key={l.LendID}
                        rowOneData={{ label: 'Genre', text: l.Genre }}
                        rowTwoData={{ label: 'Hours', text: String(l.Hours) }}
                        rightSideText={String(l.LendingDate)}
                    />) : <DispText text='No unperformed lendings found' />
                }
            </DashTray>
        </ScrollScreen>
    )
}