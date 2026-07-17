import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItem from "../../../sections/ListItem";
import DispText from "../../../components/DispText";

//scripts
import Inspector from "../../../scripts/classes/inspector";
import describer from "../../../scripts/utils/describer";

//interfaces
import Inspection from "../../../scripts/interfaces/inspection";

export default function InspectorDashboard() {
    let [views, setViews] = useState<number>(1);
    const [inspections, setInspections] = useState<Inspection[]>([]);

    function reset() {
        setViews(1);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regid);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const inspector = new Inspector(id, key);

                const insp = await inspector.getAllInspections();
                setInspections(insp);
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            <DashTray>
                {
                    inspections.length > 0 ? inspections.map((i) => <ListItem key={i.inspectionid}
                        rowOneData={{ label: 'Inspection Id:', text: String(i.inspectionid) }}
                        rowTwoData={{ label: 'Date', text: String(i.inspectiondate) }}
                        rightSideText={describer(i.dcondition)}
                    />) : <DispText text="No current inspections" />
                }
            </DashTray>
        </ScrollScreen>
    );
}

