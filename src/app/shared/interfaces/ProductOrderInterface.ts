import { SimpleProductInterface } from "./SimpleProductInterface";


export interface ProductOrderInterface {
    product: SimpleProductInterface;
    netAmount: number;
    grossAmount: number;
    quantity: number;
    discounts: number;
    isRefund: boolean;
}