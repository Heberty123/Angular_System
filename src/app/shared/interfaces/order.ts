import { Payment } from "./payment";
import { ProductOrderPost } from "./productOrderPost";
import { ProductOrderResponse } from "./productOrderResponse";

export interface Order {
    id?: number,
    status: string,
    customerId: number,
    netAmount?: number,
    grossAmount?: number,
    discounts?: number,
    productsOrders: ProductOrderPost[] | ProductOrderResponse[],
    payments?: Payment[],
}