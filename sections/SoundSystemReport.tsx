import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import DispText from '../components/DispText';
import ListItemAdv from '../components/revisited/cutting edge/ListItemAdv';

//scripts
import Lending from '../scripts/interfaces/lending';
import { LendingStatus, Performed } from '../scripts/enums/lendStatus';

interface SoundSystemReportProps {
    data: Lending[];
}

export default function SoundSystemReport({ data }: SoundSystemReportProps) {
    const [records, setRecords] = useState<Lending[]>([]);

    useEffect(() => {
        setRecords(data.filter(r => r.lendingstatus === LendingStatus.Done && r.performed === Performed.Yes));
    }, [data]);

    return (
        <ScrollScreen>
            {
                records.length > 0 ? records.map((r) => <ListItemAdv key={r.lendid}
                    rowOneData={{ label: 'Date', text: String(r.lendingdate) }}
                    rowTwoData={{ label: 'Hours', text: String(r.hours) }}
                    rightSideText={r.performed}
                />) : <DispText text='No lending and performance records found' />
            }
        </ScrollScreen>
    );
}