import User from "./user";
import link from "../utils/links";

//interfaces
import Inventory from "../interfaces/inventory";

export default class Inspector extends User {
    constructor(regID:number, token:string, backendUrl:string = link){
        super(regID, token, backendUrl);
    }

    async getHiredEquipment(): Promise<Inventory[]>{
        try{
            return (await this.apiFetch<Inventory[]>(this.endpoints.getAllLentEquipment))
                    .filter(e => e.Availability === 'Unavailable');
        } catch(error){
            console.error("Error getting hired equipment:", error);
            return [];
        }
    }

    async inspectEquipment(): Promise<void>{
        try{
            await this.apiFetch(this.endpoints.addContact, {method: "POST"});
        }catch(error){
            console.error("Error inspecting equipment:", error);
        }
    }
}