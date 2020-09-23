import {
  SET_NOVAPOSHTA_CITIES,
  SET_NOVAPOSHTA_WAREHOUSES,
  SET_NOVAPOSHTA_STREETS,
  SET_NOVAPOSHTA_DELIVERY_PRICE,
  SET_LOADING
} from './novaposhta.types';

const initialState = {
  loading: false,
  deliveryPrice: {},
  cities: [],
  warehouses: [],
  streets: []
};

const novaPoshtaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NOVAPOSHTA_CITIES:
      return {
        ...state,
        cities: payload
      };

    case SET_NOVAPOSHTA_WAREHOUSES:
      return {
        ...state,
        warehouses: payload
      };
    case SET_NOVAPOSHTA_STREETS:
      return {
        ...state,
        streets: payload
      };
    case SET_NOVAPOSHTA_DELIVERY_PRICE:
      return {
        ...state,
        deliveryPrice: payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      };

    default:
      return state;
  }
};

export default novaPoshtaReducer;
