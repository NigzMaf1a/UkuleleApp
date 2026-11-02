
import User from "./user"
import link from "../utils/links"

import Lending from "../interfaces/lending"
import Booking from "../interfaces/booking"
import Services from "../interfaces/services"

import { LendingStatus } from "../enums/lendStatus"
import BookingStatus from "../enums/bookStatus"
import { ServiceStatus, ServiceType } from "../enums/services"

export default class ServiceManager extends User {
    constructor(
        regID: number,
        token: string,
        backendUrl: string = link
    ) {
        super(regID, token, backendUrl)
    }

    public async getAllServiceRequests(): Promise<Services[]> {
        try {
            const requests = await this.apiFetch<Services[]>(
                this.endpoints.getAllServices
            )

            console.log("Requests:", requests)
            console.log("Is array:", Array.isArray(requests))

            this.toaster("Requests fetched successfully", "info")

            return requests
        } catch (err) {
            console.error("Error", err, "occurred")
            return []
        }
    }

    async getAllLendingRequests(): Promise<Lending[]> {
        try {
            this.toaster("Requests fetched successfully", "info")

            return await this.apiFetch<Lending[]>(
                this.endpoints.getAllLendingRequests
            )
        } catch (err) {
            console.error("Error", err, "occurred")
            return []
        }
    }

    async getAllBookingRequest(): Promise<Booking[]> {
        try {
            this.toaster("Requests fetched successfully", "info")

            return await this.apiFetch<Booking[]>(
                this.endpoints.getAllBookings
            )
        } catch (err) {
            console.log("Error", err, "Occurred")
            return []
        }
    }

    async approveService(id: number): Promise<void> {
        try {
            await this.apiFetch(
                this.endpoints.updateServiceStatus(id),
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        status: ServiceStatus.Approved
                    })
                }
            )

            const serviceType = await this.getServiceType(id)

            if (serviceType === ServiceType.Booking) {
                const bookings = await this.getAllBookingRequest()

                const thisBookingId = bookings.find(
                    b => b.serviceid === id
                )?.bookingid

                if (thisBookingId) {
                    await this.approveBookingRequest(thisBookingId)
                }
            } else if (serviceType === ServiceType.Lending) {
                const lendings = await this.getAllLendingRequests()

                const thisLendingId = lendings.find(
                    l => l.serviceid === id
                )?.lendid

                if (thisLendingId) {
                    await this.approveLendingRequest(thisLendingId)
                }
            }

            this.toaster("Service updated successfully", "success")
        } catch (err) {
            console.error("Error approving service:", err)
            throw err
        }
    }

    public async getServiceType(
        id: number
    ): Promise<ServiceType | undefined> {
        const services = await this.getAllServiceRequests()

        const thisService = services.find(
            s => s.serviceid === id
        )

        if (thisService?.servicetype === ServiceType.Booking) {
            return ServiceType.Booking
        }

        if (thisService?.servicetype === ServiceType.Lending) {
            return ServiceType.Lending
        }

        return undefined
    }

    public async approveLendingRequest(id: number): Promise<void> {
        const status: Partial<Lending> = {
            lendingstatus: LendingStatus.Done,
            performed: "No"
        }

        try {
            await this.apiFetch(
                this.endpoints.updateLending(id),
                {
                    method: "PUT",
                    body: JSON.stringify(status)
                }
            )
        } catch (err) {
            console.error("Error approving lending request:", err)
            throw err
        }
    }

    public async approveBookingRequest(id: number): Promise<void> {
        const status: Partial<Booking> = {
            bookstatus: BookingStatus.Tick,
            performed: "No"
        }

        try {
            await this.apiFetch(
                this.endpoints.updateBooking(id),
                {
                    method: "PUT",
                    body: JSON.stringify(status)
                }
            )
        } catch (err) {
            console.error("Error approving booking request:", err)
            throw err
        }
    }
}
