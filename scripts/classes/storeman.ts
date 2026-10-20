import User from "./user";
import link from "../utils/links";

//interfaces
import Inventory from "../interfaces/inventory";
import Supply from "../interfaces/supply";
import Order from "../interfaces/orders";
import SupplyOrder from "../interfaces/supplyOrder";
import Services from "../interfaces/services";
import Booking from "../interfaces/booking";
import Lending from "../interfaces/lending";
import AllocatedEquipment, { AllocatedEquipmentPatch } from "../interfaces/equip_alloc";
import AllocatedInstrument, { AllocatedInstrumentPatch } from "../interfaces/inst_alloc";

//utils
import errorLogger from "../utils/errorLogger";

//enums
import { OrderStatus } from "../enums/order";


export default class Storeman extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    async addEquipment(equip: Inventory): Promise<void> {
        try {
            this.toaster('Equipment added successfully', 'success');
            await this.apiFetch(this.endpoints.addEquipment, { body: JSON.stringify(equip), method: 'POST' });
        } catch (error) {
            throw error;
        }
    }
    async getEquipment(): Promise<Inventory[]> {
        try {
            this.toaster('Equipment fetched successfully', 'info');
            return await this.apiFetch<Inventory[]>(this.endpoints.getAllEquipment);
        } catch (error) {
            console.error("Error getting equipment:", error);
            return [];
        }
    }
    async updateEquipment(id: number, equip: Inventory): Promise<void> {
        try {
            this.toaster('Equipment updated successfully', 'success');
            await this.apiFetch(`${this.endpoints.updateEquipment}/${id}`, { body: JSON.stringify(equip), method: 'PUT' });
        } catch (error) {
            throw error;
        }
    }

    async deleteEquipment(id: number): Promise<void> {
        try {
            this.toaster('Equipment deleted successfully', 'success');
            await this.apiFetch(`${this.endpoints.deleteEquipment}/${id}`, { method: 'DELETE' });
        } catch (error) {
            throw error;
        }
    }

    async getSupplies(): Promise<Supply[]> {
        try {
            this.toaster('Supplies fetched successfully', 'info');
            return await this.apiFetch<Supply[]>(this.endpoints.getAllSupplies);
        } catch (error) {
            console.error("Error getting supplies:", error);
            return [];
        }
    }
    async orderSupplies(order: SupplyOrder): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.addOrder,
                {
                    method: 'POST',
                    body: JSON.stringify(order)
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async getOrders(): Promise<Order[]> {
        try {
            this.toaster('Equipment updated successfully', 'info');
            return await this.apiFetch(this.endpoints.getAllOrders)
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async updateOrder(id: number) {
        let order_status: Partial<Order> = {
            orderstatus: OrderStatus.Delivered
        }
        try {
            await this.apiFetch(this.endpoints.updateOrder(id),
                {
                    method: "PUT",
                    body: JSON.stringify(order_status)
                }
            );
            this.toaster('Order updated successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    async allocateEquipment(alloc_equip: AllocatedEquipment): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.alloc_equip_add,
                {
                    method: "PUT",
                    body: JSON.stringify(alloc_equip)
                }
            )
        } catch (error) {
            errorLogger(error)
        }
    }

    async getAllocatedEquipment(): Promise<AllocatedEquipment[]> {
        return this.apiFetch<AllocatedEquipment[]>(this.endpoints.alloc_equip_get)
    }

    async patchAllocatedEquipmentStatus(id: number, patch: AllocatedEquipmentPatch): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.alloc_equip_patch(id),
                {
                    method: "PATCH",
                    body: JSON.stringify(patch)
                }
            )
        } catch (error) {
            errorLogger(error)
        }
    }

    async allocateInstrument(alloc_inst: AllocatedInstrument): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.alloc_inst_add,
                {
                    method: "PUT",
                    body: JSON.stringify(alloc_inst)
                }
            )
        } catch (error) {
            errorLogger(error)
        }
    }

    async getAllocatedInstruments(): Promise<AllocatedInstrument[]> {
        return this.apiFetch<AllocatedInstrument[]>(this.endpoints.alloc_inst_get)
    }

    async patchAllocatedInstrumentStatus(id: number, patch: AllocatedInstrumentPatch): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.alloc_inst_patch(id),
                {
                    method: "PATCH",
                    body: JSON.stringify(patch)
                }
            )
        } catch (error) {
            errorLogger(error)
        }
    }


    async getServices(): Promise<Services[]> {
        try {
            this.toaster('Services fetched successfully', 'info')
            return await this.apiFetch<Services[]>(this.endpoints.getAllServices)
        } catch (error) {
            errorLogger(error)
            return []
        }
    }

    async getBookings(): Promise<Booking[]> {
        try {
            this.toaster('Bookings fetched successfully', 'info')
            return await this.apiFetch<Booking[]>(this.endpoints.getAllBookings)
        } catch (error) {
            errorLogger(error)
            return []
        }
    }

    async getLendings(): Promise<Lending[]> {
        try {
            this.toaster('Lendings fetched successfully', 'info')
            return await this.apiFetch<Lending[]>(
                this.endpoints.getAllLendingRequests
            )
        } catch (error) {
            errorLogger(error)
            return []
        }
    }

}