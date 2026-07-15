import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButton from '../../../sections/ListItemwithButton';

//scripts
import ServiceManager from '../../../scripts/classes/servicemanager';
import Services from '../../../scripts/interfaces/services';
import { ServiceStatus, PaymentStatus } from '../../../scripts/enums/services';


//auth
import storage from '../../../scripts/auth/storage';


export default function ServiceApproval() {
    const [manager, setManager] = useState<ServiceManager>();
    const [services, setServices] = useState<Services[]>([]);

    async function approveService(id:number){
        await manager?.approveService(id);
    }


    useEffect(()=>{
        ( async ()=> {
            const id = await storage.get.profile().then(prof => prof?.RegID);
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
            services.length > 0 ? services.map((s) => <ListItemWithButton key={s.ServiceID}
                                                                          buttonLabel={'Approve'}
                                                                          rowOneData={{label:'Type', text:s.ServiceType}}
                                                                          rowTwoData={{label:'Amount', text:String(s.Cost)}}
                                                                          fun={() => approveService(s.ServiceID as number)}
            />) : <DispText text={'No unapproved services found'}/>
        }
    </ScrollScreen>
  );
}