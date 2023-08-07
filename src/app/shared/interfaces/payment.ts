import { PaymentType } from "./paymentType"

export interface Payment{
    id?: number
    amount: number
    paymentDate?: Date
    paymentType?: PaymentType
}