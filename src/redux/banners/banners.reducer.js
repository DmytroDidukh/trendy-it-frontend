import {
    SET_BANNERS,
    SET_LOADING,
} from './banners.types'

const initialState = {
    list: [],
    loading: false
}

const bannersReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_BANNERS: {
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

export default bannersReducer;
