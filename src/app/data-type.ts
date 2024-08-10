export interface signUp{
    name: string,
    password: string,
    email: string
}

export interface Login{
    name: string,
    email : string,
    password: string
}

export interface product{
    id: any,
    ProductName: string,
    price: number,
    category: string,
    color: string,
    ratings: number,
    description: string,
    image: string,
    productId: undefined | number,
    quantity: number | undefined
}

export interface cart{
    id: number | undefined,
    ProductName: string,
    price: number,
    category: string,
    color: string,
    ratings: number,
    description: string,
    image: string,
    productId: string | undefined,
    quantity: number | undefined,
    userId : number
}

export interface priceData{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface order{
    data: any
    contact: string,
    address: string,
    email: string,
    totalPrice: number,
    userId: number,
    id: number | undefined,
    date: string
}