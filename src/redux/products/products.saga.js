import { takeEvery, call, put } from 'redux-saga/effects';

import {
    setProducts,
    setLoading,
} from './products.actions';
import { getProducts } from '../../services/products';
import { GET_PRODUCTS } from './products.types';

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

export default function* productsSaga() {
    yield takeEvery(GET_PRODUCTS, handleProductsLoad);
}
