import React, { useState, useEffect } from "react";

import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItemAdv from "../../../components/revisited/cutting edge/ListItemAdv";
import DispText from "../../../components/DispText";
import FancyLoad from "../../../sections/FancyLoad";
import DashLabel from "../../../components/revisited/cutting edge/DashLabel";

//interfaces
import Services from "../../../scripts/interfaces/services";
import Booking from "../../../scripts/interfaces/booking";

//enums
import { Status } from "../../../scripts/interfaces/finance";
import BookingStatus from "../../../scripts/enums/bookStatus";
import { PaymentStatus } from "../../../scripts/enums/services";

//scripts
import Band from "../../../scripts/classes/band";

export default function BandDashboard() {
    const [services, setServices] = useState<Services[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showLabelOne, setShowLabelOne] = useState<boolean>(false);
    const [showLabelTwo, setShowLabelTwo] = useState<boolean>(false);

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const band = new Band(id, key);
                    const served = await band.getAllServices();
                    const bookings = await band.getAllBookings();

                    setServices(served.filter(s => s.paymentstatus !== PaymentStatus.Paid && s.servicetype === 'Booking'));
                    setBookings(bookings.filter(b => b.bookstatus !== BookingStatus.Tick))
                } else {
                    setServices([]);
                    setBookings([]);
                }
            } catch (error) {
                console.log('Error occurred while initializing the dashboard');
                console.log(error);
                setServices([]);
                setBookings([]);
            } finally {
                setLoading(false);
                services.length > 0 && setShowLabelOne(true);
                bookings.length > 0 && setShowLabelTwo(true);

                setTimeout(() => {
                    showLabelOne === true && setShowLabelOne(false);
                    showLabelTwo === true && setShowLabelTwo(false);
                }, 5000);
            }
        }

        initialize();
    }, []);


    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />
            <DashTray>
                {
                    showLabelOne && <DashLabel
                        text="Approved services"
                        text_color="success"
                    />
                }
                {
                    services.length > 0 ? services.map((s) => <ListItemAdv key={s.serviceid}
                        rowOneData={{ label: 'Genre', text: s.genre }}
                        rowTwoData={{ label: 'Hours', text: String(s.hours) }}
                        rightSideText={String(s.cost)}
                    />) : <DispText text="No approved services found" />
                }
            </DashTray>
            <DashTray>
                {
                    showLabelTwo && <DashLabel
                        text="Pending Performances"
                        text_color="success"
                    />
                }
                {
                    bookings.length > 0 ? bookings.map((b) => <ListItemAdv key={b.bookingid}
                        rowOneData={{ label: 'Booking ID', text: String(b.bookingid) }}
                        rowTwoData={{ label: 'Date', text: String(b.bookingdate) }}
                        rightSideText={b.genre}
                    />) : <DispText text="No unperformed bookings found" />
                }
            </DashTray>
        </ScrollScreen>
    );
}

