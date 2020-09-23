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

const getNovaPoshtaWarehouse = (inputValue) => ({
  type: GET_NOVAPOSHTA_WAREHOUSES,
  payload: inputValue
});

const setNovaPoshtaStreets = (streets) => ({
  type: SET_NOVAPOSHTA_STREETS,
  payload: streets
});

const getNovaPoshtaStreets = (inputValue) => ({
  type: GET_NOVAPOSHTA_STREETS,
  payload: inputValue
});

const setNovaPoshtaDeliveryPrice = (priceObj) => ({
  type: SET_NOVAPOSHTA_DELIVERY_PRICE,
  payload: priceObj
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
  getNovaPoshtaWarehouse,
  setNovaPoshtaWarehouse,
  setNovaPoshtaStreets,
  getNovaPoshtaStreets,
  setNovaPoshtaDeliveryPrice,
  getNovaPoshtaDeliveryPrice,
  setLoading
};
