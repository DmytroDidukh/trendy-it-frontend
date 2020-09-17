import {combineReducers} from 'redux';
import {connectRouter} from "connected-react-router";

import Banners from './banners/banners.reducer'
import Products from './products/products.reducer'
import Wishlist from './wishlist/wishlist.reducer'
import Cart from './cart/cart.reducer'

const rootReducer = (history) =>
    combineReducers({
        Banners,
        Products,
        Wishlist,
        Cart,
        router: connectRouter(history)
    });

export default rootReducer;
