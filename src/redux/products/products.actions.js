import {
  SET_PRODUCT,
  SET_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  SET_PRODUCTS_PAGINATION,
  GET_SEARCHED_PRODUCTS,
  SET_SEARCHED_PRODUCTS,
  SET_LOADING,
  SET_SEARCH_LOADING
} from './products.types';

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});

export const setProductsPagination = (pagination) => ({
  type: SET_PRODUCTS_PAGINATION,
  payload: pagination
});

export const getProducts = (data) => ({
  type: GET_PRODUCTS,
  payload: data
});

export const getSearchedProducts = (data) => ({
  type: GET_SEARCHED_PRODUCTS,
  payload: data
});

export const setSearchedProducts = (products) => ({
  type: SET_SEARCHED_PRODUCTS,
  payload: products
});

export const getProductById = (id) => ({
  type: GET_PRODUCT_BY_ID,
  payload: id
});

export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value
});

export const setSearchLoading = (value) => ({
  type: SET_SEARCH_LOADING,
  payload: value
});
