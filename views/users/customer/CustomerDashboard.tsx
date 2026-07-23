import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

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

//styles
import { colors } from "../../../styles/colors";

export default function CustomerDashboard() {
    const [services, setServices] = useState<Services[]>([]);
    const [payments, setPayments] = useState<Finance[]>([]);
    const [penalties, setPenalties] = useState<Penalty[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showLabelOne, setShowLabelOne] = useState<boolean>(false);
    const [showLabelTwo, setShowLabelTwo] = useState<boolean>(false);
    const [showLabelThree, setShowLabelThree] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            let timeout: ReturnType<typeof setTimeout>;

            async function initialize() {
                try {
                    setLoading(true);

                    const profile = await storage.get.profile();
                    const key = await storage.get.key();

                    const id = profile?.RegID;

                    if (typeof id === "number" && typeof key === "string") {
                        const customer = new Customer(id, key);

                        const served = await customer.getCustomerServices();
                        const finances = await customer.getPaymentHistory();
                        const penalized = await customer.getPenaltyHistory();

                        setServices(served);
                        setPayments(finances);
                        setPenalties(penalized);

                        setShowLabelOne(served.length > 0);
                        setShowLabelTwo(finances.length > 0);
                        setShowLabelThree(penalized.length > 0);

                        timeout = setTimeout(() => {
                            setShowLabelOne(false);
                            setShowLabelTwo(false);
                            setShowLabelThree(false);
                        }, 3000);
                    } else {
                        setServices([]);
                        setPayments([]);
                        setPenalties([]);

                        setShowLabelOne(false);
                        setShowLabelTwo(false);
                        setShowLabelThree(false);
                    }
                } catch (error) {
                    console.log("An error occurred while initializing the dashboard", error);

                    setServices([]);
                    setPayments([]);
                    setPenalties([]);

                    setShowLabelOne(false);
                    setShowLabelTwo(false);
                    setShowLabelThree(false);
                } finally {
                    setLoading(false);
                }
            }

            initialize();

            return () => {
                if (timeout) {
                    clearTimeout(timeout);
                }
            };
        }, [])
    );

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />

            <DashTray>
                {showLabelOne && (
                    <DashLabel
                        text="Booked Services"
                        text_color="info"
                    />
                )}

                {services.length > 0 ? (
                    services.map((s) => (
                        <ListItemAdv
                            key={s.serviceid}
                            rowOneData={{
                                label: "Service Id",
                                text: String(s.serviceid),
                            }}
                            rowTwoData={{
                                label: "Genre",
                                text: s.genre,
                            }}
                            rightSideText={s.servicetype}
                            label_one_variant="info"
                            label_two_variant="info"
                            text_three_variant='warning'
                        />
                    ))
                ) : (
                    <DispText text="No services booked yet" textColor={colors.theme} textAlign="center" />
                )}
            </DashTray>

            <DashTray>
                {showLabelTwo && (
                    <DashLabel
                        text="Current Payments"
                        text_color="success"
                    />
                )}

                {payments.length > 0 ? (
                    payments.map((p) => (
                        <ListItemAdv
                            key={p.transactionid}
                            rowOneData={{
                                label: "Code",
                                text: p.transactionname,
                            }}
                            rowTwoData={{
                                label: "Date",
                                text: String(p.transactiondate),
                            }}
                            rightSideText={String(p.amount)}
                            label_one_variant="info"
                            label_two_variant="info"
                            text_three_variant="success"
                        />
                    ))
                ) : (
                    <DispText text="No payments made yet" textColor={colors.theme} textAlign="center" />
                )}
            </DashTray>

            <DashTray>
                {showLabelThree && (
                    <DashLabel
                        text="Penalty History"
                        text_color="info"
                    />
                )}

                {penalties.length > 0 ? (
                    penalties.map((p) => (
                        <ListItemAdv
                            key={p.penaltyid}
                            rowOneData={{
                                label: "Penalty Id",
                                text: String(p.penaltyid),
                            }}
                            rowTwoData={{
                                label: "Equip Type",
                                text: p.description,
                            }}
                            rightSideText={String(p.penalty)}
                            label_one_variant="info"
                            label_two_variant="info"
                        />
                    ))
                ) : (
                    <DispText text="No penalties found" textColor={colors.theme} textAlign="center" />
                )}
            </DashTray>
        </ScrollScreen>
    );
}