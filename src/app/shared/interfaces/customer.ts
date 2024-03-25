interface ParentInterface {
  id: number,
  name: string,
  cpf: string,
}

export interface Customer {
    id?: number,
    name: string,
    cpf: string,
    parent?: ParentInterface 
  }