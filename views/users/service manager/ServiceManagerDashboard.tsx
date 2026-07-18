import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    (async () => {
      const id = await storage.get.profile().then(prof => prof?.RegID);
      const key = await storage.get.key().then(key => key);
      if (typeof id === 'number' && typeof key === 'string') {
        const man = new ServiceManager(id, key);
        setManager(man);
        const requests = await man?.getAllServiceRequests();
        setServices(requests.filter(s => s.paymentstatus === PaymentStatus.Paid && s.servicestatus === ServiceStatus.Pending));
      }
    })();
  }, []);
  return (
    <ScrollScreen>
      {
        services.length > 0 ? services.map((s) => <ListItem
          key={s.serviceid}
          rowOneData={{ label: 'Type', text: s.servicetype }}
          rowTwoData={{ label: 'Genre', text: s.genre }}
          rightSideText={s.servicestatus}
        />) : <DispText text='No services booked yet' />
      }
    </ScrollScreen>
  );
}
