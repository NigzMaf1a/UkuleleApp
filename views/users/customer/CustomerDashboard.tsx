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
import Finance from "../../../scripts/interfaces/finance";
import Penalty from "../../../scripts/interfaces/penalty";

//scripts
import Customer from "../../../scripts/classes/customer";

export default function CustomerDashboard(){
    let [views, setViews] = useState<number>(1);
    const [services, setServices] = useState<Services[]>([]);
    const [payments, setPayments] = useState<Finance[]>([]);
    const [penalties, setPenalties] = useState<Penalty[]>([]);

    function reset(){
        setViews(1);
    }
    
    useEffect(() =>{
        ( async ()=> {
                const id = await storage.get.profile().then(prof => prof?.regID);
                const key = await storage.get.key().then(key => key);
                if(typeof id === 'number' && typeof key === 'string' ){
                    const customer = new Customer(id, key);
                    const served = await customer.getCustomerServices();
                    const finances = await customer.getPaymentHistory();
                    const penalized = await customer.getPenaltyHistory();

                    setServices(served);
                    setPayments(finances);
                    setPenalties(penalized);
                }        
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                <DashTray>
                    {
                        services.length > 0 ? services.map((s) => <ListItem key={s.ServiceID}
                                                                            rowOneData={{label:'Service Id', text:String(s.ServiceID)}}
                                                                            rowTwoData={{label:'Genre', text:s.Genre}}
                                                                            rightSideText={s.ServiceType}
                        />) : <DispText text="No services booked yet"/>
                    }
                </DashTray>
            }          
            {
                <DashTray>
                    {
                        payments.length > 0 ? payments.map((p) => <ListItem key={p.TransactionID}
                                                                            rowOneData={{label:'Code', text:p.TransactionName}}
                                                                            rowTwoData={{label:'Date', text:String(p.TransactionDate)}}
                                                                            rightSideText={String(p.Amount)}
                        />) : <DispText text="No payments made yet"/>
                    }
                </DashTray>
            }
            {
                <DashTray>
                    {
                        penalties.length > 0 ? penalties.map((p) => <ListItem key={p.PenaltyID}
                                                                              rowOneData={{label:'Penalty Id', text:String(p.PenaltyID)}}
                                                                              rowTwoData={{label:'Equip Type', text:p.Description}}
                                                                              rightSideText={String(p.Penalty)}
                        />) : <DispText text="No penalties found"/>
                    }
                </DashTray>
            }
        </ScrollScreen>
    );
}

