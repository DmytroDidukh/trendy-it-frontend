import {
    SET_CATEGORY,
    SET_CATEGORIES,
    GET_CATEGORIES,
    SET_LOADING,
} from './categories.types'

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category
})

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
})

export const getCategories = () => ({
    type: GET_CATEGORIES
})

export const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value
})
