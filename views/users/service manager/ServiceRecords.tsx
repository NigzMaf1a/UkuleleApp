import React, {useEffect, useState} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItem from '../../../sections/ListItem';

//scripts
import ServiceManager from '../../../scripts/classes/servicemanager';
import Services from '../../../scripts/interfaces/services';
import { ServiceStatus, PaymentStatus } from '../../../scripts/enums/services';

//auth
import storage from '../../../scripts/auth/storage';

export default function ServiceRecords() {
    const [records, setRecords] = useState<Services[]>([]);

    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const man = new ServiceManager(id, key);
                const services = await man?.getAllServiceRequests();
                setRecords(services.filter(s => s.PaymentStatus === PaymentStatus.Paid && s.ServiceStatus === ServiceStatus.Approved));                
            }
        })();
    }, []);

  return (
    <ScrollScreen>
        {
            records.length > 0 ? records.map((r) => <ListItem key={r.ServiceID}
                                                              rowOneData={{label:'Type', text:r.ServiceType}}
                                                              rowTwoData={{label:'Status', text:r.PaymentStatus}}
                                                              rightSideText={r.ServiceStatus}
            />) : <DispText text = {'No service records found'}/>
        }
    </ScrollScreen>
  );
}