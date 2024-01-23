import { Address } from "./address"
import { Customer } from "./customer"
import { Order } from "./order"

export interface FullCustomer {
    id: number,
    name: string,
    cpf: string,
    addresses: Address[],
    dependents: Customer[],
    orders: Order[]
  }