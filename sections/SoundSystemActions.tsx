import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import ListItemWithButton from './ListItemwithButton';
import DispText from '../components/DispText';

//scripts
import Lending from '../scripts/interfaces/lending';
import { LendingStatus, Performed } from '../scripts/enums/lendStatus';

interface SoundSystemActionProps {
    data: Lending[];
    fun: (id?: string | number) => Promise<void>
}

export default function SoundSystemActions({ data, fun }: SoundSystemActionProps) {
    const [lending, setLending] = useState<Lending[]>([]);

    useEffect(() => {
        setLending(data.filter(l => l.LendingStatus === LendingStatus.Done && l.Performed === Performed.No));
    }, [data]);

    return (
        <ScrollScreen>
            {
                lending.length > 0 ? lending.map((lend) => <ListItemWithButton key={lend.LendID}
                    buttonLabel={'Lend'}
                    rowOneData={{ label: 'Lend ID', text: String(lend.LendID) }}
                    rowTwoData={{ label: 'Hours', text: String(lend.Hours) }}
                    fun={fun}
                />) : <DispText text={'No unperformed lendings found'} />
            }
        </ScrollScreen>
    );
} 