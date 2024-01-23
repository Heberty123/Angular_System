import { SimpleProduct } from "./simpleProduct";

export interface ProductOrder {
    product: SimpleProduct,
    quantity: number,
    discounts: number,
    isRefund: boolean
}