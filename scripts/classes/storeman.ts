import User from "./user";
import link from "../utils/links";

//interfaces
import Inventory from "../interfaces/inventory";
import Supply from "../interfaces/supply";
import Order from "../interfaces/orders";
import SupplyOrder from "../interfaces/supplyOrder";

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
            this.toaster('Equipment added successfully','success');
            await this.apiFetch(this.endpoints.addEquipment, {body: JSON.stringify(equip), method: 'POST'});
        }catch(error){
            throw error;
        }
    }
    async getEquipment():Promise<Inventory[]>{
        try{
            this.toaster('Equipment fetched successfully','info');
            return await this.apiFetch<Inventory[]>(this.endpoints.getAllEquipment);
        } catch(error){
            console.error("Error getting equipment:", error);
            return [];
        }
    }
    async updateEquipment(id:number, equip:Inventory):Promise<void>{
        try{
            this.toaster('Equipment updated successfully','success');
            await this.apiFetch(`${this.endpoints.updateEquipment}/${id}`, {body: JSON.stringify(equip), method: 'PUT'});
        }catch(error){
            throw error;
        }
    }

    async deleteEquipment(id:number):Promise<void>{
        try{
            this.toaster('Equipment deleted successfully','success');
            await this.apiFetch(`${this.endpoints.deleteEquipment}/${id}`, {method: 'DELETE'});
        }catch(error){
            throw error;
        }
    }

    async getSupplies():Promise<Supply[]>{
        try{
            this.toaster('Supplies fetched successfully','info');
            return await this.apiFetch<Supply[]>(this.endpoints.getAllSupplies);
        } catch(error){
            console.error("Error getting supplies:", error);
            return [];
        }
    }
    async orderSupplies(order:SupplyOrder):Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addOrder, 
                {
                    method: 'POST',
                    body:JSON.stringify(order)
                }
            );
        }catch(error){
            throw error;
        }
    }

    async getOrders():Promise<Order[]>{
        try {
            this.toaster('Equipment updated successfully','info');
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
            this.toaster('Order updated successfully','success');
        } catch(err){
            errorLogger(err);
        }
    }
}