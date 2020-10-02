import {
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_PRODUCTS_PAGINATION,
  SET_SEARCHED_PRODUCTS,
  SET_LOADING,
  SET_SEARCH_LOADING
} from './products.types';

const initialState = {
  list: [],
  searchedList: [],
  pagination: null,
  product: null,
  loading: false,
  searchLoading: false
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCT: {
      return {
        ...state,
        product: payload
      };
    }
    case SET_PRODUCTS: {
      return {
        ...state,
        list: payload
      };
    }
    case SET_PRODUCTS_PAGINATION: {
      return {
        ...state,
        pagination: payload
      };
    }
    case SET_SEARCHED_PRODUCTS: {
      return {
        ...state,
        searchedList: payload
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: payload
      };
    }
    case SET_SEARCH_LOADING: {
      return {
        ...state,
        searchLoading: payload
      };
    }
    default:
      return state;
  }
};

export default productsReducer;
