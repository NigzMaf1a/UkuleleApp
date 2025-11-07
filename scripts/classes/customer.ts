import User from "./user"; //importing User class
import link from "../utils/links"; //backend link

//interfaces
import Feedback from "../interfaces/feedback";
import Booking from "../interfaces/booking";
import Lending from "../interfaces/lending";
import Finance from "../interfaces/finance";
import Penalty from "../interfaces/penalty";


export default class Customer extends User{
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }

    async bookBand(): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.bookBand, {method: "POST"});
        }catch(error){
            console.error("Error booking band:", error);
        }
    }
    async hireSound(): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.hireSound, {method: "POST"});
        }catch(error){
            console.error("Error hiring sound:", error);
        }
    }
    async makePayment():Promise<void>{
        try{
            await this.apiFetch(this.endpoints.makePayment, {method: "POST"});
        }catch(error){
            console.error("Error making payment:", error);
        }
    }
    async addFeedback(): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addFeedback, {method: "POST"});
        }catch(error){
            console.error("Error adding feedback:", error);
        }
    }
    async getFeedback(): Promise<Feedback[]>{
        try{
            return await this.apiFetch<Feedback[]>(this.endpoints.getFeedback);
        }catch(error){
            console.error("Error getting feedback:", error);
            return [];
        }
    }
    async getBookingHistory(): Promise<Booking[]>{
        try{
            return await this.apiFetch<Booking[]>(this.endpoints.getBookingHistory);
        }catch(error){
            console.error("Error getting booking history:", error);
            return [];
        }
    }
    async getHireHistory(): Promise<Lending[]>{
        try{
            return await this.apiFetch<Lending[]>(this.endpoints.getHireHistory);
        }catch(error){
            console.error("Error getting hire history:", error);
            return [];
        }
    }
    async getPaymentHistory(): Promise<Finance[]>{
        try{
            return await this.apiFetch<Finance[]>(this.endpoints.getPaymentHistory);
        }catch(error){
            console.error("Error getting payment history:", error);
            return [];
        }
    }
    async getPenaltyHistory(): Promise<Penalty[]>{
        try{
            return await this.apiFetch<Penalty[]>(this.endpoints.penaltyHistory);
        }catch(error){
            console.error("Error getting penalty history:", error);
            return [];
        }
    }
}