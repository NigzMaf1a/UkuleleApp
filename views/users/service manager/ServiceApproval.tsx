import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';

//scripts
import ServiceManager from '../../../scripts/classes/servicemanager';
import Services from '../../../scripts/interfaces/services';
import { ServiceStatus, PaymentStatus } from '../../../scripts/enums/services';


//auth
import storage from '../../../scripts/auth/storage';


export default function ServiceApproval() {
    const [manager, setManager] = useState<ServiceManager>();
    const [services, setServices] = useState<Services[]>([]);

    async function approveService(id: number) {
        await manager?.approveService(id);
    }


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
                services.length > 0 ? services.map((s) => <ListItemWithButtonAdv key={s.serviceid}
                    buttonLabel={'Approve'}
                    rowOneData={{ label: 'Type', text: s.servicetype }}
                    rowTwoData={{ label: 'Amount', text: String(s.cost) }}
                    fun={() => approveService(s.serviceid as number)}
                />) : <DispText text={'No unapproved services found'} />
            }
        </ScrollScreen>
    );
}