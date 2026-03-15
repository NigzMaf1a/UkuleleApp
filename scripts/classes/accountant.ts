import User from "./user";
import link from "../utils/links";

//interfaces
import Finance from "../interfaces/finance";
import Services from "../interfaces/services";
import { Status } from "../interfaces/finance";
import Penalty from "../interfaces/penalty";
import { PenaltyPayment } from "../interfaces/penaltyPayment";
import Order from "../interfaces/orders";
import OrderPayment from "../interfaces/orderPayment";

//enums
import { PaymentStatus } from "../enums/services";
import { PenaltyStatus } from "../enums/penalty";
import errorLogger from "../utils/errorLogger";
import { OrderStatus } from "../enums/order";

export default class Accountant extends User{
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }

    async approvePayment(id:number): Promise<void>{
        let status:Partial<Finance> = {
            TransactionStatus:Status.Approved
        };

        const service_id = await this.getPaymentServiceID(id);

        try{
            await this.apiFetch(this.endpoints.updateFinance(id), 
                {
                    method: "POST",
                    body:JSON.stringify(status)
                }
            );

            if(typeof service_id === 'number') await this.approveServicePaymentStatus(service_id);

        }catch(error){
            console.error("Error approving payment:", error);
        }
    }

    async approvePenaltyPayment(id:number){
        let status:Partial<Penalty> = {
            PenaltyStatus:PenaltyStatus.Paid
        }
        try{
            await this.apiFetch(this.endpoints.updatePenalty(id),
                {
                    method:"PUT",
                    body:JSON.stringify(status)
                }
            );
        } catch(err){
            errorLogger(err);
        }
    }

    async getPenalties():Promise<Penalty[]>{
        try {
            const penalties:Penalty[] = await this.apiFetch(this.endpoints.getAllPenalties);
            const penaltyPayment:PenaltyPayment[] = await this.apiFetch(this.endpoints.getPenaltyPayment);

            let paidPenalties:Penalty[] = [];
            for(const paid of penaltyPayment){
                for(const penalty of penalties){
                    if(paid.PenaltyID === penalty.PenaltyID){
                        paidPenalties.push(penalty);
                    }
                }
            }
            return paidPenalties;
        } catch(err){
            errorLogger(err);
            return [];
        }
    }

    async getPenaltyPayments():Promise<PenaltyPayment[]>{
        try {
            return await this.apiFetch(this.endpoints.getPenaltyPayment);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getOrders():Promise<Order[]>{
        try {
            return await this.apiFetch<Order[]>(this.endpoints.getAllOrders);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async makeOrderPayment(payment:OrderPayment){
        try {
            await this.apiFetch(this.endpoints.addOrderPayment, 
                {
                    method:"POST",
                    body:JSON.stringify(payment)
                }
            );
        } catch (err) {
            errorLogger(err);
        }
    }

    async changeOrderStatus(id:number){
        let status:Partial<Order> = {
            OrderStatus:OrderStatus.Paid
        }
        try {
            await this.apiFetch(this.endpoints.updateOrder(id), 
                {
                    method:"PUT",
                    body:JSON.stringify(status)
                }
            );
        } catch (err) {
           errorLogger(err); 
        }
    }

    public async getAllFinanceRecords(): Promise<Finance[]>{
        try{
            return await this.apiFetch<Finance[]>(this.endpoints.getAllFinance);
        }catch(error){
            console.error("Error getting finance records:", error);
            return [];
        }
    }

    public async getAllServices():Promise<Services[]>{
        try{
            return await this.apiFetch(this.endpoints.getAllServices);
        } catch(err){
            console.error('Error', err, 'occurred');
            return [];
        }
    }

    public async getPaymentServiceID(pay_id:number){
        const allPayments = await this.getAllFinanceRecords();
        const service_id = allPayments.find(p => p.TransactionID === pay_id)?.ServiceID;
        return service_id;
    }

    public async approveServicePaymentStatus(service_id:number){
        let status:Partial<Services> = {
            PaymentStatus:PaymentStatus.Paid
        }

        try{
            await this.apiFetch(this.endpoints.updateService(service_id), 
                {
                    method:"POST",
                    body:JSON.stringify(status)
                }
        );
        } catch(err){
            console.error('Error', err, 'occurred');
        }
    }
}