import {takeEvery, call, put} from 'redux-saga/effects';

import {
    setCategories,
    setLoading,
} from './categories.actions';

import { getCategories} from '../../services/categories';
import { GET_CATEGORIES} from './categories.types';

function* handleCategoriesLoad() {
    try {
        yield put(setLoading(true));
        const categories = yield call(getCategories);
        yield put(setCategories(categories.data.getCategories));
        yield put(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

export default function* categoriesSaga() {
    yield takeEvery(GET_CATEGORIES, handleCategoriesLoad);
}
