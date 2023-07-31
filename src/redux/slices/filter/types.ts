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
