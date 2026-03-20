import React, {useState, useEffect} from 'react';

//components
import HelpMapper from './help/HelpMapper';

//auth
import storage from '../scripts/auth/storage';

//scripts
import User from '../scripts/classes/user';

//enums
import RegType from '../scripts/enums/regType';

export default function Help() {
  const [regType, setRegType] = useState<RegType>();

    useEffect(()=>{
        (async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            
            if(typeof id === 'number' && typeof key === 'string' ) {
                const user = new User(id, key);

                const reg_type = await user.getRegType() as RegType;
                setRegType(reg_type);
            }
        })();
    }, []);  
  return (
    <HelpMapper regtype={regType as RegType}/>
  );
}