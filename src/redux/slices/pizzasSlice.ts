import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

interface pizzaParams {
    order: string
    sortBy: string
    category: string
    searchValue: string
    pagination: number
}

export const fetchPizzas = createAsyncThunk<pizzaType[], pizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { order, sortBy, category, searchValue, pagination } = params

        const res = await axios.get<pizzaType[]>(
            `https://64abcd609edb4181202e911b.mockapi.io/pizzas?page=${pagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchValue}`
        )
        return res.data
    }
)

type pizzaType = {
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

interface pizzaSliceState {
    items: pizzaType[]
    status: statusEnum
}

const initialState: pizzaSliceState = {
    items: [],
    status: statusEnum.LOADING, // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        // setItems: (state, action) => {
        //     state.items = action.payload
        // },
    },
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.items = []
    //         state.status = 'loading'
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload
    //         state.status = 'success'
    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         state.items = []
    //         state.status = 'error'
    //     },
    // },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.items = []
            state.status = statusEnum.LOADING
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = statusEnum.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.items = []
            state.status = statusEnum.ERROR
        })
    },
})

export const selectPizzaData = (state: RootState) => state.pizzasSlice

// export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
