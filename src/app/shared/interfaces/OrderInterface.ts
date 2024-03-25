import { Payment } from "./Payment"
import { ProductOrderInterface } from "./ProductOrderInterface"


export interface OrderInterface {
    id: number
    paid: boolean
    netAmount: number
    grossAmount: number
    discounts: number
    productOrders: ProductOrderInterface[];
    payments: Payment[];
    createdAt: string
}