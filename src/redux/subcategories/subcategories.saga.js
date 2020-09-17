import {takeEvery, call, put} from 'redux-saga/effects';

import {
    setSubcategories,
    setLoading,
} from './subcategories.actions';

import { getSubcategories} from '../../services/subcategories';
import { GET_SUBCATEGORIES} from './subcategories.types';

function* handleSubcategoriesLoad() {
    try {
        yield put(setLoading(true));
        const subcategories = yield call(getSubcategories);
        yield put(setSubcategories(subcategories.data.getSubcategories));
        yield put(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

export default function* subcategoriesSaga() {
    yield takeEvery(GET_SUBCATEGORIES, handleSubcategoriesLoad);
}
