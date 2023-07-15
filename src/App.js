import React, { useState } from 'react'

import './scss/app.scss'
import Header from './components/header/Header'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import { AppContext } from './context/AppContext'

const App = () => {
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState(1)

    return (
        <AppContext.Provider
            value={{ search, setSearch, pagination, setPagination }}
        >
            <div className="wrapper">
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/home" exact element={<Home />} />
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
        </AppContext.Provider>
    )
}

export default App
