import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum sortPropertyEnum {
    RATING_ASC = 'rating',
    RATING_DESC = '-rating',
    TITLE_ASC = 'title',
    TITLE_DESC = '-title',
    PRICE_ASC = 'price',
    PRICE_DESC = '-price',
}

export type sortType = {
    name: string
    sort: sortPropertyEnum
}

export interface filterSliceState {
    categoryId: number
    sortType: sortType
    pagination: number
    search: string
}

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

export const selectFilter = (state: RootState) => state.filterSlice
export const selectSort = (state: RootState) => state.filterSlice.sortType

export const {
    setCategoryId,
    setSortType,
    setPagination,
    setSearch,
    setFilters,
} = filterSlice.actions

export default filterSlice.reducer
