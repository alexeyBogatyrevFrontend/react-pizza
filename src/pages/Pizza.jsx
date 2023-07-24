import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import c from './Pizza.module.scss'

const Pizza = () => {
    const [pizza, setPizza] = useState()

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const res = await axios.get(
                    `https://64abcd609edb4181202e911b.mockapi.io/pizzas/${id}`
                )
                setPizza(res.data)
            } catch (err) {
                alert('Ошибка при получении пиццы')
                navigate('/home')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return 'Загрузка...'
    }

    return (
        <div className={c.pizza}>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <p>{pizza.description}</p>
            <h3>от {pizza.price} ₽</h3>
        </div>
    )
}

export default Pizza
