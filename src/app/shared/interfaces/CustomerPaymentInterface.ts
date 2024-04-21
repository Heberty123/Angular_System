import { Customer } from "./customer"
import { PaymentType } from "./paymentType"

export interface CustomerPayment {
    customer: Customer,
    id: number,
    amount: number,
    paymentDate: string,
    paymentType: PaymentType,
    payedAt: string,
    amountPayed: number,
    paid: boolean
}