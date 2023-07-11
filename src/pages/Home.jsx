import React, { useEffect, useState } from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import Skeleton from '../components/UI/pizzaLoader/Skeleton'
import PizzaBlock from '../components/pizza-block/PizzaBlock'

const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sort: 'rating',
    })

    useEffect(() => {
        setIsLoading(true)

        const order = sortType.sort.includes('-') ? 'desc' : 'asc'
        const sortBy = sortType.sort.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(
            `https://64abcd609edb4181202e911b.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
        )
            .then((response) => response.json())
            .then((data) => {
                setPizzas(data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <>
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                />
                <Sort sortType={sortType} setSortType={setSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
                    : pizzas.map((pizza) => (
                          <PizzaBlock key={pizza.id} pizza={pizza} />
                      ))}
            </div>
        </>
    )
}

export default Home
