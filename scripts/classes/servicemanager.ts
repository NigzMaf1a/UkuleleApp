import User from "./user";
import link from "../utils/links";

//interfaces
import Lending from "../interfaces/lending";
import Booking from "../interfaces/booking";
import Services from "../interfaces/services";

//enums
import { LendingStatus, Performed } from "../enums/lendStatus";
import BookingStatus from "../enums/bookStatus";
import { ServiceStatus, ServiceType } from "../enums/services";

export default class ServiceManager extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    public async getAllServiceRequests(): Promise<Services[]> {
        try {
            this.toaster('Requests fetched successfully', 'info');
            return await this.apiFetch<Services[]>(this.endpoints.getAllServices);
        } catch (err) {
            console.error('Error', err, 'occurred');
            return [];
        }
    }

    async getAllLendingRequests(): Promise<Lending[]> {
        try {
            this.toaster('Requests fetched successfully', 'info');
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
        } catch (err) {
            console.error('Error', err, 'occurred')
            return [];
        }
    }

    async getAllBookingRequest(): Promise<Booking[]> {
        try {
            this.toaster('Requests fetched successfully', 'info');
            return await this.apiFetch<Booking[]>(this.endpoints.getAllBookings)
        } catch (err) {
            console.log('Error', err, 'Occurred');
            return [];
        }
    }

    async approveService(id: number): Promise<void> {
        let status: Partial<Services> = {
            servicestatus: ServiceStatus.Approved
        }

        try {
            await this.apiFetch(this.endpoints.updateService(id),
                {
                    method: "POST",
                    body: JSON.stringify(status)
                }
            );

            if (await this.getServiceType(id) === 'Booking') {
                const bookings = await this.getAllBookingRequest();
                const thisBookingId = bookings.find(b => b.serviceid === id)?.bookingid;
                if (thisBookingId) await this.approveBookingRequest(thisBookingId);
            }

            if (await this.getServiceType(id) === 'Lending') {
                const lendings = await this.getAllLendingRequests();
                const thisLendingId = lendings.find(l => l.serviceid === id)?.lendid;
                if (thisLendingId) await this.approveLendingRequest(thisLendingId);
            }
            this.toaster('Service updated successfully', 'success');

        } catch (err) {
            console.error('Error', err, 'occurred');
        }
    }

    public async getServiceType(id: number) {
        const services = await this.getAllServiceRequests();
        const thisService = services.find(s => s.serviceid === id);
        if (thisService?.servicetype === ServiceType.Booking) return 'Booking';
        if (thisService?.servicetype === ServiceType.Lending) return 'Lending';
    }

    public async approveLendingRequest(id: number): Promise<void> {
        let status: Partial<Lending> = {
            lendingstatus: LendingStatus.Done
        }

        try {
            await this.apiFetch(this.endpoints.updateLending(id),
                {
                    method: "POST",
                    body: JSON.stringify(status)
                }
            );
        } catch (err) {
            console.log('Error', err, 'occurred')
        }
    }

    public async approveBookingRequest(id: number): Promise<void> {
        let status: Partial<Booking> = {
            bookstatus: BookingStatus.Tick
        }

        try {
            await this.apiFetch(this.endpoints.updateBooking(id),
                {
                    method: "POST",
                    body: JSON.stringify(status)
                }
            );
        } catch (err) {
            console.log(`Error ${err} occurred`);
        }
    }
}