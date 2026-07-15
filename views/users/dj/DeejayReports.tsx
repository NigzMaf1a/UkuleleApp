import React, {useState, useEffect} from 'react';

//components
import SoundSystemReport from '../../../sections/SoundSystemReport';

//scripts
import DJ from '../../../scripts/classes/dj';
import Lending from '../../../scripts/interfaces/lending';

//auth
import storage from '../../../scripts/auth/storage';

export default function DeejayReports() {
    const [lendings, setLendings] = useState<Lending[]>([]);

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const thisDj = new DJ(id, key);
                const lending = await thisDj?.previewSoundHire();
                setLendings(lending);                
            }                
        })();
    }, []);

  return (
    <>
        <SoundSystemReport data={lendings}/>
    </>
  );
} 