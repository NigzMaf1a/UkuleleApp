import React, {useState, useEffect} from 'react';

//components
import SoundSystemReport from '../../../sections/SoundSystemReport';

//scripts
import Lending from '../../../scripts/interfaces/lending';
import Mcee from '../../../scripts/classes/mcee';

//auth
import storage from '../../../scripts/auth/storage';

export default function MceeReport() {
    const [records, setRecords] = useState<Lending[]>([]);

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const mcee = new Mcee(id, key);
                const lendings = await mcee?.getAllSoundBookings();
                setRecords(lendings);                
            }
        })();
    }, []);

  return (
    <>
        <SoundSystemReport data={records}/>
    </>
  )
}