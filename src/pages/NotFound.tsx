import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton'

import c from './NotFound.module.scss'

const NotFound: React.FC = () => {
    return (
        <div className={c.notFound}>
            <span>😕</span>
            <h2>Ничего не найдено</h2>
            <p>
                К сожалению данная страница отсутствует в нашем интернет
                магазине
            </p>
            <Link to="/home">
                <MyButton>На главную</MyButton>
            </Link>
        </div>
    )
}

export default NotFound
