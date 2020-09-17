
import {
    SET_WISHLIST,
    GET_WISHLIST,
    ADD_ITEM_TO_WISHLIST,
    REMOVE_ITEM_FROM_WISHLIST
} from './wishlist.types';

const getWishlist = () => ({
    type: GET_WISHLIST
});

const setWishlist = (wishlistItems) => ({
    type: SET_WISHLIST,
    payload: wishlistItems
});

const addItemToWishlist = (item) => ({
    type: ADD_ITEM_TO_WISHLIST,
    payload: item
});

const removeItemFromWishlist = (itemId) => ({
    type: REMOVE_ITEM_FROM_WISHLIST,
    payload: itemId
});

export { getWishlist, setWishlist, addItemToWishlist, removeItemFromWishlist };
