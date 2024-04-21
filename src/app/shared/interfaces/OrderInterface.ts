import { ProductOrderInterface } from "./ProductOrderInterface"
import { Payment } from "./payment"


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