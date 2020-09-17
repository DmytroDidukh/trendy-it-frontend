import {
    SET_PRODUCT,
    SET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS,
    SET_LOADING,
} from './products.types'

export const setProduct= (product) => ({
    type: SET_PRODUCT,
    payload: product
})

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products
})

export const getProductById = (id) => {
    console.log('1', id)
   return {
       type: GET_PRODUCT_BY_ID,
       id
   }
}

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value
})
