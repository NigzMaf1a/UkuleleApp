import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import ListItemWithButtonAdv from '../components/revisited/cutting edge/ListItemWithButtonAdv';
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
        setLending(data.filter(l => l.lendingstatus === LendingStatus.Done && l.performed === Performed.No));
    }, [data]);

    return (
        <ScrollScreen>
            {
                lending.length > 0 ? lending.map((lend) => <ListItemWithButtonAdv key={lend.lendid}
                    buttonLabel={'Lend'}
                    rowOneData={{ label: 'Lend ID', text: String(lend.lendid) }}
                    rowTwoData={{ label: 'Hours', text: String(lend.hours) }}
                    fun={fun}
                />) : <DispText text={'No unperformed lendings found'} />
            }
        </ScrollScreen>
    );
} 