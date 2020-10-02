import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Banners from './banners/banners.reducer';
import Products from './products/products.reducer';
import Wishlist from './wishlist/wishlist.reducer';
import Cart from './cart/cart.reducer';
import Novaposhta from './novaposhta/novaposhta.reducer';

const rootReducer = (history) =>
  combineReducers({
    Banners,
    Products,
    Wishlist,
    Cart,
    Novaposhta,
    router: connectRouter(history)
  });

export default rootReducer;
