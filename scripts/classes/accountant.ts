import User from "./user";
import link from "../utils/links";

//interfaces
import Finance from "../interfaces/finance";
import Services from "../interfaces/services";
import { Status } from "../interfaces/finance";
import Penalty from "../interfaces/penalty";
import { PenaltyPayment } from "../interfaces/penaltyPayment";
import Order from "../interfaces/orders";
import OrderPayment from "../interfaces/orderPayment";

//enums
import { PaymentStatus } from "../enums/services";
import { PenaltyStatus } from "../enums/penalty";
import errorLogger from "../utils/errorLogger";
import { OrderStatus } from "../enums/order";

export default class Accountant extends User {
    constructor(regID: number, token: string, backendUrl: string = link) {
        super(regID, token, backendUrl);
    }

    async approvePayment(id: number): Promise<void> {
        try {
            await this.apiFetch(this.endpoints.updateFinance(id), {
                method: "PUT"
            })

            this.toaster("Payment approved successfully", "success")
        } catch (error) {
            console.error("Error approving payment:", error)
            throw error
        }
    }

    async approvePenaltyPayment(id: number) {
        let status: Partial<Penalty> = {
            penaltystatus: PenaltyStatus.Paid
        }
        try {
            await this.apiFetch(this.endpoints.updatePenalty(id),
                {
                    method: "PUT",
                    body: JSON.stringify(status)
                }
            );
            this.toaster('Penalty payment approved successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    async getPenalties(): Promise<Penalty[]> {
        try {
            const penalties: Penalty[] = await this.apiFetch(this.endpoints.getAllPenalties);
            const penaltyPayment: PenaltyPayment[] = await this.apiFetch(this.endpoints.getPenaltyPayment);

            let paidPenalties: Penalty[] = [];
            for (const paid of penaltyPayment) {
                for (const penalty of penalties) {
                    if (paid.penaltyid === penalty.penaltyid) {
                        paidPenalties.push(penalty);
                    }
                }
            }
            this.toaster('Penalties fetched successfully', 'info');
            return paidPenalties;
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getPenaltyPayments(): Promise<PenaltyPayment[]> {
        try {
            this.toaster('Penalty payments fetched successfully', 'info');
            return await this.apiFetch(this.endpoints.getPenaltyPayment);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async getOrders(): Promise<Order[]> {
        try {
            this.toaster('Orders fetched successfully', 'info');
            return await this.apiFetch<Order[]>(this.endpoints.getAllOrders);
        } catch (err) {
            errorLogger(err);
            return [];
        }
    }

    async makeOrderPayment(payment: OrderPayment) {
        try {
            await this.apiFetch(this.endpoints.addOrderPayment,
                {
                    method: "POST",
                    body: JSON.stringify(payment)
                }
            );
            this.toaster('Order payment made successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    async changeOrderStatus(id: number) {
        let status: Partial<Order> = {
            orderstatus: OrderStatus.Paid
        }
        try {
            await this.apiFetch(this.endpoints.updateOrder(id),
                {
                    method: "PUT",
                    body: JSON.stringify(status)
                }
            );
            this.toaster('Payment approved successfully', 'success');
        } catch (err) {
            errorLogger(err);
        }
    }

    public async getAllFinanceRecords(): Promise<Finance[]> {
        try {
            this.toaster('Finance records fetched successfully', 'info');
            return await this.apiFetch<Finance[]>(this.endpoints.getAllFinance);
        } catch (error) {
            console.error("Error getting finance records:", error);
            return [];
        }
    }

    public async getAllServices(): Promise<Services[]> {
        try {
            this.toaster('Services fetched successfully', 'info');
            return await this.apiFetch(this.endpoints.getAllServices);
        } catch (err) {
            console.error('Error', err, 'occurred');
            return [];
        }
    }

    public async getPaymentServiceID(pay_id: number) {
        const allPayments = await this.getAllFinanceRecords()

        const payment = allPayments.find(p => Number(p.transactionid) === pay_id)
        const service_id = payment?.serviceid

        console.log('Matched payment:', payment)
        console.log('Service ID:', service_id, typeof service_id)

        this.toaster('Payment service id fetched successfully', 'info')

        return service_id
    }

    public async approveServicePaymentStatus(service_id: number) {

        try {
            await this.apiFetch(this.endpoints.updateService(service_id),
                {
                    method: "PUT"
                }
            );
            this.toaster('Payment approved successfully', 'success');
        } catch (err) {
            console.error('Error', err, 'occurred');
        }
    }
}