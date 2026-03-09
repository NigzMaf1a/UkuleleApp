import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import DispText from '../components/DispText';
import ListItem from './ListItem';

//scripts
import Lending from '../scripts/interfaces/lending';
import { LendingStatus, Performed } from '../scripts/enums/lendStatus';

interface SoundSystemReportProps{
    data:Lending[];
}

export default function SoundSystemReport({data}:SoundSystemReportProps) {
    const [records, setRecords] = useState<Lending[]>([]);

    useEffect(()=>{
        setRecords(data.filter(r => r.LendingStatus === LendingStatus.Done && r.Performed === Performed.Yes));
    }, [data]);

  return (
    <ScrollScreen>
        {
            records.length > 0 ? records.map((r) => <ListItem key={r.LendID}
                                                              rowOneData={{label:'Date', text:String(r.LendingDate)}}
                                                              rowTwoData={{label:'Hours', text:String(r.Hours)}}
                                                              rightSideText={r.Performed}
            />) : <DispText text='No lending and performance records found'/>
        }
    </ScrollScreen>
  );
}