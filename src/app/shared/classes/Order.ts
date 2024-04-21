import { ProductOrder } from "./ProductOrder";
import { Product } from "../interfaces/product";
import { Payment } from "../interfaces/payment";

export class Order {
    private _id: number;
    private _paid: boolean;
    private _customerId: number;
    private _netAmount: number = 0;
    private _grossAmount: number = 0;
    private _discounts: number = 0;
    private _quantity: number = 0;
    private _productOrders: ProductOrder[] = [];
    private _payments: Payment[] = [];
    private _createdAt: string;

    constructor() { }

    public addProductOrders(product: Product) {
        let productFound: ProductOrder | undefined =
            this.findProductOrderById(product.id)

        if (!productFound) {
            let newProduct: ProductOrder = new ProductOrder(product);
            newProduct.order = this;
            this._productOrders = [...this.productOrders, newProduct];
        }
        else
            productFound.quantity!++
        this.update();
    }

    public findProductOrderById(id: number): ProductOrder | undefined {
        return this.productOrders.find((obj) => obj.product.id === id);
    }

    public deleteProductOrders(items: ProductOrder[]): void {
        this._productOrders = this._productOrders
        .filter((item) => !items.includes(item));
        this.update();
    }

    private _reset(): void {
        this._netAmount = 0;
        this._grossAmount = 0;
        this._discounts = 0;
        this._quantity = 0;
    }

    public update() {
        this._reset()
        this._productOrders.forEach((element: ProductOrder) => {
            this._quantity += element.quantity;
            this._grossAmount += element.grossAmount;
            this._netAmount += element.netAmount;
        })
        this._discounts =
        1 - (this._netAmount! / this._grossAmount);
    }

    public get id(): number {
        return this._id;
    }

    public get paid(): boolean {
        return this._paid;
    }

    public set paid(value: boolean) {
        this._paid = value;
    }

    public get customerId(): number {
        return this._customerId;
    }

    public set customerId(value: number) {
        this._customerId = value;
    }

    public get netAmount(): number {
        return this._netAmount;
    }

    public set netAmount(value: number) {
        this._netAmount = value;
    }

    public get grossAmount(): number {
        return this._grossAmount;
    }

    public set grossAmount(value: number) {
        this._grossAmount = value;
    }

    public get discounts(): number {
        return this._discounts;
    }

    public set discounts(value: number) {
        this._discounts = value;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number) {
        this._quantity = value;
    }

    public get productOrders() {
        return this._productOrders;
    }

    public get payments(): Payment[] {
        return this._payments
    }

    public set payments(value: Payment[]) {
        this._payments = value;
    }

    public get createdAt(): string {
        return this._createdAt
    }

    public set createdAt(value: string) {
        this._createdAt = value;
    }
}