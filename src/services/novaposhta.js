import { gql } from 'apollo-boost';

import client from './index';

const getNovaPoshtaCities = async (city) =>
  await client.query({
    variables: {
      city
    },
    query: gql`
      query($city: String) {
        getNovaPoshtaCities(city: $city) {
          description
          ref
        }
      }
    `
  });

const getNovaPoshtaStreets = async ({ cityRef, street }) =>
  await client.query({
    variables: {
      cityRef,
      street
    },
    query: gql`
      query($cityRef: String, $street: String) {
        getNovaPoshtaStreets(cityRef: $cityRef, street: $street) {
          description
          streetsType
          ref
          present
        }
      }
    `
  });

const getNovaPoshtaWarehouses = async ({ city, cityRef }) =>
  await client.query({
    variables: {
      city,
      cityRef
    },
    query: gql`
      query($city: String, $cityRef: String) {
        getNovaPoshtaWarehouses(city: $city, cityRef: $cityRef) {
          description
          ref
          shortAddress
        }
      }
    `
  });

const getNovaPoshtaPrices = async (data) =>
  await client.query({
    variables: {
      data
    },
    query: gql`
      query($data: NovaPoshtaPriceInput) {
        getNovaPoshtaPrices(data: $data) {
          assessedCost
          cost
          costRedelivery
          costPack
        }
      }
    `
  });

export {
  getNovaPoshtaCities,
  getNovaPoshtaWarehouses,
  getNovaPoshtaStreets,
  getNovaPoshtaPrices
};
