export interface Address {
    id: number,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    uf: string,
    cep: string,
    deliveryType: {
        id: number,
        name: string
    },
    cellphone1: string,
    cellphone2: string,
    telephone1: string,
    telephone2: string,
}
