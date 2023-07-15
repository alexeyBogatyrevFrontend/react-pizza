import React, { useContext, useEffect, useState } from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import Skeleton from '../components/UI/pizzaLoader/Skeleton'
import PizzaBlock from '../components/pizza-block/PizzaBlock'
import { AppContext } from '../context/AppContext'
import Pagination from '../components/pagination/Pagination'
import { useSelector } from 'react-redux'

const Home = () => {
    const { categoryId, sortType } = useSelector((state) => state.filterSlice)

    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const { search, pagination } = useContext(AppContext)

    useEffect(() => {
        setIsLoading(true)

        const order = sortType.sort.includes('-') ? 'desc' : 'asc'
        const sortBy = sortType.sort.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const searchValue = search ? `search=${search}` : ''

        fetch(
            `https://64abcd609edb4181202e911b.mockapi.io/pizzas?page=${pagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchValue}`
        )
            .then((response) => response.json())
            .then((data) => {
                setPizzas(data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, search, pagination])

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
