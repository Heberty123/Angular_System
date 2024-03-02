import { Product } from "../interfaces/product"

export class ProductForOrder {
    id: number;
    name: string;
    price: number;
    public grossAmount: number;
    public netAmount: number;
    private _discounts: number;
    promotion: number;
    private _quantity: number;
    isRefund: boolean;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.grossAmount = product.price;
        this.netAmount = product.price;
        this._discounts = 0;
        this.promotion = 0;
        this._quantity = 1;
        this.isRefund = false
    }

    public get discounts(): number {
        return this._discounts
    }

    public set discounts(value: number) {
        this._discounts = value;
        this.netAmount = this.grossAmount - (this.grossAmount * this.discounts)
    }

    public get quantity(): number {
        return this._quantity
    }

    public set quantity(value: number) {
        this._quantity = value;
        this.grossAmount = (this.price * this._quantity)
        this.netAmount = this.grossAmount - (this.grossAmount * this.discounts)
    }
}