export interface Product {
    id: number,
    name: string,
    description: string,
    reference: string,
    barcode: number,
    brand: {
        id: number,
        name: string
    },
    price: string
}