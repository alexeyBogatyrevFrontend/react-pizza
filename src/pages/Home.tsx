import React, { useCallback, useEffect, useRef } from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import Skeleton from '../components/UI/pizzaLoader/Skeleton'
import PizzaBlock, {
    PizzaBlockType,
} from '../components/pizza-block/PizzaBlock'

import Pagination from '../components/pagination/Pagination'
import { useSelector } from 'react-redux'

import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/slices/filter/selectors'
import { setCategoryId, setFilters } from '../redux/slices/filter/slice'
import { sortPropertyEnum } from '../redux/slices/filter/types'
import { fetchPizzas } from '../redux/slices/pizza/slice'
import { selectPizzaData } from '../redux/slices/pizza/selectors'

type listType = {
    name: string
    sort: sortPropertyEnum
}

export const list: listType[] = [
    { name: 'популярности +', sort: sortPropertyEnum.RATING_ASC },
    { name: 'популярности -', sort: sortPropertyEnum.RATING_DESC },
    { name: 'возрастанию цены', sort: sortPropertyEnum.PRICE_ASC },
    { name: 'убыванию цены', sort: sortPropertyEnum.PRICE_DESC },
    { name: 'алфавиту [A - Я]', sort: sortPropertyEnum.TITLE_ASC },
    { name: 'алфавиту [Я - А]', sort: sortPropertyEnum.TITLE_DESC },
]

export const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
]

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { categoryId, sortType, pagination, search } =
        useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)

    // Парсим из параметров при первой загрузке
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = list.find((obj) => obj.sort === params.sortType)

            dispatch(
                setFilters({
                    categoryId: Number(params.categoryId),
                    sortType: sort ? sort : list[0],
                    pagination: Number(params.pagination),
                    search: '',
                })
            )

            isSearch.current = true
        }
    }, [])

    // Подгрузка пицц и отправка параметров (категория, фильтры, пагинация, поиск)
    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, search, pagination])

    const getPizzas = () => {
        window.scrollTo(0, 0)

        const order = sortType.sort.includes('-') ? 'desc' : 'asc'
        const sortBy = sortType.sort.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const searchValue = search ? `search=${search}` : ''

        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                searchValue,
                pagination,
            })
        )
    }

    const sortByCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    // Добавление параметров в url
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortType: sortType.sort,
                pagination,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, pagination])

    return (
        <>
            <div className="content__top">
                <Categories
                    categories={categories}
                    sortByCategoryHandler={sortByCategory}
                />
                <Sort />
            </div>
            {items.length ? (
                <h2 className="content__title">
                    {categories[categoryId]} пиццы
                </h2>
            ) : (
                ''
            )}
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>
                        К сожалению, не удалось получить пиццы. <br />{' '}
                        Попробуйте повторит позже
                    </p>
                </div>
            ) : (
                <div className={'content__items'}>
                    {status === 'loading' ? (
                        [...new Array(10)].map((_, i) => <Skeleton key={i} />)
                    ) : items.length ? (
                        items.map((pizza: PizzaBlockType, index: number) => (
                            <PizzaBlock key={index} {...pizza} />
                        ))
                    ) : (
                        <div
                            className="content__error-info"
                            style={{ margin: '30px auto' }}
                        >
                            <h2 style={{ whiteSpace: 'nowrap' }}>
                                Пицц нет 😕
                            </h2>
                        </div>
                    )}
                </div>
            )}
            <Pagination />
        </>
    )
}

export default Home
