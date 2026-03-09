import React, {useState, useEffect} from "react";

import storage from "../../../scripts/auth/storage";

//components
import ScrollScreen from "../../../components/ScrollScreen";
import DashTray from "../../../sections/DashTray";
import ListItem from "../../../sections/ListItem";
import ListItemWithButton from "../../../sections/ListItemwithButton";
import DispText from "../../../components/DispText";

//interfaces
import Services from "../../../scripts/interfaces/services";
import Booking from "../../../scripts/interfaces/booking";

//enums
import { Status } from "../../../scripts/interfaces/finance";
import BookingStatus from "../../../scripts/enums/bookStatus";

//scripts
import Band from "../../../scripts/classes/band";

export default function BandDashboard(){
    let [views, setViews] = useState<number>(1);
    const [services, setServices] = useState<Services[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);

    function reset(){
        setViews(1);
    }

    
    useEffect(() =>{
        ( async ()=> {
                const id = await storage.get.profile().then(prof => prof?.regID);
                const key = await storage.get.key().then(key => key);
                if(typeof id === 'number' && typeof key === 'string' ){
                    const band = new Band(id, key);
                    const served = await band.getAllServices();
                    const bookings = await band.getAllBookings();

                    setServices(served.filter(s => s.PaymentStatus !== Status.Approved && s.ServiceType === 'Booking'));
                    setBookings(bookings.filter(b => b.BookStatus !== BookingStatus.Tick))
                }        
        })();
    }, []);

    useEffect(()=>{
        // toggleViews();
    }, []);

    return (
        <ScrollScreen>
            <DashTray>
                {
                    services.length > 0 ? services.map((s) => <ListItem key={s.ServiceID}
                                                                        rowOneData={{label:'Genre', text:s.Genre}}
                                                                        rowTwoData={{label:'Hours', text:String(s.Hours)}}
                                                                        rightSideText={String(s.Cost)}
                    />) : <DispText text="No approved services found"/>
                }
            </DashTray>
            <DashTray>
                {
                    bookings.length > 0 ? bookings.map((b) => <ListItem key={b.BookingID}
                                                                        rowOneData={{label:'Booking ID', text:String(b.BookingID)}}
                                                                        rowTwoData={{label:'Date', text:String(b.BookingDate)}}
                                                                        rightSideText={b.Genre}
                    />) : <DispText text="No unperformed bookings found"/>
                }
            </DashTray>                    
        </ScrollScreen>
    );
}

