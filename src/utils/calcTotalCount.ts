import { CartItem } from '../redux/slices/cart/types'

export const calcTotalCount = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.count, 0)
}
