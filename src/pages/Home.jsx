import React, { useEffect, useRef, useState } from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import Skeleton from '../components/UI/pizzaLoader/Skeleton'
import PizzaBlock from '../components/pizza-block/PizzaBlock'

import Pagination from '../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { setFilters } from '../redux/slices/filterSlice'

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

    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
            fetchPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, search, pagination])

    const fetchPizzas = () => {
        window.scrollTo(0, 310)
        setIsLoading(true)

        const order = sortType.sort.includes('-') ? 'desc' : 'asc'
        const sortBy = sortType.sort.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const searchValue = search ? `search=${search}` : ''

        axios
            .get(
                `https://64abcd609edb4181202e911b.mockapi.io/pizzas?page=${pagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchValue}`
            )
            .then((res) => {
                setPizzas(res.data)
                setIsLoading(false)
            })
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
            <div className="content__items">
                {isLoading
                    ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
                    : pizzas.map((pizza) => (
                          <PizzaBlock key={pizza.id} pizza={pizza} />
                      ))}
            </div>
            <Pagination />
        </>
    )
}

export default Home
