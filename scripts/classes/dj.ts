import User from "./user";
import link from "../utils/links";

//interfaces
import Lending from "../interfaces/lending";

export default class DJ extends User {
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }

    async previewSoundHire(): Promise<Lending[]>{
        try{
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLentEquipment);
        } catch(err){
            console.error("Error previewing sound hire:", err);
            return [];
        }
    }
}