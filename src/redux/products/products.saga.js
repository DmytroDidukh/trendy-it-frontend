import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setProducts,
  setLoading,
  setProductsPagination,
  setSearchedProducts,
  setSearchLoading,
  setProduct
} from './products.actions';
import { getProducts, getProductById } from '../../services/products';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS,
  GET_SEARCHED_PRODUCTS
} from './products.types';

function* handleProductsLoad({ payload }) {
  try {
    yield put(setLoading(true));
    const products = yield call(getProducts, payload);

    yield put(setProducts(products.products));
    yield put(setProductsPagination(products.pagination));

    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(push('/error'));
    yield put(setLoading(false));
  }
}

function* handleProductsSearch({ payload }) {
  try {
    yield put(setSearchLoading(true));
    const products = yield call(getProducts, payload);

    yield put(setSearchedProducts(products.products));

    yield put(setSearchLoading(false));
  } catch (error) {
    console.log(error);
    yield put(setSearchLoading(false));
    yield put(push('/error'));
  }
}

function* handleGetProductBuyId({ payload }) {
  try {
    yield put(setLoading(true));
    const product = yield call(getProductById, payload);

    yield put(setProduct(product));
    yield put(setLoading(false));
  } catch (error) {
    yield put(push('/error'));
    yield put(setLoading(false));
    console.log(error);
  }
}

export default function* productsSaga() {
  yield takeEvery(GET_PRODUCTS, handleProductsLoad);
  yield takeEvery(GET_SEARCHED_PRODUCTS, handleProductsSearch);
  yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductBuyId);
}
