import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemAdv from '../../../components/revisited/cutting edge/ListItemAdv';
import DispText from '../../../components/DispText';
import FancyLoad from '../../../sections/FancyLoad';

//scripts
import Band from '../../../scripts/classes/band';
import Booking from '../../../scripts/interfaces/booking';
import BookingStatus from '../../../scripts/enums/bookStatus';
import { Performed } from '../../../scripts/enums/lendStatus';

//auth
import storage from '../../../scripts/auth/storage';

export default function BookingReports() {
    const [records, setRecords] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true)
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const band = new Band(id, key);
                    const bookings = await band?.getAllBookings();
                    setRecords(bookings.filter(b => b.bookstatus === BookingStatus.Tick && b.performed === Performed.Yes));
                }
            } catch (error) {
                console.log('Error occurred while initializing reports');
                console.log(error);
                setRecords([]);
            } finally {
                setLoading(false);
            }
        }

        initialize();
    }, []);

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />
            {
                records.length > 0 ? records.map((r) => <ListItemAdv key={r.bookingid}
                    rowOneData={{ label: 'Genre', text: r.genre }}
                    rowTwoData={{ label: 'Hours', text: String(r.hours) }}
                    rightSideText={r.performed}
                />) : <DispText text='No booking records found' />
            }
        </ScrollScreen>
    );
} 