import { PaymentType } from "./PaymentType"
import { Customer } from "./customer"

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