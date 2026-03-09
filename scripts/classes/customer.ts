import User from "./user"; 
import link from "../utils/links";

//interfaces
import Feedback from "../interfaces/feedback";
import Booking from "../interfaces/booking";
import Lending from "../interfaces/lending";
import Finance from "../interfaces/finance";
import Penalty from "../interfaces/penalty";
import Services from "../interfaces/services";

//utils
import errorLogger from "../utils/errorLogger";
import { PenaltyStatus } from "../enums/penalty";


export default class Customer extends User{
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }

    async bookBand(booking:Booking): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.bookBand, 
                {
                    method: "POST",
                    body:JSON.stringify(booking)
                }
            );
        }catch(error){
            console.error("Error booking band:", error);
        }
    }
    async hireSound(lending:Lending): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.lendEquipment, 
                {
                    method: "POST",
                    body:JSON.stringify(lending)
                }
            );
        }catch(error){
            console.error("Error hiring sound:", error);
        }
    }
    async makePayment(fin:Finance):Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addFinance, 
                {
                    method: "POST",
                    body:JSON.stringify(fin)
                }
            );
        }catch(error){
            console.error("Error making payment:", error);
        }
    }
    async addFeedback(feed:Feedback): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addFeedback, 
                {
                    method: "POST",
                    body:JSON.stringify(feed)
                }
            );
        }catch(error){
            console.error("Error adding feedback:", error);
        }
    }
    async getFeedback(): Promise<Feedback[]>{
        try{
            return await this.apiFetch<Feedback[]>(this.endpoints.getAllFeedback);
        }catch(error){
            console.error("Error getting feedback:", error);
            return [];
        }
    }
    async getBookingHistory(): Promise<Booking[]>{
        try{
            return await this.apiFetch<Booking[]>(this.endpoints.getAllBookings);
        }catch(error){
            console.error("Error getting booking history:", error);
            return [];
        }
    }
    async getHireHistory(): Promise<Lending[]>{
        try{
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
        }catch(error){
            console.error("Error getting hire history:", error);
            return [];
        }
    }
    async getPaymentHistory(): Promise<Finance[]>{
        try{
            return (await this.apiFetch<Finance[]>(this.endpoints.getAllFinance)).filter(f => f.CustomerID === this.getRegID());
        }catch(error){
            console.error("Error getting payment history:", error);
            return [];
        }
    }

    async getPenaltyHistory(): Promise<Penalty[]>{
        try{
            return (await this.apiFetch<Penalty[]>(this.endpoints.getAllPenalties)).filter(p => p.CustomerID === this.getRegID());
        }catch(error){
            console.error("Error getting penalty history:", error);
            return [];
        }
    }

    async getCustomerServices():Promise<Services[]>{
        try {
            return (await this.apiFetch<Services[]>(this.endpoints.getAllServices)).filter(s => s.CustomerID === this.getRegID());
        }catch(err){
            errorLogger(err);
            return [];
        }
    }

    async payPenalty(id:number, amount:number){
        let penalty_status:PenaltyStatus = PenaltyStatus.Processing;
        let penalty_pay:Partial<Penalty> = {
            Penalty:amount,
            PenaltyStatus:penalty_status
        }

        try{
            await this.apiFetch(this.endpoints.updatePenalty(id), 
                {
                    method:"PUT",
                    body:JSON.stringify(penalty_pay)
                }
            );
        } catch(err){
            errorLogger(err);
        }
    }
}