import { takeEvery, call, put } from 'redux-saga/effects';

import {
    setBanners,
    setLoading,
} from './banners.actions';
import { getBannersByUsability } from '../../services/banners';
import { GET_BANNERS } from './banners.types';

function* handleBannersLoad() {
    try {
        yield put(setLoading(true));
        const banners = yield call(getBannersByUsability);
        yield put(setBanners(banners.data.getBannerByUsability));
        yield put(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

export default function* bannersSaga() {
    yield takeEvery(GET_BANNERS, handleBannersLoad);
}
