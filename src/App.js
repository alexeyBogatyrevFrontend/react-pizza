import React, { useEffect, useState } from 'react'

import './scss/app.scss'
import Header from './components/header/Header'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

// import pizzas from './pizzas.json'

const App = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        fetch('https://64abcd609edb4181202e911b.mockapi.io/pizzas')
            .then((response) => response.json())
            .then((data) => {
                setPizzas(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route
                            path="/home"
                            element={
                                <Home
                                    pizzas={pizzas}
                                    setPizzas={setPizzas}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                />
                            }
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/not-found" element={<NotFound />} />
                        <Route
                            path="*"
                            element={<Navigate replace to="/not-found" />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
