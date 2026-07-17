import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import SoundSystemDashboard from "../../../sections/SoundSystemDashboard";

//interfaces
import Lending from "../../../scripts/interfaces/lending";

//scripts
import DJ from "../../../scripts/classes/dj";

export default function DeejayDashboard() {
    let [views, setViews] = useState<number>(1);
    const [lendings, setLendings] = useState<Lending[]>([]);

    function reset() {
        setViews(1);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.regid);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const dj = new DJ(id, key);
                const lend = await dj.previewSoundHire();

                setLendings(lend);
            }
        })();
    }, []);

    return (
        <SoundSystemDashboard lendings={lendings} />
    );
}

