import User from "./user";
import link from "../utils/links";

//interfaces
import Lending from "../interfaces/lending";

//scripts
import errorLogger from "../utils/errorLogger";
import { Performed } from "../enums/lendStatus";

export default class DJ extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    async previewSoundHire(): Promise<Lending[]> {
        try {
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
        } catch (err) {
            console.error("Error previewing sound hire:", err);
            return [];
        }
    }

    async markAsPerformed(id: number) {
        let performed: Partial<Lending> = { performed: Performed.Yes }

        try {
            await this.apiFetch(this.endpoints.updateLending(id),
                {
                    method: "POST",
                    body: JSON.stringify(performed)
                }
            );
            this.toaster('Performance update successful', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    async markDispatchAsPacked(id: number) {
        console.log('Implement this', id)
    }
}