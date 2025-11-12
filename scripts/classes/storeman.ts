import User from "./user";

//interfaces
import Inventory from "../interfaces/inventory";
import Supply from "../interfaces/supply";


export default class Storeman extends User{
    constructor(regID: number, token: string, backendUrl: string){
        super(regID, token, backendUrl);
    }
    
    async addEquipment(equip: Inventory):Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addEquipment, {body: JSON.stringify(equip), method: 'POST'});
        }catch(error){
            throw error;
        }
    }
    async getEquipment(){}
    async updateEquipment(){}
    async deleteEquipment(){}
    async orderSupplies(){}
    async getSupplies(){}
}