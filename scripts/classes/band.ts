import User from "./user";
import link from "../utils/links";

//interfaces
import Booking from "../interfaces/booking";
import Services from "../interfaces/services";

//enums
import { Performed } from "../enums/lendStatus";

//utils
import errorLogger from "../utils/errorLogger";

export default class Band extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    async getAllBookings(): Promise<Booking[]> {
        try {
            this.toaster('Bookings fetched successfully', 'info');
            return await this.apiFetch<Booking[]>(this.endpoints.getAllBookings)
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getAllServices(): Promise<Services[]> {
        try {
            this.toaster('Services fetched successfully', 'info');
            return await this.apiFetch<Services[]>(this.endpoints.getAllServices);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async markAsPerformed(book_id: number) {
        let status: Partial<Booking> = { performed: Performed.Yes }
        try {
            await this.apiFetch(this.endpoints.updateBooking(book_id),
                {
                    method: "POST",
                    body: JSON.stringify(status)
                }
            );
            this.toaster('Performance updated successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }
}