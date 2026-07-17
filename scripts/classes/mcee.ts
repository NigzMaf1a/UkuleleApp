import User from "./user";
import link from "../utils/links";

//interfaces
import Lending from "../interfaces/lending";

//scripts
import errorLogger from "../utils/errorLogger";
import { Performed } from "../enums/lendStatus";

export default class Mcee extends User {
    constructor(regId: number, token: string, backendUrl: string = link) {
        super(regId, token, backendUrl);
    }

    async getAllSoundBookings(): Promise<Lending[]> {
        try {
            this.toaster('Requests fetched successfully', 'info');
            return await this.apiFetch<Lending[]>(this.endpoints.getAllBookings);
        } catch (error) {
            console.error("Error getting sound bookings:", error);
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
            this.toaster('Service updated successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }
}