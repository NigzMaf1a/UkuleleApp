import User from "./user";
import link from "../utils/links";

//interfaces
import Inspection from "../interfaces/inspection";
import Inventory from "../interfaces/inventory";
import AllocatedEquipment from "../interfaces/allocatedEquipment";

//utils
import errorLogger from "../utils/errorLogger";

//enums
import EquipStatus from "../enums/allocatedEquipment";

export default class Inspector extends User {
    constructor(regID:number, token:string, backendUrl:string = link){
        super(regID, token, backendUrl);
    }

    async addInspection(insp:Inspection){
        try {
            await this.apiFetch(this.endpoints.addInspection, 
                {
                    method:"POST",
                    body:JSON.stringify(insp)
                }
            );
        } catch(err){
            errorLogger(err);
        }
    }

    async getAllInspections():Promise<Inspection[]>{
        try {
            return await this.apiFetch<Inspection[]>(this.endpoints.getInspections);
        } catch(err){
            errorLogger(err);
            return [];
        }
    }

    async getAllAllocatedEquipment():Promise<AllocatedEquipment[]>{
        try {
            return await this.apiFetch<AllocatedEquipment[]>(this.endpoints.getAllAllocatedEquipment);
        } catch(err){
            errorLogger(err);
            return [];
        }
    }

    async markAllocatedEquipmentInspected(id:number){
        let inspected:Partial<AllocatedEquipment> = {
            EquipStatus:EquipStatus.Inspected
        }
        try{
            await this.apiFetch(this.endpoints.updateAllocatedEquipment(id), 
                {
                    method:"PUT",
                    body:JSON.stringify(inspected)
                }
            );
        } catch(err){
            errorLogger(err);
        }
    }
}