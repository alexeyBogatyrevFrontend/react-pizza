// from local storage

import { CartItem } from '../redux/slices/cart/types'
import { calcTotalCount } from './calcTotalCount'
import { calcTotalPrice } from './calcTotalPrice'

export const getCartItems = () => {
    const data = localStorage.getItem('cartItems')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)
    const totalCount = calcTotalCount(items)

    return {
        items: items as CartItem[],
        totalPrice,
        totalCount,
    }
}
