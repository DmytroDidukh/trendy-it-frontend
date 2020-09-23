import { call, put, takeEvery } from 'redux-saga/effects';
//import { push } from 'connected-react-router';

import {
  setNovaPoshtaCities,
  setNovaPoshtaWarehouse,
  setNovaPoshtaStreets,
  setNovaPoshtaDeliveryPrice,
  setLoading
} from './novaposhta.actions';
import {
  GET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_WAREHOUSES,
  GET_NOVAPOSHTA_STREETS,
  GET_NOVAPOSHTA_DELIVERY_PRICE,
} from './novaposhta.types';
import {
  getNovaPoshtaCities,
  getNovaPoshtaWarehouses,
  getNovaPoshtaStreets,
  getNovaPoshtaPrices,
} from '../../services/novaposhta';


export function* handleCities({ payload }) {
  try {
    yield put(setLoading(true));
    const cities = yield call(getNovaPoshtaCities, payload);
    yield put(setNovaPoshtaCities(cities.data.getNovaPoshtaCities));

    yield put(setLoading(false));
  } catch (e) {
    console.log(e)
  }
}

export function* handleWarehouse({ payload }) {
  try {
    yield put(setLoading(true));
    const warehouses = yield call(getNovaPoshtaWarehouses, payload);
    yield put(setNovaPoshtaWarehouse(warehouses.data.getNovaPoshtaWarehouses));

    yield put(setLoading(false));
  } catch (e) {
    console.log(e)
  }
}

export function* handleStreets({ payload }) {
  try {
    yield put(setLoading(true));

    const streets = yield call(getNovaPoshtaStreets, payload);
    yield put(setNovaPoshtaStreets(streets.data.getNovaPoshtaStreets));

    yield put(setLoading(false));
  } catch (e) {
    console.log(e)
  }
}

export function* handleDeliveryPrice({ payload }) {
  try {
    yield put(setLoading(true));

    const deliveryPrice = yield call(getNovaPoshtaPrices, payload);
    yield put(setNovaPoshtaDeliveryPrice(deliveryPrice.data.getNovaPoshtaPrices));

    yield put(setLoading(false));
  } catch (e) {
    console.log(e)
  }
}

export default function* checkoutSaga() {
  yield takeEvery(GET_NOVAPOSHTA_CITIES, handleCities);
  yield takeEvery(GET_NOVAPOSHTA_WAREHOUSES, handleWarehouse);
  yield takeEvery(GET_NOVAPOSHTA_STREETS, handleStreets);
  yield takeEvery(GET_NOVAPOSHTA_DELIVERY_PRICE, handleDeliveryPrice);
}
