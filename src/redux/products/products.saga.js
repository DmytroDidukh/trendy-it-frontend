import { takeEvery, call, put } from 'redux-saga/effects';

import {
  setProducts,
  setLoading,
  setProductsPagination,
  setSearchedProducts,
  setSearchLoading
} from './products.actions';
import { getProducts } from '../../services/products';
import { GET_PRODUCTS, GET_SEARCHED_PRODUCTS } from './products.types';

function* handleProductsLoad({ payload }) {
  try {
    yield put(setLoading(true));
    const products = yield call(getProducts, payload);

    yield put(setProducts(products.products));
    yield put(setProductsPagination(products.pagination));

    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* handleProductsSearch({ payload }) {
  try {
    yield put(setSearchLoading(true));
    const products = yield call(getProducts, payload);

    yield put(setSearchedProducts(products.products));

    yield put(setSearchLoading(false));
  } catch (error) {
    yield put(setSearchLoading(false));
    console.log(error);
  }
}

export default function* productsSaga() {
  yield takeEvery(GET_PRODUCTS, handleProductsLoad);
  yield takeEvery(GET_SEARCHED_PRODUCTS, handleProductsSearch);
}
