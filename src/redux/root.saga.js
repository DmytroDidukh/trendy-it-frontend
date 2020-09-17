import { all } from 'redux-saga/effects';

import Categories from './categories/categories.saga'
import Products from './products/products.saga'
import Subcategories from './subcategories/subcategories.saga'
import Wishlist from './wishlist/wishlist.saga'
import Cart from './cart/cart.sagas'
import Order from './order/order.sagas'

export default function* rootSaga() {
    yield all([Categories(), Products(), Subcategories(), Wishlist(), Cart(), Order()]);
}
