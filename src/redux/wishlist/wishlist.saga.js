import { takeEvery, put } from 'redux-saga/effects';

import { setWishlist } from './wishlist.actions';
import {
    GET_WISHLIST,
    ADD_ITEM_TO_WISHLIST,
    REMOVE_ITEM_FROM_WISHLIST
} from './wishlist.types';

import {
    getFromLocalStorage,
    setToLocalStorage
} from '../../services/local-storage';

function* handleWishlistLoad() {
    const wishlist = getFromLocalStorage('wishlist');
    yield put(setWishlist(wishlist));
}

function* handleAddWishlistItem({ payload }) {
    const wishlist = getFromLocalStorage('wishlist');
    const newWishlist = [...wishlist, payload];

    setToLocalStorage('wishlist', newWishlist);
    yield put(setWishlist(newWishlist));
}

function* handleRemoveWishlistItem({ payload }) {
    const wishlist = getFromLocalStorage('wishlist');
    const newWishlist = wishlist.filter((item) => item.id !== payload);

    setToLocalStorage('wishlist', newWishlist);
    yield put(setWishlist(newWishlist));
}

export default function* wishlistSaga() {
    yield takeEvery(GET_WISHLIST, handleWishlistLoad);
    yield takeEvery(ADD_ITEM_TO_WISHLIST, handleAddWishlistItem);
    yield takeEvery(REMOVE_ITEM_FROM_WISHLIST, handleRemoveWishlistItem);
}
