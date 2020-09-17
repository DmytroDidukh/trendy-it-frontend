import {
    SET_CATEGORY,
    SET_CATEGORIES,
    SET_LOADING,
} from './categories.types'

const initialState = {
    list: [],
    category: {},
    loading: false
}

const categoriesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_CATEGORY: {
            return {
                ...state,
                category: payload
            }
        }
        case SET_CATEGORIES: {
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

export default categoriesReducer;
