import { all } from 'redux-saga/effects';

import Banners from './banners/banners.saga'
import Products from './products/products.saga'
import Wishlist from './wishlist/wishlist.saga'
import Cart from './cart/cart.sagas'
import Order from './order/order.sagas'

export default function* rootSaga() {
    yield all([Banners(), Products(), Wishlist(), Cart(), Order()]);
}
