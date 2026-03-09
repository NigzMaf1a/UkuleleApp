import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import CustomerReportItem from '../../../sections/CustomerReportItem';
import DispText from '../../../components/DispText';

//interfaces
import Services from '../../../scripts/interfaces/services';

//scripts
import Customer from '../../../scripts/classes/customer';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerReports() {
    const[services, setServices] = useState<Services[]>([]);

    useEffect(()=>{
         ( async ()=> {
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const customer = new Customer(id, key);
                const s = await customer.getCustomerServices();

                setServices(s);                
            }
        })();
    }, []);

  return (
    <ScrollScreen>
        {
            services.length > 0 ? services.map((s) => <CustomerReportItem key={s.ServiceID} service={s}/>) : <DispText text='No service records found'/>
        }
    </ScrollScreen>
  );
}