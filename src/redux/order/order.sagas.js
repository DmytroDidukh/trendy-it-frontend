import {takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router'

import {addOrder} from '../../services/orders';
import {ADD_ORDER} from './order.types';
import {setToLocalStorage} from "../../services/local-storage";
import {setCart} from "../cart/cart.actions";

function* handleAddOrder({payload}) {
    try {
        yield call(addOrder, payload);
        yield put(setCart([]));
        setToLocalStorage('cart', [])
        yield put(push('/thanks'));
    } catch (e) {
        console.log(e)
    }
}

export default function* orderSaga() {
    yield takeEvery(ADD_ORDER, handleAddOrder);
}
