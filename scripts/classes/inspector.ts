import User from "./user";
import link from "../utils/links";

//interfaces
import Inspection from "../interfaces/inspection";
import Inventory from "../interfaces/inventory";
import AllocatedEquipment from "../interfaces/allocatedEquipment";
import Penalty from "../interfaces/penalty";
import Services from "../interfaces/services";
import Lending from "../interfaces/lending";

//utils
import errorLogger from "../utils/errorLogger";

//enums
import EquipStatus from "../enums/allocatedEquipment";

export default class Inspector extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    async addInspection(insp: Inspection) {
        try {
            await this.apiFetch(this.endpoints.addInspection,
                {
                    method: "POST",
                    body: JSON.stringify(insp)
                }
            );
            this.toaster('Inspection added successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    async getAllInspections(): Promise<Inspection[]> {
        try {
            this.toaster('Inspections fetched successfully', 'info');
            return await this.apiFetch<Inspection[]>(this.endpoints.getInspections);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getAllLendings(): Promise<Lending[]> {
        try {
            this.toaster('Lendings fetched successfully', 'info');
            return await this.apiFetch<Lending[]>(this.endpoints.getAllLendingRequests);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getAllAllocatedEquipment(): Promise<AllocatedEquipment[]> {
        try {
            this.toaster('Equipment fetched successfully', 'info');
            return await this.apiFetch<AllocatedEquipment[]>(this.endpoints.getAllAllocatedEquipment);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getAllEquipment(): Promise<Inventory[]> {
        try {
            this.toaster('Equipment fetched successfully', 'info');
            return await this.apiFetch<Inventory[]>(this.endpoints.getAllEquipment);
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

    async markAllocatedEquipmentInspected(id: number) {
        let inspected: Partial<AllocatedEquipment> = {
            equipstatus: EquipStatus.Inspected
        }
        try {
            await this.apiFetch(this.endpoints.updateAllocatedEquipment(id),
                {
                    method: "PUT",
                    body: JSON.stringify(inspected)
                }
            );
            this.toaster('Equipment updated successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    async penalizeDamage(pen: Penalty) {
        try {
            await this.apiFetch(this.endpoints.addPenalty,
                {
                    method: "POST",
                    body: JSON.stringify(pen)
                }
            );
            this.toaster('Penalty added successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }
}