import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { filterSliceState, sortPropertyEnum, sortType } from './types'

const initialState: filterSliceState = {
    categoryId: 0,
    sortType: {
        name: 'популярности +',
        sort: sortPropertyEnum.RATING_ASC,
    },
    pagination: 1,
    search: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action: PayloadAction<sortType>) => {
            state.sortType = action.payload
        },
        setPagination: (state, action: PayloadAction<number>) => {
            state.pagination = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setFilters: (state, action: PayloadAction<filterSliceState>) => {
            if (Object.keys(action.payload).length) {
                state.categoryId = +action.payload.categoryId
                state.sortType = action.payload.sortType
                state.pagination = +action.payload.pagination
            } else {
                state.categoryId = 0
                state.sortType = {
                    name: 'популярности +',
                    sort: sortPropertyEnum.RATING_ASC,
                }
                state.pagination = 1
            }
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
