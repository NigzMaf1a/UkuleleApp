import User from "./user";
import link from "../utils/links";

//interfaces
import Inventory from "../interfaces/inventory";
import Supply from "../interfaces/supply";
import Order from "../interfaces/orders";

//utils
import errorLogger from "../utils/errorLogger";

//enums
import { OrderStatus } from "../enums/order";


export default class Storeman extends User{
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }
    
    async addEquipment(equip: Inventory):Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addEquipment, {body: JSON.stringify(equip), method: 'POST'});
        }catch(error){
            throw error;
        }
    }
    async getEquipment():Promise<Inventory[]>{
        try{
            return await this.apiFetch<Inventory[]>(this.endpoints.getAllEquipment);
        } catch(error){
            console.error("Error getting equipment:", error);
            return [];
        }
    }
    async updateEquipment(id:number, equip:Inventory):Promise<void>{
        try{
            await this.apiFetch(`${this.endpoints.updateEquipment}/${id}`, {body: JSON.stringify(equip), method: 'PUT'});
        }catch(error){
            throw error;
        }
    }

    async deleteEquipment(id:number):Promise<void>{
        try{
            await this.apiFetch(`${this.endpoints.deleteEquipment}/${id}`, {method: 'DELETE'});
        }catch(error){
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
    async orderSupplies():Promise<void>{
        //revisit this
        try{
            await this.apiFetch(this.endpoints.addOrder, {method: 'POST'});
        }catch(error){
            throw error;
        }
    }

    async getOrders():Promise<Order[]>{
        try {
            return await this.apiFetch(this.endpoints.getAllOrders)
        }catch(err){
            errorLogger(err);
            return [];
        }
    }

    async updateOrder(id:number){
        let order_status:Partial<Order> = {
            OrderStatus:OrderStatus.Delivered
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