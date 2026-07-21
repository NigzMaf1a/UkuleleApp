import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemWithButtonAdv from '../../../components/revisited/cutting edge/ListItemWithButtonAdv';
import DispText from '../../../components/DispText';
import FancyLoad from '../../../sections/FancyLoad';

//scripts
import Band from '../../../scripts/classes/band';
import Booking from '../../../scripts/interfaces/booking';
import BookingStatus from '../../../scripts/enums/bookStatus';
import { Performed } from '../../../scripts/enums/lendStatus';

//auth
import storage from '../../../scripts/auth/storage';

export default function ApproveBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [band, setBand] = useState<Band>();
    const [loading, setLoading] = useState<boolean>(false);
    const [btnClicked, setBtnClicked] = useState<boolean>(false);

    async function approve(id: number) {
        await band?.markAsPerformed(id);

        setTimeout(() => {
            setBookings(bookings.filter(b => b.bookstatus === BookingStatus.Tick && b.performed === Performed.No));
            setBtnClicked(false);
        }, 3000);
    }

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const b = new Band(id, key);
                    setBand(b);
                    const booked = await b?.getAllBookings();
                    setBookings(booked.filter(b => b.bookstatus === BookingStatus.Tick && b.performed === Performed.No));
                } else setBookings([]);
            } catch (error) {
                console.log('Error occurred while fetching bookings');
                console.log(error);
                setBookings([]);
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
                bookings.length > 0 ? bookings.map((booking) => <ListItemWithButtonAdv key={booking.bookingid}
                    buttonLabel={'Approve'}
                    rowOneData={{ label: 'Genre', text: booking.genre }}
                    rowTwoData={{ label: 'Hours', text: String(booking.bookingdate) }}
                    fun={() => approve(booking.bookingid)}
                    isClicked={btnClicked}
                    setIsClicked={() => setBtnClicked(true)}
                />) : <DispText text={'No unperformed bookings found'} />
            }
        </ScrollScreen>
    );
} 