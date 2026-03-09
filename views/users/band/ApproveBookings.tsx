import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import DispText from '../../../components/DispText';

//scripts
import Band from '../../../scripts/classes/band';
import Booking from '../../../scripts/interfaces/booking';
import BookingStatus from '../../../scripts/enums/bookStatus';
import { Performed } from '../../../scripts/enums/lendStatus';

//auth
import storage from '../../../scripts/auth/storage';

export default function ApproveBookings(){
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [band, setBand] = useState<Band>();

    async function approve(id:number){
        await band?.markAsPerformed(id);
    }
    
    useEffect(()=>{
        ( async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const b = new Band(id, key);
                setBand(b);
                const booked = await b?.getAllBookings();
                setBookings(booked.filter(b => b.BookStatus === BookingStatus.Tick && b.Performed === Performed.No));                
            }
        })();
    }, []);

  return (
    <ScrollScreen>
        {
            bookings.length > 0 ? bookings.map((booking) => <ListItemWithButton key={booking.BookingID}
                                                                                buttonLabel={'Approve'}
                                                                                rowOneData={{label:'Genre', text:booking.Genre}}
                                                                                rowTwoData={{label:'Hours', text:String(booking.BookingDate)}}
                                                                                fun={() => approve(booking.BookingID)}
            />) : <DispText text={'No unperformed bookings found'}/>
        }
    </ScrollScreen>
  );
} 