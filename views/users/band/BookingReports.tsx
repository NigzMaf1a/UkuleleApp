import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';

//scripts
import Band from '../../../scripts/classes/band';
import Booking from '../../../scripts/interfaces/booking';
import BookingStatus from '../../../scripts/enums/bookStatus';
import { Performed } from '../../../scripts/enums/lendStatus';

//auth
import storage from '../../../scripts/auth/storage';

export default function BookingReports() {
    const [records, setRecords] = useState<Booking[]>([]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const band = new Band(id, key);
                const bookings = await band?.getAllBookings();
                setRecords(bookings.filter(b => b.bookstatus === BookingStatus.Tick && b.performed === Performed.Yes));
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                records.length > 0 ? records.map((r) => <ListItem key={r.bookingid}
                    rowOneData={{ label: 'Genre', text: r.genre }}
                    rowTwoData={{ label: 'Hours', text: String(r.hours) }}
                    rightSideText={r.performed}
                />) : <DispText text='No booking records found' />
            }
        </ScrollScreen>
    );
} 