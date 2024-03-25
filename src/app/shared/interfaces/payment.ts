import { PaymentType } from "./PaymentType"

export interface Payment{
    id?: number
    amount: number
    paymentDate?: string
    paymentType?: PaymentType
    payedAt?: string
    amountPayed?: number
    paid: boolean
}