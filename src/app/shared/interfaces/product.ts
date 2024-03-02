import { Brand } from "./brand";
import { ProductType } from "./productType";

export interface Product {
    id: number,
    name: string,
    description: string,
    reference: string,
    barcode: string,
    brand: Brand,
    productType: ProductType,
    price: number
}