import './scss/app.scss'
import Header from './components/header/Header'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Pizza from './pages/Pizza'

const App = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/pizza/:id" element={<Pizza />} />
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
