export interface pizzaParams {
    order: string
    sortBy: string
    category: string
    searchValue: string
    pagination: number
}

export type pizzaType = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

export enum statusEnum { // enum object from typescript
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface pizzaSliceState {
    items: pizzaType[]
    status: statusEnum
}
