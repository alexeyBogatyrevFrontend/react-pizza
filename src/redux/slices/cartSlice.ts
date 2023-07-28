import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
    id: string
    title: string
    type: string
    size: number
    price: number
    count: number
    imageUrl: string
}

interface cartSliceState {
    totalPrice: number
    totalCount: number
    items: CartItem[]
}

const initialState: cartSliceState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
            state.totalCount = state.items.reduce(
                (sum, item) => sum + item.count,
                0
            )
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            )

            if (findItem) {
                findItem.count--
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
            state.totalCount = state.items.reduce(
                (sum, item) => sum + item.count,
                0
            )
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
            state.totalCount = state.items.reduce(
                (sum, item) => sum + item.count,
                0
            )
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
    },
})

export const selectCart = (state: RootState) => state.cartSlice
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cartSlice.items.find((obj) => obj.id === id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
