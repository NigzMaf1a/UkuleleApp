import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItem from "../../../sections/ListItem";
import ListItemWithButton from "../../../sections/ListItemwithButton";
import DispText from "../../../components/DispText";

//scripts
import DispatchMan from "../../../scripts/classes/dispatchman";

//interfaces
import Dispatch from "../../../scripts/interfaces/dispatch";

//enums
import DispatchStatus from "../../../scripts/enums/dispatch";

export default function DispatchDashboard() {
    let [views, setViews] = useState<number>(1);
    const [pending, setPending] = useState<Dispatch[]>([]);
    const [packed, setPacked] = useState<Dispatch[]>([]);

    function reset() {
        setViews(1);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regid);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const man = new DispatchMan(id, key);

                const requests = await man.getDispatchRequests();
                setPending(requests.filter(r => r.dispatched === DispatchStatus.Pending));
                setPacked(requests.filter(r => r.dispatched === DispatchStatus.Packed));
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            <DashTray>
                {
                    pending.length > 0 ? pending.map((p) => <ListItem key={p.dispatchid}
                        rowOneData={{ label: 'Location:', text: p.dlocation }}
                        rowTwoData={{ label: 'Phone:', text: p.phoneno }}
                        rightSideText={p.dispatchdate}
                    />) : <DispText text="No pending dispatch requests found" />
                }
            </DashTray>
            <DashTray>
                {
                    packed.length > 0 ? packed.map((p) => <ListItem key={p.dispatchid}
                        rowOneData={{ label: 'Location:', text: p.dlocation }}
                        rowTwoData={{ label: 'Phone:', text: p.phoneno }}
                        rightSideText={p.dispatchdate}
                    />) : <DispText text="No pending dispatch requests found" />
                }
            </DashTray>
        </ScrollScreen>
    );
}

