import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCartItems } from '../../../utils/getCartItems'
import { CartItem, cartSliceState } from './types'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { calcTotalCount } from '../../../utils/calcTotalCount'

const { items, totalPrice, totalCount } = getCartItems()

const initialState: cartSliceState = {
    totalPrice: totalPrice,
    totalCount: totalCount,
    items: items,
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

            state.totalPrice = calcTotalPrice(state.items)
            state.totalCount = calcTotalCount(state.items)
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            )

            if (findItem) {
                findItem.count--
            }

            state.totalPrice = calcTotalPrice(state.items)
            state.totalCount = calcTotalCount(state.items)
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
            state.totalCount = calcTotalCount(state.items)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
    },
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
