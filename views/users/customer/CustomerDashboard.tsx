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
import Finance from "../../../scripts/interfaces/finance";
import Penalty from "../../../scripts/interfaces/penalty";

//scripts
import Customer from "../../../scripts/classes/customer";

export default function CustomerDashboard() {
    const [services, setServices] = useState<Services[]>([]);
    const [payments, setPayments] = useState<Finance[]>([]);
    const [penalties, setPenalties] = useState<Penalty[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showLabelOne, setShowLabelOne] = useState<boolean>(false);
    const [showLabelTwo, setShowLabelTwo] = useState<boolean>(false);
    const [showLabelThree, setShowLabelThree] = useState<boolean>(false);

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const customer = new Customer(id, key);
                    const served = await customer.getCustomerServices();
                    const finances = await customer.getPaymentHistory();
                    const penalized = await customer.getPenaltyHistory();

                    setServices(served);
                    setPayments(finances);
                    setPenalties(penalized);
                } else {
                    setServices([]);
                    setPayments([]);
                    setPenalties([]);
                }
            } catch (error) {
                console.log('An error occurred while initializing the dashboard');
                setServices([]);
                setPayments([]);
                setPenalties([]);
            } finally {
                setLoading(false);
                services.length > 0 && setShowLabelOne(true);
                payments.length > 0 && setShowLabelTwo(true);
                penalties.length > 0 && setShowLabelThree(true);

                setTimeout(() => {
                    showLabelOne && setShowLabelOne(false);
                    showLabelTwo && setShowLabelTwo(false);
                    showLabelThree && setShowLabelTwo(false);
                }, 5000);
            }
        }

        initialize();
    }, []);

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />
            {
                <DashTray>
                    {
                        showLabelOne && <DashLabel
                            text="Booked Services"
                            text_color="info"
                        />
                    }
                    {
                        services.length > 0 ? services.map((s) => <ListItemAdv key={s.serviceid}
                            rowOneData={{ label: 'Service Id', text: String(s.serviceid) }}
                            rowTwoData={{ label: 'Genre', text: s.genre }}
                            rightSideText={s.servicetype}
                        />) : <DispText text="No services booked yet" />
                    }
                </DashTray>
            }
            {
                <DashTray>
                    {
                        showLabelTwo && <DashLabel
                            text="Current Payments"
                            text_color="success"
                        />
                    }
                    {
                        payments.length > 0 ? payments.map((p) => <ListItemAdv key={p.transactionid}
                            rowOneData={{ label: 'Code', text: p.transactionname }}
                            rowTwoData={{ label: 'Date', text: String(p.transactiondate) }}
                            rightSideText={String(p.amount)}
                        />) : <DispText text="No payments made yet" />
                    }
                </DashTray>

            }
            {
                <DashTray>
                    {
                        showLabelThree && <DashLabel
                            text="Booked Services"
                            text_color="info"
                        />
                    }
                    {
                        penalties.length > 0 ? penalties.map((p) => <ListItemAdv key={p.penaltyid}
                            rowOneData={{ label: 'Penalty Id', text: String(p.penaltyid) }}
                            rowTwoData={{ label: 'Equip Type', text: p.description }}
                            rightSideText={String(p.penalty)}
                        />) : <DispText text="No penalties found" />
                    }
                </DashTray>
            }
        </ScrollScreen>
    );
}

