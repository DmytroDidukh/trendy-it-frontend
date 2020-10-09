import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setBanners, setLoading } from './banners.actions';
import { getBannersByUsability } from '../../services/banners';
import { GET_BANNERS } from './banners.types';

function* handleBannersLoad() {
  try {
    yield put(setLoading(true));
    const banners = yield call(getBannersByUsability);
    yield put(setBanners(banners.data.getBannerByUsability));
    yield put(setLoading(false));
  } catch (e) {
    console.log(e);
    yield put(push('/error'));
    yield put(setLoading(false));
  }
}

export default function* bannersSaga() {
  yield takeEvery(GET_BANNERS, handleBannersLoad);
}
