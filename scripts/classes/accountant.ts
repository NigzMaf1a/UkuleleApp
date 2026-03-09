import User from "./user";
import link from "../utils/links";

//interfaces
import Finance from "../interfaces/finance";
import Services from "../interfaces/services";
import { Status } from "../interfaces/finance";

//enums
import { PaymentStatus } from "../enums/services";

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