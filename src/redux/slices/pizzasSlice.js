import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { order, sortBy, category, searchValue, pagination } = params

        const res = await axios.get(
            `https://64abcd609edb4181202e911b.mockapi.io/pizzas?page=${pagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchValue}`
        )
        return res.data
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        // setItems: (state, action) => {
        //     state.items = action.payload
        // },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = []
            state.status = 'loading'
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = []
            state.status = 'error'
        },
    },
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
