import { Payment } from "./payment";
import { ProductOrder } from "./productOrder";

export interface Order {
    id?: number,
    paid: boolean,
    customerId: number,
    netAmount?: number,
    grossAmount?: number,
    discounts?: number,
    productsOrders: ProductOrder[],
    payments?: Payment[],
    createdAt?: string,
}