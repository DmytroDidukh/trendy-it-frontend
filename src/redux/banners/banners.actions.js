import {
    GET_BANNERS,
    SET_BANNERS,
    SET_LOADING,
} from './banners.types'

export const setBanners = (banners) => ({
    type: SET_BANNERS,
    payload: banners
})

export const getBanners = () => ({
    type: GET_BANNERS
})

export const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value
})
