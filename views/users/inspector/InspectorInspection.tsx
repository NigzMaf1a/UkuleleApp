import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';

import storage from '../../../scripts/auth/storage';

export default function InspectorInspection() {

  useEffect(()=>{
    ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){}
    })();
  }, [])
  return (
    <ScrollScreen></ScrollScreen>
  );
}