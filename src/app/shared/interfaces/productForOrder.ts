export interface ProductForOrder {
    id: number,
    name: string,
    price: number,
    grossAmount: number,
    netAmount: number,
    discounts: number,
    promotion: number,
    quantity: number,
    isRefund: boolean
}