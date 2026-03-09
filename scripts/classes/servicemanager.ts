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

export default class ServiceManager extends User{
    constructor(regID: number, token: string, backendUrl: string = link){
        super(regID, token, backendUrl);
    }

    public async getAllServiceRequests():Promise<Services[]>{
        try {
            return await this.apiFetch<Services[]>(this.endpoints.getAllServices);
        } catch(err){
            console.error('Error', err, 'occurred');
            return [];
        }
    }

    async getAllLendingRequests():Promise<Lending[]>{
        try{ 
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
        } catch(err){
            console.error('Error', err, 'occurred')
            return [];
        }
    }

    async getAllBookingRequest():Promise<Booking[]>{
        try{
            return await this.apiFetch<Booking[]>(this.endpoints.getAllBookings)
        } catch(err){
            console.log('Error', err, 'Occurred');
            return [];
        }
    }

    async approveService(id:number):Promise<void>{
        let status:Partial<Services> = {
            ServiceStatus:ServiceStatus.Approved
        }

        try {
            await this.apiFetch(this.endpoints.updateService(id), 
                {
                    method:"POST",
                    body:JSON.stringify(status)
                }
            );

            if(await this.getServiceType(id) === 'Booking'){
                const bookings = await this.getAllBookingRequest();
                const thisBookingId = bookings.find(b => b.ServiceID === id)?.BookingID;
                if(thisBookingId) await this.approveBookingRequest(thisBookingId);
            }

            if(await this.getServiceType(id) === 'Lending'){
                const lendings = await this.getAllLendingRequests();
                const thisLendingId = lendings.find(l => l.ServiceID === id)?.LendID;
                if(thisLendingId) await this.approveLendingRequest(thisLendingId);
            }

        } catch(err){
            console.error('Error', err, 'occurred');
        }
    }

    public async getServiceType(id:number){
        const services = await this.getAllServiceRequests();
        const thisService = services.find(s => s.ServiceID === id);
        if(thisService?.ServiceType === ServiceType.Booking) return 'Booking';
        if(thisService?.ServiceType === ServiceType.Lending) return 'Lending';
    }

    public async approveLendingRequest(id:number):Promise<void>{
        let status:Partial<Lending> = {
            LendingStatus:LendingStatus.Done
        }

        try {
            await this.apiFetch(this.endpoints.updateLending(id), 
                {
                    method:"POST",
                    body:JSON.stringify(status)
                }
            );
        } catch(err){
            console.log('Error', err, 'occurred')
        }
    }

    public async approveBookingRequest(id:number):Promise<void>{
        let status:Partial<Booking> = {
            BookStatus:BookingStatus.Tick
        }

        try {
            await this.apiFetch(this.endpoints.updateBooking(id), 
                {
                    method:"POST",
                    body:JSON.stringify(status)
                }
            );
        } catch(err){
            console.log(`Error ${err} occurred`);
        }
    }
}