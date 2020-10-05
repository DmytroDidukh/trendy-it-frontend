import { takeEvery, put } from 'redux-saga/effects';

import { setCart } from './cart.actions';
import {
  GET_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CART_ITEM_QUANTITY
} from './cart.types';
import {
  getFromLocalStorage,
  setToLocalStorage
} from '../../services/local-storage';
import { setLoading as setBannersLoading } from '../banners/banners.actions';
import { setLoading as setProductsLoading } from '../products/products.actions';

function* handleCartLoad() {
  const cart = getFromLocalStorage('cart');
  yield put(setCart(cart));
  yield put(setBannersLoading(false));
  yield put(setProductsLoading(false));
}

function* handleAddCartItem({ payload }) {
  const cart = getFromLocalStorage('cart');
  const possibleItemInCart = cart.find((item) => item.id === payload.id);

  let newCart;
  if (possibleItemInCart) {
    newCart = cart.map((item) => {
      item.id === payload.id && item.quantity++;
      return item;
    });
  } else {
    newCart = [...cart, payload];
  }

  setToLocalStorage('cart', newCart);
  yield put(setCart(newCart));
}

function* handleRemoveCartItem({ payload: { id, color } }) {
  const cart = getFromLocalStorage('cart');
  const newCart = cart.filter((item) => item.id !== id);

  setToLocalStorage('cart', newCart);
  yield put(setCart(newCart));
}

function* handleSetCartItemQuantity({
  payload: {
    item: { id },
    value,
    key
  }
}) {
  const cart = getFromLocalStorage('cart');
  const newCart = cart.map((item) => {
    if (item.id === id) {
      // key will be true if user typing inside input
      item.quantity = key ? value || 1 : item.quantity + value;
    }
    return item;
  });
  setToLocalStorage('cart', newCart);
  yield put(setCart(newCart));
}

export default function* cartSaga() {
  yield takeEvery(GET_CART, handleCartLoad);
  yield takeEvery(ADD_ITEM_TO_CART, handleAddCartItem);
  yield takeEvery(REMOVE_ITEM_FROM_CART, handleRemoveCartItem);
  yield takeEvery(SET_CART_ITEM_QUANTITY, handleSetCartItemQuantity);
}
