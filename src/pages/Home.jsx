import React from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import Skeleton from '../components/UI/pizzaLoader/Skeleton'
import PizzaBlock from '../components/pizza-block/PizzaBlock'

const Home = ({ isLoading, pizzas }) => {
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
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
