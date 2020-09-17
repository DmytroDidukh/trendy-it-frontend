import {
    SET_PRODUCT,
    SET_PRODUCTS,
    SET_LOADING,
} from './products.types'

const initialState = {
    list: [],
    product: {},
    loading: false
}

const productsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_PRODUCT: {
            return {
                ...state,
                product: payload
            }
        }
        case SET_PRODUCTS: {
            return {
                ...state,
                list: payload,
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: payload,
            }
        }
        default:
            return state
    }
}

export default productsReducer;
