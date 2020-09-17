import {
    SET_SUBCATEGORY,
    SET_SUBCATEGORIES,
    SET_LOADING,
} from './subcategories.types'

const initialState = {
    list: [],
    subcategory: {},
    loading: false
}

const subcategoriesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SUBCATEGORY: {
            return {
                ...state,
                subcategory: payload
            }
        }
        case SET_SUBCATEGORIES: {
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

export default subcategoriesReducer;
