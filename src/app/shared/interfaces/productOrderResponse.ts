import { SimpleProduct } from "./simpleProduct";

export interface ProductOrderResponse {
    product: SimpleProduct, 
    quantity: number,
    discounts: number,
    isRefund: boolean,
}