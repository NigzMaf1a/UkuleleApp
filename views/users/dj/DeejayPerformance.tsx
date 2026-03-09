import React, {useState, useEffect} from 'react';

//components
import SoundSystemActions from '../../../sections/SoundSystemActions';

//scripts
import DJ from '../../../scripts/classes/dj';
import Lending from '../../../scripts/interfaces/lending';

//auth
import storage from '../../../scripts/auth/storage';

export default function DeejayPerformance() {
    const [lendings, setLendings] = useState<Lending[]>([]);
    const [dj, setDj] = useState<DJ>();

    async function markAsPerformed(id:number){
        await dj?.markAsPerformed(id);
    }

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const thisDj = new DJ(id, key);
                setDj(thisDj);
                const lending = await thisDj?.previewSoundHire();
                setLendings(lending)                
            }                    
        })();
    }, []);

  return (
    <>
        <SoundSystemActions data={lendings} fun={()=> markAsPerformed(lendings.map())}/>
    </>
  );
} 