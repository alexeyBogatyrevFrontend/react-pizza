import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton'

import c from './Cart.module.scss'
import CartItem from '../components/cart/CartItem'

const Cart = () => {
    return (
        // <div className={c.cart}>
        //     <h2>
        //         Корзина пустая <span>😕</span>
        //     </h2>
        //     <p>
        //         Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того,
        //         чтобы заказать пиццу, перейди на главную страницу.
        //     </p>
        //     <img
        //         width={300}
        //         height={255}
        //         src="/img/empty-cart.svg"
        //         alt="empty-cart"
        //     />
        //     <Link to="/home">
        //         <MyButton style={{ background: '#282828' }}>
        //             Вернуться назад
        //         </MyButton>
        //     </Link>

        // </div>
        <div style={{ maxWidth: '820px', margin: '90px auto' }}>
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        {' '}
                        <img src="/img/cart.svg" alt="cart" /> Корзина
                    </h2>
                    <div className="cart__clear">
                        <img src="/img/trash.svg" alt="trash" />
                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div className="content__items">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            {' '}
                            Всего пицц: <b>3 шт.</b>{' '}
                        </span>
                        <span>
                            {' '}
                            Сумма заказа: <b>900 ₽</b>{' '}
                        </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/home">
                            <MyButton
                                style={{
                                    border: '1px solid #D3D3D3',
                                    color: '#CACACA',
                                    background: '#fff',
                                }}
                            >
                                <img
                                    src="/img/grey-arrow-left.svg"
                                    alt="arrow"
                                />
                                Вернуться назад
                            </MyButton>
                        </Link>

                        <MyButton>Оплатить сейчас</MyButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
