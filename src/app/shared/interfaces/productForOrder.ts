export interface ProductForOrder {
    id: number,
    name: string,
    description: string,
    reference: string,
    barcode: number,
    brand: string,
    productType: string,
    price: number,
    grossAmount: number,
    netAmount: number,
    discounts: number,
    promotion: number,
    quantity: number,
    isRefund: boolean
}