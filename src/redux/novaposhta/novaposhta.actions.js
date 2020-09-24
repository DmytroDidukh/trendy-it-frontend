import {
  SET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_WAREHOUSES,
  SET_NOVAPOSHTA_WAREHOUSES,
  SET_NOVAPOSHTA_STREETS,
  GET_NOVAPOSHTA_STREETS,
  SET_NOVAPOSHTA_DELIVERY_PRICE,
  GET_NOVAPOSHTA_DELIVERY_PRICE,
  SET_LOADING
} from './novaposhta.types';

const setNovaPoshtaCities = (cities) => ({
  type: SET_NOVAPOSHTA_CITIES,
  payload: cities
});

const getNovaPoshtaCities = (inputValue) => ({
  type: GET_NOVAPOSHTA_CITIES,
  payload: inputValue
});

const setNovaPoshtaWarehouse = (warehouses) => ({
  type: SET_NOVAPOSHTA_WAREHOUSES,
  payload: warehouses
});

const getNovaPoshtaWarehouses = (data) => ({
  type: GET_NOVAPOSHTA_WAREHOUSES,
  payload: data
});

const setNovaPoshtaStreets = (streets) => ({
  type: SET_NOVAPOSHTA_STREETS,
  payload: streets
});

const getNovaPoshtaStreets = (inputValue) => ({
  type: GET_NOVAPOSHTA_STREETS,
  payload: inputValue
});

const setNovaPoshtaDeliveryPrice = (cost) => ({
  type: SET_NOVAPOSHTA_DELIVERY_PRICE,
  payload: cost
});

const getNovaPoshtaDeliveryPrice = (data) => ({
  type: GET_NOVAPOSHTA_DELIVERY_PRICE,
  payload: data
});

const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export {
  getNovaPoshtaCities,
  setNovaPoshtaCities,
  getNovaPoshtaWarehouses,
  setNovaPoshtaWarehouse,
  setNovaPoshtaStreets,
  getNovaPoshtaStreets,
  setNovaPoshtaDeliveryPrice,
  getNovaPoshtaDeliveryPrice,
  setLoading
};
