import { Signal, WritableSignal, computed, signal } from "@angular/core";
import { Payment } from "../interfaces/payment";
import { ProductOrder } from "./ProductOrder";
import { Product } from "../interfaces/product";

export class Order {
    id?: number;
    paid: boolean;
    customerId: number;
    netAmount: number;
    grossAmount: number;
    discounts: number;
    private _productOrders: ProductOrder[];
    private _payments: Payment[] = [];
    createdAt?: string;

    constructor() { }

    public get productOrders() {
        return this._productOrders;
    }


    // public addProductsOrder(value: Product): void {

    // }


    public get payments(): Payment[] {
        return this._payments
    }

    public set payments(value: Payment[]) {
        this._payments = value;
    }
}