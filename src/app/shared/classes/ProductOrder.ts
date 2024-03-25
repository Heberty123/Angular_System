
import { Product } from "../interfaces/product";
import { Order } from "./Order";
import { SimpleProduct } from "./SimpleProduct"

export class ProductOrder {
    private _order: Order;
    private _product: SimpleProduct;
    private _grossAmount: number;
    private _netAmount: number;
    private _quantity: number;
    private _discounts: number;
    promotion: number;
    isRefund: boolean;

    constructor(value: Product) {
        this._product = new SimpleProduct(value);
        this._quantity = 1;
        this._discounts = 0;
        this.promotion = 0;
        this.calc()
    }

    public get order(): Order {
        return this._order
    }

    public set order(value: Order) {
        this._order = value;
    }

    public get product(): SimpleProduct {
        return this._product
    }

    public get grossAmount(): number {
        return this._grossAmount
    }

    public get netAmount(): number {
        return this._netAmount
    }

    public get discounts(): number {
        return this._discounts
    }

    public set discounts(value: number) {
        this._discounts = value;
        this.calc();
    }

    public get quantity(): number {
        return this._quantity
    }

    public set quantity(value: number) {
        this._quantity = value;
        this.calc();
    }

    private calc(): void {
        this._grossAmount = this.product.price * this._quantity;
        this._netAmount = this._grossAmount - this._grossAmount * this._discounts;
        if (this.order)
            this.order.update();
    }
}