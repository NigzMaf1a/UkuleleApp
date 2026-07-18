import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import DispText from '../../../components/DispText';
import ListItem from '../../../sections/ListItem';


//scripts
import DispatchMan from '../../../scripts/classes/dispatchman';

//enums
import DispatchStatus from '../../../scripts/enums/dispatch';

//interfaces
import Dispatch from '../../../scripts/interfaces/dispatch';

//auth
import storage from '../../../scripts/auth/storage';

export default function DispatchReport() {
    const [dispatches, setDispatches] = useState<Dispatch[]>([]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const manager = new DispatchMan(id, key);
                const disp = await manager?.getDispatchRequests();

                setDispatches(disp.filter(d => d.dispatched === DispatchStatus.Dispatched || d.dispatched === DispatchStatus.Returned));
            }
        })();
    }, [dispatches]);

    return (
        <ScrollScreen>
            {
                dispatches.length > 0 ? dispatches.map((disp) => <ListItem key={disp.dispatchid}
                    rowOneData={{ label: 'Date', text: String(disp.dispatchdate) }}
                    rowTwoData={{ label: 'Location', text: disp.dlocation }}
                    rightSideText={disp.dispatched}
                />) : <DispText text='No dispatch reports found' />
            }
        </ScrollScreen>
    );
}