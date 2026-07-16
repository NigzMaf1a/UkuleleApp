import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import SoundSystemDashboard from "../../../sections/SoundSystemDashboard";

//interfaces
import Lending from "../../../scripts/interfaces/lending";

//scripts
import Mcee from "../../../scripts/classes/mcee";

export default function MceeDashboard() {
    let [views, setViews] = useState<number>(1);
    const [lendings, setLendings] = useState<Lending[]>([]);

    function reset() {
        setViews(1);
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const mcee = new Mcee(id, key);
                const lend = await mcee.getAllSoundBookings();

                setLendings(lend);
                console.log(lend);

            }
        })();
    }, []);

    return (
        <SoundSystemDashboard lendings={lendings} />
    );
}

