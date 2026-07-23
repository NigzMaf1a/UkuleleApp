import User from "./user";
import link from "../utils/links";

//interfaces
import Feedback from "../interfaces/feedback";
import Booking from "../interfaces/booking";
import Lending from "../interfaces/lending";
import Finance from "../interfaces/finance";
import Penalty from "../interfaces/penalty";
import Services from "../interfaces/services";
import { PenaltyPayment } from "../interfaces/penaltyPayment";

//utils
import errorLogger from "../utils/errorLogger";
import { PenaltyStatus } from "../enums/penalty";
import date from "../utils/date";


export default class Customer extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    async requestService(service: Services) {
        try {
            await this.apiFetch(this.endpoints.addService,
                {
                    method: "POST",
                    body: JSON.stringify(service)
                }
            );
        } catch (error) {
            errorLogger(error);
        }
    }

    async bookBand(booking: Booking): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.bookBand,
                {
                    method: "POST",
                    body: JSON.stringify(booking)
                }
            );
            this.toaster('Service request successful', 'success');
        } catch (error) {
            console.error("Error booking band:", error);
        }
    }
    async hireSound(lending: Lending): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.lendEquipment,
                {
                    method: "POST",
                    body: JSON.stringify(lending)
                }
            );
            this.toaster('Service request successful', 'success');
        } catch (error) {
            console.error("Error hiring sound:", error);
        }
    }
    async makePayment(fin: Finance): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.addFinance,
                {
                    method: "POST",
                    body: JSON.stringify(fin)
                }
            );
            this.toaster('Payment successful', 'success');
        } catch (error) {
            console.error("Error making payment:", error);
        }
    }
    async addFeedback(feed: Feedback): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.addFeedback,
                {
                    method: "POST",
                    body: JSON.stringify(feed)
                }
            );
            this.toaster('Feedback added successfully', 'success');
        } catch (error) {
            console.error("Error adding feedback:", error);
        }
    }
    async getFeedback(): Promise<Feedback[]> {
        try {
            this.toaster('Feedback fetched successfully', 'info');
            return await this.apiFetch<Feedback[]>(this.endpoints.getAllFeedback);
        } catch (error) {
            console.error("Error getting feedback:", error);
            return [];
        }
    }
    async getBookingHistory(): Promise<Booking[]> {
        try {
            this.toaster('Booking history fetch successful', 'info');
            return await this.apiFetch<Booking[]>(this.endpoints.getAllBookings);
        } catch (error) {
            console.error("Error getting booking history:", error);
            return [];
        }
    }
    async getHireHistory(): Promise<Lending[]> {
        try {
            this.toaster('Lending history fetch successful', 'info');
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
        } catch (error) {
            console.error("Error getting hire history:", error);
            return [];
        }
    }
    async getPaymentHistory(): Promise<Finance[]> {
        try {
            this.toaster('Payment history fetch successful', 'info');
            return (await this.apiFetch<Finance[]>(this.endpoints.getAllFinance)).filter(f => f.customerid === this.getRegID());
        } catch (error) {
            console.error("Error getting payment history:", error);
            return [];
        }
    }

    async getPenaltyHistory(): Promise<Penalty[]> {
        try {
            this.toaster('Penalty history fetch successful', 'info');
            return (await this.apiFetch<Penalty[]>(this.endpoints.getAllPenalties)).filter(p => p.customerid === this.getRegID());
        } catch (error) {
            console.error("Error getting penalty history:", error);
            return [];
        }
    }

    async getCustomerServices(): Promise<Services[]> {
        try {
            this.toaster('Service history fetch successful', 'info');
            return (await this.apiFetch<Services[]>(this.endpoints.getAllServices)).filter(s => s.customerid === this.getRegID());
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async payPenalty(id: number, code: string, amount: number) {
        let penalty_status: PenaltyStatus = PenaltyStatus.Processing;
        let penalty_pay: Partial<Penalty> = {
            penalty: amount,
            penaltystatus: penalty_status
        }

        let penaltyPayment: PenaltyPayment = {
            penaltyid: id,
            paymentcode: code,
            paymentdate: date(),
            amount: amount
        }

        try {
            await this.apiFetch(this.endpoints.updatePenalty(id),
                {
                    method: "PUT",
                    body: JSON.stringify(penalty_pay)
                }
            );

            await this.apiFetch(this.endpoints.addPenaltyPayment, {
                method: "POST",
                body: JSON.stringify(penaltyPayment)
            });

            this.toaster('Penalty payment successful', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }
}