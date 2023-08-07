export interface OrderDetails {
    grossAmount: number,
    netAmount: number,
    quantity: number,
    qtyRefund: number,
    returnValue: number
    discounts: number,
    paymentMethod?: string
}