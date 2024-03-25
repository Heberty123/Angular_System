
import { ProductOrder } from "./ProductOrder";

export class DiscountsDialog {
    name: string;
    netAmount: number;
    grossAmount: number;
    price: number;
    quantity: number;
    discount: number

    constructor(productOrder: ProductOrder) {
        this.name = productOrder.product.name;
        this.netAmount = productOrder.netAmount;
        this.grossAmount = productOrder.grossAmount;
        this.price = productOrder.product.price;
        this.quantity = productOrder.quantity
    }
}