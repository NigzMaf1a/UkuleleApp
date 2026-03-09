import User from './user';
import link from '../utils/links';

//interfaces
import Supply from '../interfaces/supply';
import Order from '../interfaces/orders';
import { OrderStatus } from '../enums/order';

//utils
import errorLogger from '../utils/errorLogger';

export default class Supplier extends User{
    constructor(regId:number, token:string, backendUrl:string = link){
        super(regId, token, backendUrl);
    }

    async addSupply(supply: Supply):Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addSupply,  {method: 'POST', body: JSON.stringify(supply), headers: {'Content-Type': 'application/json'}});
        } catch(error){
            throw error;
        }
    }

    async getSupplies():Promise<Supply[]>{
        try{
            return await this.apiFetch<Supply[]>(this.endpoints.getAllSupplies);
        } catch(error){
            console.error("Error getting supplies:", error);
            return [];
        }
    }       

    async updateSupply(supplyId:number, supply: Supply):Promise<void>{
        try{
            await this.apiFetch(`${this.endpoints.updateSupply}/${supplyId}`,  {method: 'PUT', body: JSON.stringify(supply), headers: {'Content-Type': 'application/json'}});
        } catch(error){
            throw error;
        }
    }

    async deleteSupply(supplyId:number):Promise<void>{
        try{
            await this.apiFetch(`${this.endpoints.deleteSupply}/${supplyId}`,  {method: 'DELETE'});
        } catch(error){
            throw error;
        }
    }

    async getOrders():Promise<Order[]>{
        try {
            return await this.apiFetch<Order[]>(this.endpoints.getAllOrders);
        } catch(err) {
            errorLogger(err);
            return [];
        }
    }
    async updateOrder(id:number){
        let order_status:Partial<Order> = {
            OrderStatus:OrderStatus.Hauled
        }
        try{
            await this.apiFetch(this.endpoints.updateOrder(id), 
                {
                    method:"PUT",
                    body:JSON.stringify(order_status)
                }
            );
        } catch(err){
            errorLogger(err);
        }
    }
}