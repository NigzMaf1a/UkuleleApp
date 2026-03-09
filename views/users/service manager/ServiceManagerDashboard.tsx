import React, {useState, useEffect} from 'react';

//components

//auth
import storage from '../../../scripts/auth/storage';

export default function ServiceManagerDashboard() {
  useEffect(()=>{
    ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){}      
    })();
  }, []);
  return (
    <div>ServiceManagerDashboard</div>
  );
}
