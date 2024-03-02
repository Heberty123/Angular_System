import { Product } from "../interfaces/product";
import { SimpleProduct } from "./SimpleProduct"

export class ProductOrder {
    product: SimpleProduct;
    private _quantity: number;
    private _discounts: number;
    promotion: number;
    isRefund: boolean;

    constructor(value: Product) {
        this.product = new SimpleProduct(value);
        this._quantity = 1;
        this._discounts = 0;
        this.promotion = 0;
    }

    public get discounts(): number {
        return this._discounts
    }

    public set discounts(value: number) {
        this._discounts = value;
    }

    public get quantity(): number {
        return this._quantity
    }

    public set quantity(value: number) {
        this._quantity = value;
    }
}