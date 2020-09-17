import {
    SET_SUBCATEGORY,
    SET_SUBCATEGORIES,
    GET_SUBCATEGORIES,
    SET_LOADING,
} from './subcategories.types'

export const setSubcategory = (category) => ({
    type: SET_SUBCATEGORY,
    payload: category
})

export const setSubcategories = (categories) => ({
    type: SET_SUBCATEGORIES,
    payload: categories
})

export const getSubcategories = () => ({
    type: GET_SUBCATEGORIES
})

export const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value
})
