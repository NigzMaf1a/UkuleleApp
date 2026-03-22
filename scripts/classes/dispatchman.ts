import User from "./user";
import link from "../utils/links";

//interfaces
import Dispatch from "../interfaces/dispatch";

//enums
import DispatchStatus from "../enums/dispatch";

//utils
import errorLogger from "../utils/errorLogger";

export default class DispatchMan extends User{
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }

    async getDispatchRequests():Promise<Dispatch[]>{
        try {
            this.toaster('Dispatch requests fetch successful','info');
            return await this.apiFetch<Dispatch[]>(this.endpoints.getAllDispatches);
        }catch(err){
            errorLogger(err);
            return [];
        }
    }

    async markDispatchRequestAsDispatched(id:number){
        let dispatched:Partial<Dispatch> = { Dispatched:DispatchStatus.Dispatched }

        try {
            await this.apiFetch(this.endpoints.updateDispatch(id), 
                {
                    method:"PUT",
                    body:JSON.stringify(dispatched)
                }
            );
            this.toaster('Dispatch update successful','success');
        } catch(err){
            errorLogger(err);
        }
    }

    async markDispatchRequestAsReturned(id:number){
        let returned:Partial<Dispatch> = { Dispatched:DispatchStatus.Returned }

        try {
            await this.apiFetch(this.endpoints.updateDispatch(id), 
                {
                    method:"PUT",
                    body:JSON.stringify(returned)
                }
            );
            this.toaster('Dispatch update successful','success');
        } catch(err){
            errorLogger(err);
        }
    }
}