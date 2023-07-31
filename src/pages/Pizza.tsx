import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import c from './Pizza.module.scss'
import MyButton from '../components/UI/button/MyButton'

const Pizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        description: string
        price: number
    }>()

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
                navigate('/')
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
            <Link to="/">
                <MyButton>Назад</MyButton>
            </Link>
        </div>
    )
}

export default Pizza
