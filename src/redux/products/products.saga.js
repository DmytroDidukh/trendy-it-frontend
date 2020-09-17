import { takeEvery, call, put } from 'redux-saga/effects';

import {
    setProducts,
    setLoading,
    setProduct
} from './products.actions';
import { getProducts, getProductById } from '../../services/products';
import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from './products.types';

function* handleProductsLoad() {
    try {
        yield put(setLoading(true));
        const products = yield call(getProducts);
        yield put(setProducts(products.data.getProducts));
        yield put(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

function* handleGetProductById({ id }) {
    try {
        yield put(setLoading(true));
        const product = yield call(getProductById, id);
        yield put(setProduct(product.data.getProductById));
        yield put(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

export default function* productsSaga() {
    yield takeEvery(GET_PRODUCTS, handleProductsLoad);
    yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById);
}
