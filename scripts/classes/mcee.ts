import User from "./user";
import link from "../utils/links";

//interfaces
import Lending from "../interfaces/lending";

export default class Mcee extends User{
    constructor(regId:number, token:string, backendUrl:string = link){
        super(regId, token, backendUrl);
    }

    async getAllSoundBookings():Promise<Lending[]>{
        try{
            return await this.apiFetch<Lending[]>(this.endpoints.getServiceById);
        } catch(error){
            console.error("Error getting sound bookings:", error);
            return [];
        }
    }
}