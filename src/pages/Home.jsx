import React, { useEffect, useRef } from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import Skeleton from '../components/UI/pizzaLoader/Skeleton'
import PizzaBlock from '../components/pizza-block/PizzaBlock'

import Pagination from '../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'

import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

export const list = [
    { name: 'популярности +', sort: 'rating' },
    { name: 'популярности -', sort: '-rating' },
    { name: 'возрастанию цены', sort: 'price' },
    { name: 'убыванию цены', sort: '-price' },
    { name: 'алфавиту [A - Я]', sort: 'title' },
    { name: 'алфавиту [Я - А]', sort: '-title' },
]

export const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
]

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { categoryId, sortType, pagination, search } = useSelector(
        (state) => state.filterSlice
    )
    const { items, status } = useSelector((state) => state.pizzasSlice)

    // Парсим из параметров при первой загрузке
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = list.find((obj) => obj.sort === params.sortType)

            dispatch(setFilters({ ...params, sort }))
            isSearch.current = true
        }
    }, [])

    // Подгрузка пицц и отправка параметров (категория, фильтры, пагинация, поиск)
    useEffect(() => {
        window.scrollTo(0, 310)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, search, pagination])

    const getPizzas = () => {
        window.scrollTo(0, 310)

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
                <Categories categories={categories} />
                <Sort />
            </div>
            <h2 className="content__title">{categories[categoryId]} пиццы</h2>
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
                        items.map((pizza) => (
                            <PizzaBlock key={pizza.id} pizza={pizza} />
                        ))
                    ) : (
                        <div className="content__error-info">
                            <h2 style={{ whiteSpace: 'nowrap' }}>
                                Пицц с таким названием нет 😕
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
