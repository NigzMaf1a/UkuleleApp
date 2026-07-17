import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import DispatchRequestItem from '../../../sections/DispatchRequestItem';

//interfaces
import Dispatch from '../../../scripts/interfaces/dispatch';

//enums
import DispatchStatus from '../../../scripts/enums/dispatch';

//scripts
import DispatchMan from '../../../scripts/classes/dispatchman';

//auth
import storage from '../../../scripts/auth/storage';

export default function DispatchRequests() {
    const [dispatches, setDispatches] = useState<Dispatch[]>([]);
    const [manager, setManager] = useState<DispatchMan>();

    async function markRequestDispatched(id: number) {
        await manager?.markDispatchRequestAsDispatched(id);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regid);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const man = new DispatchMan(id, key);
                const disp = await man?.getDispatchRequests();

                setManager(man);
                setDispatches(disp.filter(d => d.dispatched === DispatchStatus.Pending));
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                dispatches.length > 0 ? dispatches.map((d) => <DispatchRequestItem item={d} fun={() => markRequestDispatched(d.dispatchid)} />) : <DispText text='No dispatch requests found' />
            }
        </ScrollScreen>
    );
}