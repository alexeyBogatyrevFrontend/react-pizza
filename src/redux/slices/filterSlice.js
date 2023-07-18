import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortType: {
        name: 'популярности +',
        sort: '-rating',
    },
    pagination: 1,
    search: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action) => {
            state.sortType = action.payload
        },
        setPagination: (state, action) => {
            state.pagination = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setFilters: (state, action) => {
            state.categoryId = +action.payload.categoryId
            state.sortType = action.payload.sort
            state.pagination = +action.payload.pagination
        },
    },
})

export const {
    setCategoryId,
    setSortType,
    setPagination,
    setSearch,
    setFilters,
} = filterSlice.actions

export default filterSlice.reducer
