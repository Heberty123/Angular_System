import { PaymentType } from "./paymentType"

export interface Payment{
    id?: number
    amount: number
    paymentDate?: string
    paymentType?: PaymentType
    payedAt?: string
    amountPayed?: number
    paid: boolean
}