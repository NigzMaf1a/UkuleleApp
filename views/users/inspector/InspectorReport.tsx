import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';

//interfaces
import Inspection from '../../../scripts/interfaces/inspection';

//scripts
import Inspector from '../../../scripts/classes/inspector';
import describer from '../../../scripts/utils/describer';

//auth
import storage from '../../../scripts/auth/storage';


export default function InspectorReport() {
    const [inspections, setInspections] = useState<Inspection[]>([]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const inspector = new Inspector(id, key);
                const insp = await inspector?.getAllInspections();

                setInspections(insp);
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                inspections.length > 0 ? inspections.map((i) => <ListItem key={i.InspectionID}
                    rowOneData={{ label: 'ID', text: String(i.InspectionID) }}
                    rowTwoData={{ label: 'Date', text: String(i.InspectionDate) }}
                    rightSideText={describer(i.dCondition)}
                />) : <DispText text='No inspection records found' />
            }
        </ScrollScreen>
    );
}