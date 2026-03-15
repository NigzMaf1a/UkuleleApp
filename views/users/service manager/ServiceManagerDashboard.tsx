import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';

//scripts
import ServiceManager from '../../../scripts/classes/servicemanager';

//interfaces
import Services from '../../../scripts/interfaces/services';

//enums
import { PaymentStatus } from '../../../scripts/enums/services';
import { ServiceStatus } from '../../../scripts/enums/services';

//auth
import storage from '../../../scripts/auth/storage';

export default function ServiceManagerDashboard() {
  const [manager, setManager] = useState<ServiceManager>();
  const [services, setServices] = useState<Services[]>([]);

  useEffect(()=>{
    ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const man = new ServiceManager(id, key);
                setManager(man);
                const requests = await man?.getAllServiceRequests();
                setServices(requests.filter(s => s.PaymentStatus === PaymentStatus.Paid && s.ServiceStatus === ServiceStatus.Pending));                
            }      
    })();
  }, []);
  return (
    <ScrollScreen>
      {
        services.length > 0 ? services.map((s) => <ListItem
              key={s.ServiceID}
              rowOneData={{label:'Type', text:s.ServiceType}}
              rowTwoData={{label:'Genre', text:s.Genre}}
              rightSideText={s.ServiceStatus}
        />) : <DispText text='No services booked yet'/>
      }
    </ScrollScreen>
  );
}
