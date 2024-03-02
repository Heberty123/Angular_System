import { Product } from "../interfaces/product";
import { ProductForOrder } from "./ProductForOrder";

export class SimpleProduct {
    id: number;
    name: string;
    price: number;

    constructor(value: Product) {
        this.id = value.id;
        this.name = value.name;
        this.price = value.price;
    }
}